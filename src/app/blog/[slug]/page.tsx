import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getBlogPost, getAllSlugs } from "@/lib/blog";
import { WHATSAPP_LINK } from "@/lib/constants";
import type { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const paragraphs = post.content
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      <div className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-[#C5A55A] hover:text-[#D4B96E] transition-colors text-sm font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Blog
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-[#C5A55A] text-[#0D0D0D] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-[#F5F0E0]/40 text-sm font-body">
            {post.readTime} min de leitura
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mt-8 mb-12 pb-8 border-b border-[#2A2A2A]">
          <div className="w-16 h-16 bg-[#1F1F1F] rounded-xl flex items-center justify-center border border-[#2A2A2A]">
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
            <p className="text-[#F5F0E0]/40 text-sm font-body">Dicas e cuidados profissionais</p>
          </div>
        </div>

        <div>
          {paragraphs.map((line, i) => {
            const trimmed = line.trim();

            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={i} className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#C5A55A] mt-6 mb-3">
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={i} className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mt-10 mb-4">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }

            if (trimmed === "---") {
              return (
                <div key={i} className="h-px w-16 bg-gradient-to-r from-[#C5A55A] via-[#D4B96E] to-[#A88B3D] my-10" />
              );
            }

            if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
              return (
                <p key={i} className="text-[#C5A55A] font-body font-semibold text-lg mt-4 mb-2">
                  {trimmed.replace(/\*\*/g, "")}
                </p>
              );
            }

            return (
              <p key={i} className="text-[#F5F0E0]/80 font-body text-base leading-relaxed mb-4">
                {trimmed}
              </p>
            );
          })}
        </div>

        <div className="mt-16 p-8 bg-[#1F1F1F] rounded-2xl border border-[#2A2A2A] text-center">
          <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-2">
            Gostou das dicas?
          </p>
          <p className="text-[#F5F0E0]/60 font-body mb-6">
            Agende seu horário e experimente o atendimento premium da Império Barbearia.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center justify-center rounded-md font-body tracking-wide bg-[#C5A55A] text-[#0D0D0D] font-semibold px-8 py-4 text-lg hover:bg-[#D4B96E] transition-colors duration-200"
          >
            Agendar Horário
          </a>
        </div>
      </article>
    </main>
  );
}
