import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Pause } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

const Hero = () => {
  const videoRefCenter = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    // Check prefers-reduced-motion and Save-Data
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const isSaveData = connection?.saveData;

    if (prefersReducedMotion || isSaveData) {
      setIsPlaying(false);
      return () => window.removeEventListener("resize", checkMobile);
    }

    const playVideo = async () => {
      if (videoRefCenter.current) {
        try {
          await videoRefCenter.current.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    };
    playVideo();

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const togglePlay = () => {
    if (!videoRefCenter.current) return;
    if (isPlaying) {
      videoRefCenter.current.pause();
      setIsPlaying(false);
    } else {
      videoRefCenter.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-[85vh] sm:h-[90vh] md:h-screen overflow-hidden bg-neutral-950 select-none">
      {/* 3-Panel Cinematic Triptych Grid */}
      <div className="absolute inset-0 w-full h-full flex flex-row opacity-80 transition-opacity duration-1000 z-0">
        {/* Left Still Photography Panel (desktop only) */}
        <div className="hidden md:block md:w-1/3 h-full overflow-hidden relative border-r border-white/5 bg-neutral-900">
          <img
            src="/images/homepage/banner-2.jpg"
            alt="SafeNest Balcony Invisible Grills Architecture"
            width={720}
            height={1280}
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
        </div>

        {/* Center Video / LCP Panel */}
        <div className="w-full md:w-1/3 h-full overflow-hidden relative bg-neutral-900">
          <video
            ref={videoRefCenter}
            src="/videos/hero-1.mp4"
            poster="/images/homepage/banner-1.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Still Photography Panel (desktop only) */}
        <div className="hidden md:block md:w-1/3 h-full overflow-hidden relative border-l border-white/5 bg-neutral-900">
          <img
            src="/images/homepage/banner-3.jpg"
            alt="SafeNest High-Rise Safety Net Installation"
            width={720}
            height={1280}
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
        </div>
      </div>

      {/* Subtle Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/85 pointer-events-none z-10" />

      {/* Semantic H1 & Headline Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-4xl mx-auto pt-16">
        <span
          className="text-[10px] md:text-[11px] font-sans font-light tracking-[0.35em] uppercase text-white/80 mb-3 block"
          style={{ letterSpacing: "0.3em" }}
        >
          {BRAND_CONFIG.name} · Architectural Safety
        </span>

        {/* Visible, Semantic H1 */}
        <h1
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] text-white uppercase leading-tight max-w-3xl drop-shadow-sm"
          style={{ fontWeight: 300 }}
        >
          Invisible Grills &amp; Safety Nets for Safer Homes
        </h1>

        {/* Clear Supporting Line */}
        <p
          className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-light text-neutral-200/90 leading-relaxed max-w-2xl drop-shadow-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Measured, specified and installed for balconies, windows, children, birds and open edges
          across verified {BRAND_CONFIG.name} service areas.
        </p>

        {/* Action Link */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/consultation"
            className="rounded-full bg-white text-neutral-950 px-8 py-3.5 text-[10px] md:text-[11px] tracking-[0.25em] font-light uppercase hover:bg-neutral-200 transition-colors duration-300 min-h-11 inline-flex items-center justify-center focus-ring shadow-lg"
          >
            Request Site Survey
          </Link>
          <Link
            to="/solutions"
            className="rounded-full border border-white/40 text-white px-8 py-3.5 text-[10px] md:text-[11px] tracking-[0.25em] font-light uppercase hover:border-white hover:bg-white/10 transition-colors duration-300 min-h-11 inline-flex items-center justify-center focus-ring"
          >
            Explore Solutions
          </Link>
        </div>
      </div>

      {/* Floating Play/Pause Button */}
      <div className="absolute bottom-8 left-6 md:left-10 z-30">
        <button
          type="button"
          onClick={togglePlay}
          className="min-w-11 min-h-11 flex items-center justify-center text-white/70 hover:text-white transition-opacity duration-300 focus-ring cursor-pointer"
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
        >
          {isPlaying ? (
            <Pause size={16} className="stroke-[1.5]" />
          ) : (
            <Play size={16} className="stroke-[1.5]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Hero;
