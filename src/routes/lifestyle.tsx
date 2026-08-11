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
    <div className="bg-[#050505] text-white min-h-screen">
      <SiteNav />

      {/* Hero Visual (Pure Black Canvas) */}
      <section className="relative w-full aspect-[2.39/1] min-h-[300px] overflow-hidden sn-black-visual">
        <div className="absolute inset-0 w-full h-full bg-radial from-neutral-900/20 to-[#050505]" />
      </section>

      {/* Editorial Header */}
      <section className="py-16 px-8 md:py-24 max-w-3xl mx-auto text-center">
        <p className="sn-eyebrow text-neutral-400 mb-4">
          The Lifestyle
        </p>
        <h1 className="sn-h1 text-white mb-6">
          Living Without Hesitation
        </h1>
        <p className="font-serif italic text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
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
              <div className="sn-luxury-frame aspect-[3/4] sn-black-visual border border-white/10">
                <div className="w-full h-full bg-radial from-neutral-900/30 to-[#050505]" />
              </div>
              <div className="px-2 md:px-8">
                <p className="sn-eyebrow text-neutral-400">
                  {p.eyebrow}
                </p>
                <h2 className="font-serif uppercase mt-4 text-xl md:text-2xl tracking-wider text-white font-light">
                  {p.title}
                </h2>
                <p className="mt-6 text-sm md:text-[15px] leading-relaxed font-light text-neutral-300 tracking-wide">
                  {p.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="sn-eyebrow text-neutral-400">
            An Invitation
          </p>
          <h2 className="sn-h1 text-white mt-4 mb-4">
            Curate Your Sanctuary
          </h2>
          <p className="sn-subtext text-neutral-300 max-w-md mx-auto mb-8">
            Begin a private survey of your space. Our advisors will compose a protection plan worthy
            of the home you've built.
          </p>
          <Link
            to="/consultation"
            className="sn-btn-luxury-solid"
          >
            Begin Survey
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
