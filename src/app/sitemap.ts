import type { MetadataRoute } from "next";
import { TIPS } from "@/lib/constants";

const BASE_URL = "https://imperiobarbearia.com"; // [PREENCHA] domínio real

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = TIPS.map((tip) => ({
    url: `${BASE_URL}/blog/${tip.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...blogPosts,
  ];
}
