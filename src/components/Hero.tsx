import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";

/**
 * Hero — Pure Black Screen & Quiet Luxury Typography.
 *
 * Design Directives:
 * - Starting homepage hero is a pure, serene black screen (no random placeholder visual).
 * - Desktop Container: Clean dark luxury canvas (ready for desktop visual asset update).
 * - Mobile Container: 9:16 aspect ratio canvas (ready for mobile portrait visual asset update).
 * - H1: Strictly 3 to 5 words ("Invisible Grills & Safety Nets" — 5 words).
 * - Subtext below H1: Strictly 5 to 7 words ("Architectural safety for modern discerning homes." — 6 words).
 * - Typography: Restrained, calm, spacious, Cormorant Garamond serif with Inter.
 */
const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#050505] select-none"
      style={{ height: "100dvh", minHeight: "600px" }}
      aria-label="SafeNest Architectural Safety Hero"
    >
      {/* ─────────────────────────────────────────────────────────────
          VISUAL CONTAINERS (Black Screen — Ready for Custom Assets)
          ───────────────────────────────────────────────────────────── */}

      {/* Desktop Visual Canvas (Landscape Container) */}
      <div
        className="hidden md:block absolute inset-0 w-full h-full bg-[#050505] z-0"
        data-slot="desktop-hero-visual"
      >
        {/* Placeholder ready for desktop visual: <img src="..." className="w-full h-full object-cover" /> */}
        <div className="w-full h-full bg-radial from-neutral-900/20 to-[#050505]" />
      </div>

      {/* Mobile Visual Canvas (9:16 Aspect Ratio Portrait Container) */}
      <div
        className="md:hidden absolute inset-0 w-full h-full bg-[#050505] z-0"
        data-slot="mobile-hero-visual-9-16"
      >
        {/* Placeholder ready for mobile 9:16 visual: <img src="..." className="w-full h-full object-cover" /> */}
        <div className="w-full h-full bg-radial from-neutral-900/20 to-[#050505]" />
      </div>

      {/* Subtle Atmospheric Vignette for Architectural Depth */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.1) 40%, rgba(5,5,5,0.2) 70%, rgba(5,5,5,0.85) 100%)",
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL CONTENT OVERLAY (Lower-Third Placement)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-16 sm:pb-20 md:pb-24 px-6 md:px-12 text-center">
        {/* Brand Eyebrow */}
        <span
          className="sn-anim-label text-white/70 uppercase block mb-3.5"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 300,
            letterSpacing: "0.35em",
          }}
        >
          {BRAND_CONFIG.name} · Architectural Safety
        </span>

        {/* H1 Headline — Strictly 5 words */}
        <h1
          className="sn-anim-h1 text-white uppercase leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            letterSpacing: "0.08em",
            fontSize: "clamp(1.75rem, 3.8vw, 2.75rem)",
            maxWidth: "680px",
            textShadow: "0 0 12px rgba(0,0,0,0.6)",
          }}
        >
          Invisible Grills &amp; Safety Nets
        </h1>

        {/* Supporting Line — Strictly 6 words */}
        <p
          className="sn-anim-sub mt-3.5 text-neutral-300 max-w-md leading-relaxed"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "clamp(11.5px, 1.1vw, 13px)",
            fontWeight: 300,
            letterSpacing: "0.03em",
          }}
        >
          Architectural safety for modern discerning homes.
        </p>

        {/* Action CTAs */}
        <div className="sn-anim-cta mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/consultation"
            className="inline-flex items-center justify-center bg-white text-neutral-950 px-8 py-3 min-h-11 uppercase transition-colors duration-300 hover:bg-neutral-100 focus-ring shadow-sm"
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
