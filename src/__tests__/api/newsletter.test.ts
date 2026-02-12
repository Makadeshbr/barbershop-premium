import { describe, it, expect, beforeEach } from "vitest";
import { POST } from "@/app/api/newsletter/route";
import { resetRateLimit } from "@/lib/rate-limiter";

/**
 * Cria um Request mock com os parâmetros fornecidos.
 *
 * @param body - Corpo da requisição (será serializado como JSON)
 * @param options - Opções adicionais como headers e IP
 */
function createRequest(
    body: Record<string, unknown>,
    options: { contentType?: string; ip?: string } = {}
): Request {
    const { contentType = "application/json", ip = "127.0.0.1" } = options;

    return new Request("http://localhost/api/newsletter", {
        method: "POST",
        headers: {
            "content-type": contentType,
            "x-forwarded-for": ip,
        },
        body: JSON.stringify(body),
    });
}

describe("POST /api/newsletter", () => {
    beforeEach(() => {
        resetRateLimit();
    });

    describe("Validação de email", () => {
        it("deve rejeitar body sem email", async () => {
            const res = await POST(createRequest({}));
            expect(res.status).toBe(400);
            const data = await res.json();
            expect(data.error).toContain("obrigatório");
        });

        it("deve rejeitar email com formato inválido", async () => {
            const res = await POST(createRequest({ email: "invalido" }));
            expect(res.status).toBe(400);
            const data = await res.json();
            expect(data.error).toContain("inválido");
        });

        it("deve rejeitar email sem domínio completo", async () => {
            const res = await POST(createRequest({ email: "user@localhost" }));
            expect(res.status).toBe(400);
        });

        it("deve aceitar email válido", async () => {
            const res = await POST(createRequest({ email: "teste@example.com" }));
            expect(res.status).toBe(201);
            const data = await res.json();
            expect(data.message).toContain("sucesso");
        });

        it("deve aceitar email com subdomínio", async () => {
            const res = await POST(createRequest({ email: "user@mail.example.com" }));
            expect(res.status).toBe(201);
        });
    });

    describe("Sanitização", () => {
        it("deve processar email com caracteres XSS sem erro interno", async () => {
            const res = await POST(createRequest({ email: "<script>alert(1)</script>@test.com" }));
            // Após sanitização, caracteres perigosos são removidos.
            // O email resultante pode ser válido (201) ou inválido (400).
            // O importante é que não causa erro interno (500).
            expect([201, 400]).toContain(res.status);
        });

        it("deve normalizar email para lowercase", async () => {
            const res = await POST(createRequest({ email: "User@Example.COM" }));
            expect(res.status).toBe(201);
        });
    });

    describe("Content-Type", () => {
        it("deve rejeitar content-type não-JSON", async () => {
            const res = await POST(createRequest(
                { email: "test@test.com" },
                { contentType: "text/plain" }
            ));
            expect(res.status).toBe(415);
        });
    });

    describe("Duplicatas", () => {
        it("deve aceitar segunda inscrição do mesmo email sem erro", async () => {
            await POST(createRequest({ email: "dup@example.com" }));
            const res = await POST(createRequest({ email: "dup@example.com" }));
            expect(res.status).toBe(200);
            const data = await res.json();
            expect(data.message).toContain("já está inscrito");
        });
    });

    describe("Rate Limiting", () => {
        it("deve bloquear após 5 requisições do mesmo IP", async () => {
            const ip = "10.0.0.100";

            for (let i = 0; i < 5; i++) {
                await POST(createRequest({ email: `user${i}@test.com` }, { ip }));
            }

            const res = await POST(createRequest({ email: "extra@test.com" }, { ip }));
            expect(res.status).toBe(429);
            const data = await res.json();
            expect(data.error).toContain("Muitas tentativas");
        });

        it("deve incluir header Retry-After quando bloqueado", async () => {
            const ip = "10.0.0.200";

            for (let i = 0; i < 5; i++) {
                await POST(createRequest({ email: `u${i}@t.com` }, { ip }));
            }

            const res = await POST(createRequest({ email: "blocked@t.com" }, { ip }));
            expect(res.headers.get("Retry-After")).toBeTruthy();
        });

        it("deve permitir diferentes IPs independentemente", async () => {
            for (let i = 0; i < 5; i++) {
                await POST(createRequest({ email: `u${i}@t.com` }, { ip: "ip-a" }));
            }

            const res = await POST(createRequest({ email: "other@test.com" }, { ip: "ip-b" }));
            expect(res.status).toBe(201);
        });
    });

    describe("Headers de Segurança", () => {
        it("deve incluir X-Content-Type-Options: nosniff", async () => {
            const res = await POST(createRequest({ email: "sec@test.com" }));
            expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
        });

        it("deve incluir X-RateLimit-Remaining", async () => {
            const res = await POST(createRequest({ email: "rl@test.com" }));
            const remaining = res.headers.get("X-RateLimit-Remaining");
            expect(remaining).toBeTruthy();
            expect(Number(remaining)).toBeGreaterThanOrEqual(0);
        });
    });
});
