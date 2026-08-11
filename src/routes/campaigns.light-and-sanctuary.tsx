import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/campaigns/light-and-sanctuary")({
  head: () =>
    buildMetaTags({
      title: "Light & Sanctuary — Editorial Campaign",
      description: "An interactive sensory portal exploring the philosophy of invisible safety.",
      canonicalPath: "/campaigns/light-and-sanctuary",
      noIndex: true,
    }),
  component: CampaignOne,
});

const HARP_LINES = 8;

const REVEAL_SECTIONS = [
  {
    image: "/images/campaigns/campaign-1-story-1.jpg",
    quote: "We do not build walls. We liberate the threshold.",
  },
  {
    image: "/images/campaigns/campaign-1-story-2.jpg",
    quote: "Security is not a cage. It is a dialogue with the sky.",
  },
  {
    image: "/images/campaigns/campaign-1-story-3.jpg",
    quote: "Where the edge fades, absolute trust begins.",
  },
];

function SafetyHarp() {
  const [strummed, setStrummed] = useState<Record<number, boolean>>({});

  const strum = (i: number) => {
    setStrummed((s) => ({ ...s, [i]: true }));
    window.setTimeout(() => {
      setStrummed((s) => {
        const next = { ...s };
        delete next[i];
        return next;
      });
    }, 900);
  };

  return (
    <div className="fixed inset-y-0 left-0 right-0 h-full pointer-events-none z-10">
      <div className="relative w-full h-full">
        {Array.from({ length: HARP_LINES }).map((_, i) => {
          const leftPct = ((i + 1) / (HARP_LINES + 1)) * 100;
          const active = strummed[i];
          return (
            <div key={i}>
              <div
                className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-200/40 to-transparent ${active ? "animate-strum" : ""}`}
                style={{ left: `${leftPct}%` }}
              />
              <div
                onMouseEnter={() => strum(i)}
                className="absolute top-0 bottom-0 w-8 -translate-x-4 cursor-pointer pointer-events-auto"
                style={{ left: `${leftPct}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RevealSection({ image, quote }: { image: string; quote: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setRevealed(true);
        });
      },
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-neutral-900 my-16"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
        <p className="font-serif italic text-xl md:text-2xl text-white tracking-wide font-light max-w-xl drop-shadow-md">
          {quote}
        </p>
      </div>
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-white transition-transform duration-[1200ms] ease-out origin-left z-20 ${revealed ? "translate-x-[-100%]" : ""}`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-white transition-transform duration-[1200ms] ease-out origin-right z-20 ${revealed ? "translate-x-[100%]" : ""}`}
      />
    </div>
  );
}

function CampaignOne() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative bg-white text-black">
      <style>{`
        @keyframes strum {
          0%, 100% { transform: translateX(0) scaleX(1); filter: drop-shadow(0 0 0px rgba(251,191,36,0)); }
          20% { transform: translateX(-10px) scaleX(1.15); filter: drop-shadow(0 0 10px rgba(245,158,11,0.8)); }
          40% { transform: translateX(8px) scaleX(0.9); filter: drop-shadow(0 0 8px rgba(245,158,11,0.6)); }
          60% { transform: translateX(-5px) scaleX(1.08); filter: drop-shadow(0 0 5px rgba(245,158,11,0.4)); }
          80% { transform: translateX(3px) scaleX(0.97); filter: drop-shadow(0 0 3px rgba(245,158,11,0.2)); }
        }
        .animate-strum {
          animation: strum 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
      `}</style>

      <SiteNav />
      <SafetyHarp />

      <section className="w-full aspect-[2.39/1] relative overflow-hidden bg-neutral-900">
        <video
          ref={videoRef}
          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4c9b3e0d283f5d16d634b82d920&profile_id=165&oauth2_token_id=57447761"
          poster="/images/campaigns/campaign-1-hero.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-6 right-6 z-20 px-4 py-2 border border-white/60 text-white text-[10px] tracking-[0.25em] font-light uppercase bg-black/20 hover:bg-white hover:text-black transition-colors duration-300"
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? "Pause" : "Play"}
        </button>
      </section>

      <section className="py-20 px-6 max-w-3xl mx-auto text-center bg-white">
        <span className="font-sans text-[10px] tracking-[0.25em] text-neutral-400 mb-4 uppercase font-light block">
          The Edit
        </span>
        <span className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-black mb-6 uppercase block">
          Light &amp; Sanctuary
        </span>
        <p className="text-[13px] md:text-[14px] leading-relaxed text-neutral-600 font-light max-w-2xl mx-auto">
          An exploration of architectural lightness. At {BRAND_CONFIG.name}, we believe security
          should enhance your view, not hide it. Our campaign captures the dialogue between open
          spaces and unyielding invisible protection. Natural light and airy proportions run through
          our installations, defining an aesthetic balanced between safety, precision, and freedom.
        </p>
      </section>

      {REVEAL_SECTIONS.map((s, i) => (
        <RevealSection key={i} image={s.image} quote={s.quote} />
      ))}

      <section className="py-24 bg-neutral-50 flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-neutral-900 mb-8 uppercase">
          Curate Your Sanctuary
        </h2>
        <Link
          to="/consultation"
          className="px-8 py-4 border border-neutral-800 text-[10px] tracking-[0.2em] font-sans font-light uppercase hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-none bg-transparent"
        >
          Request Survey
        </Link>
      </section>

      <Footer />
    </div>
  );
}
