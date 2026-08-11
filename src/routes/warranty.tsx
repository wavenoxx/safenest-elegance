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
    <div className="bg-[#050505] text-white min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-white/10">
          <p className="sn-eyebrow text-neutral-400 mb-3">
            Client Assurance &amp; Integrity
          </p>
          <h1 className="sn-h1 text-white">
            Warranty Policy &amp; Terms
          </h1>
          <p className="sn-subtext text-neutral-400 mt-3">
            Warranty coverage varies by installed system; see written warranty terms issued upon
            project completion.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-base uppercase tracking-widest font-normal text-white mb-6">
            System Coverage Matrix
          </h2>

          <div className="border border-white/10 overflow-x-auto bg-white/[0.02]">
            <table className="w-full text-left text-xs font-light">
              <thead className="bg-white/[0.04] border-b border-white/10 text-white uppercase tracking-widest text-[10px] font-normal">
                <tr>
                  <th className="py-4 px-6">Installed System</th>
                  <th className="py-4 px-6">Primary Material</th>
                  <th className="py-4 px-6">Coverage Period</th>
                  <th className="py-4 px-6">Warranty Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-neutral-300">
                <tr>
                  <td className="py-4 px-6 font-normal text-white">
                    Invisible Grills (Balcony / Window / Stair)
                  </td>
                  <td className="py-4 px-6">AISI 316 Marine Grade Stainless Steel</td>
                  <td className="py-4 px-6 font-medium text-white">
                    5-Year Structural Warranty
                  </td>
                  <td className="py-4 px-6 text-neutral-400">
                    Cable tensile integrity, track anchorage &amp; corrosion resistance under
                    standard atmospheric exposure.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-normal text-white">
                    Core Safety Nets (Balcony / Children / Stair)
                  </td>
                  <td className="py-4 px-6">UV-Stabilized High-Density Polyethylene</td>
                  <td className="py-4 px-6 font-medium text-white">
                    3 to 5-Year Material Warranty
                  </td>
                  <td className="py-4 px-6 text-neutral-400">
                    UV polymer degradation, knot junction stability &amp; anchor fixings.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-normal text-white">
                    Bird Deterrence &amp; Spikes
                  </td>
                  <td className="py-4 px-6">Polycarbonate base + Stainless steel tips</td>
                  <td className="py-4 px-6 font-medium text-white">3-Year System Warranty</td>
                  <td className="py-4 px-6 text-neutral-400">
                    Base track weatherability, spike bonding &amp; installation adhesion.
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-normal text-white">
                    Specialty &amp; Industrial Systems
                  </td>
                  <td className="py-4 px-6">Nylon / Anodized Aluminum / Polymer Weave</td>
                  <td className="py-4 px-6 font-medium text-white">
                    As specified per project
                  </td>
                  <td className="py-4 px-6 text-neutral-400">
                    Customized written terms formulated according to commercial load specifications.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 text-xs md:text-sm font-light leading-relaxed text-neutral-300 border-t border-white/10 pt-10">
          <h2 className="text-base uppercase tracking-widest font-normal text-white">
            Terms of Guarantee &amp; Maintenance
          </h2>
          <p>
            1. <strong className="text-white font-medium">Written Warranty Certificate:</strong> Every {BRAND_CONFIG.name} project receives a
            written warranty document upon final inspection and handover, detailing specific system
            serial numbers, installed dimensions, and technician signatures.
          </p>
          <p>
            2. <strong className="text-white font-medium">Exclusions:</strong> Warranty protections do not cover intentional physical
            cutting, unauthorized structural alterations, post-installation structural damage to
            building RCC substrates, or natural disasters beyond calibrated architectural design
            thresholds.
          </p>
          <p>
            3. <strong className="text-white font-medium">Maintenance Support:</strong> In the unlikely event of physical tension
            adjustment or inspection needs, clients may contact our priority service desk at{" "}
            <a
              href={`mailto:${BRAND_CONFIG.contact.email}?subject=Warranty%20Support%20Request`}
              className="underline text-white font-normal"
            >
              {BRAND_CONFIG.contact.email}
            </a>
            .
          </p>
        </section>

        <div className="mt-14 pt-8 border-t border-white/10 text-center">
          <Link
            to="/consultation"
            className="sn-btn-luxury-solid"
          >
            Request Site Survey &amp; Warranty Review
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
