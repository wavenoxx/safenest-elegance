import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { BRAND_CONFIG } from "@/config/brand";
import { supabase } from "@/integrations/supabase/client";
import { submitConsultationServerFn } from "@/functions/consultation";
import { trackQualifiedLead, trackEngagement } from "@/lib/analytics";
import { getStoredAttribution } from "@/lib/attribution";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/consultation")({
  head: () =>
    buildMetaTags({
      title: "Private Site Survey & Laser Measurement",
      description: `Request an on-site measurement and survey for invisible grills and safety nets with ${BRAND_CONFIG.name}. Transparent pricing, exact dimensions, and direct technical scheduling.`,
      canonicalPath: "/consultation",
      noIndex: true,
    }),
  component: ConsultationPage,
});

/**
 * Feature flag for real phone OTP verification.
 * When false, cleanly advances to Step 5 without mock OTP friction.
 */
const ENABLE_PHONE_OTP =
  typeof window !== "undefined"
    ? Boolean(
        (window as unknown as { __ENABLE_PHONE_OTP__?: boolean }).__ENABLE_PHONE_OTP__ ||
        import.meta.env.VITE_ENABLE_PHONE_OTP === "true",
      )
    : false;

interface ServiceCategory {
  title: string;
  items: { id: string; name: string; plainDesc: string }[];
}

const SERVICE_CATALOG: ServiceCategory[] = [
  {
    title: "Invisible Grills",
    items: [
      {
        id: "balcony-invisible-grills",
        name: "Balcony Invisible Grills",
        plainDesc: "High-tensile 316 stainless steel cable edge barriers",
      },
      {
        id: "windows-invisible-grills",
        name: "Window Invisible Grills",
        plainDesc: "Full-height window and French door fall protection",
      },
      {
        id: "staircase-invisible-grills",
        name: "Staircase Invisible Grills",
        plainDesc: "Open stairwell, mezzanine, and duplex railing protection",
      },
      {
        id: "child-safety-invisible-grills",
        name: "Child Safety Invisible Grills",
        plainDesc: "Narrow 2-inch gap cable layout for child & pet safety",
      },
    ],
  },
  {
    title: "Core Safety Nets",
    items: [
      {
        id: "balcony-safety-nets",
        name: "Balcony Safety Nets",
        plainDesc: "High-density UV-resistant netting for balconies",
      },
      {
        id: "children-safety-nets",
        name: "Children Safety Nets",
        plainDesc: "Reinforced high-load safety netting for open terraces",
      },
      {
        id: "staircase-safety-nets",
        name: "Staircase Safety Nets",
        plainDesc: "Vertical void fall arrest safety netting",
      },
      {
        id: "building-safety-nets",
        name: "Building Safety Nets",
        plainDesc: "Debris catch and structural perimeter protection",
      },
    ],
  },
  {
    title: "Bird & Animal Protection",
    items: [
      {
        id: "pigeon-safety-nets",
        name: "Pigeon Safety Nets",
        plainDesc: "Garware translucent netting for balconies & ducts",
      },
      {
        id: "stainless-steel-bird-spikes",
        name: "Stainless Steel Bird Spikes",
        plainDesc: "Marine-grade polycarbonate & steel anti-perching spikes",
      },
      {
        id: "monkey-safety-nets",
        name: "Monkey Safety Nets",
        plainDesc: "Heavy-gauge knotted netting for high-intrusion zones",
      },
      {
        id: "mosquito-safety-nets",
        name: "Mosquito Safety Nets",
        plainDesc: "Stainless steel mesh sliding and magnetic insect screens",
      },
    ],
  },
  {
    title: "Specialty & Industrial Solutions",
    items: [
      {
        id: "construction-safety-nets",
        name: "Construction Safety Nets",
        plainDesc: "IS-compliant heavy safety nets for active work sites",
      },
      {
        id: "industrial-safety-nets",
        name: "Industrial Safety Nets",
        plainDesc: "Warehouse rack and mezzanine fall arrest netting",
      },
      {
        id: "terrace-top-nets",
        name: "Terrace Top Nets",
        plainDesc: "Full horizontal terrace enclosure nets",
      },
      {
        id: "sports-practice-nets",
        name: "Sports Practice Nets",
        plainDesc: "Cricket, football, and multi-sport box practice enclosures",
      },
      {
        id: "balcony-cloth-drying-hangers",
        name: "Balcony Cloth Drying Hangers",
        plainDesc: "Ceiling-mounted pulley-operated stainless steel hangers",
      },
    ],
  },
];

