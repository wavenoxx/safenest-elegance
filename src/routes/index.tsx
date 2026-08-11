import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { CinematicScrollway } from "@/components/CinematicScrollway";
import Hero from "@/components/Hero";
import { BRAND_CONFIG } from "@/config/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}` },
      { name: "description", content: BRAND_CONFIG.description },
      { property: "og:title", content: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}` },
      { property: "og:description", content: BRAND_CONFIG.description },
    ],
  }),
  component: Index,
});



function Index() {
  return (
    <div className="bg-white text-black scroll-smooth">
      <SiteNav />
      <Hero />
      <CinematicScrollway />
      <Footer />
    </div>
  );
}
