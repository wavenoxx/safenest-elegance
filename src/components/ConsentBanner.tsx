import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";

export interface ConsentPreferences {
  ad_storage: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  updated_at: string;
}

const CONSENT_STORAGE_KEY = "safenest_consent_v2";

/**
 * Initializes Google Consent Mode v2 with default 'denied' states.
 * Executed before measurement tags process analytics or ads events.
 */
export function initializeGoogleConsentDefaults() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push({ gtag_args: args });
    };
  }

  // Check if existing user choice is stored in localStorage
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      const parsed: ConsentPreferences = JSON.parse(stored);
      window.gtag("consent", "default", {
        ad_storage: parsed.ad_storage,
        analytics_storage: parsed.analytics_storage,
        ad_user_data: parsed.ad_user_data,
        ad_personalization: parsed.ad_personalization,
        wait_for_update: 500,
      });
      return;
    }
  } catch {
    // Fall back to default denied
  }

  // Google Consent Mode v2 Default (Strict Privacy)
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
}

export function updateGoogleConsent(granted: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;

  const state: "granted" | "denied" = granted ? "granted" : "denied";
  const preferences: ConsentPreferences = {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    updated_at: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // LocalStorage quota or privacy mode
  }

  window.gtag("consent", "update", {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        // Delay slightly for a smooth, non-intrusive appearance
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    updateGoogleConsent(true);
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    updateGoogleConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy and Cookie Choices"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-xl p-5 md:p-6 text-neutral-900 rounded-none">
        <div className="flex items-start justify-between gap-4 mb-3">
          <p
            className="uppercase text-[9.5px] tracking-[0.28em] text-neutral-400 font-light"
            style={{ fontWeight: 300 }}
          >
            Privacy &amp; Data Stewardship
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
        </div>

        <h3 className="font-serif text-sm font-light text-neutral-900 uppercase tracking-wider mb-2">
          Your Privacy Choices
        </h3>

        <p className="text-[11.5px] text-neutral-600 font-light leading-relaxed mb-4">
          {BRAND_CONFIG.name} uses essential cookies for site security and optional analytical
          measurements to evaluate architectural inquiry quality. We respect your choice.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 inline-flex items-center justify-center bg-neutral-900 text-white px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-light hover:bg-neutral-800 transition-colors min-h-11 focus-ring cursor-pointer"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="flex-1 inline-flex items-center justify-center border border-neutral-300 bg-transparent text-neutral-800 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-light hover:border-neutral-900 transition-colors min-h-11 focus-ring cursor-pointer"
          >
            Essential Only
          </button>
        </div>

        <div className="mt-3 text-center">
          <Link
            to="/privacy"
            className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-neutral-900 hover:underline underline-offset-4 focus-ring"
          >
            Read Privacy Declaration →
          </Link>
        </div>
      </div>
    </aside>
  );
}
