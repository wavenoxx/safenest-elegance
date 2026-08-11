import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildMetaTags({
      title: "Terms and Conditions & Advisory Governance",
      description: `Official terms of service, installation policies, and client advisory terms for ${BRAND_CONFIG.name}.`,
      canonicalPath: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="bg-[#050505] text-white min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-white/10">
          <p className="sn-eyebrow text-neutral-400 mb-3">
            Legal &amp; Operational Standards
          </p>
          <h1 className="sn-h1 text-white">
            Terms and Conditions
          </h1>
          <p className="sn-subtext text-neutral-400 mt-3">
            Effective Date: March 2026 · Standard Terms for Residential &amp; Commercial Architectural
            Safety Installations
          </p>
        </header>

        <article className="space-y-8 text-xs md:text-sm font-light leading-relaxed text-neutral-300">
          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-white mb-3">
              1. Architectural Services &amp; Site Survey
            </h2>
            <p>
              {BRAND_CONFIG.name} provides custom-engineered safety installations including AISI 316
              invisible grills, structural safety netting, bird deterrence systems, and specialty
              residential barriers. All consultations, quotations, and measurements are subject to
              physical site inspection by an authorized SafeNest technical advisor.
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-white mb-3">
              2. Structural Feasibility &amp; Sub-base Verification
            </h2>
            <p>
              Installation requires structurally sound substrate anchoring (such as RCC concrete,
              solid brickwork, or reinforced architectural framing). SafeNest reserves the right to
              recommend substrate reinforcement or modify anchoring configurations where site
              conditions require structural enhancement for client safety.
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-white mb-3">
              3. Quotations, Pricing &amp; Milestone Payments
            </h2>
            <p>
              Project quotations are formulated on verified square-footage dimensions, selected
              tensile gauge options, and mounting specifications. Formal price agreements are issued
              in writing following physical site survey measurements.
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-white mb-3">
              4. Warranty &amp; Maintenance Policy
            </h2>
            <p>
              Warranty protections apply exclusively to systems installed by authorized SafeNest
              technicians according to manufacturer specifications. Complete warranty terms and
              coverage durations are detailed on our{" "}
              <Link to="/warranty" className="underline text-white font-normal">
                Warranty Policy Page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-white mb-3">
              5. Client Advisory &amp; Contact
            </h2>
            <p>
              For legal inquiries, terms clarification, or maintenance support, contact our Client
              Service team at{" "}
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="underline text-white font-normal"
              >
                {BRAND_CONFIG.contact.email}
              </a>{" "}
              or call{" "}
              <a
                href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
                className="underline text-white font-normal"
              >
                {BRAND_CONFIG.contact.phoneDisplay}
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
