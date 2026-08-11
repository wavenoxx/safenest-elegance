import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { servicesData, categoriesData, type ServiceDetail } from "@/data/servicesData";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/service/$serviceId")({
  head: ({ params }) => {
    const s = servicesData[params.serviceId];
    const cat = s ? categoriesData[s.category] : undefined;
    const title = s ? `${s.title} — ${BRAND_CONFIG.name}` : `Service — ${BRAND_CONFIG.name}`;
    const canonicalPath = `/service/${params.serviceId}`;

    const breadcrumbs = [
      { name: "Home", path: "/" },
      { name: cat?.title ?? "Category", path: cat ? `/category/${cat.id}` : "/solutions" },
      { name: s?.title ?? "Service", path: canonicalPath },
    ];

    const serviceSchema = s
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          serviceType: "Architectural Safety Installation",
          provider: {
            "@type": "Organization",
            name: BRAND_CONFIG.name,
            url: "https://safenestindia.com",
          },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "South India",
          },
          description: s.description,
        }
      : undefined;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.name,
        item: `https://safenestindia.com${crumb.path}`,
      })),
    };

    return buildMetaTags({
      title,
      description: s?.description ?? `${BRAND_CONFIG.name} bespoke architectural safety system.`,
      canonicalPath,
      ogImage: s?.images[0],
      jsonLd: serviceSchema ? [breadcrumbSchema, serviceSchema] : breadcrumbSchema,
    });
  },
  loader: ({ params }) => {
    const s = servicesData[params.serviceId];
    if (!s) throw notFound();
    return { service: s };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-white text-neutral-900">
      <div className="text-center">
        <p className="text-sm tracking-widest font-light uppercase mb-4">Service not found</p>
        <Link
          to="/solutions"
          className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-6 py-2.5 text-xs uppercase tracking-widest min-h-11 focus-ring"
        >
          View All Solutions
        </Link>
      </div>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: ServiceDetail };
  const category = categoriesData[service.category];

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { root: scrollerRef.current, threshold: 0.55 },
    );
    imgRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [service.id]);

  const relatedServices = (category?.services || [])
    .filter((id) => id !== service.id)
    .map((id) => servicesData[id])
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col text-neutral-900 bg-white">
      <SiteNav />

      {/* Main Split Layout: Left Imagery / Right Sticky Architecture */}
      <div className="flex-1 flex flex-col md:flex-row relative bg-transparent pt-16 md:pt-20">
        {/* LEFT: Imagery Gallery */}
        <div
          ref={scrollerRef}
          className="w-full md:w-1/2 h-[60vh] md:h-[calc(100vh-80px)] overflow-y-auto snap-y snap-mandatory relative sn-noscrollbar bg-neutral-100"
        >
          {service.images.map((src, i) => (
            <div
              key={i}
              data-idx={i}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="snap-start w-full h-[60vh] md:h-[calc(100vh-80px)] bg-neutral-100"
            >
              <img
                src={src}
                alt={`${service.title} - ${service.plainDescriptor}`}
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}

          {/* Progress dots */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10">
            {service.images.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full border border-black transition-colors duration-300 ${
                  active === i ? "bg-black" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Sticky Architectural Specifications */}
        <div className="w-full md:w-1/2 md:h-[calc(100vh-80px)] md:sticky md:top-[80px] overflow-y-auto flex flex-col justify-between p-8 md:p-14 border-l border-neutral-200 bg-white">
          <div>
            {/* Breadcrumb Eyebrow */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <p
                className="uppercase text-[9px] text-neutral-400 font-mono tracking-widest"
                style={{ fontWeight: 300 }}
              >
                <Link to="/" className="hover:text-black focus-ring">
                  HOME
                </Link>{" "}
                /{" "}
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: service.category }}
                  className="hover:text-black focus-ring"
                >
                  {(category?.title ?? service.category).toUpperCase()}
                </Link>{" "}
                / <span className="text-neutral-700">{service.title.toUpperCase()}</span>
              </p>
            </nav>

            {/* Plain Factual H1 */}
            <h1
              className="font-serif text-3xl md:text-4xl font-light text-neutral-900 uppercase leading-tight"
              style={{ letterSpacing: "0.08em", fontWeight: 300 }}
            >
              {service.title}
            </h1>

            {/* Plain Service Descriptor */}
            <p className="mt-2 text-xs md:text-sm font-light text-neutral-500 tracking-wide">
              {service.plainDescriptor}
            </p>

            {/* Price upon request & survey link */}
            <div className="mt-4 pb-6 border-b border-neutral-200 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] font-light text-neutral-600">
                Custom Architectural Fabrication
              </span>
              <span className="text-[11px] text-neutral-400 font-light">
                Laser Measured · On-Site Survey
              </span>
            </div>

            {/* Detail Paragraphs */}
            <div className="mt-6 space-y-4">
              {service.detailParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[13px] font-light leading-relaxed text-neutral-700"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Process Steps */}
            {service.processSteps && service.processSteps.length > 0 && (
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-3">
                  Installation Sequence
                </span>
                <ol className="space-y-2 text-xs text-neutral-600 font-light list-decimal pl-4">
                  {service.processSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Specs Matrix */}
            <div className="mt-8">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-2">
                Technical Specification Table
              </span>
              {service.specs.map((sp) => (
                <div
                  key={sp.label}
                  className="border-t border-neutral-200 py-3.5 w-full flex justify-between gap-4 text-xs font-light"
                >
                  <span className="uppercase text-neutral-500 tracking-wider text-[11px]">
                    {sp.label}
                  </span>
                  <span className="text-neutral-900 text-right font-medium text-[11.5px]">
                    {sp.value}
                  </span>
                </div>
              ))}
              <div className="border-t border-neutral-200" />
            </div>

            {/* Care & Warranty Deep Links */}
            <div className="mt-6 flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.2em] font-light text-neutral-600">
              <Link
                to="/maintenance-repair"
                className="hover:text-black underline underline-offset-4 focus-ring"
              >
                Care &amp; Cleaning Guide →
              </Link>
              <Link
                to="/warranty"
                className="hover:text-black underline underline-offset-4 focus-ring"
              >
                Written Warranty Matrix →
              </Link>
            </div>
          </div>

          {/* Survey CTA Action */}
          <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row gap-4">
            <Link
              to="/consultation"
              search={{ service: service.title }}
              className="flex-1 inline-flex items-center justify-center rounded-full border border-neutral-900 px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] bg-neutral-900 text-white hover:bg-neutral-800 transition-colors duration-300 min-h-11 focus-ring"
              style={{ fontWeight: 300 }}
            >
              Request Laser Site Survey
            </Link>
            <Link
              to="/safety-faq"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] text-neutral-800 hover:border-neutral-900 transition-colors duration-300 min-h-11 focus-ring"
            >
              Safety FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Related System Configurations */}
      {relatedServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-neutral-200">
          <div className="mb-8">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Related Systems
            </span>
            <h2 className="font-serif text-2xl font-light uppercase tracking-wide mt-1">
              Explore Complementary {category?.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedServices.slice(0, 3).map((rel) => (
              <Link
                key={rel.id}
                to="/service/$serviceId"
                params={{ serviceId: rel.id }}
                className="border border-neutral-200 p-6 bg-white hover:border-neutral-900 transition-colors duration-300 group focus-ring min-h-11 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-neutral-100 overflow-hidden mb-4">
                    <img
                      src={rel.images[0]}
                      alt={rel.title}
                      width={400}
                      height={300}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-base font-light text-neutral-900 uppercase tracking-wide">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light mt-1 line-clamp-2">
                    {rel.description}
                  </p>
                </div>
                <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] font-light text-neutral-900">
                  View Specs →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ProofSection categorySlug={service.category} />
      <Footer />
    </div>
  );
}
