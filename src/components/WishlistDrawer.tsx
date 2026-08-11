import { useEffect } from "react";
import { toast } from "sonner";
import { useWishlist } from "./WishlistContext";
import { BRAND_CONFIG } from "@/config/brand";

export function WishlistDrawer() {
  const { items, isOpen, close, remove } = useWishlist();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  const handleRequestQuote = () => {
    const names = items.map((i) => i.title.replace(/\n/g, " ")).join(", ");
    close();
    setTimeout(() => {
      const target =
        document.querySelector<HTMLElement>("#get-quote") ||
        document.querySelector<HTMLElement>("#contact") ||
        document.querySelector<HTMLElement>("footer");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      const textarea = document.querySelector<HTMLTextAreaElement>(
        '#get-quote textarea, #contact textarea, textarea[name="message"]',
      );
      if (textarea && names) {
        textarea.value = `Hello ${BRAND_CONFIG.name}, I am interested in requesting a regional square-footage measurements quote for these favorite safety systems: ${names}`;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        textarea.focus();
      }
    }, 350);
  };

  const handleShare = async () => {
    const text = items.length
      ? `My ${BRAND_CONFIG.name} favorites:\n${items.map((i) => `• ${i.title.replace(/\n/g, " ")}`).join("\n")}`
      : `My ${BRAND_CONFIG.name} favorites: (none yet)`;
    try {
      await navigator.clipboard.writeText(text);
      toast("Favorites copied to clipboard.");
    } catch {
      toast("Could not copy to clipboard.");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden={!isOpen}
        className={[
          "fixed inset-0 bg-black/25 backdrop-blur-[2px] z-[70] transition-opacity duration-500 ease-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Wishlist"
        aria-hidden={!isOpen}
        className={[
          "fixed top-0 right-0 z-[80] h-screen w-full max-w-lg bg-white shadow-2xl",
          "transform transition-transform duration-500 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close wishlist"
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-black cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.25">
            <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-6 sm:px-10">
          <h2
            className="font-display text-center uppercase text-xl mt-16"
            style={{ fontWeight: 300, letterSpacing: "0.12em", color: "#000000" }}
          >
            Don't Lose Your Favorites Anymore
          </h2>
          <p
            className="text-center mx-auto max-w-sm mt-3 px-4 text-[12px] leading-relaxed"
            style={{ fontWeight: 300, color: "#666666", fontFamily: "'Inter','Montserrat',sans-serif" }}
          >
            Save your selections to request a customized square-footage measurements quote.
          </p>

          <button
            type="button"
            onClick={handleRequestQuote}
            className="mt-8 w-full max-w-xs mx-auto block rounded-full bg-black text-white px-8 py-3 text-xs uppercase tracking-wider cursor-pointer hover:bg-neutral-800 transition-colors duration-300"
            style={{ fontWeight: 300, letterSpacing: "0.18em" }}
          >
            Request Quote for Selection
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="mt-3 w-full max-w-xs mx-auto block rounded-full border border-black bg-transparent text-black px-8 py-3 text-xs uppercase tracking-wider cursor-pointer hover:bg-black hover:text-white transition-colors duration-300"
            style={{ fontWeight: 300, letterSpacing: "0.18em" }}
          >
            Share Selection
          </button>

          <div className="border-b border-neutral-100 my-8" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-10">
          {items.length === 0 ? (
            <p
              className="text-center py-16 text-xs"
              style={{
                fontWeight: 300,
                color: "#999999",
                letterSpacing: "0.15em",
                fontFamily: "'Inter','Montserrat',sans-serif",
              }}
            >
              YOUR WISHLIST IS CURRENTLY EMPTY.
              <br />
              EXPLORE OUR COLLECTIONS TO ADD FAVORITES.
            </p>
          ) : (
            <ul className="space-y-8">
              {items.map((item) => (
                <li key={item.id} className="w-full">
                  <div className="relative bg-[#F6F6F6] aspect-square w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.title}`}
                      className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-black/70 hover:text-black cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.25">
                        <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        className="text-[12px]"
                        style={{
                          fontWeight: 300,
                          color: "#000000",
                          fontFamily: "'Inter','Montserrat',sans-serif",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {item.title}
                      </p>
                      <a
                        href="#get-quote"
                        onClick={close}
                        className="mt-1 inline-block text-[10px] uppercase underline underline-offset-4 decoration-[0.5px]"
                        style={{
                          fontWeight: 300,
                          color: "#666666",
                          letterSpacing: "0.15em",
                          fontFamily: "'Inter','Montserrat',sans-serif",
                        }}
                      >
                        Price Upon Request
                      </a>
                    </div>
                    <a
                      href="#get-quote"
                      onClick={close}
                      aria-label="Inquire"
                      className="shrink-0 w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-black/70 hover:text-black hover:border-black transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.25">
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}