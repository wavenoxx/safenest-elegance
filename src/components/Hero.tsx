import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";

/**
 * Hero — Full-bleed single-visual hero section.
 *
 * Design reference: Dior.com / Chanel.com hero pattern.
 * - Single image fills the entire viewport (100dvh).
 * - Desktop: landscape ratio image (or black placeholder).
 * - Mobile: portrait 9:16 image (or black placeholder).
 * - Typography is restrained, light, and spacious.
 * - No video. No autoplay. No play/pause controls.
 * - Entrance animations via CSS (prefers-reduced-motion safe).
 */
const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-950 select-none"
      style={{ height: "100dvh", minHeight: "600px" }}
    >
      {/* Full-bleed background image — Desktop */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Desktop image (hidden on mobile) */}
        <img
          src="/images/homepage/banner-1.jpg"
          alt="SafeNest architectural safety — invisible grills and safety nets for modern homes"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        {/* Mobile image — 9:16 aspect (shown on mobile only) */}
        <img
          src="/images/homepage/banner-1.jpg"
          alt="SafeNest architectural safety — invisible grills and safety nets for modern homes"
          width={1080}
          height={1920}
          fetchPriority="high"
          decoding="async"
          className="md:hidden w-full h-full object-cover object-center"
        />
      </div>

      {/* Ambient vignette — subtle gradient to ensure text legibility */}
      <div
        className="absolute inset-0 pointer-events-none z-10 sn-anim-overlay"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content overlay — lower-third positioning (Dior/Chanel pattern) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-16 sm:pb-20 md:pb-24 px-6 md:px-12 text-center">
        {/* Micro label */}
        <span
          className="sn-anim-label text-white/70 uppercase block mb-4"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 300,
            letterSpacing: "0.35em",
          }}
        >
          Architectural Safety
        </span>

        {/* H1 — Quiet, restrained, serif */}
        <h1
          className="sn-anim-h1 text-white uppercase leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            letterSpacing: "0.08em",
            fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
            maxWidth: "680px",
          }}
        >
          Invisible Grills &amp; Safety Nets
        </h1>

        {/* Supporting line */}
        <p
          className="sn-anim-sub mt-4 text-white/80 max-w-md leading-relaxed"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "clamp(11px, 1.2vw, 13px)",
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        >
          Precision-measured and installed for balconies, windows, and open&nbsp;edges
          across verified {BRAND_CONFIG.name} service areas.
        </p>

        {/* CTA — single, clear action */}
        <div className="sn-anim-cta mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/consultation"
            className="inline-flex items-center justify-center bg-white text-neutral-950 px-8 py-3 min-h-11 uppercase transition-colors duration-300 hover:bg-neutral-100 focus-ring"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.25em",
            }}
          >
            Request Site Survey
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-3 min-h-11 uppercase transition-all duration-300 hover:border-white hover:bg-white/10 focus-ring"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.25em",
            }}
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
