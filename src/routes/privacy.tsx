import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildMetaTags({
      title: "Privacy Declaration & Data Governance",
      description: `Privacy declaration, cookie policies, and data protection practices of ${BRAND_CONFIG.name}.`,
      canonicalPath: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="bg-white text-neutral-900 min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-neutral-200">
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-3">
            Privacy & Trust
          </p>
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-[0.1em] font-light text-neutral-950">
            Privacy & Cookie Policy
          </h1>
          <p className="mt-3 text-xs text-neutral-500 font-light">
            Last Updated: August 2026 · SafeNest Client Protection Standard
          </p>
        </header>

        <article className="prose prose-neutral max-w-none space-y-8 text-sm font-light leading-relaxed text-neutral-700">
          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-3">
              1. Information Collection & Purpose
            </h2>
            <p>
              {BRAND_CONFIG.name} collects only necessary contact and site details (such as client
              name, telephone number, city, pincode, and requested protection areas) exclusively to
              schedule bespoke site inspections, formulate quotations, and coordinate installation
              craftsmen.
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-3">
              2. Data Protection & Non-Disclosure
            </h2>
            <p>
              We do not sell, rent, or trade client information to third-party marketing brokers or
              advertisers. Your residence data and architectural specifications are treated as
              confidential client records stored securely in our enterprise database infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-3">
              3. Analytics & Attribution Cookies
            </h2>
            <p>
              We utilize first-party and standard analytics cookies (including Google Analytics and
              Google Ads attribution parameters such as GCLID) to measure advertising effectiveness
              and understand user browsing journeys. You may adjust browser cookie preferences at
              any time without losing access to site information.
            </p>
          </section>

          <section>
            <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-3">
              4. Data Subject Rights & Inquiries
            </h2>
            <p>
              Clients may request access, correction, or deletion of their contact records from our
              dispatch database by sending a request to{" "}
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="underline text-neutral-900 font-normal"
              >
                {BRAND_CONFIG.contact.email}
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
