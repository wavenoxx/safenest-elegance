import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/lifestyle")({
  head: () =>
    buildMetaTags({
      title: "Architectural Living Spaces & Open Horizons",
      description:
        "Living without hesitation: breathtaking panoramic views, open breezes, and child safety enjoyed in complete peace of mind.",
      canonicalPath: "/lifestyle",
      ogImage: "/images/lifestyle/hero.jpg",
    }),
  component: LifestylePage,
});

const pillars = [
  {
    image: "/images/lifestyle/feature-1.jpg",
    title: "CURIOSITY WITHOUT BOUNDARIES",
    eyebrow: "The Child's Exploration",
    copy: "Curiosity knows no limits, and safety shouldn't feel like confinement. A home should be a canvas of discovery, not a constant source of parental anxiety. We weave a silent, unyielding guardian around your edges, letting your children explore while you breathe freely.",
    reverse: false,
  },
  {
    image: "/images/lifestyle/feature-2.jpg",
    title: "WOVEN INTO THE LIGHT",
    eyebrow: "The Preserved Horizon",
    copy: `Your view is a premium asset — a daily connection to the sky. Traditional iron bars secure your space by building cages, trapping the light and blocking the breeze. ${BRAND_CONFIG.name} protects what you cherish while disappearing completely into the horizon. Security is invisible.`,
    reverse: true,
  },
  {
    image: "/images/lifestyle/feature-3.jpg",
    title: "THE NIGHT WIND",
    eyebrow: "The Sanctuary of Sleep",
    copy: "Welcoming the night breeze, keeping the vectors out. True rest is breathing natural air. Our micro-pore fiberglass meshes fit flush into your frame, letting in the cool night wind while locking out insect vectors. Sleep in pure, unpolluted ventilation.",
    reverse: false,
  },
];

function LifestylePage() {
  return (
    <div className="bg-white text-black">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full aspect-[2.39/1] overflow-hidden bg-neutral-100">
        <img
          src="/images/lifestyle/hero.jpg"
          alt="Luxury balcony view at dawn"
          className="absolute inset-0 w-full h-full object-cover scale-[1.12] origin-center animate-[kenburns_20s_ease-out_infinite_alternate]"
        />
        <style>{`@keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.08); } }`}</style>
      </section>

      {/* Editorial Header */}
      <section className="py-16 px-8 md:py-24 max-w-3xl mx-auto text-center bg-white">
        <p
          className="uppercase text-[10px] tracking-[0.25em] text-neutral-400 mb-4"
          style={{ fontWeight: 300 }}
        >
          The Lifestyle
        </p>
        <h1
          className="font-display uppercase text-2xl md:text-3xl font-light tracking-[0.1em] text-black mb-6"
          style={{ fontWeight: 300 }}
        >
          Living Without Hesitation
        </h1>
        <p className="font-display italic text-lg md:text-xl text-neutral-700 leading-relaxed font-light">
          "Breathtaking views, enjoyed in absolute peace of mind."
        </p>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 md:space-y-32">
          {pillars.map((p) => (
            <div
              key={p.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${p.reverse ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="overflow-hidden aspect-[3/4] bg-neutral-100 group">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-2 md:px-8">
                <p
                  className="uppercase text-[10px] tracking-[0.3em] text-neutral-500"
                  style={{ fontWeight: 300 }}
                >
                  {p.eyebrow}
                </p>
                <h2
                  className="font-display uppercase mt-4 text-[22px] md:text-[26px] tracking-[0.15em]"
                  style={{ fontWeight: 300 }}
                >
                  {p.title}
                </h2>
                <p
                  className="mt-6 text-[15px] leading-[1.9] font-light tracking-wide"
                  style={{ color: "#333" }}
                >
                  {p.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-neutral-200">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p
            className="uppercase text-[10px] tracking-[0.3em] text-neutral-500"
            style={{ fontWeight: 300 }}
          >
            An Invitation
          </p>
          <h2
            className="font-display mt-4 text-[28px] md:text-[34px] tracking-[0.12em] uppercase"
            style={{ fontWeight: 300 }}
          >
            Curate Your Sanctuary
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed" style={{ color: "#555" }}>
            Begin a private survey of your space. Our advisors will compose a protection plan worthy
            of the home you've built.
          </p>
          <Link
            to="/consultation"
            className="inline-flex items-center justify-center mt-10 rounded-full border border-black px-10 py-3 text-[11px] uppercase tracking-[0.25em] bg-transparent text-black hover:bg-black hover:text-white transition-colors duration-300"
            style={{ fontWeight: 300 }}
          >
            Begin Survey
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
