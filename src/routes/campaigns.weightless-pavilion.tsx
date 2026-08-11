import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/campaigns/weightless-pavilion")({
  head: () =>
    buildMetaTags({
      title: "The Weightless Pavilion — Editorial Campaign",
      description: "An ongoing campaign exploring weightless structure and invisible protection.",
      canonicalPath: "/campaigns/weightless-pavilion",
      noIndex: true,
    }),
  component: WeightlessPavilion,
});

function WeightlessPavilion() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <SiteNav />
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden sn-black-visual">
        <div className="absolute inset-0 w-full h-full bg-radial from-neutral-900/25 to-[#050505]" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-12 text-center text-white px-6">
          <p className="sn-eyebrow text-neutral-400 mb-2">Collection Series</p>
          <h1 className="sn-h1 text-white max-w-xl mx-auto">
            The Weightless Pavilion
          </h1>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="font-serif italic text-lg md:text-xl font-light text-neutral-300 leading-relaxed">
          A meditation on tension, transparency, and the architecture of safety — coming soon to the{" "}
          {BRAND_CONFIG.name} journal.
        </p>
        <Link
          to="/solutions"
          className="inline-block mt-10 text-xs font-light tracking-[0.2em] uppercase underline underline-offset-4 decoration-1 text-neutral-300 hover:text-white transition-colors"
        >
          Explore Our Solutions →
        </Link>
      </section>
      <Footer />
    </div>
  );
}
