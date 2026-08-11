import React, { useEffect } from "react";
import { BRAND_CONFIG } from "@/config/brand";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  // Close drawer on Escape key press
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
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!isOpen}
      />

      {/* Slide-over Sidebar */}
      <div
        className={[
          "fixed top-0 right-0 z-[80] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Client Service"
      >
        {/* Top Header & Close */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6">
          <h2 className="text-xl font-light tracking-wide text-neutral-900">
            Client Service
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 flex items-center justify-center text-neutral-800 hover:text-black transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {/* 4 Symmetrical Framed Boxes */}
          <div className="flex flex-col gap-4">
            {/* WhatsApp */}
            <a
              href={BRAND_CONFIG.socials.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => (window as any).trackGoogleConversion?.('whatsapp')}
              className="w-full border border-neutral-200 p-5 flex items-center justify-between text-left hover:border-neutral-800 transition-colors duration-300 group"
            >
              <span className="text-sm font-light text-neutral-900 tracking-wide">
                WhatsApp
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-5 h-5 text-neutral-400 group-hover:text-neutral-800 transition-colors"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Email */}
            <a
              href={`mailto:${BRAND_CONFIG.contact.email}`}
              className="w-full border border-neutral-200 p-5 flex items-center justify-between text-left hover:border-neutral-800 transition-colors duration-300 group"
            >
              <span className="text-sm font-light text-neutral-900 tracking-wide">
                Send us an e-mail
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-5 h-5 text-neutral-400 group-hover:text-neutral-800 transition-colors"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 5l10 7 10-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Call Us */}
            <a
              href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
              onClick={() => (window as any).trackGoogleConversion?.('phone')}
              className="w-full border border-neutral-200 p-5 flex items-center justify-between text-left hover:border-neutral-800 transition-colors duration-300 group"
            >
              <span className="text-sm font-light text-neutral-900 tracking-wide">
                Call us {BRAND_CONFIG.contact.phoneDisplay}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-5 h-5 text-neutral-400 group-hover:text-neutral-800 transition-colors"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Live Chat (Offline) */}
            <button
              disabled
              className="w-full border border-neutral-200 p-5 flex items-center justify-between text-left opacity-50 cursor-not-allowed"
            >
              <span className="text-sm font-light text-neutral-900 tracking-wide">
                Live Chat (Offline)
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-5 h-5 text-neutral-400"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Bottom Description */}
          <div className="mt-8 text-center">
            <p className="text-xs font-light text-neutral-500 leading-relaxed">
              You can contact our Client Service by phone at{" "}
              <a
                href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
                onClick={() => (window as any).trackGoogleConversion?.('phone')}
                className="text-neutral-500 hover:text-neutral-800 underline font-medium"
              >
                {BRAND_CONFIG.contact.phoneDisplay}
              </a>{" "}
              (Monday to Saturday from 9 AM to 8 PM, Indian Standard Time), by WhatsApp at{" "}
              <a
                href={BRAND_CONFIG.socials.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => (window as any).trackGoogleConversion?.('whatsapp')}
                className="text-neutral-500 hover:text-neutral-800 underline font-medium"
              >
                {BRAND_CONFIG.contact.whatsappDisplay}
              </a>
              , or by email at{" "}
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="text-neutral-500 hover:text-neutral-800 underline font-medium"
              >
                {BRAND_CONFIG.contact.email}
              </a>
              . Our regional operations team serves high-rise residences and estates across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, and Kerala.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
