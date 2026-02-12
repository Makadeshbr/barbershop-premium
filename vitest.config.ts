import { defineConfig } from "vitest/config";
import { resolve } from "path";

/**
 * Configuração do Vitest para o projeto.
 * Define alias de path (@/) e ambiente jsdom para testes de componentes.
 */
export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: [],
        include: ["src/**/*.test.{ts,tsx}"],
        coverage: {
            reporter: ["text", "lcov"],
            include: ["src/lib/**", "src/app/api/**"],
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
