import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";

interface ProofSectionProps {
  categorySlug?: string;
}

export function ProofSection({ categorySlug }: ProofSectionProps) {
  return (
    <section className="w-full bg-[#FAF9F6] border-t border-neutral-200/80 py-20 md:py-28 text-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p
            className="uppercase text-[10px] tracking-[0.3em] text-neutral-500 mb-3"
            style={{ fontWeight: 300 }}
          >
            Engineering Standards
          </p>
          <h2
            className="font-serif text-2xl md:text-3xl font-light tracking-[0.12em] text-neutral-900 uppercase"
            style={{ fontWeight: 300 }}
          >
            Proof, Not Promises
          </h2>
          <p className="mt-4 text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
            Every {BRAND_CONFIG.name} installation is built upon verified material chemistry,
            precision laser site surveys, and documented mechanical anchoring.
          </p>
        </div>

        {/* 4 Architectural Fact Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 border-t border-neutral-200 pt-12">
          {/* 1. Metallurgy */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
              01 / Metallurgy
            </span>
            <h3 className="font-serif text-lg font-light text-neutral-900 uppercase tracking-wider mb-3">
              AISI 316 Marine Alloy
            </h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              We specify genuine AISI 316 marine-grade austenitic stainless steel wire rope encased
              in UV-stabilized Nylon-12 for high tensile strength and coastal corrosion resistance.
            </p>
            <Link
              to="/material-standards"
              className="mt-4 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-light text-neutral-900 hover:underline underline-offset-4 focus-ring"
            >
              Material Standards →
            </Link>
          </div>

          {/* 2. Precision Anchoring */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
              02 / Anchoring
            </span>
            <h3 className="font-serif text-lg font-light text-neutral-900 uppercase tracking-wider mb-3">
              6063-T6 Aluminum Track
            </h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Extruded architectural aluminum profiles anchored into RCC slabs using heavy-duty
              stainless steel expansion bolts and individual line tension-lockers.
            </p>
            <Link
              to="/craftsmanship"
              className="mt-4 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-light text-neutral-900 hover:underline underline-offset-4 focus-ring"
            >
              The Craftsmanship →
            </Link>
          </div>

          {/* 3. Documented Handover */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
              03 / Accountability
            </span>
            <h3 className="font-serif text-lg font-light text-neutral-900 uppercase tracking-wider mb-3">
              Written Warranty
            </h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Transparent, system-specific material warranties documented upon final inspection and
              handover, supported by our regional maintenance and tension-tuning team.
            </p>
            <Link
              to="/warranty"
              className="mt-4 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-light text-neutral-900 hover:underline underline-offset-4 focus-ring"
            >
              Warranty Matrix →
            </Link>
          </div>

          {/* 4. Verified Service Hubs */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
              04 / Advisory
            </span>
            <h3 className="font-serif text-lg font-light text-neutral-900 uppercase tracking-wider mb-3">
              Regional Operations
            </h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Direct master installers and safety advisors serving residential communities and
              commercial estates across Hyderabad, Bengaluru, Chennai, Kochi, and Visakhapatnam.
            </p>
            <Link
              to="/service-areas"
              className="mt-4 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-light text-neutral-900 hover:underline underline-offset-4 focus-ring"
            >
              Service Areas →
            </Link>
          </div>
        </div>

        {/* Action Banner */}
        <div className="mt-16 pt-12 border-t border-neutral-200/60 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="text-xs md:text-sm font-light text-neutral-800">
              Schedule a precision laser measurement of your balcony or window openings.
            </p>
            <p className="text-[11px] text-neutral-500 font-light mt-1">
              Complimentary on-site evaluation by trained regional safety advisors.
            </p>
          </div>
          <Link
            to="/consultation"
            search={categorySlug ? { service: categorySlug } : undefined}
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] font-light hover:bg-neutral-800 transition-colors min-h-11 focus-ring shrink-0"
          >
            Request Site Survey
          </Link>
        </div>
      </div>
    </section>
  );
}
