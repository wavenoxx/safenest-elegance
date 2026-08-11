import { Link } from "@tanstack/react-router";

interface SlideItem {
  category: string;
  title: string;
  descriptor: string;
  action: string;
  link: string;
  image: string;
}

/**
 * CinematicScrollway — Chanel-Inspired Visual-to-Visual Homepage Scroll Experience.
 *
 * Directives:
 * - Dedicated visual-to-visual homepage mockup scroll with all 10 architectural banners.
 * - Chanel section layout: large architectural canvas (desktop ~78vh / aspect-2.28:1, mobile ~72vh).
 * - Ultra butter-smooth dolly-zoom on hover (1600ms cubic-bezier easing, zero sudden jumps).
 * - Chanel bottom-center typography & refined CTA action buttons.
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
    image: "/images/homepage/banner-6.jpg",
  },
  {
    category: "SafeNest House",
    title: "The Forged Elegance",
    descriptor: "Materials, Metallurgy & Tensile Science",
    action: "Explore",
    link: "/craftsmanship",
    image: "/images/homepage/banner-7.jpg",
  },
  {
    category: "SafeNest House",
    title: "Boundless Horizons",
    descriptor: "Architectural Living Spaces & Views",
    action: "Explore",
    link: "/lifestyle",
    image: "/images/homepage/banner-8.jpg",
  },
  {
    category: "Maintenance & Care",
    title: "The Enduring Shield",
    descriptor: "Cleaning, Inspection & Retensioning Protocol",
    action: "Learn More",
    link: "/maintenance-repair",
    image: "/images/homepage/banner-9.jpg",
  },
  {
    category: "Regional Operations",
    title: "Verified Service Hubs",
    descriptor: "Hyderabad · Bengaluru · Chennai · Kochi · Vizag",
    action: "View Areas",
    link: "/service-areas",
    image: "/images/homepage/banner-10.jpg",
  },
];

export function CinematicScrollway() {
  return (
    <div className="w-full flex flex-col bg-[#050505] z-10 relative select-none">
      {slides.map((slide, index) => (
        <Link
          key={index}
          to={slide.link}
          className="sn-chanel-slide group block relative w-full h-[70vh] sm:h-[74vh] md:h-[78vh] lg:h-[82vh] focus-ring"
          aria-label={`${slide.action}: ${slide.descriptor} (${slide.title})`}
        >
          {/* Background Visual Container with Chanel Butter-Smooth Dolly Zoom */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] z-0 pointer-events-none">
            <img
              src={slide.image}
              alt=""
              aria-hidden="true"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="sn-chanel-media w-full h-full object-cover object-center opacity-85"
            />
          </div>

          {/* Chanel-Style Subtle Gradient Overlay for Text Clarity */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.05) 100%)",
            }}
          />

          {/* Chanel Bottom-Center Typography & CTA Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center text-center w-full px-6 md:px-12 pb-12 sm:pb-14 md:pb-16 max-w-3xl mx-auto">
            {/* Subtitle / Category */}
            <span
              className="text-white/80 uppercase mb-2 transition-colors duration-300 group-hover:text-white"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 300,
                letterSpacing: "0.35em",
                textShadow: "0 0 6px rgba(0,0,0,0.7)",
              }}
            >
              {slide.category}
            </span>

            {/* Collection / Section Title */}
            <h2
              className="text-white uppercase leading-relaxed drop-shadow-md"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                letterSpacing: "0.16em",
                fontSize: "clamp(1.2rem, 2.4vw, 1.75rem)",
                textShadow: "0 0 10px rgba(0,0,0,0.6)",
              }}
            >
              {slide.title}
            </h2>

            {/* Plain Descriptor */}
            <p
              className="text-neutral-200 mt-1 mb-4 leading-normal"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11.5px",
                fontWeight: 300,
                letterSpacing: "0.03em",
                textShadow: "0 0 6px rgba(0,0,0,0.6)",
              }}
            >
              {slide.descriptor}
            </p>

            {/* Chanel-Style Minimal Action Button */}
            <span
              className="inline-block px-7 py-2.5 bg-white text-neutral-950 uppercase transition-all duration-500 shadow-sm group-hover:bg-black/50 group-hover:text-white group-hover:outline group-hover:outline-1 group-hover:outline-white"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "9.5px",
                fontWeight: 400,
                letterSpacing: "0.25em",
              }}
            >
              {slide.action}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CinematicScrollway;
