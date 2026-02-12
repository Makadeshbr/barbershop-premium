import { describe, it, expect } from "vitest";
import { getBlogPost, getAllSlugs, BLOG_POSTS } from "@/lib/blog";

describe("getBlogPost() — Busca de post por slug", () => {
    it("deve retornar o post correto para um slug existente", () => {
        const post = getBlogPost("manter-corte-perfeito");
        expect(post).toBeDefined();
        expect(post?.title).toBe("Como manter o corte perfeito por mais tempo");
        expect(post?.category).toBe("Cabelo");
        expect(post?.slug).toBe("manter-corte-perfeito");
    });

    it("deve retornar undefined para slug inexistente", () => {
        expect(getBlogPost("post-que-nao-existe")).toBeUndefined();
    });

    it("deve retornar undefined para string vazia", () => {
        expect(getBlogPost("")).toBeUndefined();
    });

    it("deve retornar post com todos os campos obrigatórios", () => {
        const post = getBlogPost("cuidados-diarios-barba");
        expect(post).toBeDefined();
        expect(post).toHaveProperty("slug");
        expect(post).toHaveProperty("title");
        expect(post).toHaveProperty("category");
        expect(post).toHaveProperty("image");
        expect(post).toHaveProperty("excerpt");
        expect(post).toHaveProperty("content");
        expect(post).toHaveProperty("readTime");
        expect(typeof post!.readTime).toBe("number");
    });
});

describe("getAllSlugs() — Lista de slugs disponíveis", () => {
    it("deve retornar array com todos os slugs", () => {
        const slugs = getAllSlugs();
        expect(slugs).toBeInstanceOf(Array);
        expect(slugs.length).toBeGreaterThan(0);
    });

    it("deve incluir todos os slugs conhecidos", () => {
        const slugs = getAllSlugs();
        expect(slugs).toContain("manter-corte-perfeito");
        expect(slugs).toContain("cuidados-diarios-barba");
        expect(slugs).toContain("importancia-barboterapia");
    });

    it("deve ter a mesma quantidade de slugs que BLOG_POSTS", () => {
        const slugs = getAllSlugs();
        expect(slugs.length).toBe(Object.keys(BLOG_POSTS).length);
    });
});

describe("BLOG_POSTS — Integridade dos dados", () => {
    it("todos os posts devem ter content não vazio", () => {
        for (const post of Object.values(BLOG_POSTS)) {
            expect(post.content.length).toBeGreaterThan(100);
        }
    });

    it("todos os posts devem ter readTime positivo", () => {
        for (const post of Object.values(BLOG_POSTS)) {
            expect(post.readTime).toBeGreaterThan(0);
        }
    });

    it("todos os posts devem ter imagens que começam com /", () => {
        for (const post of Object.values(BLOG_POSTS)) {
            expect(post.image).toMatch(/^\//);
        }
    });
});
