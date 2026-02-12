/**
 * Hook que observa quais seções da página estão visíveis na viewport
 * e retorna o ID da seção mais visível, para destacar o link de navegação
 * correspondente no Header.
 *
 * Utiliza IntersectionObserver para detectar a seção visível com base
 * num threshold configurável e um rootMargin que considera a altura do header.
 *
 * @param sectionIds - Array de IDs das seções a observar (sem o '#')
 * @returns ID da seção atualmente mais visível (com '#'), ou string vazia
 *
 * @example
 * ```tsx
 * const activeSection = useActiveSection(["inicio", "sobre", "servicos"]);
 * // activeSection === "#sobre" quando a seção "sobre" está visível
 * ```
 */
"use client";

import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[]): string {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        // Coleta os elementos do DOM correspondentes aos IDs fornecidos
        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        /**
         * rootMargin negativo no topo (-20% da viewport) para considerar
         * que o header fixo ocupa espaço. Isso faz com que a seção
         * só seja considerada "ativa" quando estiver realmente visível
         * abaixo do header.
         */
        const observer = new IntersectionObserver(
            (entries) => {
                // Encontra a entry mais visível entre as que estão intersectando
                let bestEntry: IntersectionObserverEntry | null = null;

                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                            bestEntry = entry;
                        }
                    }
                }

                if (bestEntry?.target.id) {
                    setActiveSection(`#${bestEntry.target.id}`);
                }
            },
            {
                // Threshold baixo para detectar quando a seção começa a aparecer
                threshold: [0, 0.1, 0.2, 0.3, 0.5],
                // Margem negativa no topo para compensar header fixo (~80px)
                rootMargin: "-80px 0px -40% 0px",
            }
        );

        for (const element of elements) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [sectionIds]);

    return activeSection;
}
