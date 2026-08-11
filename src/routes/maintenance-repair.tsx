import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/maintenance-repair")({
  head: () =>
    buildMetaTags({
      title: "Care, Maintenance & Retensioning Protocol",
      description:
        "Architectural care instructions and maintenance guidelines for SafeNest invisible grills, safety nets, and bird deterrent systems.",
      canonicalPath: "/maintenance-repair",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Care, Maintenance & Retensioning Protocol",
        description:
          "Official care guidelines and maintenance schedule for SafeNest architectural safety installations.",
        publisher: {
          "@type": "Organization",
          name: BRAND_CONFIG.name,
          url: "https://safenestindia.com",
        },
      },
    }),
  component: MaintenanceRepairPage,
});

function MaintenanceRepairPage() {
  return (
    <div className="bg-white text-neutral-900">
      <SiteNav />

      {/* Hero Header */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 bg-[#FAF9F6] border-b border-neutral-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="sn-eyebrow text-neutral-500 mb-4">
            System Longevity
          </p>
          <h1 className="sn-h1 text-neutral-900 mb-4">
            Care, Maintenance &amp; Retensioning
          </h1>
          <p className="sn-subtext text-neutral-600 max-w-2xl mx-auto">
            {BRAND_CONFIG.name} architectural safety systems are engineered for enduring durability.
            Following these simple care guidelines preserves crystal optical clarity and optimal
            tensile performance for years.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20">
        {/* 1. Invisible Grills Care */}
        <article className="border-b border-neutral-200 pb-16">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            Section 01 / Invisible Grills
          </span>
          <h2 className="font-serif text-2xl font-light text-neutral-900 uppercase tracking-wider mt-2 mb-6">
            Invisible Grills Cleaning &amp; Upkeep
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-neutral-700 font-light leading-relaxed">
            <div>
              <h3 className="font-medium text-neutral-900 mb-2 uppercase text-xs tracking-wider">
                Recommended Routine
              </h3>
              <p className="mb-4">
                Wipe down the stainless steel cables and aluminum track channels every 3 to 6 months
                using a soft microfiber cloth dampened with clean freshwater and mild neutral soap.
              </p>
              <p>
                In coastal locations (such as Chennai or Visakhapatnam) with airborne salt moisture,
                a monthly freshwater wipe helps prevent mineral crusting on the outer Nylon-12
                protective jacket.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 mb-2 uppercase text-xs tracking-wider">
                Substances to Avoid
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>Never use abrasive scouring pads, steel wool, or hard wire brushes.</li>
                <li>
                  Never use hydrochloric, muriatic, or sulfuric acid cleaners commonly used for tile
                  deep-cleaning.
                </li>
                <li>Avoid solvent-based chemical paint thinners on the clear polymer sheath.</li>
              </ul>
            </div>
          </div>
        </article>

        {/* 2. Building Renovation Protocol */}
        <article className="border-b border-neutral-200 pb-16">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            Section 02 / Renovation Guidelines
          </span>
          <h2 className="font-serif text-2xl font-light text-neutral-900 uppercase tracking-wider mt-2 mb-6">
            Building Exterior Painting &amp; Civil Work
          </h2>
          <p className="text-xs md:text-sm text-neutral-700 font-light leading-relaxed mb-6">
            When repainting balconies or conducting civil work near {BRAND_CONFIG.name}{" "}
            installations:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600 font-light leading-relaxed">
            <div className="border border-neutral-200 p-6 bg-neutral-50/50">
              <h3 className="font-medium text-neutral-900 mb-2 uppercase text-xs tracking-wider">
                1. Masking Protection
              </h3>
              <p>
                Cover the aluminum track profiles and lower cable junctions with masking tape and
                protective plastic sheets before sanding or applying primer.
              </p>
            </div>
            <div className="border border-neutral-200 p-6 bg-neutral-50/50">
              <h3 className="font-medium text-neutral-900 mb-2 uppercase text-xs tracking-wider">
                2. Paint Overspray
              </h3>
              <p>
                If latex water-based paint splatters on cables, wipe immediately with a damp warm
                towel. Do not scrape dry paint with sharp razor blades.
              </p>
            </div>
            <div className="border border-neutral-200 p-6 bg-neutral-50/50">
              <h3 className="font-medium text-neutral-900 mb-2 uppercase text-xs tracking-wider">
                3. Substrate Integrity
              </h3>
              <p>
                Do not tamper with or remove structural anchor expansion bolts embedded into the
                concrete slab during civil plastering.
              </p>
            </div>
          </div>
        </article>

        {/* 3. Safety Nets Maintenance */}
        <article className="border-b border-neutral-200 pb-16">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            Section 03 / HDPE Netting
          </span>
          <h2 className="font-serif text-2xl font-light text-neutral-900 uppercase tracking-wider mt-2 mb-6">
            Balcony &amp; Pigeon Safety Net Care
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-neutral-700 font-light leading-relaxed">
            <div>
              <p className="mb-4">
                SafeNest HDPE safety nets are highly weather-resistant. To maintain clean balcony
                hygiene, rinse the netting using a gentle water spray from a garden hose every 6
                months to remove accumulated urban dust and bird feathers.
              </p>
              <p>
                Inspect corner anchor hooks once a year to ensure tension cords remain firmly
                engaged in their eyelets.
              </p>
            </div>
            <div className="bg-amber-50/40 border border-amber-200/60 p-6 text-xs text-amber-900 font-light leading-relaxed">
              <h3 className="font-medium uppercase text-[11px] tracking-wider mb-2 text-amber-950">
                Safety Caution
              </h3>
              <p>
                Keep open flames, barbecue smokers, and festive fireworks away from polymer netting
                cords. High thermal exposure can fuse synthetic fibers.
              </p>
            </div>
          </div>
        </article>

        {/* 4. Retensioning & Inspection Services */}
        <article>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            Section 04 / Professional Services
          </span>
          <h2 className="font-serif text-2xl font-light text-neutral-900 uppercase tracking-wider mt-2 mb-6">
            Professional Inspection &amp; Retensioning
          </h2>
          <p className="text-xs md:text-sm text-neutral-700 font-light leading-relaxed mb-8">
            While {BRAND_CONFIG.name} invisible grills utilize mechanical dual-key tension locks
            designed for long-term tautness, structural building settling or exterior impact may
            warrant inspection. Our regional service technicians provide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-neutral-700 font-light">
            <div className="border-t border-neutral-300 pt-4">
              <span className="font-medium text-neutral-900 block mb-1">Tension Recalibration</span>
              <p className="text-neutral-500">
                Precision retensioning of individual cable lines to restore uniform spacing.
              </p>
            </div>
            <div className="border-t border-neutral-300 pt-4">
              <span className="font-medium text-neutral-900 block mb-1">
                Single-Line Replacement
              </span>
              <p className="text-neutral-500">
                Rapid replacement of isolated cables severed during emergency egress or civil work.
              </p>
            </div>
            <div className="border-t border-neutral-300 pt-4">
              <span className="font-medium text-neutral-900 block mb-1">Anchor Inspection</span>
              <p className="text-neutral-500">
                Structural substrate testing and replacement of aged fasteners or track covers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] font-light hover:bg-neutral-900 hover:text-white transition-colors min-h-11 focus-ring"
            >
              Request Maintenance Visit →
            </Link>
          </div>
        </article>
      </main>

      <ProofSection />
      <Footer />
    </div>
  );
}
