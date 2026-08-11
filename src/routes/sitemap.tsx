import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { servicesData } from "@/data/servicesData";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: `Sitemap — ${BRAND_CONFIG.name}` },
      {
        name: "description",
        content: `Complete directory of all SafeNest architectural safety services, category explorers, stories, and customer care resources.`,
      },
    ],
    links: [{ rel: "canonical", href: "https://safenestindia.com/sitemap" }],
  }),
  component: SitemapPage,
});

function SitemapPage() {
  const serviceList = Object.values(servicesData);

  return (
    <div className="bg-white text-neutral-900 min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-neutral-200">
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-3">
            Index &amp; Navigation
          </p>
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-[0.1em] font-light text-neutral-950">
            Site Directory
          </h1>
          <p className="mt-3 text-xs text-neutral-500 font-light">
            Comprehensive index of all public pages and architectural safety solutions.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-light">
          {/* Column 1: Services */}
          <div>
            <h2 className="text-xs uppercase tracking-widest font-normal text-neutral-950 mb-6 pb-2 border-b border-neutral-200">
              Safety Services ({serviceList.length})
            </h2>
            <ul className="space-y-3">
              {serviceList.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/service/$serviceId"
                    params={{ serviceId: s.id }}
                    className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Categories & Explorers */}
          <div>
            <h2 className="text-xs uppercase tracking-widest font-normal text-neutral-950 mb-6 pb-2 border-b border-neutral-200">
              Categories &amp; Solutions
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/solutions"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Solutions Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "invisible-grills" }}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Invisible Grills
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "core-safety-nets" }}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Core Safety Nets
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "construction-industrial" }}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Construction &amp; Industrial
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "animal-bird-protection" }}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Animal &amp; Bird Protection
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "specialty-solutions" }}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Specialty Solutions
                </Link>
              </li>
            </ul>

            <h2 className="text-xs uppercase tracking-widest font-normal text-neutral-950 mt-10 mb-6 pb-2 border-b border-neutral-200">
              Editorial Campaigns
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/campaigns/silent-promise"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  The Silent Promise
                </Link>
              </li>
              <li>
                <Link
                  to="/campaigns/light-and-sanctuary"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Light &amp; Sanctuary
                </Link>
              </li>
              <li>
                <Link
                  to="/campaigns/weightless-pavilion"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  The Weightless Pavilion
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div>
            <h2 className="text-xs uppercase tracking-widest font-normal text-neutral-950 mb-6 pb-2 border-b border-neutral-200">
              Company &amp; Architecture
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/our-story"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/craftsmanship"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  The Craftsmanship
                </Link>
              </li>
              <li>
                <Link
                  to="/lifestyle"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  The Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/consultation"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Consultation &amp; Survey Booking
                </Link>
              </li>
            </ul>

            <h2 className="text-xs uppercase tracking-widest font-normal text-neutral-950 mt-10 mb-6 pb-2 border-b border-neutral-200">
              Customer Care &amp; Legal
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/warranty"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Warranty Policy &amp; Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Safety &amp; Installation FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/material-standards"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Material Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4"
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
