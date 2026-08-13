import { Link } from "@tanstack/react-router";

interface SlideItem {
  category: string;
  title: string;
  descriptor: string;
  action: string;
  link: string;
  image?: string;
}

/**
 * CinematicScrollway — 2.39:1 Panoramic Widescreen Visual Scrollway.
 *
 * Exact match with user's specification:
 * - 2.39:1 Widescreen cinematic aspect ratio across both mobile and desktop.
 * - Center-to-Down placement with ~10% visual breathing space beneath action buttons.
 * - Ultra-refined quiet luxury typography with single-line titles.
 * - Pure high-resolution (0% loss) visual banners for Slides 1 to 5.
 */
const slides: SlideItem[] = [
  {
    category: "Invisible Grills",
    title: "The Invisible Threshold",
    descriptor: "Balcony & Window Invisible Grills",
    action: "Discover",
    link: "/category/invisible-grills",
    image: "/images/homepage/banner-1.jpg",
  },
  {
    category: "Core Safety Nets",
    title: "The Weightless Embrace",
    descriptor: "Balcony & Children Safety Nets",
    action: "Discover",
    link: "/category/core-safety-nets",
    image: "/images/homepage/banner-2.jpg",
  },
  {
    category: "Construction & Industrial",
    title: "Structural Architecture",
    descriptor: "Heavy-Duty Debris & Fall Containment",
    action: "Discover",
    link: "/category/construction-industrial",
    image: "/images/homepage/banner-3.jpg",
  },
  {
    category: "Animal & Bird Protection",
    title: "The Winged Sanctuary",
    descriptor: "Pigeon Nets & Stainless Steel Bird Spikes",
    action: "Discover",
    link: "/category/animal-bird-protection",
    image: "/images/homepage/banner-4.jpg",
  },
  {
    category: "Specialty Solutions",
    title: "The Aperture Collection",
    descriptor: "Sports Practice Nets & Ceiling Cloth Hangers",
    action: "Discover",
    link: "/category/specialty-solutions",
    image: "/images/homepage/banner-5.jpg",
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
          className="sn-chanel-slide group relative w-full aspect-[2.39/1] focus-ring border-b border-white/10 flex flex-col justify-end transition-colors duration-300 hover:bg-white/[0.01]"
          aria-label={`${slide.action}: ${slide.descriptor} (${slide.title})`}
        >
          {/* Visual Image Background or Pure Black Canvas */}
          {slide.image ? (
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <img
                src={slide.image}
                alt={`${slide.title} — ${slide.descriptor}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="absolute inset-0 w-full h-full sn-black-visual z-0 pointer-events-none">
              <div className="w-full h-full bg-radial from-neutral-900/25 via-[#050505] to-[#050505]" />
            </div>
          )}

          {/* Soft Ambient Vignette Overlay for Text Legibility */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.05) 50%, rgba(5,5,5,0) 100%)",
            }}
          />

          {/* Center-to-Down Typography Overlay (With 10% bottom visual breathing space) */}
          <div className="relative z-20 flex flex-col items-center text-center w-full px-3 sm:px-6 md:px-12 pb-[6%] sm:pb-[7%] md:pb-[8%] max-w-3xl mx-auto">
            {/* Category Eyebrow */}
            <span className="sn-eyebrow text-neutral-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] mb-1 sm:mb-1.5 uppercase block whitespace-nowrap">
              {slide.category}
            </span>

            {/* Collection / Section Title (Single-line quiet luxury) */}
            <h2 className="sn-h1 text-white max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] mb-1 sm:mb-1.5 px-1 whitespace-nowrap">
              {slide.title}
            </h2>

            {/* Plain Descriptor */}
            <p className="sn-subtext text-neutral-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] mb-2.5 sm:mb-3.5 max-w-md px-1 whitespace-nowrap">
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
