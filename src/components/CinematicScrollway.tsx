import { Link } from "@tanstack/react-router";

interface SlideItem {
  category: string;
  title: string;
  descriptor: string;
  action: string;
  link: string;
  desktopImage: string;
  mobileImage: string;
}

/**
 * CinematicScrollway — Full-bleed visual-to-visual section scroll.
 *
 * Design reference: Chanel.com homepage scroll pattern.
 * - Each section is a full-viewport-height visual.
 * - Desktop: landscape image with dolly-zoom (scale) on hover.
 * - Mobile: portrait 9:16 image.
 * - Content positioned in lower-third overlay.
 * - CSS-native animations — no JavaScript scroll listeners.
 * - prefers-reduced-motion: scale transition disabled.
 */

const slides: SlideItem[] = [
  {
    category: "Invisible Grills",
    title: "The Invisible Threshold",
    descriptor: "Balcony & Window Invisible Grills",
    action: "Discover",
    link: "/category/invisible-grills",
    desktopImage: "/images/homepage/banner-1.jpg",
    mobileImage: "/images/homepage/banner-1.jpg",
  },
  {
    category: "Core Safety Nets",
    title: "The Weightless Embrace",
    descriptor: "Balcony & Children Safety Nets",
    action: "Discover",
    link: "/category/core-safety-nets",
    desktopImage: "/images/homepage/banner-2.jpg",
    mobileImage: "/images/homepage/banner-2.jpg",
  },
  {
    category: "Construction & Industrial",
    title: "Structural Architecture",
    descriptor: "Heavy-Duty Debris & Fall Containment",
    action: "Discover",
    link: "/category/construction-industrial",
    desktopImage: "/images/homepage/banner-3.jpg",
    mobileImage: "/images/homepage/banner-3.jpg",
  },
  {
    category: "Animal & Bird Protection",
    title: "The Winged Sanctuary",
    descriptor: "Pigeon Nets & Stainless Steel Bird Spikes",
    action: "Discover",
    link: "/category/animal-bird-protection",
    desktopImage: "/images/homepage/banner-4.jpg",
    mobileImage: "/images/homepage/banner-4.jpg",
  },
  {
    category: "Specialty Solutions",
    title: "The Aperture Collection",
    descriptor: "Sports Practice Nets & Ceiling Cloth Hangers",
    action: "Discover",
    link: "/category/specialty-solutions",
    desktopImage: "/images/homepage/banner-5.jpg",
    mobileImage: "/images/homepage/banner-5.jpg",
  },
  {
    category: "Heritage",
    title: "Genesis of Serenity",
    descriptor: "The SafeNest Atelier & Brand Ethos",
    action: "Explore",
    link: "/our-story",
    desktopImage: "/images/homepage/banner-6.jpg",
    mobileImage: "/images/homepage/banner-6.jpg",
  },
  {
    category: "Craftsmanship",
    title: "The Forged Elegance",
    descriptor: "Materials, Metallurgy & Tensile Science",
    action: "Explore",
    link: "/craftsmanship",
    desktopImage: "/images/homepage/banner-7.jpg",
    mobileImage: "/images/homepage/banner-7.jpg",
  },
  {
    category: "Lifestyle",
    title: "Boundless Horizons",
    descriptor: "Architectural Living Spaces & Views",
    action: "Explore",
    link: "/lifestyle",
    desktopImage: "/images/homepage/banner-8.jpg",
    mobileImage: "/images/homepage/banner-8.jpg",
  },
  {
    category: "Maintenance & Care",
    title: "The Enduring Shield",
    descriptor: "Cleaning, Inspection & Retensioning Protocol",
    action: "Learn More",
    link: "/maintenance-repair",
    desktopImage: "/images/homepage/banner-9.jpg",
    mobileImage: "/images/homepage/banner-9.jpg",
  },
  {
    category: "Regional Operations",
    title: "Verified Service Hubs",
    descriptor: "Hyderabad · Bengaluru · Chennai · Kochi · Vizag",
    action: "View Areas",
    link: "/service-areas",
    desktopImage: "/images/homepage/banner-10.jpg",
    mobileImage: "/images/homepage/banner-10.jpg",
  },
];

export function CinematicScrollway() {
  return (
    <div className="w-full flex flex-col bg-neutral-950 z-10 relative">
      {slides.map((slide, index) => (
        <Link
          key={index}
          to={slide.link}
          className="sn-scrollway-slide group block relative w-full overflow-hidden focus-ring"
          style={{ height: "100dvh", minHeight: "500px" }}
          aria-label={`${slide.action}: ${slide.descriptor}`}
        >
          {/* Background image with dolly-zoom on hover */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-950 z-0 pointer-events-none">
            {/* Desktop image */}
            <img
              src={slide.desktopImage}
              alt=""
              aria-hidden="true"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="sn-dolly-target hidden md:block w-full h-full object-cover opacity-80 transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.06]"
            />
            {/* Mobile image */}
            <img
              src={slide.mobileImage}
              alt=""
              aria-hidden="true"
              width={1080}
              height={1920}
              loading="lazy"
              decoding="async"
              className="md:hidden w-full h-full object-cover opacity-80"
            />
          </div>

          {/* Ambient vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.05) 100%)",
            }}
          />

          {/* Lower-third content */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center text-center w-full px-6 md:px-12 pb-14 sm:pb-16 md:pb-20 select-none">
            {/* Category label */}
            <span
              className="text-white/60 uppercase mb-3 transition-colors duration-300 group-hover:text-white/90"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "9px",
                fontWeight: 300,
                letterSpacing: "0.4em",
              }}
            >
              {slide.category}
            </span>

            {/* Title — serif, quiet */}
            <h2
              className="text-white uppercase leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                letterSpacing: "0.15em",
                fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              }}
            >
              {slide.title}
            </h2>

            {/* Plain descriptor */}
            <p
              className="text-neutral-300 mt-1.5 mb-5"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 300,
                letterSpacing: "0.03em",
              }}
            >
              {slide.descriptor}
            </p>

            {/* Action button */}
            <span
              className="inline-block px-6 py-2.5 bg-white text-neutral-900 uppercase transition-all duration-500 group-hover:bg-transparent group-hover:text-white group-hover:outline group-hover:outline-1 group-hover:outline-white"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "9px",
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
