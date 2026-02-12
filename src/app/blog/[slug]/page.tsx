import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getBlogPost, getAllSlugs } from "@/lib/blog";
import { WHATSAPP_LINK, SITE_DOMAIN } from "@/lib/constants";
import type { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Gera os parâmetros estáticos para pré-renderização dos posts de blog.
 * Permite build estático (SSG) de todas as páginas de blog.
 *
 * @returns Array de objetos com slug para cada post
 */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/**
 * Gera metadata dinâmica para cada post de blog.
 * Inclui canonical URL (Ação 6), OpenGraph e description.
 *
 * @param params - Parâmetros da rota contendo o slug
 * @returns Metadata com título, descrição, canonical e OpenGraph
 */
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    // Ação 6: Canonical URL para evitar conteúdo duplicado
    alternates: {
      canonical: `https://${SITE_DOMAIN}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://${SITE_DOMAIN}/blog/${slug}`,
    },
  };
}

/**
 * Página de post do blog.
 * Renderiza o conteúdo markdown-like do post com estilos semânticos.
 * Ação 7: Cores padronizadas com tokens do design system.
 */
export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const paragraphs = post.content
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <main className="min-h-screen bg-dark-deep">
      {/* Barra de navegação superior */}
      <div className="bg-dark border-b border-dark/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Blog
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Categoria e tempo de leitura */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-gold text-dark-deep text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-cream/40 text-sm font-body">
            {post.readTime} min de leitura
          </span>
        </div>

        {/* Título do post */}
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
          {post.title}
        </h1>

        {/* Autor e ícone */}
        <div className="flex items-center gap-4 mt-8 mb-12 pb-8 border-b border-dark/50">
          <div className="w-16 h-16 bg-dark rounded-xl flex items-center justify-center border border-dark/50">
            <Image
              src={post.image}
              alt={post.category}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-white font-body font-semibold">Império Barbearia</p>
            <p className="text-cream/40 text-sm font-body">Dicas e cuidados profissionais</p>
          </div>
        </div>

        {/* Conteúdo do post */}
        <div>
          {paragraphs.map((line, i) => {
            const trimmed = line.trim();

            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={i} className="font-heading text-xl font-semibold text-gold mt-6 mb-3">
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={i} className="font-heading text-2xl font-bold text-white mt-10 mb-4">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }

            if (trimmed === "---") {
              return (
                <div key={i} className="h-px w-16 gold-gradient my-10" />
              );
            }

            if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
              return (
                <p key={i} className="text-gold font-body font-semibold text-lg mt-4 mb-2">
                  {trimmed.replace(/\*\*/g, "")}
                </p>
              );
            }

            return (
              <p key={i} className="text-cream/80 font-body text-base leading-relaxed mb-4">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* CTA final */}
        <div className="mt-16 p-8 bg-dark rounded-2xl border border-dark/50 text-center">
          <p className="font-heading text-2xl font-bold text-white mb-2">
            Gostou das dicas?
          </p>
          <p className="text-cream/60 font-body mb-6">
            Agende seu horário e experimente o atendimento premium da Império Barbearia.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center justify-center rounded-md font-body tracking-wide bg-gold text-dark-deep font-semibold px-8 py-4 text-lg hover:bg-gold-light transition-colors duration-200"
          >
            Agendar Horário
          </a>
        </div>
      </article>
    </main>
  );
}
