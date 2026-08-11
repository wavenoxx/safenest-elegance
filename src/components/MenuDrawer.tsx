import { useEffect } from "react";
import { Link } from "@tanstack/react-router";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function MenuDrawer({ isOpen, onClose, onOpenContact }: MenuDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/35 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute left-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl p-8 md:p-12 flex flex-col justify-between transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center mb-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[10px] md:text-xs font-light tracking-[0.2em] text-neutral-500 hover:text-neutral-900 cursor-pointer uppercase bg-transparent border-0 outline-none"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Close
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-start overflow-y-auto">
          <nav className="flex flex-col text-xs md:text-sm font-light text-neutral-800 tracking-[0.08em] text-left">
            <Link to="/category/invisible-grills" onClick={onClose} className="font-sans font-light tracking-[0.08em] text-neutral-800 hover:text-neutral-950 transition-colors py-1.5">
              Invisible Grills
            </Link>
            <Link to="/category/core-safety-nets" onClick={onClose} className="font-sans font-light tracking-[0.08em] text-neutral-800 hover:text-neutral-950 transition-colors py-1.5">
              Core Safety Nets
            </Link>
            <Link to="/category/construction-industrial" onClick={onClose} className="font-sans font-light tracking-[0.08em] text-neutral-800 hover:text-neutral-950 transition-colors py-1.5">
              Construction & Industrial
            </Link>
            <Link to="/category/animal-bird-protection" onClick={onClose} className="font-sans font-light tracking-[0.08em] text-neutral-800 hover:text-neutral-950 transition-colors py-1.5">
              Animal & Bird Protection
            </Link>
            <Link to="/category/specialty-solutions" onClick={onClose} className="font-sans font-light tracking-[0.08em] text-neutral-800 hover:text-neutral-950 transition-colors py-1.5">
              Specialty Solutions
            </Link>

            <div className="w-12 h-[0.5px] bg-neutral-200 my-2" />

            <Link to="/lifestyle" onClick={onClose} className="font-sans font-light tracking-[0.08em] text-neutral-800 hover:text-neutral-950 transition-colors py-1.5">
              The Lifestyle
            </Link>
            <Link to="/craftsmanship" onClick={onClose} className="font-sans font-light tracking-[0.08em] text-neutral-800 hover:text-neutral-950 transition-colors py-1.5">
              The Craftsmanship
            </Link>
            <Link to="/our-story" onClick={onClose} className="font-sans font-light tracking-[0.08em] text-neutral-800 hover:text-neutral-950 transition-colors py-1.5">
              Our Story
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-5 border-t border-neutral-100 pt-8 text-xs font-light text-neutral-700 tracking-wider">
          <button
            onClick={onOpenContact}
            className="flex items-center gap-3 font-sans font-light tracking-[0.08em] text-neutral-800 hover:text-[#C5A880] transition-colors cursor-pointer bg-transparent border-0 outline-none text-left p-0"
          >
            <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Contact us
          </button>

          <div className="flex items-center gap-3 font-sans font-light tracking-[0.08em] text-neutral-800">
            <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            South India / English
          </div>
        </div>
      </div>
    </div>
  );
}
