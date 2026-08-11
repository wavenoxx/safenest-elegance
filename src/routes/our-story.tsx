import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/our-story")({
  head: () =>
    buildMetaTags({
      title: "Genesis of Serenity — Atelier Heritage & Brand Ethos",
      description: `The story of ${BRAND_CONFIG.name} — 11 times of the day from dawn to midnight, invisible safety engineered to honor modern architectural living with quiet grace.`,
      canonicalPath: "/our-story",
      ogImage: "/images/our-story/chapter-1.jpg",
    }),
  component: StoryPage,
});

type Chapter = { time: string; name: string; copy: string; image: string };

const CHAPTERS: Chapter[] = [
  {
    time: "05:00",
    name: "Dawn",
    copy: "A silent guardian wakes. Before the first light touches South India, your sanctuary is secured.",
    image: "/images/our-story/chapter-1.jpg",
  },
  {
    time: "06:15",
    name: "Sunrise",
    copy: "Horizon liberated. We greet the morning light without iron bars. Boundless skies.",
    image: "/images/our-story/chapter-2.jpg",
  },
  {
    time: "08:30",
    name: "Morning",
    copy: "Pure natural daylight without visual confinement. The view is entirely yours.",
    image: "/images/our-story/chapter-3.jpg",
  },
  {
    time: "12:00",
    name: "Midday",
    copy: "Zenith strength. Under the blazing sun, our marine elements stand unyielding.",
    image: "/images/our-story/chapter-4.jpg",
  },
  {
    time: "15:00",
    name: "Afternoon",
    copy: "Play without borders. Children explore freely with engineered perimeter micro-spacing.",
    image: "/images/our-story/chapter-5.jpg",
  },
  {
    time: "17:30",
    name: "Evening",
    copy: "The evening breeze. Engineered barriers invite cooling airflow while keeping vectors out.",
    image: "/images/our-story/chapter-6.jpg",
  },
  {
    time: "18:15",
    name: "Sunset",
    copy: "Pristine dusk. Pigeons seek other ledges; your balcony remains untouched.",
    image: "/images/our-story/chapter-7.jpg",
  },
  {
    time: "18:45",
    name: "Twilight",
    copy: "Velvet horizons. The city lights fade in through a screen of pure transparency.",
    image: "/images/our-story/chapter-8.jpg",
  },
  {
    time: "19:15",
    name: "Dusk",
    copy: "Shadows merge. The boundary between home and nature dissolves.",
    image: "/images/our-story/chapter-9.jpg",
  },
  {
    time: "21:00",
    name: "Night",
    copy: "Under the stars. Woven lines of steel stand watch while your home rests.",
    image: "/images/our-story/chapter-10.jpg",
  },
  {
    time: "24:00",
    name: "Midnight",
    copy: `Breathe deeply. ${BRAND_CONFIG.name} guards the edge. Rest well.`,
    image: "/images/our-story/chapter-11.jpg",
  },
];

const PHASES: { from: string; to: string; dark: boolean }[] = [
  { from: "#CBD5E1", to: "#94A3B8", dark: false },
  { from: "#FFEDD5", to: "#FDBA74", dark: false },
  { from: "#BAE6FD", to: "#38BDF8", dark: false },
  { from: "#E0F2FE", to: "#FFFFFF", dark: false },
  { from: "#FFFFFF", to: "#FEF08A", dark: false },
  { from: "#FDE047", to: "#F97316", dark: false },
  { from: "#F97316", to: "#EF4444", dark: false },
  { from: "#818CF8", to: "#4338CA", dark: true },
  { from: "#312E81", to: "#1E1B4B", dark: true },
  { from: "#111827", to: "#030712", dark: true },
  { from: "#030712", to: "#000000", dark: true },
  { from: "#030712", to: "#000000", dark: true },
];

function StoryPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight - clientHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = scrollTop / scrollHeight;
      const index = Math.min(11, Math.round(scrollTop / clientHeight));

      if (index !== activeIndex) {
        setIsTransitioning(true);
        if (transitionTimer.current) clearTimeout(transitionTimer.current);
        transitionTimer.current = setTimeout(() => setIsTransitioning(false), 800);
      }

      setActiveIndex(index);
      setScrollProgress(scrollPercent);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  useEffect(
    () => () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    },
    [],
  );

  const phase = PHASES[Math.min(11, activeIndex)];
  const isDark = phase.dark;
  const isMoon = activeIndex >= 7;
  const showStars = activeIndex >= 9;

  const scrollPercent = scrollProgress;
  const angle = scrollPercent * Math.PI;
  const orbX = 10 + 80 * scrollPercent;
  const orbY = 80 - 60 * Math.sin(angle);

  const stars = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        dur: 1 + Math.random() * 2,
      })),
    [],
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none">
      {/* 1. Fixed Sky Gradient Canvas (Atmospheric Times of Day Realism) */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-all duration-[1000ms] ease-in-out"
        style={{ background: `linear-gradient(to bottom, ${phase.from}, ${phase.to})` }}
        aria-hidden="true"
      />

      {/* 2. God Rays Overlay */}
      <div
        className={`w-[200vw] h-[200vh] fixed -top-1/2 -left-1/2 bg-gradient-to-b from-white/10 via-transparent to-transparent rotate-[45deg] origin-center mix-blend-overlay pointer-events-none z-0 transition-all duration-[800ms] ease-out animate-spin ${
          isTransitioning ? "opacity-80" : "opacity-30"
        }`}
        style={{ animationDuration: isTransitioning ? "8s" : "120s" }}
        aria-hidden="true"
      />

      {/* 3. Volumetric Parallax Clouds */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-all duration-[800ms] ease-out"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 20% 40%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(ellipse 50% 25% at 75% 60%, rgba(255,255,255,0.4), transparent 70%)",
          filter: isTransitioning ? "blur(40px)" : "blur(8px)",
          transform: isTransitioning
            ? "scale(1.45) translate(-30px, -20px)"
            : "scale(1) translate(0,0)",
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-60 transition-all duration-[800ms] ease-out"
        style={{
          background:
            "radial-gradient(ellipse 45% 22% at 55% 30%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(ellipse 40% 20% at 25% 75%, rgba(255,255,255,0.45), transparent 70%)",
          filter: isTransitioning ? "blur(50px)" : "blur(10px)",
          transform: isTransitioning
            ? "scale(1.5) translate(40px, 20px)"
            : "scale(1) translate(0,0)",
        }}
        aria-hidden="true"
      />

      {/* 4. Celestial Orb (Sun/Moon traversing the sky) */}
      <div
        className={`fixed pointer-events-none z-0 rounded-full transition-all duration-[1000ms] ease-out ${
          isMoon
            ? "w-20 h-20 bg-slate-200 blur-2xl opacity-50 shadow-[0_0_50px_rgba(255,255,255,0.4)]"
            : "w-28 h-28 bg-yellow-100 blur-3xl opacity-60 shadow-[0_0_80px_rgba(254,240,138,0.5)]"
        }`}
        style={{ left: `${orbX}vw`, top: `${orbY}vh` }}
        aria-hidden="true"
      />

      {/* 5. Twinkling Stars (Night / Midnight) */}
      {showStars && (
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          {stars.map((s, i) => (
            <span
              key={i}
              className="absolute bg-white w-1 h-1 rounded-full animate-pulse"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 6. Sticky Site Navigation with Adaptive Contrast */}
      <div
        className="fixed top-0 left-0 right-0 z-40 transition-colors duration-700"
        style={{ color: isDark ? "#FFFFFF" : "#0A0A0A" }}
      >
        <SiteNav />
      </div>

      {/* 7. Scroll-snap Container for 11 Times of Day */}
      <div
        ref={containerRef}
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory relative z-10 bg-transparent"
      >
        {CHAPTERS.map((c, i) => {
          const active = activeIndex === i;
          return (
            <section
              key={c.name}
              className="w-screen h-screen snap-start relative flex items-center justify-center overflow-hidden bg-transparent p-4 sm:p-6"
            >
              <div
                className={`border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center justify-center shadow-2xl transition-all duration-[800ms] ease-out ${
                  active
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                {/* Visual Card Image (Atmospheric Weather & Time Realism) */}
                <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden border border-white/20 mb-5 relative group">
                  <img
                    src={c.image}
                    alt={`${c.name} — ${c.time} atmospheric safety setting`}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Time Indicator */}
                <p
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-light"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: isDark ? "#E5E5E5" : "#F5F5F5",
                  }}
                >
                  {c.time}
                </p>

                {/* Chapter / Phase Title */}
                <h2
                  className="font-serif uppercase text-xl sm:text-2xl font-light text-center mt-1.5 text-white tracking-[0.18em]"
                >
                  {c.name}
                </h2>

                {/* Narrative Copy */}
                <p
                  className="text-[12px] sm:text-[13px] text-center mt-2.5 font-light max-w-xs leading-relaxed text-neutral-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {c.copy}
                </p>
              </div>
            </section>
          );
        })}

        {/* Section 12 — Curate Your Sanctuary CTA + Footer */}
        <section className="w-screen min-h-screen snap-start relative flex flex-col items-center justify-between overflow-hidden bg-transparent">
          <div className="flex-1 flex items-center justify-center w-full pt-28 pb-12 px-6">
            <div
              className={`border border-white/30 bg-black/35 backdrop-blur-xl p-8 sm:p-10 md:p-14 w-full max-w-sm sm:max-w-md flex flex-col items-center shadow-2xl transition-all duration-[800ms] ease-out ${
                activeIndex === 11
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <span className="sn-eyebrow text-neutral-300 mb-3 block">
                Genesis of Serenity
              </span>
              <h3 className="font-serif uppercase text-2xl font-light text-center text-white tracking-[0.18em]">
                Curate Your Sanctuary
              </h3>
              <p className="text-xs text-neutral-300 text-center font-light mt-3 mb-8 leading-relaxed max-w-xs">
                From dawn to midnight, preserve your sanctuary with invisible architectural grace.
              </p>
              <Link
                to="/consultation"
                className="sn-btn-luxury-solid focus-ring"
              >
                Request Survey
              </Link>
            </div>
          </div>
          <div className="w-full relative z-20 bg-[#050505]">
            <Footer />
          </div>
        </section>
      </div>

      {/* Scroll Hint */}
      {activeIndex === 0 && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.35em] opacity-70 animate-pulse pointer-events-none z-30 font-light"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: isDark ? "#F5F5F5" : "#1A1A1A",
          }}
        >
          Scroll to Begin
        </div>
      )}
    </div>
  );
}

export default StoryPage;
