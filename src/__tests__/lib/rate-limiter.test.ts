import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimit, type RateLimitConfig } from "@/lib/rate-limiter";

const TEST_CONFIG: RateLimitConfig = {
    maxRequests: 3,
    windowMs: 1000, // 1 segundo para testes rápidos
};

describe("Rate Limiter", () => {
    beforeEach(() => {
        // Limpa todos os registros entre testes
        resetRateLimit();
    });

    it("deve permitir requisições dentro do limite", () => {
        const result = checkRateLimit("192.168.1.1", TEST_CONFIG);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(2);
    });

    it("deve decrementar remaining a cada requisição", () => {
        const r1 = checkRateLimit("10.0.0.1", TEST_CONFIG);
        const r2 = checkRateLimit("10.0.0.1", TEST_CONFIG);
        const r3 = checkRateLimit("10.0.0.1", TEST_CONFIG);

        expect(r1.remaining).toBe(2);
        expect(r2.remaining).toBe(1);
        expect(r3.remaining).toBe(0);
    });

    it("deve bloquear após exceder o limite", () => {
        checkRateLimit("10.0.0.2", TEST_CONFIG);
        checkRateLimit("10.0.0.2", TEST_CONFIG);
        checkRateLimit("10.0.0.2", TEST_CONFIG);

        const blocked = checkRateLimit("10.0.0.2", TEST_CONFIG);
        expect(blocked.allowed).toBe(false);
        expect(blocked.remaining).toBe(0);
        expect(blocked.resetAt).toBeGreaterThan(Date.now());
    });

    it("deve isolar rate limits entre IPs diferentes", () => {
        // Esgota o limite do IP "A"
        checkRateLimit("ip-a", TEST_CONFIG);
        checkRateLimit("ip-a", TEST_CONFIG);
        checkRateLimit("ip-a", TEST_CONFIG);

        // IP "B" deve continuar livre
        const result = checkRateLimit("ip-b", TEST_CONFIG);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(2);
    });

    it("deve resetar corretamente por IP", () => {
        checkRateLimit("ip-reset", TEST_CONFIG);
        checkRateLimit("ip-reset", TEST_CONFIG);

        resetRateLimit("ip-reset");

        const result = checkRateLimit("ip-reset", TEST_CONFIG);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(2);
    });

    it("deve resetar todos os IPs quando chamado sem argumento", () => {
        checkRateLimit("ip-1", TEST_CONFIG);
        checkRateLimit("ip-2", TEST_CONFIG);

        resetRateLimit();

        expect(checkRateLimit("ip-1", TEST_CONFIG).remaining).toBe(2);
        expect(checkRateLimit("ip-2", TEST_CONFIG).remaining).toBe(2);
    });

    it("deve retornar resetAt no futuro quando bloqueado", () => {
        for (let i = 0; i < TEST_CONFIG.maxRequests; i++) {
            checkRateLimit("ip-time", TEST_CONFIG);
        }

        const blocked = checkRateLimit("ip-time", TEST_CONFIG);
        expect(blocked.resetAt).toBeLessThanOrEqual(Date.now() + TEST_CONFIG.windowMs);
    });
});
