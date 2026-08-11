import React, { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Pause } from "lucide-react";

const Hero = () => {
  const videoRefLeft = useRef<HTMLVideoElement>(null);
  const videoRefCenter = useRef<HTMLVideoElement>(null);
  const videoRefRight = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Respect user prefers-reduced-motion settings
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setIsPlaying(false);
        return;
      }
    }

    const playAll = async () => {
      const promises = [];
      if (videoRefCenter.current) promises.push(videoRefCenter.current.play().catch(() => {}));
      if (videoRefLeft.current) promises.push(videoRefLeft.current.play().catch(() => {}));
      if (videoRefRight.current) promises.push(videoRefRight.current.play().catch(() => {}));

      try {
        await Promise.all(promises);
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };
    playAll();
  }, []);

  const togglePlay = () => {
    const videos = [videoRefCenter, videoRefLeft, videoRefRight];
    if (isPlaying) {
      videos.forEach((ref) => ref.current?.pause());
      setIsPlaying(false);
    } else {
      videos.forEach((ref) => ref.current?.play().catch(() => {}));
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-[80vh] sm:h-[85vh] md:h-screen overflow-hidden bg-neutral-950 select-none">
      {/* 3-Panel Cinematic Triptych Grid */}
      <div className="absolute inset-0 w-full h-full flex flex-row opacity-75 transition-opacity duration-1000 z-0">
        {/* Left Video Panel */}
        <div className="hidden md:block md:w-1/3 h-full overflow-hidden relative border-r border-white/5">
          <video
            ref={videoRefLeft}
            src="/videos/hero-2.mp4"
            poster="/images/homepage/banner-2.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Center Video Panel */}
        <div className="w-full md:w-1/3 h-full overflow-hidden relative">
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

        {/* Right Video Panel */}
        <div className="hidden md:block md:w-1/3 h-full overflow-hidden relative border-l border-white/5">
          <video
            ref={videoRefRight}
            src="/videos/hero-3.mp4"
            poster="/images/homepage/banner-3.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Subtle Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none z-10" />

      {/* Center Action Link */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
        <Link
          to="/consultation"
          className="font-sans text-[10px] md:text-[11px] tracking-[0.3em] font-light uppercase text-white/90 border-b border-white/40 pb-1 hover:border-white hover:text-white transition-all duration-300 min-h-11 inline-flex items-center justify-center focus-ring px-3"
        >
          BOOK AN ADVISORY →
        </Link>
      </div>

      {/* Floating Play/Pause Button */}
      <div className="absolute bottom-8 left-6 md:left-10 z-30">
        <button
          type="button"
          onClick={togglePlay}
          className="min-w-11 min-h-11 flex items-center justify-center text-white/70 hover:text-white transition-opacity duration-300 focus-ring cursor-pointer"
          aria-label={isPlaying ? "Pause background videos" : "Play background videos"}
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
