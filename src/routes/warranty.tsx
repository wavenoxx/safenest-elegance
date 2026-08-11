import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/warranty")({
  head: () =>
    buildMetaTags({
      title: "Written Warranty Matrix & Handover Terms",
      description:
        "Documented warranty terms for SafeNest invisible grills (5 years) and HDPE safety netting (3-5 years) issued upon laser alignment completion.",
      canonicalPath: "/warranty",
    }),
  component: WarrantyPage,
});

function WarrantyPage() {
  return (
    <div className="bg-white text-neutral-900 min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-neutral-200">
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-3">
            Client Assurance & Integrity
          </p>
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-[0.1em] font-light text-neutral-950">
            Warranty Policy & Terms
          </h1>
          <p className="mt-3 text-xs text-neutral-500 font-light">
            Warranty coverage varies by installed system; see written warranty terms issued upon
            project completion.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950 mb-6">
            System Coverage Matrix
          </h2>

          <div className="border border-neutral-200 overflow-x-auto">
            <table className="w-full text-left text-xs font-light">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-900 uppercase tracking-widest text-[10px] font-normal">
                <tr>
                  <th className="py-4 px-6">Installed System</th>
                  <th className="py-4 px-6">Primary Material</th>
                  <th className="py-4 px-6">Coverage Period</th>
                  <th className="py-4 px-6">Warranty Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                <tr>
                  <td className="py-4 px-6 font-normal text-neutral-950">
                    Invisible Grills (Balcony / Window / Stair)
                  </td>
                  <td className="py-4 px-6">AISI 316 Marine Grade Stainless Steel</td>
                  <td className="py-4 px-6 font-medium text-neutral-900">
                    5-Year Structural Warranty
                  </td>
                  <td className="py-4 px-6">
                    Cable tensile integrity, track anchorage &amp; corrosion resistance under
                    standard atmospheric exposure.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-normal text-neutral-950">
                    Core Safety Nets (Balcony / Children / Stair)
                  </td>
                  <td className="py-4 px-6">UV-Stabilized High-Density Polyethylene</td>
                  <td className="py-4 px-6 font-medium text-neutral-900">
                    3 to 5-Year Material Warranty
                  </td>
                  <td className="py-4 px-6">
                    UV polymer degradation, knot junction stability &amp; anchor fixings.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-normal text-neutral-950">
                    Bird Deterrence &amp; Spikes
                  </td>
                  <td className="py-4 px-6">Polycarbonate base + Stainless steel tips</td>
                  <td className="py-4 px-6 font-medium text-neutral-900">3-Year System Warranty</td>
                  <td className="py-4 px-6">
                    Base track weatherability, spike bonding &amp; installation adhesion.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-normal text-neutral-950">
                    Specialty &amp; Industrial Systems
                  </td>
                  <td className="py-4 px-6">Nylon / Anodized Aluminum / Polymer Weave</td>
                  <td className="py-4 px-6 font-medium text-neutral-900">
                    As specified per project
                  </td>
                  <td className="py-4 px-6">
                    Customized written terms formulated according to commercial load specifications.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 text-sm font-light leading-relaxed text-neutral-700">
          <h2 className="text-base uppercase tracking-widest font-normal text-neutral-950">
            Terms of Guarantee & Maintenance
          </h2>
          <p>
            1. <strong>Written Warranty Certificate:</strong> Every SafeNest project receives a
            written warranty document upon final inspection and handover, detailing specific system
            serial numbers, installed dimensions, and technician signatures.
          </p>
          <p>
            2. <strong>Exclusions:</strong> Warranty protections do not cover intentional physical
            cutting, unauthorized structural alterations, post-installation structural damage to
            building RCC substrates, or natural disasters beyond calibrated architectural design
            thresholds.
          </p>
          <p>
            3. <strong>Maintenance Support:</strong> In the unlikely event of physical tension
            adjustment or inspection needs, clients may contact our priority service desk at{" "}
            <a
              href="mailto:safenestind@gmail.com?subject=Warranty%20Support%20Request"
              className="underline text-neutral-900 font-normal"
            >
              safenestind@gmail.com
            </a>
            .
          </p>
        </section>

        <div className="mt-14 pt-8 border-t border-neutral-200 text-center">
          <Link
            to="/consultation"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-10 py-3.5 text-[11px] uppercase tracking-[0.25em] font-light hover:bg-neutral-800 transition-colors min-h-11 focus-ring"
          >
            Request Site Survey &amp; Warranty Review
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
