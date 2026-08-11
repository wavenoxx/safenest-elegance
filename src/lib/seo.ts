import { BRAND_CONFIG } from "@/config/brand";

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Builds standardized meta tags, canonical links, and JSON-LD structured data
 * for TanStack Router route head definitions.
 */
export function buildMetaTags(config: PageSeoConfig) {
  const canonicalUrl = `https://safenestindia.com${config.canonicalPath ?? ""}`;
  const fullTitle = config.title.includes(BRAND_CONFIG.name)
    ? config.title
    : `${config.title} — ${BRAND_CONFIG.name}`;
  const ogImage = config.ogImage ?? "https://safenestindia.com/images/homepage/banner-1.jpg";
  const robots = config.noIndex ? "noindex, follow" : "index, follow";

  const meta = [
    { title: fullTitle },
    { name: "description", content: config.description },
    { name: "robots", content: robots },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: config.description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:type", content: config.ogType ?? "website" },
    { property: "og:image", content: ogImage },
    { property: "og:site_name", content: BRAND_CONFIG.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: config.description },
    { name: "twitter:image", content: ogImage },
  ];

  const links = [{ rel: "canonical", href: canonicalUrl }];

  const scripts = config.jsonLd
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(config.jsonLd),
        },
      ]
    : [];

  return { meta, links, scripts };
}