const POPULAR_HUBS = [
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Kochi",
  "Visakhapatnam",
  "Vijayawada",
  "Coimbatore",
];

export function ConsultationPage() {
  const navigate = useNavigate();

  // Navigation & Step Management (Steps 1 to 7)
  const [step, setStep] = useState(1);
  const [leaving, setLeaving] = useState(false);

  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [leadReference, setLeadReference] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const syncedRef = useRef(false);

  // Preselection Logic from URL query param or sessionStorage
  useEffect(() => {
    if (syncedRef.current) return;
    syncedRef.current = true;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryService = urlParams.get("service");
      const sessionRaw = sessionStorage.getItem("sn_preselected_service");

      let targetSearch = "";
      if (queryService) {
        targetSearch = queryService.trim();
      } else if (sessionRaw) {
        const parsed = JSON.parse(sessionRaw) as { title?: string; id?: string; name?: string };
        targetSearch = parsed.title || parsed.name || parsed.id || "";
        sessionStorage.removeItem("sn_preselected_service");
      }

      if (targetSearch) {
        const cleanTarget = targetSearch.toLowerCase().replace(/[^a-z0-9]/g, "");
        const matchedNames: string[] = [];

        for (const cat of SERVICE_CATALOG) {
          for (const item of cat.items) {
            const cleanName = item.name.toLowerCase().replace(/[^a-z0-9]/g, "");
            const cleanId = item.id.toLowerCase().replace(/[^a-z0-9]/g, "");
            const cleanCat = cat.title.toLowerCase().replace(/[^a-z0-9]/g, "");

            if (
              cleanName.includes(cleanTarget) ||
              cleanTarget.includes(cleanName) ||
              cleanId.includes(cleanTarget) ||
              cleanTarget.includes(cleanId) ||
              (cleanTarget.includes(cleanCat) && cleanCat.length > 5)
            ) {
              matchedNames.push(item.name);
            }
          }
        }

        if (matchedNames.length > 0) {
          const unique = Array.from(new Set(matchedNames));
          setSelectedServices(unique);
        }
      }
    } catch (err) {
      console.debug("[SafeNest Consultation] Preselection notice:", err);
    }
  }, []);

  // Countdown timer for OTP when enabled
  useEffect(() => {
    if (!ENABLE_PHONE_OTP || step !== 4 || otpTimer <= 0) return;
    const interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName) ? prev.filter((s) => s !== serviceName) : [...prev, serviceName],
    );
  };

  // Step Validation
  const canContinue = useMemo<boolean>(() => {
    if (step === 1) return selectedServices.length > 0;
    if (step === 2) return city.trim().length >= 2 && /^\d{6}$/.test(pincode);
    if (step === 3) return /^[6-9]\d{9}$/.test(phone.trim()) || /^\d{10}$/.test(phone.trim());
    if (step === 4) return ENABLE_PHONE_OTP ? /^\d{6}$/.test(otp) : true;
    if (step === 5) return name.trim().length >= 2;
    if (step === 6) return consent && !isSubmitting;
    return true;
  }, [step, selectedServices, city, pincode, phone, otp, name, consent, isSubmitting]);

  // Step Navigation Handlers
  const handleNext = () => {
    if (!canContinue) return;

    if (step === 3) {
      if (ENABLE_PHONE_OTP) {
        setStep(4);
        setOtpSent(true);
        setOtpTimer(60);
      } else {
        // Clean bypass to Step 5 without mock OTP
        setStep(5);
      }
      return;
    }

    if (step === 4) {
      setStep(5);
      return;
    }

    if (step < 6) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step === 5) {
      setStep(ENABLE_PHONE_OTP ? 4 : 3);
      return;
    }
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const leaveHome = () => {
    setLeaving(true);
    setTimeout(() => navigate({ to: "/" }), 400);
  };

  // Submission Handler
  const handleSubmit = async () => {
    if (isSubmitting || !consent) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const clientName = name.trim() || "Customer";
    const clientCity = city.trim();
    const clientPincode = pincode.trim();
    const clientPhone = phone.trim();
    const servicesList = selectedServices.join(", ");
    const clientNotes = notes.trim();

    // Generate clean human-readable reference number & unique leadId
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const generatedRef = `SN-${new Date().getFullYear().toString().slice(2)}${randomSuffix}`;
    setLeadReference(generatedRef);

    // Prepare WhatsApp URL
    const waText = `Hello ${BRAND_CONFIG.name} Technical Desk,

I have submitted a Private Site Survey request.

• Reference: ${generatedRef}
• Name: ${clientName}
• Location: ${clientCity} (Pincode: ${clientPincode})
• Services: ${servicesList}
• Mobile: +91 ${clientPhone}${clientNotes ? `\n• Notes: ${clientNotes}` : ""}

Please confirm technician availability for measurement.`;

    const encodedWa = encodeURIComponent(waText);
    const waLink = `https://wa.me/${BRAND_CONFIG.contact.whatsappDial}?text=${encodedWa}`;
    setWhatsappUrl(waLink);

    // Capture Attribution
    const attribution = getStoredAttribution();

    let persistedLeadId: string | null = null;

    try {
      // 1. Try server function submission first (with rate limit + admin client + WhatsApp notification)
      const serverResult = await submitConsultationServerFn({
        data: {
          name: clientName,
          phone: clientPhone,
          city_hub: clientCity.slice(0, 80),
          pincode: clientPincode,
          services: selectedServices,
          notes: clientNotes || undefined,
          consent_version: "1.0",
          verification_method: ENABLE_PHONE_OTP ? "sms_otp" : "direct_phone",
          verified: ENABLE_PHONE_OTP,
          source: attribution?.source,
          medium: attribution?.medium,
          campaign: attribution?.campaign,
          term: attribution?.term,
          content: attribution?.content,
          landing_page: attribution?.landing_page,
          referrer: attribution?.referrer,
          gclid: attribution?.gclid,
          wbraid: attribution?.wbraid,
          gbraid: attribution?.gbraid,
        },
      });

      if (serverResult?.success && serverResult.leadId) {
        persistedLeadId = serverResult.leadId;
      } else if (serverResult?.error) {
        console.warn("[SafeNest Consultation] Server submission notice:", serverResult.error);
      }
    } catch (err) {
      console.warn("[SafeNest Consultation] Server fn call fallback:", err);
    }

    // 2. Client Supabase fallback if server function did not return ID
    if (!persistedLeadId) {
      try {
        const { data: dbData, error: dbError } = await supabase
          .from("consultations")
          .insert([
            {
              name: clientName,
              phone: clientPhone.startsWith("+91") ? clientPhone : `+91${clientPhone.slice(-10)}`,
              city_hub: clientCity.slice(0, 80),
              pincode: clientPincode,
              services: selectedServices,
              notes: clientNotes || null,
              status: "new",
              source: attribution?.source || null,
              medium: attribution?.medium || null,
              campaign: attribution?.campaign || null,
              gclid: attribution?.gclid || null,
              wbraid: attribution?.wbraid || null,
              gbraid: attribution?.gbraid || null,
              consent_version: "1.0",
              verification_method: ENABLE_PHONE_OTP ? "sms_otp" : "direct_phone",
            },
          ])
          .select("id")
          .single();

        if (!dbError && dbData?.id) {
          persistedLeadId = dbData.id;
        }
      } catch (clientErr) {
        console.warn("[SafeNest Consultation] Client DB fallback notice:", clientErr);
      }
    }

    const finalLeadId =
      persistedLeadId || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // 3. Fire Primary Google Ads conversion ONLY upon verified submission
    trackQualifiedLead({
      leadId: finalLeadId,
      phone: clientPhone,
      city: clientCity,
      value: 50.0,
    });

    // 4. Mark success
    setSuccess(true);
    setStep(7);
    setIsSubmitting(false);
  };

  // Calculate visible step count for quiet progress display
  const totalVisibleSteps = ENABLE_PHONE_OTP ? 6 : 5;
  const currentVisibleStep = useMemo(() => {
    if (step <= 3) return step;
    if (ENABLE_PHONE_OTP) return step;
    return step - 1; // Maps Step 5 to 4, Step 6 to 5
  }, [step]);

  return (
    <div
      className={`relative min-h-screen w-full text-neutral-900 transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F6F4F0 60%, #EAECEF 100%)",
      }}
    >
      {/* Screen Reader Live Status Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {success
          ? `Site survey confirmed with reference ID ${leadReference}`
          : `Step ${currentVisibleStep} of ${totalVisibleSteps}`}
      </div>

      {/* Top Header */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6 border-b border-neutral-200/60 bg-white/40 backdrop-blur-md">
        <Link
          to="/"
          className="text-xs uppercase tracking-[0.25em] font-light text-neutral-600 hover:text-black transition-colors focus-ring"
        >
          ← {BRAND_CONFIG.name}
        </Link>
        <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-900">
          Private Site Survey
        </div>
        <button
          type="button"
          onClick={leaveHome}
          className="text-xs uppercase tracking-[0.2em] font-light text-neutral-600 hover:text-black transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-ring cursor-pointer"
          aria-label="Close survey and return home"
        >
          ✕ Close
        </button>
      </header>

      {/* Main Content Form Container */}
      <main className="relative z-10 flex items-start justify-center px-4 md:px-8 pt-8 pb-20">
        <section
          className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-neutral-200/80 p-6 md:p-12 shadow-sm rounded-xl"
          role="region"
          aria-label="Site Survey Request Form"
        >
          {success ? (
            <SuccessView
              leadReference={leadReference}
              clientName={name}
              clientPhone={phone}
              clientCity={city}
              clientPincode={pincode}
              selectedServices={selectedServices}
              whatsappUrl={whatsappUrl}
              onHome={leaveHome}
            />
          ) : (
            <>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
                <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                  Step {currentVisibleStep} of {totalVisibleSteps}
                </span>
                <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-light">
                  {step === 1 && "Select Services"}
                  {step === 2 && "Installation Location"}
                  {step === 3 && "Mobile Number"}
                  {step === 4 && "Phone Verification"}
                  {step === 5 && "Contact & Details"}
                  {step === 6 && "Review & Consent"}
                </span>
              </div>

              {/* STEP 1: SERVICE SELECTION */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl md:text-2xl font-light text-neutral-950 tracking-tight">
                      Which safety solutions do you require?
                    </h1>
                    <p className="mt-1.5 text-xs text-neutral-600 font-normal">
                      Select all systems you would like inspected and measured during the on-site
                      visit.
                    </p>
                  </div>

                  <div className="space-y-6 pt-2">
                    {SERVICE_CATALOG.map((cat) => (
                      <div key={cat.title} className="space-y-2.5">
                        <h2 className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-medium">
                          {cat.title}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {cat.items.map((item) => {
                            const isChecked = selectedServices.includes(item.name);
                            return (
                              <button
                                type="button"
                                key={item.id}
                                role="checkbox"
                                aria-checked={isChecked}
                                onClick={() => toggleService(item.name)}
                                className={`flex flex-col text-left p-3.5 rounded-lg border transition-all min-h-[52px] focus-ring cursor-pointer ${
                                  isChecked
                                    ? "border-neutral-950 bg-neutral-950 text-white shadow-sm"
                                    : "border-neutral-200 bg-white hover:border-neutral-400 text-neutral-900"
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-xs md:text-[13px] font-medium tracking-wide">
                                    {item.name}
                                  </span>
                                  <span
                                    className={`text-xs ml-2 ${
                                      isChecked ? "text-white" : "text-neutral-400"
                                    }`}
                                  >
                                    {isChecked ? "✓" : "+"}
                                  </span>
                                </div>
                                <span
                                  className={`text-[11px] mt-1 leading-snug font-light ${
                                    isChecked ? "text-neutral-300" : "text-neutral-500"
                                  }`}
                                >
                                  {item.plainDesc}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-light">
                      {selectedServices.length === 0
                        ? "Select at least 1 service to continue"
                        : `${selectedServices.length} service${
                            selectedServices.length > 1 ? "s" : ""
                          } selected`}
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canContinue}
                      className="inline-flex items-center justify-center rounded-full bg-neutral-950 text-white px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed min-h-[44px] focus-ring cursor-pointer"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: WHERE SHOULD WE VISIT? */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl md:text-2xl font-light text-neutral-950 tracking-tight">
                      Where is the installation site located?
                    </h1>
                    <p className="mt-1.5 text-xs text-neutral-600 font-normal">
                      We dispatch technical survey teams across all localities and Indian cities.
                    </p>
                  </div>

                  <div className="space-y-5 pt-2">
                    <div>
                      <label
                        htmlFor="survey-pincode"
                        className="block text-xs uppercase tracking-wider text-neutral-700 font-medium mb-1.5"
                      >
                        6-Digit Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="survey-pincode"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        autoComplete="postal-code"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                        onKeyDown={(e) => e.key === "Enter" && canContinue && handleNext()}
                        placeholder="e.g. 500033"
                        className="w-full text-base md:text-lg font-normal px-4 py-3 border border-neutral-300 rounded-lg bg-white focus-ring placeholder:text-neutral-400"
                      />
                      {pincode.length > 0 && pincode.length < 6 && (
                        <p className="mt-1 text-[11px] text-amber-700">
                          Please enter full 6-digit pincode
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="survey-city"
                        className="block text-xs uppercase tracking-wider text-neutral-700 font-medium mb-1.5"
                      >
                        Locality & City <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="survey-city"
                        type="text"
                        autoComplete="address-level2"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && canContinue && handleNext()}
                        placeholder="e.g. Jubilee Hills, Hyderabad or Whitefield, Bengaluru"
                        className="w-full text-base md:text-lg font-normal px-4 py-3 border border-neutral-300 rounded-lg bg-white focus-ring placeholder:text-neutral-400"
                      />
                    </div>

                    {/* Quick suggestion chips for common hubs */}
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-medium mb-2">
                        Common Service Hubs (Tap to autofill city)
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_HUBS.map((hub) => (
                          <button
                            type="button"
                            key={hub}
                            onClick={() => setCity(hub)}
                            className={`text-xs px-3 py-1.5 rounded-md border min-h-[36px] transition-colors focus-ring cursor-pointer ${
                              city.toLowerCase().includes(hub.toLowerCase())
                                ? "bg-neutral-900 text-white border-neutral-900"
                                : "bg-neutral-100/80 text-neutral-700 border-neutral-200 hover:bg-neutral-200"
                            }`}
                          >
                            {hub}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <StepNavigation
                    onBack={handleBack}
                    onNext={handleNext}
                    canNext={canContinue}
                    nextLabel="Continue →"
                  />
                </div>
              )}

              {/* STEP 3: MOBILE NUMBER */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl md:text-2xl font-light text-neutral-950 tracking-tight">
                      What is your mobile number?
                    </h1>
                    <p className="mt-1.5 text-xs text-neutral-600 font-normal">
                      Our technical coordinator will call to confirm your preferred survey date and
                      time.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label
                        htmlFor="survey-phone"
                        className="block text-xs uppercase tracking-wider text-neutral-700 font-medium mb-1.5"
                      >
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex rounded-lg border border-neutral-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-neutral-900">
                        <div className="flex items-center justify-center px-4 bg-neutral-100 border-r border-neutral-300 text-xs font-medium text-neutral-700 select-none">
                          +91
                        </div>
                        <input
                          id="survey-phone"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={10}
                          autoComplete="tel-national"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          onKeyDown={(e) => e.key === "Enter" && canContinue && handleNext()}
                          placeholder="10-digit mobile number"
                          className="w-full text-base md:text-lg font-normal px-4 py-3 border-0 bg-transparent focus:outline-none placeholder:text-neutral-400"
                        />
                      </div>
                      {phone.length > 0 && phone.length < 10 && (
                        <p className="mt-1.5 text-[11px] text-amber-700">
                          Please enter 10 digits ({phone.length}/10)
                        </p>
                      )}
                    </div>
                  </div>

                  <StepNavigation
                    onBack={handleBack}
                    onNext={handleNext}
                    canNext={canContinue}
                    nextLabel="Continue →"
                  />
                </div>
              )}

              {/* STEP 4: PHONE VERIFICATION (FEATURE FLAGGED) */}
              {step === 4 && ENABLE_PHONE_OTP && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl md:text-2xl font-light text-neutral-950 tracking-tight">
                      Verify your mobile number
                    </h1>
                    <p className="mt-1.5 text-xs text-neutral-600 font-normal">
                      We sent a 6-digit verification code via SMS to{" "}
                      <span className="font-medium text-neutral-900">+91 {phone}</span>.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label
                        htmlFor="survey-otp"
                        className="block text-xs uppercase tracking-wider text-neutral-700 font-medium mb-1.5"
                      >
                        6-Digit Verification Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="survey-otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        autoComplete="one-time-code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        onKeyDown={(e) => e.key === "Enter" && canContinue && handleNext()}
                        placeholder="Enter 6-digit OTP"
                        className="w-full text-center tracking-[0.3em] text-xl font-medium px-4 py-3 border border-neutral-300 rounded-lg bg-white focus-ring placeholder:text-neutral-400"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="underline hover:text-black focus-ring"
                      >
                        Change mobile number
                      </button>
                      <span>
                        {otpTimer > 0 ? (
                          `Resend code in ${otpTimer}s`
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setOtpTimer(60);
                              setOtpSent(true);
                            }}
                            className="underline text-neutral-900 font-medium focus-ring"
                          >
                            Resend code
                          </button>
                        )}
                      </span>
                    </div>
                  </div>

                  <StepNavigation
                    onBack={handleBack}
                    onNext={handleNext}
                    canNext={canContinue}
                    nextLabel="Verify & Continue →"
                  />
                </div>
              )}

              {/* STEP 5: CONTACT NAME & SITE DETAILS */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl md:text-2xl font-light text-neutral-950 tracking-tight">
                      Contact Name & Optional Details
                    </h1>
                    <p className="mt-1.5 text-xs text-neutral-600 font-normal">
                      Enter your name and any specific notes regarding your balconies or window
                      layout.
                    </p>
                  </div>

                  <div className="space-y-5 pt-2">
                    <div>
                      <label
                        htmlFor="survey-name"
                        className="block text-xs uppercase tracking-wider text-neutral-700 font-medium mb-1.5"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="survey-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && canContinue && handleNext()}
                        placeholder="e.g. Ramesh Reddy"
                        className="w-full text-base md:text-lg font-normal px-4 py-3 border border-neutral-300 rounded-lg bg-white focus-ring placeholder:text-neutral-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="survey-notes"
                        className="block text-xs uppercase tracking-wider text-neutral-700 font-medium mb-1.5"
                      >
                        Balcony Dimensions / Notes{" "}
                        <span className="text-neutral-400 normal-case font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="survey-notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. 2 balconies (approx 12x4 ft), 8th floor apartment, prefer weekend morning visit"
                        className="w-full text-sm md:text-base font-normal px-4 py-3 border border-neutral-300 rounded-lg bg-white focus-ring placeholder:text-neutral-400"
                      />
                    </div>

                    <div className="p-3.5 bg-neutral-100/70 border border-neutral-200 rounded-lg text-xs text-neutral-600 leading-relaxed font-light">
                      <strong className="font-medium text-neutral-900">Photos or Drawings:</strong>{" "}
                      You can share photos of your balcony or floor plans directly on WhatsApp once
                      your survey reference is generated.
                    </div>
                  </div>

                  <StepNavigation
                    onBack={handleBack}
                    onNext={handleNext}
                    canNext={canContinue}
                    nextLabel="Continue to Review →"
                  />
                </div>
              )}

              {/* STEP 6: EXPLICIT CONSENT & FINAL REVIEW */}
              {step === 6 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl md:text-2xl font-light text-neutral-950 tracking-tight">
                      Review & Confirm Site Survey
                    </h1>
                    <p className="mt-1.5 text-xs text-neutral-600 font-normal">
                      Verify your details and provide consent to schedule your survey.
                    </p>
                  </div>

                  {/* Summary Matrix */}
                  <div className="space-y-3 pt-2">
                    <SummaryItem label="Selected Services" value={selectedServices.join(", ")} />
                    <SummaryItem label="Site Location" value={`${city} (Pincode: ${pincode})`} />
                    <SummaryItem label="Contact Mobile" value={`+91 ${phone}`} />
                    <SummaryItem label="Contact Person" value={name} />
                    {notes && <SummaryItem label="Notes / Dimensions" value={notes} />}
                  </div>

                  {/* Explicit Consent Checkbox */}
                  <div className="p-4 bg-neutral-100/80 border border-neutral-300 rounded-lg space-y-2">
                    <div className="flex items-start gap-3">
                      <input
                        id="survey-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer min-h-[20px] min-w-[20px]"
                      />
                      <label
                        htmlFor="survey-consent"
                        className="text-xs md:text-sm font-normal text-neutral-800 leading-relaxed cursor-pointer"
                      >
                        I agree to be contacted via phone/WhatsApp regarding this site survey in
                        accordance with the{" "}
                        <Link
                          to="/privacy"
                          target="_blank"
                          className="underline text-neutral-950 font-medium hover:text-neutral-700"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-md font-normal">
                      {submitError}
                    </div>
                  )}

                  <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-600 hover:text-black transition-colors min-h-[44px] px-4 focus-ring cursor-pointer"
                    >
                      ← Edit Details
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!consent || isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-neutral-950 text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] focus-ring cursor-pointer shadow-sm"
                    >
                      {isSubmitting ? "Submitting Request..." : "Confirm Site Survey Request"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Footer Tagline */}
      <footer className="text-center pb-8 pointer-events-none">
        <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-light">
          SafeNest · Architectural Safety & Invisible Protection
        </p>
      </footer>
    </div>
  );
}

