/**
 * Rate Limiter com sliding window para proteção de endpoints.
 *
 * Utiliza um Map in-memory com IP como chave e timestamps de requisições
 * como valor. Limpa automaticamente entradas expiradas para evitar
 * vazamento de memória.
 *
 * @remarks
 * Em ambiente serverless (Vercel), cada instância tem memória isolada,
 * então o rate limit é por instância. Para produção de alto volume,
 * considerar Vercel KV ou Upstash Redis.
 */

/** Registro de requisições por IP — timestamps em milissegundos */
const requestLog = new Map<string, number[]>();

/** Intervalo de limpeza automática de entradas expiradas (5 minutos) */
const CLEANUP_INTERVAL_MS = 300_000;

/** Referência do timer para limpeza periódica */
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Inicia o timer de limpeza periódica do Map de requisições.
 * Evita vazamento de memória removendo IPs sem requisições recentes.
 *
 * @param windowMs - Janela de tempo em milissegundos para manter registros
 */
function ensureCleanupTimer(windowMs: number): void {
    if (cleanupTimer) return;

    cleanupTimer = setInterval(() => {
        const now = Date.now();

        for (const [ip, timestamps] of requestLog.entries()) {
            const validTimestamps = timestamps.filter((t) => now - t < windowMs);

            if (validTimestamps.length === 0) {
                requestLog.delete(ip);
            } else {
                requestLog.set(ip, validTimestamps);
            }
        }

        // Para o timer se não houver mais entradas para limpar
        if (requestLog.size === 0 && cleanupTimer) {
            clearInterval(cleanupTimer);
            cleanupTimer = null;
        }
    }, CLEANUP_INTERVAL_MS);
}

export interface RateLimitConfig {
    /** Número máximo de requisições permitidas na janela de tempo */
    maxRequests: number;
    /** Janela de tempo em milissegundos */
    windowMs: number;
}

export interface RateLimitResult {
    /** Se a requisição foi permitida (dentro do limite) */
    allowed: boolean;
    /** Quantas requisições restam na janela atual */
    remaining: number;
    /** Timestamp Unix (ms) de quando o limite será resetado */
    resetAt: number;
}

/**
 * Verifica se um IP está dentro do limite de requisições permitidas.
 *
 * @param ip - Endereço IP do cliente
 * @param config - Configuração de limite (maxRequests e windowMs)
 * @returns Resultado indicando se a requisição é permitida, quantas restam e quando reseta
 *
 * @example
 * ```ts
 * const result = checkRateLimit("192.168.1.1", { maxRequests: 5, windowMs: 60_000 });
 * if (!result.allowed) {
 *   return new Response("Too Many Requests", { status: 429 });
 * }
 * ```
 */
export function checkRateLimit(ip: string, config: RateLimitConfig): RateLimitResult {
    const { maxRequests, windowMs } = config;
    const now = Date.now();

    ensureCleanupTimer(windowMs);

    // Filtra apenas requisições dentro da janela de tempo
    const existingTimestamps = requestLog.get(ip) ?? [];
    const validTimestamps = existingTimestamps.filter((t) => now - t < windowMs);

    if (validTimestamps.length >= maxRequests) {
        // Calcula quando o primeiro request da janela vai expirar
        const oldestTimestamp = validTimestamps[0];
        const resetAt = oldestTimestamp + windowMs;

        return {
            allowed: false,
            remaining: 0,
            resetAt,
        };
    }

    // Registra a nova requisição
    validTimestamps.push(now);
    requestLog.set(ip, validTimestamps);

    return {
        allowed: true,
        remaining: maxRequests - validTimestamps.length,
        resetAt: now + windowMs,
    };
}

/**
 * Reseta o rate limiter para um IP específico.
 * Útil para testes ou operações administrativas.
 *
 * @param ip - Endereço IP a ser resetado. Se omitido, limpa todos os registros.
 */
export function resetRateLimit(ip?: string): void {
    if (ip) {
        requestLog.delete(ip);
    } else {
        requestLog.clear();
    }
}
