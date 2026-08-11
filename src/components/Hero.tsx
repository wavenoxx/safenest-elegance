import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";

/**
 * Hero — Pure Black Screen & Exact Quiet Luxury Typography.
 *
 * Directives:
 * - Pure black visual canvas (zero visual images).
 * - Desktop & Mobile (9:16) containers styled as deep black canvases.
 * - H1 Headline: "INVISIBLE GRILLS & SAFETY NETS" (Exact unified sn-h1 typography).
 * - Subtext: "Architectural safety for modern discerning homes." (Exact sn-subtext).
 * - Eyebrow: "SAFENEST · ARCHITECTURAL SAFETY" (Exact sn-eyebrow).
 * - Luxury framed CTAs matching reference image.
 */
const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#050505] sn-black-visual select-none"
      style={{ height: "100dvh", minHeight: "600px" }}
      aria-label="SafeNest Architectural Safety Hero"
    >
      {/* Desktop Visual Container (Pure Black Canvas) */}
      <div
        className="hidden md:block absolute inset-0 w-full h-full bg-[#050505] z-0"
        data-slot="desktop-hero-canvas"
      >
        <div className="w-full h-full bg-radial from-neutral-900/15 via-[#050505] to-[#050505]" />
      </div>

      {/* Mobile Visual Container (9:16 Aspect Ratio Canvas) */}
      <div
        className="md:hidden absolute inset-0 w-full h-full bg-[#050505] z-0"
        data-slot="mobile-hero-canvas-9-16"
      >
        <div className="w-full h-full bg-radial from-neutral-900/15 via-[#050505] to-[#050505]" />
      </div>

      {/* Subtle Atmospheric Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.05) 40%, rgba(5,5,5,0.15) 70%, rgba(5,5,5,0.85) 100%)",
        }}
      />

      {/* Editorial Content Overlay (Lower-Third Placement matching Reference Image) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-16 sm:pb-20 md:pb-24 px-6 md:px-12 text-center">
        {/* Unified H1 Headline */}
        <h1 className="sn-h1 text-white max-w-2xl drop-shadow-sm mb-3">
          Invisible Grills &amp; Safety Nets
        </h1>

        {/* Unified Subtext Descriptor */}
        <p className="sn-subtext text-neutral-300 max-w-md mb-8">
          Architectural safety for modern discerning homes.
        </p>

        {/* Luxury Framed Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/consultation"
            className="sn-btn-luxury-solid focus-ring"
          >
            Request Site Survey
          </Link>
          <Link
            to="/solutions"
            className="sn-btn-luxury focus-ring"
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
