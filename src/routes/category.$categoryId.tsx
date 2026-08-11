import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { categoriesData, servicesData, type ServiceDetail } from "@/data/servicesData";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

export const Route = createFileRoute("/category/$categoryId")({
  head: ({ params }) => {
    const cat = categoriesData[params.categoryId];
    const title = cat ? `${cat.title} — ${BRAND_CONFIG.name}` : `Category — ${BRAND_CONFIG.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: cat?.quote ?? `${BRAND_CONFIG.name} collection.` },
        { property: "og:title", content: title },
        { property: "og:description", content: cat?.quote ?? "" },
        ...(cat ? [{ property: "og:image", content: cat.heroImage }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const cat = categoriesData[params.categoryId];
    if (!cat) throw notFound();
    return { cat };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-sm tracking-widest font-light uppercase">Category not found</p>
    </div>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const services = cat.services
    .map((id: string) => servicesData[id])
    .filter(Boolean) as ServiceDetail[];

  return (
    <div className="bg-white text-black">
      <SiteNav />

      {/* Ken-burns hero */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-neutral-100">
        <img
          src={cat.heroImage}
          alt={cat.title}
          className="absolute inset-0 w-full h-full object-cover sn-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-8 text-center text-white">
          <p className="text-[10px] tracking-[0.3em] uppercase font-light opacity-80">
            {BRAND_CONFIG.name} Collection
          </p>
          <h1
            className="mt-2 font-display uppercase text-2xl md:text-4xl"
            style={{ fontWeight: 300, letterSpacing: "0.18em" }}
          >
            {cat.title}
          </h1>
        </div>
      </section>

      {/* Quote */}
      <p
        className="font-display italic text-xl md:text-2xl font-light text-black mt-12 mb-8 tracking-wide px-8 text-center max-w-3xl mx-auto"
      >
        “{cat.quote}”
      </p>

      {/* 2x2 grid */}
      <section className="max-w-6xl mx-auto mt-8 mb-24 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-neutral-200">
        {services.map((s: ServiceDetail) => (
          <Link
            key={s.id}
            to="/service/$serviceId"
            params={{ serviceId: s.id }}
            className="group block border-b border-r border-neutral-200 p-6 md:p-10 bg-white hover:bg-[#FAFAFA] transition-colors duration-500"
          >
            <div className="overflow-hidden aspect-[3/4] bg-[#F6F6F6]">
              <img
                src={s.images[0]}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </div>
            <h3
              className="mt-6 uppercase text-[12px] md:text-[13px]"
              style={{ fontWeight: 300, letterSpacing: "0.2em", color: "#000" }}
            >
              {s.title}
            </h3>
            <span
              className="mt-2 inline-block text-[10px] uppercase underline underline-offset-4 decoration-[0.5px]"
              style={{ fontWeight: 300, color: "#666", letterSpacing: "0.15em" }}
            >
              Price Upon Request
            </span>
          </Link>
        ))}
      </section>

      <Footer />

      <style>{`
        @keyframes sn-kenburns { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
        .sn-kenburns { animation: sn-kenburns 18s ease-out forwards; }
      `}</style>
    </div>
  );
}