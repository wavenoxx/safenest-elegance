import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/campaigns/silent-promise")({
  head: () =>
    buildMetaTags({
      title: "The Silent Promise — Editorial Campaign",
      description: "A promise of architectural protection, suspended in thin air.",
      canonicalPath: "/campaigns/silent-promise",
      noIndex: true,
    }),
  component: CampaignThree,
});

const HERO_VIDEO =
  "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4c9b3e0d283f5d16d634b82d920&profile_id=165&oauth2_token_id=57447761";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80";
const SKY_IMG =
  "https://images.unsplash.com/photo-1530908295418-a12e326966ba?auto=format&fit=crop&w=1920&q=80";
const SUNSET_IMG =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80";

interface TrustNode {
  id: number;
  x: number;
  y: number;
  label: string;
  spec: string;
}

const trustNodes: TrustNode[] = [
  { id: 1, x: 500, y: 200, label: "TENSION LOCK", spec: "HIGH-TENSILE ANCHORAGE PROFILE" },
  { id: 2, x: 300, y: 400, label: "MARINE GRADE CABLE", spec: "AISI 316 MARINE GRADE ALLOY" },
  { id: 3, x: 700, y: 400, label: "NYLON-12 COATING", spec: "UV-RESISTANT THERMOPLASTIC SHEATH" },
  { id: 4, x: 500, y: 600, label: "PRESSURE ANCHOR", spec: "EXTRUDED DUAL-KEY ALUMINUM PROFILE" },
];

