"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type FormStatus = "idle" | "loading" | "success" | "error";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Ocorreu um erro. Tente novamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Erro de conexão. Tente novamente.");
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  }

  return (
    <section id="contato" className="py-20 lg:py-32 bg-dark relative">
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="max-w-3xl mx-auto section-padding text-center">
        <ScrollReveal variants={fadeInUp}>
          <div className="flex justify-center mb-6">
            <Image
              src="/images/icons/logo_semfundo.png"
              alt="Império Barbearia"
              width={120}
              height={48}
              className="h-12 w-auto object-contain"
            />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Inscreva-se na nossa Newsletter
          </h2>

          <p className="text-gold-gradient font-accent text-4xl md:text-5xl italic mt-2">
            Ganhe 10% de Desconto
          </p>

          <p className="text-cream/60 font-body mt-4 max-w-lg mx-auto">
            Receba novidades, dicas e ofertas exclusivas da Império Barbearia.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 mt-6 md:mt-8"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
              disabled={status === "loading"}
              className="bg-dark-card border border-dark-border focus:border-gold text-white rounded-full px-6 py-4 flex-1 font-body outline-none transition-colors duration-200 placeholder:text-cream/40 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-gold text-dark-deep font-bold rounded-full px-8 py-4 hover:bg-gold-light transition-colors duration-200 font-body cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Enviando..." : "Inscrever"}
            </button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-sm font-body ${
                status === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </motion.p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
