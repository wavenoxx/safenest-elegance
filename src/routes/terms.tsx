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
    <div className="bg-white text-neutral-900 min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-neutral-200">
          <p className="sn-eyebrow text-neutral-400 mb-3">
            Legal &amp; Operational Standards
          </p>
          <h1 className="sn-h1 text-neutral-950">
            Terms and Conditions
          </h1>
          <p className="sn-subtext text-neutral-500 mt-3">
            Effective Date: March 2026 · Standard Terms for Residential &amp; Commercial Architectural
            Safety Installations
          </p>
        </header>

        <article className="prose prose-neutral max-w-none space-y-8 text-sm font-light leading-relaxed text-neutral-700">
          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-3">
              1. Architectural Services & Site Survey
            </h2>
            <p>
              {BRAND_CONFIG.name} provides custom-engineered safety installations including AISI 316
              invisible grills, structural safety netting, bird deterrence systems, and specialty
              residential barriers. All consultations, quotations, and measurements are subject to
              physical site inspection by an authorized SafeNest technical advisor.
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-3">
              2. Structural Feasibility & Sub-base Verification
            </h2>
            <p>
              Installation requires structurally sound substrate anchoring (such as RCC concrete,
              solid brickwork, or reinforced architectural framing). SafeNest reserves the right to
              recommend substrate reinforcement or modify anchoring configurations where site
              conditions require structural enhancement for client safety.
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-3">
              3. Quotations, Pricing & Milestone Payments
            </h2>
            <p>
              Project quotations are formulated on verified square-footage dimensions, selected
              tensile gauge options, and mounting specifications. Formal price agreements are issued
              in writing following physical site survey measurements.
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-3">
              4. Warranty & Maintenance Policy
            </h2>
            <p>
              Warranty protections apply exclusively to systems installed by authorized SafeNest
              technicians according to manufacturer specifications. Complete warranty terms and
              coverage durations are detailed on our{" "}
              <Link to="/warranty" className="underline text-neutral-900 font-normal">
                Warranty Policy Page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-3">
              5. Client Advisory & Contact
            </h2>
            <p>
              For legal inquiries, terms clarification, or maintenance support, contact our Client
              Service team at{" "}
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="underline text-neutral-900 font-normal"
              >
                {BRAND_CONFIG.contact.email}
              </a>{" "}
              or call {BRAND_CONFIG.contact.phoneDisplay}.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
