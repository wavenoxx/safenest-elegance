import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { categoriesData, servicesData, type ServiceDetail } from "@/data/servicesData";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/category/$categoryId")({
  head: ({ params }) => {
    const cat = categoriesData[params.categoryId];
    const title = cat ? `${cat.title} — ${BRAND_CONFIG.name}` : `Category — ${BRAND_CONFIG.name}`;
    const description =
      cat?.overview ??
      `${BRAND_CONFIG.name} bespoke architectural safety collection across South India.`;
    const canonicalPath = `/category/${params.categoryId}`;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://safenestindia.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: cat?.title ?? "Category",
          item: `https://safenestindia.com${canonicalPath}`,
        },
      ],
    };

    return buildMetaTags({
      title,
      description,
      canonicalPath,
      ogImage: cat?.heroImage,
      jsonLd: breadcrumbSchema,
    });
  },
  loader: ({ params }) => {
    const cat = categoriesData[params.categoryId];
    if (!cat) throw notFound();
    return { cat };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-white text-neutral-900">
      <div className="text-center">
        <p className="text-sm tracking-widest font-light uppercase mb-4">Category not found</p>
        <Link
          to="/solutions"
          className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-6 py-2.5 text-xs uppercase tracking-widest min-h-11 focus-ring"
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
    <div className="bg-white text-neutral-900">
      <SiteNav />

      {/* Hero Header */}
      <section className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden bg-neutral-950">
        <img
          src={cat.heroImage}
          alt={`${cat.title} - ${cat.plainDescriptor}`}
          width={1920}
          height={800}
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute inset-x-0 bottom-10 md:bottom-16 text-center text-white px-6 max-w-4xl mx-auto">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-light text-neutral-300 mb-2"
            style={{ fontWeight: 300 }}
          >
            {BRAND_CONFIG.name} · Architectural Safety
          </p>
          <h1
            className="font-serif uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.08em] leading-tight drop-shadow-sm"
            style={{ fontWeight: 300 }}
          >
            {cat.title}
          </h1>
          <p className="mt-3 text-xs md:text-sm font-light text-neutral-200 tracking-wide max-w-2xl mx-auto">
            {cat.plainDescriptor}
          </p>
        </div>
      </section>

      {/* Editorial Quote */}
      <section className="py-14 md:py-20 px-6 max-w-3xl mx-auto text-center border-b border-neutral-200">
        <p className="font-serif italic text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
          “{cat.quote}”
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-10 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Curated Catalog
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1">
              Available {cat.title} Configurations
            </h2>
          </div>
          <p className="text-xs text-neutral-500 font-light">
            Select a configuration for detailed engineering specifications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s: ServiceDetail) => (
            <Link
              key={s.id}
              to="/service/$serviceId"
              params={{ serviceId: s.id }}
              className="group flex flex-col justify-between border border-neutral-200 bg-white p-6 hover:border-neutral-900 transition-all duration-300 focus-ring min-h-[44px]"
            >
              <div>
                <div className="overflow-hidden aspect-[4/5] bg-neutral-100 mb-6">
                  <img
                    src={s.images[0]}
                    alt={`${s.title} - ${s.plainDescriptor}`}
                    width={600}
                    height={750}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                  {s.editorialTitle ?? s.category}
                </span>
                <h3
                  className="font-serif text-lg font-light text-neutral-900 uppercase tracking-wide group-hover:text-black transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  {s.title}
                </h3>
                <p className="text-[11.5px] text-neutral-500 font-light mt-2 line-clamp-2 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-light text-neutral-900">
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
      <section className="w-full bg-[#FAF9F6] border-t border-b border-neutral-200 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-20">
          {/* Overview */}
          <article className="border-b border-neutral-200 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 01 / Architectural Definition
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6">
              System Overview &amp; Function
            </h2>
            <p className="text-sm md:text-base text-neutral-700 font-light leading-relaxed">
              {cat.overview}
            </p>
          </article>

          {/* Key Applications */}
          <article className="border-b border-neutral-200 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 02 / Applications
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6">
              Where {cat.title} are Specified
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.applications.map((app, i) => (
                <div
                  key={i}
                  className="p-5 border border-neutral-200 bg-white flex items-start gap-4 text-xs md:text-sm text-neutral-700 font-light"
                >
                  <span className="font-mono text-neutral-400 text-xs mt-0.5">0{i + 1}</span>
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Verified Materials */}
          <article className="border-b border-neutral-200 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 03 / Metallurgy &amp; Chemistry
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6">
              Verified Material Standards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cat.materials.map((mat) => (
                <div key={mat.name} className="p-6 border border-neutral-200 bg-white">
                  <h3 className="font-serif text-base font-medium text-neutral-900 uppercase tracking-wider mb-2">
                    {mat.name}
                  </h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {mat.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Measurement & Installation Methodology */}
          <article className="border-b border-neutral-200 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 04 / Engineering Methodology
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6">
              Measurement &amp; Installation Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-neutral-700 font-light leading-relaxed">
              <div className="bg-white p-6 border border-neutral-200">
                <h3 className="font-medium text-neutral-900 uppercase tracking-wider text-xs mb-3">
                  Laser Site Measurement
                </h3>
                <p>{cat.measurementProcess}</p>
              </div>
              <div className="bg-white p-6 border border-neutral-200">
                <h3 className="font-medium text-neutral-900 uppercase tracking-wider text-xs mb-3">
                  Mechanical Anchoring &amp; Tensioning
                </h3>
                <p>{cat.installationMethod}</p>
              </div>
            </div>
          </article>

          {/* Care, Maintenance & Boundaries */}
          <article className="border-b border-neutral-200 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Authority 05 / Maintenance &amp; Scope
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6">
              Care Guidelines &amp; Structural Limits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-neutral-700 font-light leading-relaxed">
              <div>
                <h3 className="font-medium text-neutral-900 uppercase tracking-wider text-xs mb-2">
                  Care &amp; Cleaning
                </h3>
                <p className="text-neutral-600 mb-4">{cat.maintenanceGuide}</p>
                <Link
                  to="/maintenance-repair"
                  className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-900 hover:underline underline-offset-4 focus-ring"
                >
                  Full Maintenance Guide →
                </Link>
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 uppercase tracking-wider text-xs mb-2">
                  Structural Limitations &amp; Egress
                </h3>
                <p className="text-neutral-600 mb-4">{cat.limitations}</p>
                <Link
                  to="/warranty"
                  className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-900 hover:underline underline-offset-4 focus-ring"
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
              <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-8">
                {cat.title} FAQs
              </h2>

              <div className="space-y-4">
                {cat.faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={faq.question} className="border border-neutral-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-base md:text-lg font-light text-neutral-900 hover:bg-neutral-50 transition-colors focus-ring min-h-11"
                      >
                        <span>{faq.question}</span>
                        <span className="text-xl font-light text-neutral-400 shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-neutral-700 font-light leading-relaxed border-t border-neutral-100">
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
