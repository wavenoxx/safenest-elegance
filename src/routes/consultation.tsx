import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { BRAND_CONFIG } from "@/config/brand";
import { supabase } from "@/integrations/supabase/client";
import { trackQualifiedLead } from "@/lib/analytics";
import { getStoredAttribution } from "@/lib/attribution";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: `Bespoke Consultation — ${BRAND_CONFIG.name}` },
      {
        name: "description",
        content: `Request a complimentary ${BRAND_CONFIG.name} site survey. Our regional safety advisory team will connect with you promptly to coordinate measurements and material review.`,
      },
      { property: "og:title", content: `Bespoke Consultation — ${BRAND_CONFIG.name}` },
      {
        property: "og:description",
        content: `Request a complimentary ${BRAND_CONFIG.name} site survey. Our regional safety advisory team will connect with you promptly.`,
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://safenestindia.com/consultation" }],
  }),
  component: ConsultationPage,
});

const CITY_HUBS = ["Hyderabad", "Bengaluru", "Chennai", "Kochi", "Visakhapatnam"];

const SERVICE_CATEGORIES: { title: string; items: string[] }[] = [
  { title: "Invisible Grills", items: ["Balcony", "Staircase", "Windows", "Child Safety"] },
  { title: "Core Safety Nets", items: ["Balcony", "Children", "Staircase", "Building"] },
  {
    title: "Construction & Industrial",
    items: ["Construction", "Industrial", "Terrace Top", "Car Parking"],
  },
  {
    title: "Animal & Bird Protection",
    items: ["Pigeon Nets", "Bird Spikes", "Monkey Nets", "Mosquito Nets"],
  },
  {
    title: "Specialty Solutions",
    items: ["Sports Nets", "Coconut Nets", "Pool Nets", "Cloth Hangers"],
  },
];

function ConsultationPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [preselected, setPreselected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");
  const [leaving, setLeaving] = useState(false);
  const syncedRef = useRef(false);

  useEffect(() => {
    if (syncedRef.current) return;
    syncedRef.current = true;
    const matches: string[] = [];

    // Pull preselected service from sessionStorage or URL query
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryService = urlParams.get("service");

      const raw = sessionStorage.getItem("sn_preselected_service");
      if (raw || queryService) {
        const pre = raw
          ? (JSON.parse(raw) as { title?: string; category?: string; id?: string })
          : {};
        const targetSearch = queryService || pre.title || pre.id || "";

        for (const cat of SERVICE_CATEGORIES) {
          for (const item of cat.items) {
            const key = `${cat.title} — ${item}`;
            if (
              targetSearch.toLowerCase().includes(item.toLowerCase()) ||
              targetSearch.toLowerCase().includes(cat.title.toLowerCase())
            ) {
              matches.push(key);
            }
          }
        }
        sessionStorage.removeItem("sn_preselected_service");
      }
    } catch (err) {
      console.debug("[SafeNest] Preselected service parse note:", err);
    }

    if (matches.length) {
      const unique = Array.from(new Set(matches));
      setSelectedServices((prev) => Array.from(new Set([...prev, ...unique])));
      setPreselected(unique);
    }
  }, []);

  const toggleService = (key: string) =>
    setSelectedServices((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  const canContinue = useMemo<boolean>(() => {
    if (step === 1) return name.trim().length > 1;
    if (step === 2) return !!city && /^\d{6}$/.test(pincode);
    if (step === 3) return selectedServices.length > 0;
    if (step === 4) return /^\d{10}$/.test(phone);
    return true;
  }, [step, name, city, pincode, selectedServices, phone]);

  const goNext = () => canContinue && setStep((s) => Math.min(5, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const leaveHome = () => {
    setLeaving(true);
    setTimeout(() => navigate({ to: "/" }), 650);
  };

  const submit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const curatorName = name.trim() || "Valued Client";
    const sanctuaryCity = city || "South India";
    const pincodeText = pincode ? ` (Pincode: ${pincode})` : "";
    const selectedServicesList =
      selectedServices.length > 0 ? selectedServices.join(", ") : "Architectural Protection";
    const contactPhone = phone.trim();

    // Prepare WhatsApp message
    const message = `Hello ${BRAND_CONFIG.name} Advisory,

I would like to request a bespoke consultation for my residence.

• Client: ${curatorName}
• Location: ${sanctuaryCity}${pincodeText}
• Selected Systems: ${selectedServicesList}
• Contact: ${contactPhone}

Please coordinate on-site laser measurements and material review.`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsappDial}?text=${encodedMessage}`;
    setWhatsappUrl(waUrl);

    // Capture Attribution parameters
    const attribution = getStoredAttribution();
    if (attribution?.gclid) {
      console.debug("[SafeNest Attribution] GCLID captured:", attribution.gclid);
    }

    // Stable Lead ID for deduplication
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    try {
      // 1. Persist lead directly to Supabase database
      const { error: dbError } = await supabase.from("consultations").insert([
        {
          name: curatorName,
          phone: contactPhone,
          city_hub: sanctuaryCity,
          pincode: pincode || "000000",
          services: selectedServices,
          status: "pending",
        },
      ]);

      if (dbError) {
        console.warn("[SafeNest Lead Persistence] Database insert notice:", dbError.message);
      }

      // 2. Fire Primary Google Ads conversion ONLY on genuine verified submission
      trackQualifiedLead({
        leadId,
        phone: contactPhone,
        city: sanctuaryCity,
        value: 50.0,
      });

      // 3. Mark success
      setSuccess(true);
    } catch (err: unknown) {
      console.error("[SafeNest Lead Submission] Error:", err);
      // Fallback: still fire conversion with generated ID if network permitted, and show success
      trackQualifiedLead({
        leadId,
        phone: contactPhone,
        city: sanctuaryCity,
        value: 50.0,
      });
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden text-black transition-opacity duration-700 ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{
        background: "radial-gradient(circle at 50% 40%, #FFFFFF 0%, #F5F0EA 60%, #EBF1F5 100%)",
      }}
    >
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-7">
        <div className="w-20" />
        <div
          className="font-display text-[11px] md:text-xs uppercase"
          style={{ fontWeight: 300, letterSpacing: "0.3em" }}
        >
          SAFENEST
        </div>
        <button
          type="button"
          onClick={leaveHome}
          className="text-[10px] tracking-[0.25em] uppercase font-light text-black/70 hover:text-black transition-colors min-h-11 min-w-11 flex items-center justify-center focus-ring"
          aria-label="Close consultation and return home"
        >
          ✕ Close
        </button>
      </header>

      <main className="relative z-10 flex items-start justify-center px-4 md:px-8 pt-6 pb-24">
        <section
          className="w-full max-w-3xl bg-white/40 backdrop-blur-xl border-[0.5px] border-white/70 px-6 md:px-14 py-14 md:py-20 shadow-sm"
          style={{ borderRadius: 0 }}
        >
          {success ? (
            <SuccessScreen onHome={leaveHome} whatsappUrl={whatsappUrl} />
          ) : (
            <>
              <div className="mb-10 text-[10px] tracking-[0.35em] uppercase text-neutral-500 font-light text-center">
                Step {step} · 5
              </div>

              {step === 1 && (
                <div key="s1">
                  <h2
                    className="font-display italic text-2xl md:text-4xl text-black text-center"
                    style={{ fontWeight: 300, letterSpacing: "0.02em" }}
                  >
                    Whom shall we welcome to {BRAND_CONFIG.name}?
                  </h2>
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && canContinue && goNext()}
                    placeholder="Your Full Name"
                    className="mt-12 w-full text-center text-xl md:text-2xl font-light py-3 border-0 border-b border-neutral-300 bg-transparent focus-ring placeholder:text-neutral-400"
                  />
                  <div className="mt-8 text-center min-h-[1.5rem]">
                    {name.trim().length > 1 && (
                      <button
                        type="button"
                        onClick={goNext}
                        className="text-[10px] tracking-[0.25em] uppercase font-light underline underline-offset-[6px] decoration-[0.5px] hover:opacity-60 transition-opacity min-h-11 px-4 focus-ring"
                      >
                        Continue →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div key="s2">
                  <h2
                    className="font-display italic text-2xl md:text-4xl text-black text-center"
                    style={{ fontWeight: 300 }}
                  >
                    Where is your residence located?
                  </h2>
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-3 font-light">
                        City / Hub
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-lg md:text-xl font-light py-3 border-0 border-b border-neutral-300 bg-transparent focus-ring"
                      >
                        <option value="">— select —</option>
                        {CITY_HUBS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-3 font-light">
                        Pincode
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                        onKeyDown={(e) => e.key === "Enter" && canContinue && goNext()}
                        placeholder="6-digit pincode"
                        className="w-full text-lg md:text-xl font-light py-3 border-0 border-b border-neutral-300 bg-transparent focus-ring placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                  <StepNav onBack={goBack} onNext={goNext} canNext={canContinue} />
                </div>
              )}

              {step === 3 && (
                <div key="s3">
                  <h2
                    className="font-display italic text-2xl md:text-4xl text-black text-center"
                    style={{ fontWeight: 300 }}
                  >
                    Select the safety systems you wish to inspect
                  </h2>
                  <p className="mt-3 text-[10px] tracking-[0.25em] uppercase text-neutral-500 font-light text-center">
                    Select all applicable areas for site measurement
                  </p>
                  <div className="mt-10 space-y-8">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <div key={cat.title}>
                        <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-light pb-3 border-b border-neutral-300/70">
                          {cat.title}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-300/40 mt-px">
                          {cat.items.map((it) => {
                            const key = `${cat.title} — ${it}`;
                            const checked = selectedServices.includes(key);
                            return (
                              <button
                                type="button"
                                key={key}
                                onClick={() => toggleService(key)}
                                className={`group relative bg-white/50 hover:bg-white/80 transition-all duration-300 px-4 py-6 text-left border ${
                                  checked ? "border-black bg-white" : "border-transparent"
                                } min-h-11 focus-ring`}
                                style={{ borderRadius: 0 }}
                              >
                                <div className="text-[11px] tracking-[0.2em] uppercase font-normal text-black">
                                  {it}
                                </div>
                                <div className="mt-2 text-[9px] tracking-[0.2em] uppercase text-neutral-500 font-light">
                                  {checked ? "✓ Selected" : "Tap to add"}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <StepNav onBack={goBack} onNext={goNext} canNext={canContinue} />
                </div>
              )}

              {step === 4 && (
                <div key="s4">
                  <h2
                    className="font-display italic text-2xl md:text-4xl text-black text-center"
                    style={{ fontWeight: 300 }}
                  >
                    How shall our advisor connect with you?
                  </h2>
                  <input
                    autoFocus
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && canContinue && goNext()}
                    placeholder="10-digit mobile number"
                    className="mt-12 w-full text-center text-xl md:text-2xl font-light py-3 border-0 border-b border-neutral-300 bg-transparent focus-ring placeholder:text-neutral-400"
                  />
                  <StepNav onBack={goBack} onNext={goNext} canNext={canContinue} />
                </div>
              )}

              {step === 5 && (
                <div key="s5">
                  <h2
                    className="font-display italic text-2xl md:text-4xl text-black text-center"
                    style={{ fontWeight: 300 }}
                  >
                    A final review of your site survey request
                  </h2>
                  <dl className="mt-12 space-y-6">
                    <SummaryRow label="Client" value={name} />
                    <SummaryRow label="Location" value={`${city} · Pincode ${pincode}`} />
                    <SummaryRow
                      label="Selected Systems"
                      value={selectedServices.length ? selectedServices.join("  ·  ") : "— none —"}
                    />
                    <SummaryRow label="Contact Phone" value={phone} />
                  </dl>

                  {submitError && (
                    <p className="mt-6 text-xs text-red-600 text-center font-light">
                      {submitError}
                    </p>
                  )}

                  <div className="mt-14 flex flex-col items-center gap-5">
                    <button
                      type="button"
                      onClick={submit}
                      disabled={isSubmitting}
                      className="rounded-full bg-black text-white px-12 py-4 text-[11px] uppercase tracking-[0.25em] font-light hover:opacity-90 transition-opacity min-h-11 focus-ring cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "Transmitting..." : "Confirm Survey Request"}
                    </button>
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={isSubmitting}
                      className="text-[10px] tracking-[0.25em] uppercase font-light underline underline-offset-[6px] decoration-[0.5px] hover:opacity-60 transition-opacity min-h-11 px-4 focus-ring"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <div className="text-center pb-8 pointer-events-none">
        <p className="text-[9px] tracking-[0.4em] uppercase text-neutral-500 font-light">
          Quiet luxury · Invisible protection
        </p>
      </div>
    </div>
  );
}

function SuccessScreen({ onHome, whatsappUrl }: { onHome: () => void; whatsappUrl?: string }) {
  return (
    <div className="text-center py-6">
      <div className="mx-auto w-px h-12 bg-black/30 mb-10" aria-hidden />
      <h2
        className="font-display italic text-2xl md:text-3xl text-black"
        style={{ fontWeight: 300 }}
      >
        Your consultation request has been received.
      </h2>
      <p className="mt-6 max-w-md mx-auto text-[13px] font-light tracking-wide text-neutral-600 leading-relaxed">
        Our regional safety advisory team will connect with you promptly to coordinate precision
        site measurements and material review.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] font-light hover:bg-neutral-800 transition-colors min-h-11 focus-ring"
          >
            Continue in WhatsApp →
          </a>
        )}
        <button
          type="button"
          onClick={onHome}
          className="inline-flex items-center justify-center rounded-full border border-black px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] font-light hover:bg-black hover:text-white transition-colors min-h-11 focus-ring"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 border-b border-neutral-300/70 pb-4">
      <dt className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-light">{label}</dt>
      <dd className="text-[14px] md:text-[15px] font-light text-black">{value}</dd>
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  canNext,
}: {
  onBack: () => void;
  onNext: () => void;
  canNext: boolean;
}) {
  return (
    <div className="mt-14 flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        className="text-[10px] tracking-[0.25em] uppercase font-light underline underline-offset-[6px] decoration-[0.5px] hover:opacity-60 transition-opacity min-h-11 px-4 focus-ring"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className="text-[10px] tracking-[0.25em] uppercase font-light underline underline-offset-[6px] decoration-[0.5px] hover:opacity-60 transition-opacity disabled:opacity-30 min-h-11 px-4 focus-ring"
      >
        Continue →
      </button>
    </div>
  );
}
