import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { servicesData, categoriesData, type ServiceDetail } from "@/data/servicesData";
import { BRAND_CONFIG } from "@/config/brand";

export const Route = createFileRoute("/service/$serviceId")({
  head: ({ params }) => {
    const s = servicesData[params.serviceId];
    const title = s ? `${s.title} — ${BRAND_CONFIG.name}` : `Service — ${BRAND_CONFIG.name}`;
    const canonical = `https://safenestindia.com/service/${params.serviceId}`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: s?.description ?? `${BRAND_CONFIG.name} bespoke safety system.`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: s?.description ?? "" },
        ...(s ? [{ property: "og:image", content: s.images[0] }] : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  loader: ({ params }) => {
    const s = servicesData[params.serviceId];
    if (!s) throw notFound();
    return { service: s };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-sm tracking-widest font-light uppercase">Service not found</p>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: ServiceDetail };

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

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

  const category = categoriesData[service.category];

  const realmBg: Record<string, string> = {
    "invisible-grills": "bg-[#FAF9F6]",
    "core-safety-nets": "bg-[#F5F8FA]",
    "construction-industrial": "bg-[#F3F4F6]",
    "animal-bird-protection": "bg-[#FAF8F5]",
    "specialty-solutions": "bg-[#F0F8FA]",
  };
  const pageBg = realmBg[service.category] ?? "bg-white";

  const handleRealmClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (service.category !== "specialty-solutions") return;
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 1200);
  };

  const renderCategoryRealmAffect = (categoryId: string) => {
    switch (categoryId) {
      case "invisible-grills":
        return (
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="w-[250vw] h-[250vh] -top-1/2 -left-1/2 absolute bg-gradient-to-b from-amber-400/5 via-transparent to-transparent rotate-[45deg] origin-center animate-spinslow mix-blend-overlay" />
            {[15, 38, 62, 85].map((l) => (
              <div
                key={l}
                className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-300/20 to-transparent"
                style={{ left: `${l}%` }}
              />
            ))}
          </div>
        );
      case "core-safety-nets":
        return (
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {[
              { top: "5%", left: "10%" },
              { top: "40%", left: "60%" },
              { top: "70%", left: "20%" },
            ].map((p, i) => (
              <div
                key={i}
                className="w-[50vw] h-[50vw] bg-white/40 filter blur-[50px] absolute animate-slowdrift rounded-full"
                style={{ ...p, animationDelay: `${i * 2}s` }}
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 w-2 h-2 rounded-full bg-white/60"
                style={{
                  left: `${(i * 8.3) % 100}%`,
                  animation: `riseParticle 10s linear infinite`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}
          </div>
        );
      case "construction-industrial":
        return (
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-40" />
          </div>
        );
      case "animal-bird-protection":
        return (
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <svg
              viewBox="0 0 200 200"
              className="opacity-[0.03] absolute -right-20 -top-20 scale-150 animate-swayshadow origin-top-right select-none"
              width="600"
              height="600"
            >
              <path
                d="M100 180 L100 110 M100 110 C 60 100, 40 70, 60 40 C 80 20, 110 30, 100 60 C 130 20, 170 40, 160 80 C 155 110, 120 115, 100 110 Z"
                fill="#000"
              />
            </svg>
          </div>
        );
      case "specialty-solutions":
        return (
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {ripples.map((r) => (
              <span
                key={r.id}
                className="absolute w-32 h-32 rounded-full border border-cyan-400/30 -translate-x-1/2 -translate-y-1/2 transition-all duration-[1200ms] ease-out sn-ripple"
                style={{ left: r.x, top: r.y }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col text-black relative ${pageBg}`}
      onClick={handleRealmClick}
    >
      <SiteNav />

      <div className="flex-1 flex flex-col md:flex-row relative bg-transparent">
        {/* LEFT: Images */}
        <div
          ref={scrollerRef}
          className="w-full md:w-1/2 h-[60vh] md:h-[calc(100vh-80px)] overflow-y-auto snap-y snap-mandatory relative sn-noscrollbar"
        >
          {service.images.map((src, i) => (
            <div
              key={i}
              data-idx={i}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="snap-start w-full h-[60vh] md:h-[calc(100vh-80px)] bg-[#F6F6F6]"
            >
              <img
                src={src}
                alt={`${service.title} view ${i + 1}`}
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

        {/* RIGHT: Sticky details */}
        <div className="w-full md:w-1/2 md:h-[calc(100vh-80px)] md:sticky md:top-[80px] flex flex-col justify-between p-8 md:p-16 border-l border-neutral-100 bg-transparent">
          <div>
            <p
              className="uppercase text-[9px] text-neutral-400"
              style={{ letterSpacing: "0.25em", fontWeight: 300 }}
            >
              SAFENEST /{" "}
              <Link
                to="/category/$categoryId"
                params={{ categoryId: service.category }}
                className="hover:text-black focus-ring"
              >
                {(category?.title ?? service.category).toUpperCase()}
              </Link>{" "}
              / {service.title.toUpperCase()}
            </p>

            <h1
              className="font-display text-3xl font-light text-black mt-2 uppercase"
              style={{ letterSpacing: "0.1em" }}
            >
              {service.title}
            </h1>

            <Link
              to="/consultation"
              className="mt-3 inline-block text-[10px] uppercase underline underline-offset-4 decoration-[0.5px] text-neutral-500 hover:text-black transition-colors focus-ring"
              style={{ letterSpacing: "0.2em", fontWeight: 300 }}
            >
              Price Upon Request · Laser Site Survey →
            </Link>

            <div className="mt-8 space-y-5">
              {service.detailParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[13px] font-light leading-relaxed text-neutral-700"
                  style={{ fontFamily: "'Inter','Montserrat',sans-serif" }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10">
              {service.specs.map((sp) => (
                <div
                  key={sp.label}
                  className="border-t border-neutral-200 py-4 w-full flex justify-between gap-6 text-xs tracking-wide font-light"
                >
                  <span className="uppercase text-neutral-500" style={{ letterSpacing: "0.15em" }}>
                    {sp.label}
                  </span>
                  <span className="text-black text-right">{sp.value}</span>
                </div>
              ))}
              <div className="border-t border-neutral-200" />
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <Link
              to="/consultation"
              className="flex-1 inline-flex items-center justify-center rounded-full border border-black px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] bg-black text-white hover:bg-neutral-800 transition-colors duration-300 min-h-11 focus-ring"
              style={{ fontWeight: 300 }}
            >
              Request Bespoke Measurement
            </Link>
          </div>
        </div>
      </div>

      {renderCategoryRealmAffect(service.category)}

      <Footer />

      <style>{`
        .sn-noscrollbar::-webkit-scrollbar { display: none; }
        .sn-noscrollbar { scrollbar-width: none; }
        @keyframes slowDrift {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes swayShadow {
          0%, 100% { transform: rotate(-3deg) scale(1.1); }
          50% { transform: rotate(3deg) scale(1.05); }
        }
        @keyframes riseParticle {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
        }
        .animate-slowdrift { animation: slowDrift 14s ease-in-out infinite; }
        .animate-spinslow { animation: spinSlow 40s linear infinite; }
        .animate-swayshadow { animation: swayShadow 8s ease-in-out infinite; transform-origin: top right; }
        .sn-ripple { animation: snRipple 1200ms ease-out forwards; }
        @keyframes snRipple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
