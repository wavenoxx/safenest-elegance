import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import ContactDrawer from "./ContactDrawer";
import MenuDrawer from "./MenuDrawer";

/**
 * SiteNav — Prada-Inspired Minimalist Luxury Header.
 *
 * Directives:
 * - Left: Clean 2-line Menu icon + "Menu" text.
 * - Center: SAFENEST brand wordmark (-15% to 20% refined size, Cormorant Garamond 300, 0.32em tracking).
 * - Right: "Contact us" (triggers ContactDrawer).
 * - "Request Survey" link removed from header.
 * - Identical clean layout on desktop and mobile.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled;

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms] ease-out",
          dark ? "bg-white/95 backdrop-blur-md text-black shadow-xs" : "bg-transparent text-white",
        ].join(" ")}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-8 lg:px-12 py-3.5 lg:py-4">
          {/* Left: Prada-style 2-line Menu Icon + Menu Text */}
          <div className="flex items-center gap-6 min-w-0">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2.5 min-h-11 min-w-11 px-1 cursor-pointer group focus-ring text-current"
              aria-label="Open navigation menu"
            >
              {/* Minimalist 2-line icon matching Prada header reference */}
              <span className="flex flex-col gap-[5px] justify-center">
                <span className="block w-[16px] h-px bg-current transition-transform duration-300" />
                <span className="block w-[16px] h-px bg-current transition-transform duration-300" />
              </span>
              <span
                className="text-[12px] sm:text-[13px] font-light tracking-[0.04em]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Menu
              </span>
            </button>
          </div>

          {/* Center: SAFENEST Brand Logo (-15% to 20% refined luxury proportion) */}
          <Link
            to="/"
            className="font-serif text-[19px] sm:text-[22px] lg:text-[25px] tracking-[0.32em] uppercase whitespace-nowrap min-h-11 flex items-center justify-center focus-ring px-2 transition-all font-light"
            style={{ fontWeight: 300 }}
          >
            {BRAND_CONFIG.name}
          </Link>

          {/* Right: Prada-style "Contact us" */}
          <div className="flex items-center justify-end min-w-0">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="text-[12px] sm:text-[13px] font-light tracking-[0.04em] cursor-pointer min-h-11 px-2 focus-ring text-current hover:opacity-75 transition-opacity"
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