/**
 * Step 7: Reassuring Confirmation & Instant Next Steps
 */
function SuccessView({
  leadReference,
  clientName,
  clientPhone,
  clientCity,
  clientPincode,
  selectedServices,
  whatsappUrl,
  onHome,
}: {
  leadReference: string;
  clientName: string;
  clientPhone: string;
  clientCity: string;
  clientPincode: string;
  selectedServices: string[];
  whatsappUrl: string;
  onHome: () => void;
}) {
  return (
    <div className="text-center py-4 space-y-6">
      {/* Reference Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-neutral-300 rounded-full text-xs font-mono text-neutral-800">
        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
        Reference ID: <strong className="font-semibold text-neutral-950">{leadReference}</strong>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-light text-neutral-950 tracking-tight">
          Site Survey Request Confirmed
        </h1>
        <p className="mt-2 text-xs md:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="font-medium text-neutral-900">{clientName}</strong>. Our
          technical coordinator will call you at{" "}
          <strong className="font-medium text-neutral-900">+91 {clientPhone}</strong> within 2
          business hours to schedule your physical site measurement.
        </p>
      </div>

      {/* Summary Card */}
      <div className="max-w-md mx-auto bg-neutral-50/80 border border-neutral-200 rounded-lg p-4 text-left space-y-2 text-xs">
        <div className="flex justify-between border-b border-neutral-200/60 pb-2">
          <span className="text-neutral-500">Location:</span>
          <span className="font-medium text-neutral-900">
            {clientCity} ({clientPincode})
          </span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-neutral-500">Services:</span>
          <span className="font-medium text-neutral-900 text-right max-w-[65%] truncate">
            {selectedServices.join(", ")}
          </span>
        </div>
      </div>

      {/* Direct Contact Action Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEngagement("whatsapp", "survey_success_view")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-emerald-700 text-white px-6 py-3 text-xs uppercase tracking-[0.15em] font-medium hover:bg-emerald-800 transition-colors min-h-[44px] focus-ring"
          >
            Message on WhatsApp →
          </a>
        )}
        <a
          href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
          onClick={() => trackEngagement("phone", "survey_success_view")}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 px-6 py-3 text-xs uppercase tracking-[0.15em] font-medium hover:border-neutral-900 transition-colors min-h-[44px] focus-ring"
        >
          Call Technical Desk
        </a>
        <button
          type="button"
          onClick={onHome}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-transparent text-neutral-600 px-5 py-3 text-xs uppercase tracking-[0.15em] font-medium hover:text-black transition-colors min-h-[44px] focus-ring cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-neutral-100 text-xs">
      <dt className="uppercase tracking-wider text-neutral-500 font-medium">{label}</dt>
      <dd className="font-normal text-neutral-900 mt-0.5 sm:mt-0 text-left sm:text-right max-w-sm">
        {value}
      </dd>
    </div>
  );
}

function StepNavigation({
  onBack,
  onNext,
  canNext,
  nextLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  canNext: boolean;
  nextLabel: string;
}) {
  return (
    <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-600 hover:text-black transition-colors min-h-[44px] px-3 focus-ring cursor-pointer"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className="inline-flex items-center justify-center rounded-full bg-neutral-950 text-white px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed min-h-[44px] focus-ring cursor-pointer"
      >
        {nextLabel}
      </button>
    </div>
  );
}
