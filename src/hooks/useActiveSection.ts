/**
 * Hook que observa quais seções da página estão visíveis na viewport
 * e retorna o ID da seção mais visível, para destacar o link de navegação
 * correspondente no Header.
 *
 * Utiliza IntersectionObserver para detectar a seção visível com base
 * num threshold configurável e um rootMargin que considera a altura do header.
 *
 * Melhorias implementadas:
 * - Inicializa com "#inicio" para evitar flash de "nenhum link ativo" no primeiro render
 * - Verificação inicial no mount para detectar seção já visível sem aguardar scroll
 * - rootMargin adaptado para funcionar corretamente em viewports mobile
 * - Referência estável de sectionIds para evitar re-criação desnecessária do observer
 *
 * @param sectionIds - Array de IDs das seções a observar (sem o '#')
 * @returns ID da seção atualmente mais visível (com '#'), default "#inicio"
 *
 * @example
 * ```tsx
 * const activeSection = useActiveSection(["inicio", "sobre", "servicos"]);
 * // activeSection === "#sobre" quando a seção "sobre" está visível
 * ```
 */
"use client";

import { useState, useEffect, useRef } from "react";

/** ID padrão quando nenhuma seção é detectada como visível (topo da página) */
const DEFAULT_SECTION = "#inicio";

export function useActiveSection(sectionIds: string[]): string {
    const [activeSection, setActiveSection] = useState<string>(DEFAULT_SECTION);

    /**
     * Ref estável para evitar re-criação do observer quando a referência
     * do array muda por re-render do componente pai. Compara por valor.
     */
    const sectionIdsRef = useRef<string[]>(sectionIds);

    useEffect(() => {
        sectionIdsRef.current = sectionIds;
    }, [sectionIds]);

    useEffect(() => {
        // Coleta os elementos do DOM correspondentes aos IDs fornecidos
        const elements = sectionIdsRef.current
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        /**
         * Mapa de visibilidade para rastrear a intersectionRatio de cada
         * seção observada. Permite encontrar a "mais visível" a qualquer momento.
         */
        const visibilityMap = new Map<string, number>();

        /**
         * Determina a seção mais visível a partir do mapa de visibilidades.
         * Itera todas as seções observadas e seleciona a com maior ratio.
         */
        const updateBestSection = () => {
            let bestId = "";
            let bestRatio = 0;

            for (const [id, ratio] of visibilityMap) {
                if (ratio > bestRatio) {
                    bestRatio = ratio;
                    bestId = id;
                }
            }

            if (bestId) {
                setActiveSection(`#${bestId}`);
            }
        };

        /**
         * rootMargin negativo no topo (-20% da viewport) para considerar
         * que o header fixo ocupa espaço. Bottom negativo de -40% garante
         * que a seção precisa estar significativamente visível para ativar.
         *
         * Funciona corretamente tanto em mobile quanto desktop porque usa
         * porcentagens relativas ao viewport, não valores absolutos.
         */
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = entry.target.id;

                    if (entry.isIntersecting) {
                        visibilityMap.set(id, entry.intersectionRatio);
                    } else {
                        visibilityMap.delete(id);
                    }
                }

                updateBestSection();
            },
            {
                // Threshold granular para detecção mais suave de transições
                threshold: [0, 0.1, 0.2, 0.3, 0.5],
                // Margem que compensa header fixo (topo) e prioriza seção central (bottom)
                rootMargin: "-80px 0px -40% 0px",
            }
        );

        for (const element of elements) {
            observer.observe(element);
        }

        /**
         * Verificação inicial após um micro-delay para garantir que o
         * IntersectionObserver já processou os callbacks iniciais.
         * Resolves o caso de page load onde a seção "inicio" já está visível
         * mas o observer ainda não disparou.
         */
        const initialCheckTimer = setTimeout(() => {
            if (visibilityMap.size === 0) {
                // Nenhuma seção detectada — manter default (topo da página)
                setActiveSection(DEFAULT_SECTION);
            }
        }, 100);

        return () => {
            observer.disconnect();
            clearTimeout(initialCheckTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return activeSection;
}
