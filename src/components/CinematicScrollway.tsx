import { Link } from "@tanstack/react-router";

interface SlideItem {
  category: string;
  title: string;
  descriptor: string;
  action: string;
  link: string;
}

/**
 * CinematicScrollway — Pure Black Architectural Visual Mockup Sections.
 *
 * Directives:
 * - Zero visual images (pure black visual canvases with architectural depth).
 * - Exact typography & layout matching reference image:
 *   - Eyebrow (.sn-eyebrow): 10px, tracking 0.35em, uppercase
 *   - Title (.sn-h1): Cormorant Garamond 300, tracking 0.22em, uppercase
 *   - Descriptor (.sn-subtext): 11.5px, tracking 0.05em, text-neutral-300
 *   - Action Button (.sn-btn-luxury): Minimal framed luxury border button
 */
const slides: SlideItem[] = [
  {
    category: "Invisible Grills",
    title: "The Invisible Threshold",
    descriptor: "Balcony & Window Invisible Grills",
    action: "Discover",
    link: "/category/invisible-grills",
  },
  {
    category: "Core Safety Nets",
    title: "The Weightless Embrace",
    descriptor: "Balcony & Children Safety Nets",
    action: "Discover",
    link: "/category/core-safety-nets",
  },
  {
    category: "Construction & Industrial",
    title: "Structural Architecture",
    descriptor: "Heavy-Duty Debris & Fall Containment",
    action: "Discover",
    link: "/category/construction-industrial",
  },
  {
    category: "Animal & Bird Protection",
    title: "The Winged Sanctuary",
    descriptor: "Pigeon Nets & Stainless Steel Bird Spikes",
    action: "Discover",
    link: "/category/animal-bird-protection",
  },
  {
    category: "Specialty Solutions",
    title: "The Aperture Collection",
    descriptor: "Sports Practice Nets & Ceiling Cloth Hangers",
    action: "Discover",
    link: "/category/specialty-solutions",
  },
  {
    category: "SafeNest House",
    title: "Genesis of Serenity",
    descriptor: "Atelier Heritage & Brand Ethos",
    action: "Explore",
    link: "/our-story",
  },
  {
    category: "SafeNest House",
    title: "The Forged Elegance",
    descriptor: "Materials, Metallurgy & Tensile Science",
    action: "Explore",
    link: "/craftsmanship",
  },
  {
    category: "SafeNest House",
    title: "Boundless Horizons",
    descriptor: "Architectural Living Spaces & Views",
    action: "Explore",
    link: "/lifestyle",
  },
  {
    category: "Maintenance & Care",
    title: "The Enduring Shield",
    descriptor: "Cleaning, Inspection & Retensioning Protocol",
    action: "Learn More",
    link: "/maintenance-repair",
  },
  {
    category: "Regional Operations",
    title: "Verified Service Hubs",
    descriptor: "Hyderabad · Bengaluru · Chennai · Kochi · Vizag",
    action: "View Areas",
    link: "/service-areas",
  },
];

export function CinematicScrollway() {
  return (
    <div className="w-full flex flex-col bg-[#050505] z-10 relative select-none">
      {slides.map((slide, index) => (
        <Link
          key={index}
          to={slide.link}
          className="sn-chanel-slide group block relative w-full aspect-[1/2.39] sm:aspect-[1/1.8] md:aspect-[2.39/1] min-h-[460px] max-h-[92dvh] focus-ring border-b border-white/5"
          aria-label={`${slide.action}: ${slide.descriptor} (${slide.title})`}
        >
          {/* Pure Black Visual Canvas with Subtle Architectural Depth */}
          <div className="absolute inset-0 w-full h-full sn-black-visual z-0 pointer-events-none">
            <div className="w-full h-full bg-radial from-neutral-900/20 via-[#050505] to-[#050505]" />
          </div>

          {/* Subtle Ambient Vignette Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0.15) 50%, rgba(5,5,5,0.02) 100%)",
            }}
          />

          {/* Bottom-Center Typography Overlay (Calibrated for Vertical & Widescreen 2.39:1) */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center text-center w-full px-4 sm:px-8 md:px-12 pb-8 sm:pb-10 md:pb-12 max-w-3xl mx-auto">
            {/* Category Eyebrow */}
            <span className="sn-eyebrow text-neutral-400 mb-1.5 sm:mb-2 uppercase block">
              {slide.category}
            </span>

            {/* Collection / Section Title */}
            <h2 className="sn-h1 text-white max-w-2xl drop-shadow-sm mb-1 sm:mb-1.5 px-2">
              {slide.title}
            </h2>

            {/* Plain Descriptor */}
            <p className="sn-subtext text-neutral-300 mb-4 sm:mb-5 max-w-md px-2">
              {slide.descriptor}
            </p>

            {/* Reference Framed Action Button */}
            <span className="sn-btn-luxury">
              {slide.action}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CinematicScrollway;
