import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import ContactDrawer from "./ContactDrawer";
import MenuDrawer from "./MenuDrawer";

/**
 * SiteNav — Minimalist Quiet Luxury Header with Soft Liquid Glass Apple UI.
 *
 * - Transparent at top of page.
 * - Smoothly transitions into frosted Apple liquid glass with subtle white translucency on scroll.
 */
export function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/[0.08] backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-8 lg:px-10 py-3 lg:py-4 w-full">
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
