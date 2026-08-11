import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BRAND_CONFIG } from "@/config/brand";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { submitConsultationServerFn } from "@/functions/consultation";
import { trackQualifiedLead, trackEngagement } from "@/lib/analytics";
import { getStoredAttribution } from "@/lib/attribution";
import { buildMetaTags } from "@/lib/seo";
import { Check, ArrowRight, Phone, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/consultation")({
  head: () =>
    buildMetaTags({
      title: "Private Site Survey — SafeNest Architectural Safety",
      description: `Schedule a complimentary on-site laser measurement and architectural safety evaluation with ${BRAND_CONFIG.name}. Transparent specification and certified technical installation.`,
      canonicalPath: "/consultation",
      noIndex: true,
    }),
  component: ConsultationPage,
});

interface ServiceOption {
  id: string;
  name: string;
  category: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: "balcony-invisible-grills", name: "Balcony Invisible Grills", category: "Invisible Grills" },
  { id: "windows-invisible-grills", name: "Window Invisible Grills", category: "Invisible Grills" },
  { id: "staircase-invisible-grills", name: "Staircase Invisible Grills", category: "Invisible Grills" },
  { id: "child-safety-invisible-grills", name: "Child Safety Grills", category: "Invisible Grills" },
  { id: "balcony-safety-nets", name: "Balcony Safety Nets", category: "Core Safety Nets" },
  { id: "children-safety-nets", name: "Children Safety Nets", category: "Core Safety Nets" },
  { id: "pigeon-safety-nets", name: "Pigeon Protection Nets", category: "Bird Protection" },
  { id: "stainless-steel-bird-spikes", name: "Stainless Bird Spikes", category: "Bird Protection" },
  { id: "construction-safety-nets", name: "Industrial & Debris Nets", category: "Specialty" },
  { id: "sports-practice-nets", name: "Sports Practice Nets", category: "Specialty" },
];

