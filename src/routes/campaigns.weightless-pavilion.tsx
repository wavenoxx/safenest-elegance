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
    <div className="bg-white text-black min-h-screen">
      <SiteNav />
      <section className="relative w-full h-[70vh] overflow-hidden bg-neutral-100">
        <img
          src="/images/campaigns/campaign-2-hero.jpg"
          alt="The Weightless Pavilion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 bottom-12 text-center text-white px-6">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">Collection Series</p>
          <h1 className="mt-3 font-serif text-2xl md:text-4xl font-light tracking-[0.18em] uppercase">
            The Weightless Pavilion
          </h1>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="font-serif italic text-lg md:text-xl font-light text-neutral-700 leading-relaxed">
          A meditation on tension, transparency, and the architecture of safety — coming soon to the{" "}
          {BRAND_CONFIG.name} journal.
        </p>
        <Link
          to="/solutions"
          className="inline-block mt-10 text-xs font-light tracking-[0.2em] uppercase underline underline-offset-4 decoration-1 opacity-70 hover:opacity-100 transition-opacity"
        >
          Explore Our Solutions →
        </Link>
      </section>
      <Footer />
    </div>
  );
}
