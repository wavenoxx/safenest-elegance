import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

export const Route = createFileRoute("/craftsmanship")({
  head: () => ({
    meta: [
      { title: `The Craftsmanship — ${BRAND_CONFIG.name}` },
      { name: "description", content: "Swiss precision, unyielding strength. High-tensile marine grade elements, engineered to disappear." },
      { property: "og:title", content: `The Craftsmanship — ${BRAND_CONFIG.name}` },
      { property: "og:description", content: "High-tensile marine grade elements, engineered to disappear." },
      { property: "og:image", content: "/images/craftsmanship/hero.jpg" },
    ],
  }),
  component: CraftsmanshipPage,
});

const ledger = [
  {
    eyebrow: "01 — 316 Marine Grade Stainless Steel Core",
    title: "The Core",
    copy: "The spine of our system. We utilize Swiss-engineered 316-grade stainless steel, alloyed with molybdenum for superior rust resistance. This alloy resists corrosion in highly humid and coastal environments like Chennai and Kochi, ensuring structural longevity.",
  },
  {
    eyebrow: "02 — Nylon-12 Protective Shield",
    title: "The Shield",
    copy: "Each steel core is encapsulated in a translucent Nylon-12 coating. Unlike cheap PVC coatings that crack under the hot South Indian sun, Nylon-12 is highly UV-resistant. It keeps cables cool to the touch and prevents weathering or fraying for decades.",
  },
  {
    eyebrow: "03 — Dual-Key Tension System",
    title: "The Anchor",
    copy: "Cables must remain perfectly straight to stay invisible. Our tracks utilize dual-key tension lockers inside a heavy-duty extruded aluminum profile. It locks the tension at 450kg, ensuring the cables never sag, slip, or loosen over time.",
  },
  {
    eyebrow: "04 — UV-Stabilized HDPE Weave",
    title: "The Mesh",
    copy: "For our safety nets, we utilize virgin high-density polyethylene threads braided with UV stabilizers. Woven in a double-knotted lock pattern, they absorb high-impact forces without strand displacement, creating a soft protective net canopy.",
  },
];

const specs = [
  { label: "Tensile Strength", value: "450 kg+", note: "per cable load" },
  { label: "Wind Velocity Load", value: "Hurricane", note: "tested to 220 km/h" },
  { label: "UV Stability Index", value: "Grade A", note: "ASTM G154 compliant" },
  { label: "Rust-Resistance Warranty", value: "5 Years", note: "marine certified" },
];

function CraftsmanshipPage() {
  return (
    <div className="bg-white text-black">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full h-[75vh] overflow-hidden bg-neutral-100">
        <img
          src="/images/craftsmanship/hero.jpg"
          alt="Engineered steel cable hardware detail"
          className="absolute inset-0 w-full h-full object-cover animate-[kenburns_20s_ease-out_infinite_alternate]"
        />
        <style>{`@keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.08); } }`}</style>
      </section>

      {/* Editorial Header */}
      <section className="py-16 px-8 md:py-24 max-w-3xl mx-auto text-center bg-white">
        <p className="uppercase text-[10px] tracking-[0.25em] text-neutral-400 mb-4" style={{ fontWeight: 300 }}>
          The Craftsmanship
        </p>
        <h1 className="font-display uppercase text-2xl md:text-3xl font-light tracking-[0.1em] text-black mb-6" style={{ fontWeight: 300 }}>
          Swiss Precision, Unyielding Strength
        </h1>
        <p className="font-display italic text-lg md:text-xl text-neutral-700 leading-relaxed font-light">
          "High-tensile marine grade elements, engineered to disappear."
        </p>
      </section>

      {/* Technical Ledger */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-28">
        <div className="text-center mb-12">
          <p
            className="uppercase text-[10px] tracking-[0.3em] text-neutral-500"
            style={{ fontWeight: 300 }}
          >
            The Technical Ledger
          </p>
          <h2
            className="font-display mt-3 text-[24px] md:text-[28px] tracking-[0.15em] uppercase"
            style={{ fontWeight: 300 }}
          >
            Materials of Consequence
          </h2>
        </div>

        {ledger.map((b) => (
          <div
            key={b.title}
            className="border-t border-neutral-200 py-12 px-2 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <p
                className="uppercase text-[10px] tracking-[0.3em] text-neutral-500"
                style={{ fontWeight: 300 }}
              >
                {b.eyebrow}
              </p>
              <h3
                className="font-display mt-4 uppercase text-[24px] md:text-[28px] tracking-[0.15em]"
                style={{ fontWeight: 300 }}
              >
                {b.title}
              </h3>
            </div>
            <p className="text-[15px] leading-[1.9] font-light tracking-wide" style={{ color: "#333" }}>
              {b.copy}
            </p>
          </div>
        ))}
      </section>

      {/* Specs Grid */}
      <section className="bg-neutral-50 mt-20 md:mt-28 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p
              className="uppercase text-[10px] tracking-[0.3em] text-neutral-500"
              style={{ fontWeight: 300 }}
            >
              Tolerances
            </p>
            <h2
              className="font-display mt-3 text-[24px] md:text-[28px] tracking-[0.15em] uppercase"
              style={{ fontWeight: 300 }}
            >
              Specifications
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-neutral-200">
            {specs.map((s) => (
              <div key={s.label} className="border-r border-b border-neutral-200 p-8 text-center bg-white">
                <p
                  className="uppercase text-[9px] tracking-[0.3em] text-neutral-500"
                  style={{ fontWeight: 300 }}
                >
                  {s.label}
                </p>
                <p className="font-display mt-4 text-[26px] tracking-wide" style={{ fontWeight: 300 }}>
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] font-light tracking-wide" style={{ color: "#888" }}>
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-neutral-200">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p
            className="uppercase text-[10px] tracking-[0.3em] text-neutral-500"
            style={{ fontWeight: 300 }}
          >
            By Appointment
          </p>
          <h2
            className="font-display mt-4 text-[28px] md:text-[34px] tracking-[0.12em] uppercase"
            style={{ fontWeight: 300 }}
          >
            Inspect Your Space
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed" style={{ color: "#555" }}>
            A senior craftsman will visit your residence, measure with surgical precision, and propose a bespoke installation tuned to your architecture.
          </p>
          <Link
            to="/consultation"
            className="inline-flex items-center justify-center mt-10 rounded-full border border-black px-10 py-3 text-[11px] uppercase tracking-[0.25em] bg-transparent text-black hover:bg-black hover:text-white transition-colors duration-300"
            style={{ fontWeight: 300 }}
          >
            Request Bespoke Measurement
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}