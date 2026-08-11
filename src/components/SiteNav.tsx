import { useEffect, useState } from "react";
import { BRAND_CONFIG } from "@/config/brand";
import { useWishlist } from "./WishlistContext";
import ContactDrawer from "./ContactDrawer";
import MenuDrawer from "./MenuDrawer";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.11 4.91A10 10 0 0 0 2.05 15.36L1 22l6.79-1.04A10 10 0 1 0 19.11 4.91Zm-7.1 15.27a8.32 8.32 0 0 1-4.24-1.16l-.3-.18-4.03.62.66-3.93-.2-.31a8.32 8.32 0 1 1 8.11 4.96Zm4.56-6.23c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.79.97-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48a.93.93 0 0 0-.67.31 2.83 2.83 0 0 0-.88 2.1c0 1.24.9 2.45 1.03 2.62.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.6.19 1.15.16 1.58.1.48-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.18-.48-.31Z"/>
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { items, open: openWishlist } = useWishlist();

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
          dark
            ? "bg-white/85 backdrop-blur-md text-black"
            : "bg-transparent text-white",
        ].join(" ")}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-12 py-4 lg:py-5">
          {/* Left */}
          <div className="flex items-center gap-6 min-w-0">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 min-h-11 cursor-pointer group"
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block w-[18px] h-px bg-current" />
                <span className="block w-[18px] h-px bg-current" />
                <span className="block w-[18px] h-px bg-current" />
              </span>
              <span className="hidden sm:inline text-[12px] font-light tracking-[0.05em]">Menu</span>
            </button>
          </div>

          {/* Center */}
          <a
            href="/"
            className="font-display text-[15px] sm:text-[18px] lg:text-[20px] tracking-[0.4em] uppercase whitespace-nowrap"
            style={{ fontWeight: 400 }}
          >
            {BRAND_CONFIG.name}
          </a>

          {/* Right */}
          <div className="flex items-center justify-end gap-3 min-w-0">
            <button
              type="button"
              onClick={openWishlist}
              aria-label="View Wishlist"
              className="relative p-1 flex items-center justify-center transition-opacity hover:opacity-70 cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {items.length > 0 && (
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-current rounded-full" />
              )}
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-[11px] sm:text-[12px] font-light tracking-widest hover:underline underline-offset-4 cursor-pointer"
              aria-label="Call Us"
            >
              Call Us
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
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}