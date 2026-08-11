import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

interface SlideItem {
  category: string;
  poeticTitle: string;
  plainDescriptor: string;
  action: string;
  link: string;
  image: string;
}

const slides: SlideItem[] = [
  {
    category: "INVISIBLE GRILLS",
    poeticTitle: "THE INVISIBLE THRESHOLD",
    plainDescriptor: "Balcony & Window Invisible Grills",
    action: "DISCOVER",
    link: "/category/invisible-grills",
    image: "/images/homepage/banner-1.jpg",
  },
  {
    category: "CORE SAFETY NETS",
    poeticTitle: "THE WEIGHTLESS EMBRACE",
    plainDescriptor: "Balcony & Children Safety Nets",
    action: "DISCOVER",
    link: "/category/core-safety-nets",
    image: "/images/homepage/banner-2.jpg",
  },
  {
    category: "CONSTRUCTION & INDUSTRIAL",
    poeticTitle: "STRUCTURAL ARCHITECTURE",
    plainDescriptor: "Heavy-Duty Debris & Fall Containment",
    action: "DISCOVER",
    link: "/category/construction-industrial",
    image: "/images/homepage/banner-3.jpg",
  },
  {
    category: "ANIMAL & BIRD PROTECTION",
    poeticTitle: "THE WINGED SANCTUARY",
    plainDescriptor: "Pigeon Nets & Stainless Steel Bird Spikes",
    action: "DISCOVER",
    link: "/category/animal-bird-protection",
    image: "/images/homepage/banner-4.jpg",
  },
  {
    category: "SPECIALTY SOLUTIONS",
    poeticTitle: "THE APERTURE COLLECTION",
    plainDescriptor: "Sports Practice Nets & Ceiling Cloth Hangers",
    action: "DISCOVER",
    link: "/category/specialty-solutions",
    image: "/images/homepage/banner-5.jpg",
  },
  {
    category: "SAFENEST HOUSE",
    poeticTitle: "GENESIS OF SERENITY",
    plainDescriptor: "Atelier Heritage & Brand Ethos",
    action: "EXPLORE",
    link: "/our-story",
    image: "/images/homepage/banner-6.jpg",
  },
  {
    category: "SAFENEST HOUSE",
    poeticTitle: "THE FORGED ELEGANCE",
    plainDescriptor: "Materials, Metallurgy & Tensile Science",
    action: "EXPLORE",
    link: "/craftsmanship",
    image: "/images/homepage/banner-7.jpg",
  },
  {
    category: "SAFENEST HOUSE",
    poeticTitle: "BOUNDLESS HORIZONS",
    plainDescriptor: "Architectural Living Spaces & Views",
    action: "EXPLORE",
    link: "/lifestyle",
    image: "/images/homepage/banner-8.jpg",
  },
  {
    category: "MAINTENANCE & CARE",
    poeticTitle: "THE ENDURING SHIELD",
    plainDescriptor: "Cleaning, Inspection & Retensioning Protocol",
    action: "LEARN MORE",
    link: "/maintenance-repair",
    image: "/images/homepage/banner-9.jpg",
  },
  {
    category: "REGIONAL OPERATIONS",
    poeticTitle: "VERIFIED SERVICE HUBS",
    plainDescriptor: "Hyderabad · Bengaluru · Chennai · Kochi · Vizag",
    action: "VIEW AREAS",
    link: "/service-areas",
    image: "/images/homepage/banner-10.jpg",
  },
];

export function CinematicScrollway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col bg-neutral-950 z-10 relative">
      {slides.map((slide, index) => (
        <Link
          key={index}
          to={slide.link}
          className="w-full h-[55vh] md:h-auto md:aspect-[2.39/1] relative overflow-hidden flex flex-col justify-end pb-8 md:pb-12 px-6 md:px-12 group block focus-ring border-b border-white/5"
          aria-label={`${slide.action}: ${slide.plainDescriptor} (${slide.poeticTitle})`}
        >
          {/* Background image */}
          <div className="w-full h-full absolute inset-0 overflow-hidden bg-neutral-900 z-0 pointer-events-none">
            <img
              src={slide.image}
              alt=""
              aria-hidden="true"
              width={1920}
              height={803}
              loading="lazy"
              className={`w-full h-full object-cover opacity-75 transition-transform duration-1000 ease-out ${
                reducedMotion ? "" : "group-hover:scale-105"
              }`}
            />
          </div>

          {/* Ambient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none z-10" />

          {/* Lower-third content */}
          <div className="relative z-20 flex flex-col items-center text-center w-full max-w-xl mx-auto mb-2 select-none">
            <span className="font-sans text-[8px] md:text-[9.5px] tracking-[0.4em] uppercase font-light text-white/70 mb-1.5 transition-opacity duration-300 group-hover:text-white">
              {slide.category}
            </span>

            {/* Poetic Title */}
            <h2 className="font-serif text-[17px] md:text-[23px] font-light tracking-[0.2em] uppercase mt-0.5 mb-1 text-white leading-relaxed">
              {slide.poeticTitle}
            </h2>

            {/* Plain Service Descriptor */}
            <p className="text-[10px] md:text-[11.5px] font-sans font-light tracking-wide text-neutral-300 mb-4">
              {slide.plainDescriptor}
            </p>

            <span className="rounded-none px-5 py-2 md:px-6 md:py-2.5 text-[8.5px] md:text-[9px] tracking-[0.25em] font-sans font-light uppercase bg-white text-neutral-900 border border-transparent group-hover:bg-transparent group-hover:text-white group-hover:border-white transition-all duration-500 shadow-xs inline-block">
              {slide.action}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CinematicScrollway;
