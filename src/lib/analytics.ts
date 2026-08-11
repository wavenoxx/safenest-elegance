declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    trackGoogleConversion?: (actionType: string) => void;
  }
}

export const GADS_ACCOUNT_ID = "AW-18289280987";
export const GADS_PRIMARY_LEAD_CONVERSION = "AW-18289280987/1LHOCIOz2sgcENuPgZFE";

// Cache of fired conversion IDs in this browser session to prevent duplicate firing
const firedConversions = new Set<string>();

/**
 * Secondary / Observation Event Tracking
 * Tracks intent signals (phone clicks, WhatsApp link taps, navigation)
 * NEVER triggers primary Google Ads conversion actions.
 */
export function trackEngagement(
  action: "phone" | "whatsapp" | "email" | "navigation" | "survey_open",
  location: string,
) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: `click_${action}`,
      event_category: "Engagement",
      event_label: location,
      engagement_type: action,
      interaction_location: location,
      timestamp: new Date().toISOString(),
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", `click_${action}`, {
        event_category: "Engagement",
        event_label: location,
      });
    }
  } catch (err) {
    console.warn("[SafeNest Analytics] Engagement tracking notice:", err);
  }
}

/**
 * Primary Google Ads Lead Conversion Tracking
 * MUST ONLY fire after a genuine customer lead is successfully persisted and verified by the database.
 * Deduplicates with transaction_id / lead_id.
 */
export function trackQualifiedLead(leadData: {
  leadId: string;
  phone?: string;
  city?: string;
  value?: number;
}) {
  if (typeof window === "undefined") return;

  if (firedConversions.has(leadData.leadId)) {
    console.info(`[SafeNest Analytics] Lead conversion already fired for ID: ${leadData.leadId}`);
    return;
  }

  firedConversions.add(leadData.leadId);

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "qualified_lead_submission",
      lead_id: leadData.leadId,
      sanctuary_city: leadData.city,
      value: leadData.value ?? 50.0,
      currency: "INR",
      transaction_id: leadData.leadId,
      timestamp: new Date().toISOString(),
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: GADS_PRIMARY_LEAD_CONVERSION,
        value: leadData.value ?? 50.0,
        currency: "INR",
        transaction_id: leadData.leadId,
      });
      console.info(
        "[SafeNest Analytics] Primary Google Ads Lead conversion fired:",
        leadData.leadId,
      );
    }
  } catch (err) {
    console.warn("[SafeNest Analytics] Lead conversion tracking notice:", err);
  }
}

/**
 * SPA Page View Tracking for Client-Side Route Transitions
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_location: url,
      page_title: title || document.title,
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_location: url,
        page_title: title || document.title,
      });
    }
  } catch (err) {
    console.warn("[SafeNest Analytics] Page view tracking notice:", err);
  }
}
