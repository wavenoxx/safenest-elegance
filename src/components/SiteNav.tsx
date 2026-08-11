import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import ContactDrawer from "./ContactDrawer";
import MenuDrawer from "./MenuDrawer";

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
          dark ? "bg-white/90 backdrop-blur-md text-black shadow-xs" : "bg-transparent text-white",
        ].join(" ")}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-12 py-3 lg:py-4">
          {/* Left */}
          <div className="flex items-center gap-6 min-w-0">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 min-h-11 min-w-11 px-1 cursor-pointer group focus-ring"
              aria-label="Open navigation menu"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block w-[18px] h-px bg-current" />
                <span className="block w-[18px] h-px bg-current" />
                <span className="block w-[18px] h-px bg-current" />
              </span>
              <span className="hidden sm:inline text-[12px] font-light tracking-[0.08em] uppercase">
                Menu
              </span>
            </button>
          </div>

          {/* Center */}
          <Link
            to="/"
            className="font-display text-[15px] sm:text-[18px] lg:text-[20px] tracking-[0.4em] uppercase whitespace-nowrap min-h-11 flex items-center justify-center focus-ring px-2"
            style={{ fontWeight: 400 }}
          >
            {BRAND_CONFIG.name}
          </Link>

          {/* Right */}
          <div className="flex items-center justify-end gap-3 sm:gap-6 min-w-0">
            <Link
              to="/consultation"
              className="hidden sm:inline-flex items-center text-[11px] sm:text-[12px] font-light tracking-widest uppercase hover:underline underline-offset-4 min-h-11 px-2 focus-ring"
            >
              Request Survey
            </Link>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="text-[11px] sm:text-[12px] font-light tracking-widest uppercase hover:underline underline-offset-4 cursor-pointer min-h-11 px-2 focus-ring"
              aria-label="Open client service contact advisory"
            >
              Advisory
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
