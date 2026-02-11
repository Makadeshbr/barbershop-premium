import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CONTACT, SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de Privacidade da ${SITE_NAME}. Saiba como coletamos, usamos e protegemos seus dados pessoais.`,
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      <div className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#C5A55A] hover:text-[#D4B96E] transition-colors text-sm font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold text-white mb-4">
          Política de Privacidade
        </h1>
        <p className="text-[#F5F0E0]/40 text-sm font-body mb-12 pb-8 border-b border-[#2A2A2A]">
          Última atualização: {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </p>

        <div className="space-y-8">
          <Section title="1. Informações gerais">
            <p>
              A {SITE_NAME}, inscrita sob o CNPJ [PREENCHA], com sede em {CONTACT.address},
              é responsável pelo tratamento dos seus dados pessoais conforme descrito nesta
              Política de Privacidade, em conformidade com a Lei Geral de Proteção de Dados
              (Lei n.º 13.709/2018 — LGPD).
            </p>
          </Section>

          <Section title="2. Dados que coletamos">
            <p>Podemos coletar os seguintes dados pessoais:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-[#F5F0E0]/70">
              <li>Nome completo</li>
              <li>Endereço de e-mail (ao se inscrever na newsletter)</li>
              <li>Número de telefone (ao entrar em contato via WhatsApp)</li>
              <li>Dados de navegação (cookies, endereço IP, tipo de navegador)</li>
            </ul>
          </Section>

          <Section title="3. Como utilizamos seus dados">
            <p>Seus dados são utilizados para:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-[#F5F0E0]/70">
              <li>Enviar novidades, promoções e comunicações da newsletter</li>
              <li>Responder a solicitações de contato e agendamentos</li>
              <li>Melhorar a experiência de navegação no site</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </Section>

          <Section title="4. Compartilhamento de dados">
            <p>
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros
              para fins comerciais. Seus dados podem ser compartilhados apenas com
              prestadores de serviço essenciais (como plataformas de e-mail marketing),
              sempre sob contratos que garantem a proteção dos seus dados.
            </p>
          </Section>

          <Section title="5. Armazenamento e segurança">
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados
              contra acesso não autorizado, perda, alteração ou destruição. Os dados são
              armazenados em servidores seguros e mantidos apenas pelo tempo necessário para
              cumprir as finalidades descritas nesta política.
            </p>
          </Section>

          <Section title="6. Seus direitos (LGPD)">
            <p>Conforme a LGPD, você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-[#F5F0E0]/70">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Solicitar a portabilidade dos dados</li>
            </ul>
            <p className="mt-3">
              Para exercer seus direitos, entre em contato pelo e-mail{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-[#C5A55A] hover:underline">
                {CONTACT.email}
              </a>.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos
              para entender como os visitantes interagem com o site. Você pode configurar seu
              navegador para recusar cookies, embora isso possa afetar a funcionalidade do site.
            </p>
          </Section>

          <Section title="8. Newsletter">
            <p>
              Ao se inscrever na nossa newsletter, você consente com o recebimento de comunicações
              por e-mail. Você pode cancelar a inscrição a qualquer momento clicando no link
              &ldquo;descadastrar&rdquo; presente em cada e-mail enviado, ou entrando em contato
              pelo e-mail{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-[#C5A55A] hover:underline">
                {CONTACT.email}
              </a>.
            </p>
          </Section>

          <Section title="9. Alterações nesta política">
            <p>
              Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento.
              Alterações significativas serão comunicadas através do nosso site. Recomendamos que
              você revise esta página periodicamente.
            </p>
          </Section>

          <Section title="10. Contato">
            <p>
              Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos
              seus dados pessoais, entre em contato:
            </p>
            <ul className="mt-3 space-y-1 text-[#F5F0E0]/70">
              <li><strong className="text-white">E-mail:</strong> {CONTACT.email}</li>
              <li><strong className="text-white">Telefone:</strong> {CONTACT.phone}</li>
              <li><strong className="text-white">Endereço:</strong> {CONTACT.address}</li>
            </ul>
          </Section>
        </div>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white mb-3">
        {title}
      </h2>
      <div className="text-[#F5F0E0]/70 font-body text-base leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}
