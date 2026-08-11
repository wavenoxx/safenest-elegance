import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

export const Route = createFileRoute("/material-standards")({
  head: () => ({
    meta: [
      { title: `Material Standards & Specifications — ${BRAND_CONFIG.name}` },
      {
        name: "description",
        content: `Engineering specifications, alloy compositions, and polymer tolerances behind SafeNest invisible safety systems.`,
      },
    ],
    links: [{ rel: "canonical", href: "https://safenestindia.com/material-standards" }],
  }),
  component: MaterialStandardsPage,
});

function MaterialStandardsPage() {
  return (
    <div className="bg-white text-neutral-900 min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-neutral-200">
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-3">
            Engineering Governance
          </p>
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-[0.1em] font-light text-neutral-950">
            Material Standards &amp; Tolerances
          </h1>
          <p className="mt-3 text-xs text-neutral-500 font-light">
            Architectural integrity through verified metallurgical and polymer specifications.
          </p>
        </header>

        <section className="space-y-12 text-sm font-light leading-relaxed text-neutral-700">
          <div className="border-t border-neutral-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950">
              01. AISI 316 Stainless Steel
            </h2>
            <div className="md:col-span-2 space-y-3">
              <p>
                The core structural element of our Invisible Grills consists of austenitic AISI 316
                marine-grade stainless steel cables. Containing 2% to 3% molybdenum, this alloy
                provides superior resistance to chloride pitting and crevice corrosion compared to
                standard 304 stainless steel.
              </p>
              <p className="text-xs text-neutral-500">
                Ideal for high-humidity coastal and urban environments including Hyderabad,
                Bengaluru, Chennai, Visakhapatnam, and Kochi.
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950">
              02. Nylon-12 Translucent Sheathing
            </h2>
            <div className="md:col-span-2 space-y-3">
              <p>
                Each steel cable core is encapsulated in an extruded translucent Nylon-12 membrane.
                Nylon-12 exhibits high chemical resistance, low moisture absorption, and thermal
                stability under direct tropical UV sunlight, preventing cable fraying and user
                abrasion.
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950">
              03. 6063-T6 Structural Aluminum Profiles
            </h2>
            <div className="md:col-span-2 space-y-3">
              <p>
                Anchoring tracks are precision-extruded from architectural 6063-T6 tempered aluminum
                alloy. Anodized or powder-coated in matte stone profiles, they house the tension
                lock mechanisms flush against your masonry without visible raw screw heads.
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950">
              04. Virgin High-Density Polyethylene (HDPE)
            </h2>
            <div className="md:col-span-2 space-y-3">
              <p>
                Our safety netting lines utilize 100% virgin polymer monofilaments blended with UV
                absorbers during manufacturing. Double-knotted mesh junctions prevent strand
                displacement under impact while maintaining high tensile strength across seasonal
                temperature shifts.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-14 pt-8 border-t border-neutral-200 text-center">
          <Link
            to="/craftsmanship"
            className="inline-flex items-center justify-center rounded-full border border-neutral-900 text-neutral-900 px-10 py-3.5 text-[11px] uppercase tracking-[0.25em] font-light hover:bg-neutral-900 hover:text-white transition-colors min-h-11 focus-ring"
          >
            Explore The Craftsmanship
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
