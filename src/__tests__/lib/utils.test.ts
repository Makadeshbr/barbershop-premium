import { describe, it, expect } from "vitest";
import { cn, formatCurrency, getFramePath } from "@/lib/utils";

describe("cn() — Merge de classes CSS", () => {
    it("deve combinar múltiplas classes simples", () => {
        expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    });

    it("deve resolver conflitos de Tailwind (última classe vence)", () => {
        const result = cn("px-4", "px-8");
        expect(result).toBe("px-8");
    });

    it("deve ignorar valores falsy (false, undefined, null)", () => {
        expect(cn("base", false && "hidden", undefined, null)).toBe("base");
    });

    it("deve suportar objetos condicionais do clsx", () => {
        const isActive = true;
        expect(cn("base", { "bg-gold": isActive, "bg-dark": !isActive })).toBe("base bg-gold");
    });

    it("deve retornar string vazia para nenhum argumento", () => {
        expect(cn()).toBe("");
    });
});

describe("formatCurrency() — Formatação de moeda BRL", () => {
    it("deve formatar número inteiro como R$", () => {
        const result = formatCurrency(45);
        // Aceita tanto "R$ 45,00" quanto "R$\u00A045,00" (non-breaking space)
        expect(result).toMatch(/R\$\s*45,00/);
    });

    it("deve formatar número decimal com 2 casas", () => {
        const result = formatCurrency(70.5);
        expect(result).toMatch(/R\$\s*70,50/);
    });

    it("deve formatar zero", () => {
        const result = formatCurrency(0);
        expect(result).toMatch(/R\$\s*0,00/);
    });

    it("deve formatar valores grandes com separador de milhar", () => {
        const result = formatCurrency(1500);
        expect(result).toMatch(/R\$\s*1\.500,00/);
    });
});

describe("getFramePath() — Caminho de frames do Remotion", () => {
    it("deve gerar caminho com zero-padding de 4 dígitos", () => {
        expect(getFramePath("/images/intro", 1)).toBe("/images/intro/frame0001.webp");
    });

    it("deve preservar o basePath corretamente", () => {
        expect(getFramePath("/frames/scene", 42)).toBe("/frames/scene/frame0042.webp");
    });

    it("deve lidar com frames de 4 dígitos sem padding extra", () => {
        expect(getFramePath("/a", 1234)).toBe("/a/frame1234.webp");
    });

    it("deve lidar com frame 0", () => {
        expect(getFramePath("/base", 0)).toBe("/base/frame0000.webp");
    });
});
