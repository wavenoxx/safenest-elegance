import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/craftsmanship")({
  head: () =>
    buildMetaTags({
      title: "Materials, Metallurgy & Tensile Engineering",
      description:
        "Precision engineering and architectural strength. Verified AISI 316 marine-grade stainless steel cables, UV-stabilized Nylon-12 coating, and 6063-T6 aluminum tracks.",
      canonicalPath: "/craftsmanship",
      ogImage: "/images/craftsmanship/hero.jpg",
    }),
  component: CraftsmanshipPage,
});

const ledger = [
  {
    eyebrow: "01 — AISI 316 Marine Grade Stainless Steel Core",
    title: "The Core",
    copy: "The spine of our system. We utilize AISI 316-grade marine stainless steel, alloyed with molybdenum for superior rust resistance. This alloy resists corrosion in highly humid and coastal environments across South India, ensuring long-term structural integrity.",
  },
  {
    eyebrow: "02 — Nylon-12 Protective Shield",
    title: "The Shield",
    copy: "Each steel core is encapsulated in a translucent Nylon-12 coating. Unlike standard PVC coatings that degrade under intense tropical sunlight, Nylon-12 is highly UV-stabilized, smooth to the touch, and engineered to prevent weathering and abrasion.",
  },
  {
    eyebrow: "03 — Calibrated Tension Locking System",
    title: "The Anchor",
    copy: "Cables must remain true and aligned to preserve visual transparency. Our tracks utilize internal tension lockers housed in an extruded structural aluminum profile, engineered to maintain sustained cable tension and structural alignment over time.",
  },
  {
    eyebrow: "04 — UV-Stabilized HDPE Weave",
    title: "The Mesh",
    copy: "For our safety netting systems, we utilize virgin high-density polyethylene threads braided with UV stabilizers. Woven in a double-knotted lock pattern, they absorb impact forces without strand displacement, creating a calm, protective perimeter barrier.",
  },
];

const specs = [
  { label: "Tensile Strength", value: "High Tensile", note: "AISI 316 steel core" },
  { label: "Wind Resistance", value: "High-Rise Rated", note: "engineered for elevated exposure" },
  { label: "UV Stability Index", value: "UV-Stabilized", note: "nylon-12 & HDPE polymer" },
  { label: "Warranty Coverage", value: "System Warranty", note: "see written terms" },
];

function CraftsmanshipPage() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <SiteNav />

      {/* Hero Visual (Pure Black Canvas) */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden sn-black-visual">
        <div className="absolute inset-0 w-full h-full bg-radial from-neutral-900/20 to-[#050505]" />
      </section>

      {/* Editorial Header */}
      <section className="py-16 px-8 md:py-24 max-w-3xl mx-auto text-center">
        <p className="sn-eyebrow text-neutral-400 mb-4">
          The Craftsmanship
        </p>
        <h1 className="sn-h1 text-white mb-6">
          Precision Engineering, Architectural Strength
        </h1>
        <p className="font-serif italic text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
          "High-tensile marine grade elements, engineered to disappear."
        </p>
      </section>

      {/* Technical Ledger */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-28">
        <div className="text-center mb-12">
          <p className="sn-eyebrow text-neutral-400">
            The Technical Ledger
          </p>
          <h2 className="sn-h1 text-white mt-3 mb-2">
            Materials of Consequence
          </h2>
        </div>

        {ledger.map((b) => (
          <div
            key={b.title}
            className="border-t border-white/10 py-12 px-2 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <p className="sn-eyebrow text-neutral-400">
                {b.eyebrow}
              </p>
              <h3 className="font-serif text-lg md:text-xl font-light text-white uppercase tracking-wider mt-3">
                {b.title}
              </h3>
            </div>
            <p className="text-sm md:text-[15px] leading-relaxed text-neutral-300 font-light tracking-wide">
              {b.copy}
            </p>
          </div>
        ))}
      </section>

      {/* Specs Grid */}
      <section className="bg-neutral-950 mt-20 md:mt-28 py-20 md:py-28 border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="sn-eyebrow text-neutral-400">
              Tolerances
            </p>
            <h2 className="sn-h1 text-white mt-3">
              Specifications
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
            {specs.map((s) => (
              <div
                key={s.label}
                className="border-r border-b border-white/10 p-8 text-center bg-[#050505]"
              >
                <p className="sn-eyebrow text-neutral-400">
                  {s.label}
                </p>
                <p className="font-serif text-2xl md:text-3xl text-white font-light mt-4 tracking-wide">
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] font-light text-neutral-400 tracking-wide">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="sn-eyebrow text-neutral-400">
            By Appointment
          </p>
          <h2 className="sn-h1 text-white mt-4 mb-4">
            Inspect Your Space
          </h2>
          <p className="sn-subtext text-neutral-300 max-w-md mx-auto mb-8">
            A safety advisor will visit your residence, conduct precision site measurements, and
            propose an installation tailored to your architecture.
          </p>
          <Link
            to="/consultation"
            className="sn-btn-luxury-solid"
          >
            Request Bespoke Measurement
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
