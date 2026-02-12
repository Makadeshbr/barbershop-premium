/**
 * API Route: POST /api/newsletter
 *
 * Endpoint para inscrição na newsletter da barbearia.
 * Implementa validação robusta, rate limiting, sanitização de input
 * e headers de segurança.
 *
 * @remarks
 * A persistência atual é in-memory (Set). Em produção, integrar com
 * Mailchimp, Resend, ConvertKit ou similar via variáveis de ambiente.
 * O Set in-memory é efêmero no Vercel (reseta a cada cold start),
 * mas serve como proteção contra duplicatas dentro de uma mesma instância.
 */

import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";

/** Configuração do rate limiter — 5 requisições por minuto por IP */
const RATE_LIMIT_CONFIG = {
  maxRequests: 5,
  windowMs: 60_000,
} as const;

/**
 * Regex de validação de email baseada em RFC 5322 simplificada.
 * Mais rigorosa que a regex original, rejeita entradas como "a@b"
 * e exige pelo menos um ponto no domínio.
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** Tamanho máximo permitido para o campo de email */
const MAX_EMAIL_LENGTH = 254;

/** Set in-memory para deduplicação dentro da mesma instância */
const subscriberSet = new Set<string>();

/**
 * Sanitiza o input de email removendo caracteres potencialmente perigosos.
 * Previne ataques de XSS caso o email seja exibido em alguma interface.
 *
 * @param input - String de email a ser sanitizada
 * @returns Email sanitizado e normalizado em lowercase
 */
function sanitizeEmail(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[<>"'&;(){}[\]\\]/g, "");
}

/**
 * Extrai o IP do cliente a partir dos headers da requisição.
 * Prioriza x-forwarded-for (usado por proxies/CDN como Vercel).
 *
 * @param request - Objeto Request da requisição
 * @returns IP do cliente ou "unknown" se não identificado
 */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Cria headers de segurança padrão para as respostas da API.
 *
 * @param rateLimitRemaining - Número de requisições restantes na janela
 * @param rateLimitResetAt - Timestamp Unix de quando o limite será resetado
 * @returns Objeto com headers de segurança e rate limit
 */
function createSecurityHeaders(rateLimitRemaining: number, rateLimitResetAt: number): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-RateLimit-Remaining": String(rateLimitRemaining),
    "X-RateLimit-Reset": String(Math.ceil(rateLimitResetAt / 1000)),
  };
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  // Verificação de rate limit antes de processar qualquer dado
  const rateCheck = checkRateLimit(clientIp, RATE_LIMIT_CONFIG);
  if (!rateCheck.allowed) {
    const retryAfter = Math.ceil((rateCheck.resetAt - Date.now()) / 1000);

    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde um momento e tente novamente." },
      {
        status: 429,
        headers: {
          ...createSecurityHeaders(0, rateCheck.resetAt),
          "Retry-After": String(retryAfter),
        },
      }
    );
  }

  // Verificação de Content-Type
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type inválido. Esperado application/json." },
      {
        status: 415,
        headers: createSecurityHeaders(rateCheck.remaining, rateCheck.resetAt),
      }
    );
  }

  try {
    const body = await request.json();
    const { email } = body;

    // Validação de presença e tipo
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email é obrigatório." },
        {
          status: 400,
          headers: createSecurityHeaders(rateCheck.remaining, rateCheck.resetAt),
        }
      );
    }

    // Validação de tamanho (RFC 5321 limita a 254 caracteres)
    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: "Email excede o tamanho máximo permitido." },
        {
          status: 400,
          headers: createSecurityHeaders(rateCheck.remaining, rateCheck.resetAt),
        }
      );
    }

    // Sanitização e normalização
    const sanitizedEmail = sanitizeEmail(email);

    // Validação de formato com regex RFC 5322
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Email inválido." },
        {
          status: 400,
          headers: createSecurityHeaders(rateCheck.remaining, rateCheck.resetAt),
        }
      );
    }

    // Verificação de duplicata in-memory
    if (subscriberSet.has(sanitizedEmail)) {
      return NextResponse.json(
        { message: "Este email já está inscrito!" },
        {
          status: 200,
          headers: createSecurityHeaders(rateCheck.remaining, rateCheck.resetAt),
        }
      );
    }

    // Registra o email no Set in-memory
    subscriberSet.add(sanitizedEmail);

    // ──────────────────────────────────────────────────────────
    // INTEGRAÇÃO COM SERVIÇO DE EMAIL
    //
    // Descomente e configure a integração desejada:
    //
    // Resend:
    //   import { Resend } from 'resend';
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.contacts.create({
    //     email: sanitizedEmail,
    //     audienceId: process.env.RESEND_AUDIENCE_ID!,
    //   });
    //
    // Mailchimp:
    //   await fetch(`https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email_address: sanitizedEmail,
    //       status: 'subscribed',
    //     }),
    //   });
    // ──────────────────────────────────────────────────────────

    return NextResponse.json(
      { message: "Inscrito com sucesso!" },
      {
        status: 201,
        headers: createSecurityHeaders(rateCheck.remaining, rateCheck.resetAt),
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente." },
      {
        status: 500,
        headers: createSecurityHeaders(rateCheck.remaining, rateCheck.resetAt),
      }
    );
  }
}
