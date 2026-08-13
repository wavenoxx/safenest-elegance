import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { categoriesData, servicesData, ServiceDetail } from "@/data/servicesData";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/category/$categoryId")({
  head: ({ params }) => {
    const cat = categoriesData[params.categoryId];
    if (!cat) {
      return buildMetaTags({
        title: "Category Not Found",
        description: "The requested architectural safety category could not be located.",
      });
    }
    return buildMetaTags({
      title: `${cat.title} — Architectural Safety Systems`,
      description: `${cat.plainDescriptor}. Certified AISI 316 marine-grade and UV-stabilized architectural installations with transparent specifications.`,
      canonicalPath: `/category/${cat.id}`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://safenestindia.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Solutions",
            item: "https://safenestindia.com/solutions",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: cat.title,
            item: `https://safenestindia.com/category/${cat.id}`,
          },
        ],
      },
    });
  },
  loader: ({ params }) => {
    const cat = categoriesData[params.categoryId];
    return { cat };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
      <div className="text-center">
        <p className="text-sm tracking-widest font-light uppercase mb-4 text-neutral-400">Category not found</p>
        <Link
          to="/solutions"
          className="sn-btn-luxury-solid"
        >
          View Solutions Explorer
        </Link>
      </div>
    </div>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData() as { cat: (typeof categoriesData)[string] };
  const services = (cat?.services || [])
    .map((id: string) => servicesData[id])
    .filter(Boolean) as ServiceDetail[];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <SiteNav />

      {/* Hero Header with High-Resolution Visual */}
      <section className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden bg-neutral-950">
        <img
          src={cat.heroImage}
          alt={cat.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
        <div className="absolute inset-x-0 bottom-10 md:bottom-16 text-center text-white px-6 max-w-4xl mx-auto z-10">
          <p className="sn-eyebrow text-neutral-300 mb-2">
            {BRAND_CONFIG.name} · Architectural Safety
          </p>
          <h1 className="sn-h1 text-white max-w-2xl mx-auto drop-shadow-md mb-3">
            {cat.title}
          </h1>
          <p className="sn-subtext text-neutral-200 max-w-2xl mx-auto drop-shadow-sm">
            {cat.plainDescriptor}
          </p>
        </div>
      </section>

      {/* Editorial Quote */}
      <section className="py-14 md:py-20 px-6 max-w-3xl mx-auto text-center border-b border-white/10">
        <p className="font-serif italic text-xl md:text-2xl font-light text-neutral-300 leading-relaxed">
          “{cat.quote}”
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-10 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Curated Catalog
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 text-white">
              Available {cat.title} Configurations
            </h2>
          </div>
          <p className="text-xs text-neutral-400 font-light">
            Select a configuration for detailed engineering specifications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s: ServiceDetail) => (
            <Link
              key={s.id}
              to="/service/$serviceId"
              params={{ serviceId: s.id }}
              className="group flex flex-col justify-between border border-white/10 bg-white/[0.02] p-6 hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300 focus-ring min-h-[44px]"
            >
              <div>
                <div className="sn-luxury-frame aspect-[4/5] bg-neutral-900 mb-6 border border-white/10 overflow-hidden relative">
                  <img
                    src={s.images[0]}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                  {s.editorialTitle ?? s.category}
                </span>
                <h3
                  className="font-serif text-lg font-light text-white uppercase tracking-wide group-hover:text-neutral-200 transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  {s.title}
                </h3>
                <p className="text-[11.5px] text-neutral-400 font-light mt-2 line-clamp-2 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-light text-neutral-300">
                <span>View Specifications</span>
                <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comprehensive Authority & Engineering Breakdown */}
      <section className="w-full bg-[#050505] border-t border-b border-white/10 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-20">
          {/* Overview */}
          <article className="border-b border-white/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 01 / Architectural Definition
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-white">
              System Overview &amp; Function
            </h2>
            <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
              {cat.overview}
            </p>
          </article>

          {/* Key Applications */}
          <article className="border-b border-white/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 02 / Applications
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-white">
              Where {cat.title} are Specified
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.applications.map((app, i) => (
                <div
                  key={i}
                  className="p-5 border border-white/10 bg-white/[0.02] flex items-start gap-4 text-xs md:text-sm text-neutral-300 font-light"
                >
                  <span className="font-mono text-neutral-400 text-xs mt-0.5">0{i + 1}</span>
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Verified Materials */}
          <article className="border-b border-white/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 03 / Metallurgy &amp; Chemistry
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-white">
              Verified Material Standards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cat.materials.map((mat) => (
                <div key={mat.name} className="p-6 border border-white/10 bg-white/[0.02]">
                  <h3 className="font-serif text-base font-medium text-white uppercase tracking-wider mb-2">
                    {mat.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {mat.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Measurement & Installation Methodology */}
          <article className="border-b border-white/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 04 / Engineering Methodology
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-white">
              Measurement &amp; Installation Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-neutral-300 font-light leading-relaxed">
              <div className="bg-white/[0.02] p-6 border border-white/10">
                <h3 className="font-medium text-white uppercase tracking-wider text-xs mb-3">
                  Laser Site Measurement
                </h3>
                <p>{cat.measurementProcess}</p>
              </div>
              <div className="bg-white/[0.02] p-6 border border-white/10">
                <h3 className="font-medium text-white uppercase tracking-wider text-xs mb-3">
                  Mechanical Anchoring &amp; Tensioning
                </h3>
                <p>{cat.installationMethod}</p>
              </div>
            </div>
          </article>

          {/* Care, Maintenance & Boundaries */}
          <article className="border-b border-white/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 05 / Maintenance &amp; Scope
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-white">
              Care Guidelines &amp; Structural Limits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-neutral-300 font-light leading-relaxed">
              <div>
                <h3 className="font-medium text-white uppercase tracking-wider text-xs mb-2">
                  Care &amp; Cleaning
                </h3>
                <p className="text-neutral-400 mb-4">{cat.maintenanceGuide}</p>
                <Link
                  to="/maintenance-repair"
                  className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-300 hover:text-white hover:underline underline-offset-4 focus-ring"
                >
                  Full Maintenance Guide →
                </Link>
              </div>
              <div>
                <h3 className="font-medium text-white uppercase tracking-wider text-xs mb-2">
                  Structural Limitations &amp; Egress
                </h3>
                <p className="text-neutral-400 mb-4">{cat.limitations}</p>
                <Link
                  to="/warranty"
                  className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-300 hover:text-white hover:underline underline-offset-4 focus-ring"
                >
                  Warranty Terms &amp; Exclusions →
                </Link>
              </div>
            </div>
          </article>

          {/* Category FAQs */}
          {cat.faqs?.length > 0 && (
            <article>
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                Authority 06 / Knowledge Base
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-8 text-white">
                {cat.title} FAQs
              </h2>

              <div className="space-y-4">
                {cat.faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={faq.question} className="border border-white/10 bg-white/[0.02]">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-base md:text-lg font-light text-white hover:bg-white/[0.04] transition-colors focus-ring min-h-11"
                      >
                        <span>{faq.question}</span>
                        <span className="text-xl font-light text-neutral-400 shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-neutral-300 font-light leading-relaxed border-t border-white/10">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>
          )}
        </div>
      </section>

      <ProofSection categorySlug={cat.id} />
      <Footer />
    </div>
  );
}

export default CategoryPage;