function ConsultationPage() {
  const navigate = useNavigate();

  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [pincode, setPincode] = useState("");
  const [localityCity, setLocalityCity] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [notes, setNotes] = useState("");
  const [agreedToConsent, setAgreedToConsent] = useState(true);

  // Status & Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successReference, setSuccessReference] = useState<{ id: string; name: string } | null>(null);

  // Auto-select service if passed in URL search params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service");
    if (serviceParam) {
      const match = SERVICE_OPTIONS.find(
        (s) => s.id === serviceParam || s.category.toLowerCase().includes(serviceParam.toLowerCase()),
      );
      if (match && !selectedServices.includes(match.id)) {
        setSelectedServices([match.id]);
      }
    }
  }, []);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const isFormValid = useMemo(() => {
    const cleanPhone = phone.replace(/\D/g, "");
    return (
      selectedServices.length > 0 &&
      pincode.trim().length >= 6 &&
      localityCity.trim().length >= 2 &&
      cleanPhone.length === 10 &&
      fullName.trim().length >= 2 &&
      agreedToConsent
    );
  }, [selectedServices, pincode, localityCity, phone, fullName, agreedToConsent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one architectural safety service.");
      return;
    }
    if (!agreedToConsent) {
      setErrorMessage("Please confirm your consent for contact regarding this survey.");
      return;
    }

    setIsSubmitting(true);

    try {
      const attribution = getStoredAttribution();
      const payload = {
        name: fullName.trim(),
        phone: cleanPhone,
        services: selectedServices,
        city_hub: localityCity.trim(),
        pincode: pincode.trim(),
        notes: notes.trim() || undefined,
        consent_version: "v2-2026",
        gclid: attribution?.gclid,
        wbraid: attribution?.wbraid,
        gbraid: attribution?.gbraid,
        source: attribution?.utm_source,
        medium: attribution?.utm_medium,
        campaign: attribution?.utm_campaign,
        term: attribution?.utm_term,
        content: attribution?.utm_content,
        landing_page: attribution?.landing_page,
        referrer: attribution?.referrer,
      };

      const result = await submitConsultationServerFn({ data: payload });

      if (result && result.success && result.leadId) {
        setSuccessReference({
          id: result.leadId,
          name: fullName.trim(),
        });

        // Fire Google Ads primary qualified lead conversion
        trackQualifiedLead({
          leadId: result.leadId,
          city: localityCity.trim(),
          phone: cleanPhone,
        });
      } else {
        setErrorMessage(
          result?.error || "We could not record your request. Please call our client advisory directly.",
        );
      }
    } catch {
      setErrorMessage(
        "Network connection issue. Please try again or reach our team via WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen flex flex-col selection:bg-white/20">
      <SiteNav />

      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 pt-32 sm:pt-36 pb-28 w-full">
        {/* ─────────────────────────────────────────────────────────────
            SUCCESS STATE (Serene Architectural Confirmation)
            ───────────────────────────────────────────────────────────── */}
        {successReference ? (
          <div className="text-center py-16 sm:py-24 max-w-2xl mx-auto sn-black-visual border border-white/10 p-8 sm:p-14">
            <span className="sn-eyebrow text-neutral-400 mb-3 block">
              Survey Commissioned
            </span>
            <h1 className="sn-h1 text-white mb-4">
              Sanctuary Survey Registered
            </h1>
            <p className="sn-subtext text-neutral-300 max-w-md mx-auto mb-6">
              Thank you, <span className="text-white font-normal">{successReference.name}</span>.
              Your request has been logged in our regional engineering ledger.
            </p>

            <div className="inline-block border border-white/15 bg-white/5 px-5 py-2.5 mb-8">
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                Reference: <span className="text-white">{successReference.id.slice(0, 8).toUpperCase()}</span>
              </span>
            </div>

            <p className="text-xs font-light text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
              A certified {BRAND_CONFIG.name} technical safety advisor will coordinate with you to
              confirm laser measurement timing and exact site access.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BRAND_CONFIG.socials.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEngagement("whatsapp", "survey_success")}
                className="sn-btn-luxury-solid w-full sm:w-auto"
              >
                <MessageSquare size={13} className="mr-2" />
                Open WhatsApp
              </a>
              <a
                href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
                onClick={() => trackEngagement("phone", "survey_success")}
                className="sn-btn-luxury w-full sm:w-auto"
              >
                <Phone size={13} className="mr-2" />
                Call Atelier Desk
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <Link
                to="/"
                className="text-[10px] uppercase tracking-[0.25em] font-light text-neutral-400 hover:text-white transition-colors"
              >
                ← Return to SafeNest House
              </Link>
            </div>
          </div>
        ) : (
          /* ─────────────────────────────────────────────────────────────
             MAIN FORM CANVAS (Quiet Luxury Private Commission)
             ───────────────────────────────────────────────────────────── */
          <div className="w-full">
            {/* Header / Editorial Intro */}
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <span className="sn-eyebrow text-neutral-400 mb-3 block">
                Private Commission
              </span>
              <h1 className="sn-h1 text-white mb-3">
                The Private Site Survey
              </h1>
              <p className="sn-subtext text-neutral-300 max-w-lg mx-auto">
                Complimentary digital laser calibration, structural anchorage evaluation, and
                architectural specification across South India.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-16">
              {/* SECTION 01: SERVICE SELECTION */}
              <section className="space-y-6">
                <div className="border-b border-white/10 pb-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                      01 / Sanctuary Specification
                    </span>
                    <h2 className="font-serif text-lg md:text-xl font-light text-white uppercase tracking-wider">
                      Select Architectural Solutions
                    </h2>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-light tracking-wide">
                    {selectedServices.length} selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_OPTIONS.map((srv) => {
                    const isSelected = selectedServices.includes(srv.id);
                    return (
                      <button
                        type="button"
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`flex items-center justify-between p-4 text-left transition-all duration-300 cursor-pointer border ${
                          isSelected
                            ? "bg-white/10 border-white text-white shadow-xs"
                            : "bg-white/[0.02] border-white/10 text-neutral-300 hover:border-white/30 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block">
                            {srv.category}
                          </span>
                          <span className="font-serif text-sm font-light text-white tracking-wide mt-0.5 block">
                            {srv.name}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? "border-white bg-white text-black" : "border-white/25 bg-transparent"
                          }`}
                        >
                          {isSelected && <Check size={11} strokeWidth={2.5} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* SECTION 02: LOCATION & SANCTUARY CONTACT */}
              <section className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                    02 / Location &amp; Contact
                  </span>
                  <h2 className="font-serif text-lg md:text-xl font-light text-white uppercase tracking-wider">
                    Site Details &amp; Client Ledger
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Pincode */}
                  <div className="space-y-2">
                    <label
                      htmlFor="pincode"
                      className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-400 block"
                    >
                      Pincode <span className="text-neutral-500">*</span>
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      placeholder="e.g. 500033"
                      autoComplete="postal-code"
                      required
                      className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Locality & City */}
                  <div className="space-y-2">
                    <label
                      htmlFor="localityCity"
                      className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-400 block"
                    >
                      Locality &amp; City <span className="text-neutral-500">*</span>
                    </label>
                    <input
                      id="localityCity"
                      type="text"
                      value={localityCity}
                      onChange={(e) => setLocalityCity(e.target.value)}
                      placeholder="e.g. Jubilee Hills, Hyderabad"
                      autoComplete="address-level2"
                      required
                      className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-400 block"
                    >
                      Mobile Number <span className="text-neutral-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-sm font-light text-neutral-400">
                        +91
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="98765 43210"
                        autoComplete="tel-national"
                        required
                        className="w-full bg-white/[0.03] border border-white/15 pl-14 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Client Full Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-400 block"
                    >
                      Client Name <span className="text-neutral-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Anand Varma"
                      autoComplete="name"
                      required
                      className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Optional Architectural Notes */}
                <div className="space-y-2 pt-2">
                  <label
                    htmlFor="notes"
                    className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-400 block"
                  >
                    Architectural Notes / Specific Openings <span className="text-neutral-600">(Optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. 14th-floor balcony with curved railing, master bedroom french windows, child safety requirements."
                    className="w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none transition-colors resize-none"
                  />
                </div>
              </section>

              {/* SECTION 03: DISCRETION & CONSENT */}
              <section className="space-y-6 pt-4 border-t border-white/10">
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={agreedToConsent}
                    onChange={(e) => setAgreedToConsent(e.target.checked)}
                    className="mt-0.5 accent-white rounded-none cursor-pointer"
                  />
                  <span className="text-[11.5px] font-light text-neutral-400 leading-relaxed">
                    I agree to be contacted via phone or WhatsApp by a certified {BRAND_CONFIG.name} technical
                    advisor strictly regarding this site measurement, in accordance with the{" "}
                    <Link to="/privacy" className="text-white underline underline-offset-4 hover:opacity-80">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {errorMessage && (
                  <div className="p-4 border border-red-500/40 bg-red-950/20 text-red-300 text-xs font-light">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-[11px] font-light text-neutral-500">
                    Complimentary evaluation · Zero sales pressure · Direct engineering estimate
                  </p>
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="sn-btn-luxury-solid w-full sm:w-auto disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      "Registering Survey..."
                    ) : (
                      <>
                        Commission Private Site Survey
                        <ArrowRight size={12} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </section>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ConsultationPage;
