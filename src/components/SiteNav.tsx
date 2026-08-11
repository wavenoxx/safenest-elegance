import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import ContactDrawer from "./ContactDrawer";
import MenuDrawer from "./MenuDrawer";

/**
 * SiteNav — Minimalist Quiet Luxury Header.
 *
 * Designed with zero layout shift / zero text shake:
 * - Steady, deterministic layout with zero transition-all.
 * - Left: 2-line minimalist Menu button.
 * - Center: SAFENEST brand wordmark.
 * - Right: "Contact us" client service trigger.
 * - Pure quiet luxury dark theme matching site aesthetic.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const routerState = useRouterState();
  const isHomepage = routerState.location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [routerState.location.pathname]);

  // On non-homepage subpages or when scrolled, show crisp backdrop blur
  const isSolid = !isHomepage || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          isSolid
            ? "bg-[#050505]/95 backdrop-blur-md text-white border-b border-white/10 shadow-xs"
            : "bg-transparent text-white"
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-8 lg:px-12 py-3.5 lg:py-4 max-w-7xl mx-auto w-full">
          {/* Left: 2-line Menu Icon + Menu Text */}
          <div className="flex items-center gap-6 min-w-0">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2.5 min-h-11 min-w-11 px-1 cursor-pointer group focus-ring text-white hover:opacity-80 transition-opacity"
              aria-label="Open navigation menu"
            >
              <span className="flex flex-col gap-[5px] justify-center">
                <span className="block w-[16px] h-px bg-white" />
                <span className="block w-[16px] h-px bg-white" />
              </span>
              <span
                className="text-[12px] sm:text-[13px] font-light tracking-[0.04em]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Menu
              </span>
            </button>
          </div>

          {/* Center: SAFENEST Brand Logo */}
          <Link
            to="/"
            className="font-serif text-[19px] sm:text-[22px] lg:text-[25px] tracking-[0.32em] uppercase whitespace-nowrap min-h-11 flex items-center justify-center focus-ring px-2 text-white font-light"
            style={{ fontWeight: 300 }}
          >
            {BRAND_CONFIG.name}
          </Link>

          {/* Right: Contact us */}
          <div className="flex items-center justify-end min-w-0">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="text-[12px] sm:text-[13px] font-light tracking-[0.04em] cursor-pointer min-h-11 px-2 focus-ring text-white hover:opacity-75 transition-opacity"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              aria-label="Open client service contact"
            >
              Contact us
            </button>
          </div>
        </div>
      </header>

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenContact={() => {
          setIsMenuOpen(false);
          setIsContactOpen(true);
        }}
      />
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

export default SiteNav;
