import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { servicesData } from "@/data/servicesData";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () =>
    buildMetaTags({
      title: "Site Directory & Architectural Safety Index",
      description: `Complete directory of all ${BRAND_CONFIG.name} architectural safety services, category explorers, regional hubs, and customer care resources.`,
      canonicalPath: "/sitemap",
    }),
  component: SitemapPage,
});

function SitemapPage() {
  const serviceList = Object.values(servicesData);

  return (
    <div className="bg-[#050505] text-white min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-white/10">
          <p className="sn-eyebrow text-neutral-400 mb-3">
            Index &amp; Navigation
          </p>
          <h1 className="sn-h1 text-white">
            Site Directory
          </h1>
          <p className="sn-subtext text-neutral-400 mt-3">
            Comprehensive index of all public pages and architectural safety solutions.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-light">
          {/* Column 1: Services */}
          <div>
            <h2 className="text-xs uppercase tracking-widest font-normal text-white mb-6 pb-2 border-b border-white/10">
              Safety Services ({serviceList.length})
            </h2>
            <ul className="space-y-3">
              {serviceList.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/service/$serviceId"
                    params={{ serviceId: s.id }}
                    className="text-neutral-400 hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Categories & Explorers */}
          <div>
            <h2 className="text-xs uppercase tracking-widest font-normal text-white mb-6 pb-2 border-b border-white/10">
              Categories &amp; Solutions
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/solutions"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Solutions Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "invisible-grills" }}
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Invisible Grills
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "core-safety-nets" }}
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Core Safety Nets
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "construction-industrial" }}
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Construction &amp; Industrial
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "animal-bird-protection" }}
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Animal &amp; Bird Protection
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "specialty-solutions" }}
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Specialty Solutions
                </Link>
              </li>
            </ul>

            <h2 className="text-xs uppercase tracking-widest font-normal text-white mt-10 mb-6 pb-2 border-b border-white/10">
              Regional Operations
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/service-areas"
                  className="text-neutral-300 hover:text-white hover:underline underline-offset-4 font-medium"
                >
                  Verified Service Areas →
                </Link>
              </li>
              <li>
                <Link
                  to="/maintenance-repair"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Care &amp; Maintenance Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div>
            <h2 className="text-xs uppercase tracking-widest font-normal text-white mb-6 pb-2 border-b border-white/10">
              Company &amp; Architecture
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/our-story"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/craftsmanship"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  The Craftsmanship
                </Link>
              </li>
              <li>
                <Link
                  to="/lifestyle"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  The Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/consultation"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Consultation &amp; Survey Booking
                </Link>
              </li>
            </ul>

            <h2 className="text-xs uppercase tracking-widest font-normal text-white mt-10 mb-6 pb-2 border-b border-white/10">
              Customer Care &amp; Legal
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/warranty"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Warranty Policy &amp; Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/safety-faq"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Safety &amp; Architecture FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/material-standards"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Material Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-neutral-400 hover:text-white hover:underline underline-offset-4"
                >
                  Privacy &amp; Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