function CampaignThree() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shadowContainerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [viewportState, setViewportState] = useState(1);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  const getShadowPath = (defaultX: number) => {
    if (!shadowContainerRef.current) return `M ${defaultX} 450 L ${defaultX} 750`;
    const rect = shadowContainerRef.current.getBoundingClientRect();
    const svgX = ((mousePos.x - rect.left) / rect.width) * 1000;
    const svgY = ((mousePos.y - rect.top) / rect.height) * 800;
    const yRail = 450;
    const yFloor = 750;
    const dy = yRail - svgY;
    const dx = defaultX - svgX;
    const projectedX = defaultX + ((yFloor - yRail) * dx) / (dy === 0 ? 1 : dy);
    const clampedX = Math.max(-200, Math.min(1200, projectedX));
    return `M ${defaultX} ${yRail} L ${clampedX} ${yFloor}`;
  };

  const wires = Array.from({ length: 15 }, (_, i) => 250 + (i * 500) / 14);  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white select-none overflow-x-hidden font-sans">
      <style>{`
        @keyframes breath {
          0%, 100% { transform: scale(1.02); }
          50% { transform: scale(1.08); }
        }
        .breath-bg { animation: breath 14s ease-in-out infinite; }
        @keyframes shimmer {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.75; }
        }
        .shimmer-wire { animation: shimmer 4s ease-in-out infinite; }
        @keyframes pulseNode {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.4); opacity: 0.3; }
        }
        .pulse-node { animation: pulseNode 2.6s ease-in-out infinite; }
      `}</style>

      <SiteNav />

      {/* 1. HERO (Pure Black Canvas) */}
      <div className="w-full relative overflow-hidden sn-black-visual min-h-[60vh] md:min-h-0 md:aspect-[2.39/1] flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-radial from-neutral-900/25 to-[#050505]" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
          <span className="sn-eyebrow text-neutral-400 mb-3 block">
            CAMPAIGN SERIES Ⅲ
          </span>
          <h1 className="sn-h1 text-white max-w-xl mb-4">
            THE SILENT PROMISE
          </h1>
          <p className="font-serif italic text-xs md:text-sm text-neutral-300 font-light tracking-wide max-w-sm">
            A pinky promise of protection, suspended in thin air.
          </p>
        </div>
      </div>

      {/* 2. EXPERIENCE 01 — THE CELESTIAL SKYDECK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-14">
          <span className="font-sans text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-light">
            INTERACTIVE EXPERIENCE 01
          </span>
          <h2 className="font-serif text-lg md:text-2xl font-light tracking-[0.15em] uppercase whitespace-nowrap text-center mt-4 mb-5 text-white">
            THE CELESTIAL SKYDECK
          </h2>
          <p className="font-serif italic text-sm md:text-base text-neutral-300 font-light max-w-xl mx-auto">
            Move your cursor across the window deck. Your cursor acts as a sunlight source,
            projecting dynamic angles of safety lines on the floor.
          </p>
        </div>

        <div
          ref={shadowContainerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-neutral-900 cursor-crosshair border border-white/10"
        >
          <div className="absolute inset-0 w-full h-full sn-black-visual opacity-90">
            <div className="w-full h-full bg-radial from-neutral-900/30 to-[#050505]" />
          </div>
          <svg
            viewBox="0 0 1000 800"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* Balcony floor */}
            <rect x="0" y="750" width="1000" height="50" fill="#1a1a1a" opacity="0.7" />
            <rect x="0" y="445" width="1000" height="6" fill="#C5A880" opacity="0.5" />
            {/* Vertical cords */}
            {wires.map((wX, idx) => (
              <line
                key={`w-${idx}`}
                x1={wX}
                y1={150}
                x2={wX}
                y2={450}
                stroke="#C5A880"
                strokeWidth={0.8}
                opacity={0.55}
                className="shimmer-wire"
              />
            ))}
            {/* Projected shadows */}
            {wires.map((wX, idx) => (
              <path
                key={`s-${idx}`}
                d={getShadowPath(wX)}
                stroke="#000"
                strokeOpacity={0.55}
                strokeWidth={1}
                fill="none"
              />
            ))}
          </svg>
        </div>
      </section>

      {/* 3. EXPERIENCE 02 — GUARDIAN PROMISE */}
      <section className="w-full bg-neutral-950 text-white py-28 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="font-sans text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-light">
              INTERACTIVE EXPERIENCE 02
            </span>
            <h2 className="font-serif text-lg md:text-2xl font-light tracking-[0.15em] uppercase whitespace-nowrap text-center mt-4 mb-5">
              THE GUARDIAN PROMISE
            </h2>
            <p className="font-serif italic text-sm md:text-base text-neutral-400 font-light max-w-xl mx-auto">
              Hover over the structural connection nodes to activate the integrity telemetry of{" "}
              {BRAND_CONFIG.name}'s safety anchors.
            </p>
          </div>

          <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-[#C5A880]/15 overflow-hidden">
            <svg
              viewBox="0 0 1000 800"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              {/* Constellation links */}
              {trustNodes.map((a) =>
                trustNodes
                  .filter((b) => b.id > a.id)
                  .map((b) => (
                    <line
                      key={`${a.id}-${b.id}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="#C5A880"
                      strokeOpacity={0.25}
                      strokeWidth={0.6}
                    />
                  )),
              )}
              <text
                x="500"
                y="410"
                textAnchor="middle"
                className="font-serif"
                fill="#C5A880"
                opacity="0.35"
                style={{ fontSize: 28, letterSpacing: "0.3em" }}
              >
                PROMISE
              </text>
            </svg>

            {trustNodes.map((node) => {
              const isHovered = activeNode === node.id;
              const leftPct = (node.x / 1000) * 100;
              const topPct = (node.y / 800) * 100;
              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-[#C5A880] pulse-node" />
                    <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                  </div>
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 mt-4 w-56 p-4 bg-neutral-900/95 border border-[#C5A880]/40 transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                  >
                    <p className="font-sans text-[9px] tracking-[0.3em] text-[#C5A880] uppercase font-light mb-1">
                      {node.label}
                    </p>
                    <p className="font-serif italic text-xs text-neutral-300 font-light">
                      {node.spec}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE 03 — HORIZON PORTAL */}
      <section className="w-full bg-[#050505] py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="font-sans text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-light">
              INTERACTIVE EXPERIENCE 03
            </span>
            <h2 className="font-serif text-lg md:text-2xl font-light tracking-[0.15em] uppercase whitespace-nowrap text-center mt-4 mb-5 text-white">
              THE HORIZON PORTAL
            </h2>
            <p className="font-serif italic text-sm md:text-base text-neutral-300 font-light max-w-xl mx-auto">
              Adjust the viewport layer selector to examine how {BRAND_CONFIG.name} integrates
              safety grids and insect screening without compromising your view.
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-3">
                {[
                  { state: 0, label: "01. THE VOID" },
                  { state: 1, label: "02. THE THREAD (INVISIBLE GRILLS)" },
                  { state: 2, label: "03. THE VEIL (MOSQUITO SCREEN)" },
                ].map((btn) => (
                  <button
                    key={btn.state}
                    onClick={() => setViewportState(btn.state)}
                    className={`w-full text-left p-4 border transition-all duration-500 rounded-none bg-transparent cursor-pointer font-sans text-[10px] tracking-[0.25em] uppercase font-light ${
                      viewportState === btn.state
                        ? "border-[#C5A880] text-[#C5A880] bg-[#C5A880]/5"
                        : "border-white/15 text-neutral-300 hover:border-white/40"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full max-w-sm md:max-w-none aspect-[4/5] bg-neutral-900 border-2 border-neutral-900 relative overflow-hidden p-3 mx-auto md:mr-0">
              <div className="relative w-full h-full overflow-hidden border border-[#C5A880]/40">
                <div className="absolute inset-0 w-full h-full sn-black-visual">
                  <div className="w-full h-full bg-radial from-neutral-900/30 to-[#050505]" />
                </div>
                {/* Layer 1: THREAD */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: viewportState >= 1 ? 0.7 : 0 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(197,168,128,0.7) 0 1px, transparent 1px 38px)",
                    }}
                  />
                </div>
                {/* Layer 2: VEIL */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: viewportState === 2 ? 0.55 : 0 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 4px), repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 4px)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <div className="py-28 bg-[#050505] w-full flex flex-col items-center justify-center text-center px-6">
        <span className="font-sans text-[9px] tracking-[0.3em] text-neutral-400 mb-4 uppercase font-light">
          TAILORED PROTECTION
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-white mb-8 uppercase">
          CURATE YOUR VOIDS
        </h2>
        <Link
          to="/consultation"
          className="sn-btn-luxury-solid"
        >
          REQUEST SURVEY
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default CampaignThree;
