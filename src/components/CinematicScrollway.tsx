import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

interface SlideItem {
  category: string;
  title: string;
  action: string;
  link: string;
  theme: "light" | "dark";
  image: string;
}

const slides: SlideItem[] = [
  {
    category: "SERVICES",
    title: "THE INVISIBLE THRESHOLD",
    action: "DISCOVER",
    link: "/category/invisible-grills",
    theme: "light",
    image: "/images/homepage/banner-1.jpg",
  },
  {
    category: "SERVICES",
    title: "THE WEIGHTLESS EMBRACE",
    action: "DISCOVER",
    link: "/category/core-safety-nets",
    theme: "dark",
    image: "/images/homepage/banner-2.jpg",
  },
  {
    category: "SERVICES",
    title: "STRUCTURAL ARCHITECTURE",
    action: "DISCOVER",
    link: "/category/construction-industrial",
    theme: "light",
    image: "/images/homepage/banner-3.jpg",
  },
  {
    category: "SERVICES",
    title: "THE WINGED SANCTUARY",
    action: "DISCOVER",
    link: "/category/animal-bird-protection",
    theme: "dark",
    image: "/images/homepage/banner-4.jpg",
  },
  {
    category: "SERVICES",
    title: "THE APERTURE COLLECTION",
    action: "DISCOVER",
    link: "/category/specialty-solutions",
    theme: "light",
    image: "/images/homepage/banner-5.jpg",
  },
  {
    category: "SAFENEST HOUSE",
    title: "GENESIS OF SERENITY",
    action: "EXPLORE",
    link: "/our-story",
    theme: "light",
    image: "/images/homepage/banner-6.jpg",
  },
  {
    category: "SAFENEST HOUSE",
    title: "THE FORGED ELEGANCE",
    action: "EXPLORE",
    link: "/craftsmanship",
    theme: "dark",
    image: "/images/homepage/banner-7.jpg",
  },
  {
    category: "SAFENEST HOUSE",
    title: "BOUNDLESS HORIZONS",
    action: "EXPLORE",
    link: "/lifestyle",
    theme: "light",
    image: "/images/homepage/banner-8.jpg",
  },
  {
    category: "COLLECTION HOUSE",
    title: "THE SANCTUARY OF LIGHT",
    action: "EXPLORE",
    link: "/campaigns/light-and-sanctuary",
    theme: "light",
    image: "/images/homepage/banner-9.jpg",
  },
  {
    category: "COLLECTION HOUSE",
    title: "THE WEIGHTLESS PAVILION",
    action: "EXPLORE",
    link: "/solutions",
    theme: "dark",
    image: "/images/homepage/banner-10.jpg",
  },
];

export function CinematicScrollway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffsets, setScrollOffsets] = useState<number[]>(new Array(10).fill(0));
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onMqChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMqChange);

    if (mq.matches) return () => mq.removeEventListener("change", onMqChange);

    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const viewportHeight = window.innerHeight;
        const children = containerRef.current.children;
        const offsets = Array.from(children).map((child) => {
          const rect = (child as HTMLElement).getBoundingClientRect();
          const childCenter = rect.top + rect.height / 2;
          const viewportCenter = viewportHeight / 2;
          return (childCenter - viewportCenter) / (viewportHeight + rect.height);
        });
        setScrollOffsets(offsets);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mq.removeEventListener("change", onMqChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col bg-neutral-950 z-10 relative">
      {slides.map((slide, index) => {
        const offset = scrollOffsets[index] || 0;
        const translateY = reducedMotion ? 0 : offset * -80;

        return (
          <Link
            key={index}
            to={slide.link}
            className="w-full h-[55vh] md:h-auto md:aspect-[2.39/1] relative overflow-hidden flex flex-col justify-end pb-8 md:pb-12 px-6 md:px-12 group block focus-ring"
            aria-label={`${slide.action}: ${slide.title} — ${slide.category}`}
          >
            {/* Parallax background */}
            <div className="w-full h-[120%] absolute top-[-10%] left-0 overflow-hidden bg-neutral-900 z-0 pointer-events-none">
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                width={1920}
                height={803}
                loading="lazy"
                className="w-full h-full object-cover opacity-75 transition-transform duration-700 ease-out will-change-transform"
                style={{
                  transform: `translate3d(0, ${translateY}px, 0)`,
                }}
              />
            </div>

            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none z-10" />

            {/* Lower-third content */}
            <div className="relative z-20 flex flex-col items-center text-center w-full max-w-xl mx-auto mb-2 select-none">
              <span className="font-sans text-[8px] md:text-[9.5px] tracking-[0.4em] uppercase font-light text-white/70 mb-1.5 transition-opacity duration-300 group-hover:text-white">
                {slide.category}
              </span>
              <h2 className="font-serif text-[17px] md:text-[23px] font-light tracking-[0.2em] uppercase mt-0.5 mb-4 text-white leading-relaxed transition-transform duration-700 ease-out group-hover:scale-[1.01]">
                {slide.title}
              </h2>
              <span className="rounded-none px-5 py-2 md:px-6 md:py-2.5 text-[8.5px] md:text-[9px] tracking-[0.25em] font-sans font-light uppercase bg-white text-neutral-900 border border-transparent group-hover:bg-transparent group-hover:text-white group-hover:border-white transition-all duration-500 shadow-xs inline-block">
                {slide.action}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default CinematicScrollway;
