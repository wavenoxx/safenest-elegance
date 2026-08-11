import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useWishlist } from "@/components/WishlistContext";
import { BRAND_CONFIG } from "@/config/brand";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: `Bespoke Consultation — ${BRAND_CONFIG.name}` },
      {
        name: "description",
        content:
          `A quiet curation journey. Request a complimentary ${BRAND_CONFIG.name} consultation and a regional master advisor will reach out within two hours.`,
      },
    ],
  }),
  component: ConsultationPage,
});

const CITY_HUBS = ["Hyderabad", "Bengaluru", "Chennai", "Kochi", "Visakhapatnam"];

const SERVICE_CATEGORIES: { title: string; items: string[] }[] = [
  { title: "Invisible Grills", items: ["Balcony", "Staircase", "Windows", "Child Safety"] },
  { title: "Core Safety Nets", items: ["Balcony", "Children", "Staircase", "Building"] },
  { title: "Construction & Industrial", items: ["Construction", "Industrial", "Terrace Top", "Car Parking"] },
  { title: "Animal & Bird Protection", items: ["Pigeon Nets", "Bird Spikes", "Monkey Nets", "Mosquito Nets"] },
  { title: "Specialty Solutions", items: ["Sports Nets", "Coconut Nets", "Pool Nets", "Cloth Hangers"] },
];

function ConsultationPage() {
  const navigate = useNavigate();
  const { items: wishlistItems } = useWishlist();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [preselected, setPreselected] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const syncedRef = useRef(false);

  useEffect(() => {
    if (syncedRef.current) return;
    syncedRef.current = true;
    const matches: string[] = [];
    for (const cat of SERVICE_CATEGORIES) {
      for (const item of cat.items) {
        const key = `${cat.title} — ${item}`;
        const hit = wishlistItems.some(
          (w) =>
            w.title.toLowerCase().includes(item.toLowerCase()) ||
            w.title.toLowerCase().includes(cat.title.toLowerCase()),
        );
        if (hit) matches.push(key);
      }
    }
    // Pull preselected service from a service page CTA
    try {
      const raw = sessionStorage.getItem("sn_preselected_service");
      if (raw) {
        const pre = JSON.parse(raw) as { title?: string; category?: string };
        const catTitle =
          SERVICE_CATEGORIES.find((c) =>
            c.title.toLowerCase().replace(/\s+/g, "-").includes((pre.category ?? "").toLowerCase()),
          )?.title ?? "Invisible Grills";
        const itemMatch =
          SERVICE_CATEGORIES.find((c) => c.title === catTitle)?.items.find((it) =>
            (pre.title ?? "").toLowerCase().includes(it.toLowerCase()),
          );
        if (itemMatch) matches.push(`${catTitle} — ${itemMatch}`);
        sessionStorage.removeItem("sn_preselected_service");
      }
    } catch {}
    if (matches.length) {
      const unique = Array.from(new Set(matches));
      setSelectedServices((prev) => Array.from(new Set([...prev, ...unique])));
      setPreselected(unique);
    }
  }, [wishlistItems]);

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

  const submit = () => {
    const curatorName = name.trim() || "Valued Client";
    const sanctuaryCity = city || "South India";
    const pincodeText = pincode ? ` (Pincode: ${pincode})` : "";
    const selectedServicesList = selectedServices.length > 0
      ? selectedServices.join(", ")
      : "Tailored Protection";
    const contactPhone = phone.trim() || "Not specified";

    const message = `Hello ${BRAND_CONFIG.name} Advisory,

I would like to request a bespoke consultation for my sanctuary.

• Curator: ${curatorName}

• Sanctuary: ${sanctuaryCity}${pincodeText}

• Selected Protection: ${selectedServicesList}

• Contact Phone: ${contactPhone}

Please connect me with a regional master advisor.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsappDial}?text=${encodedMessage}`;

    // Track conversion event for Google Ads
    (window as any).trackGoogleConversion?.('form_whatsapp_submit');

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSuccess(true);
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden text-black transition-opacity duration-700 ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{ background: "radial-gradient(circle at 50% 40%, #FFFFFF 0%, #F5F0EA 60%, #EBF1F5 100%)" }}
    >
      <style>{`
        @keyframes sn-cloud {
          0%   { transform: translate3d(-3%, -2%, 0) scale(1); }
          50%  { transform: translate3d(3%, 2%, 0) scale(1.05); }
          100% { transform: translate3d(-3%, -2%, 0) scale(1); }
        }
        @keyframes sn-rise {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          15%  { opacity: var(--o, 0.25); }
          80%  { opacity: var(--o, 0.25); }
          100% { transform: translateY(-110vh) scale(1.3); opacity: 0; }
        }
        @keyframes sn-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sn-dawn {
          from { opacity: 0; filter: blur(8px); transform: scale(0.98); }
          to   { opacity: 1; filter: blur(0);   transform: scale(1); }
        }
        .sn-cloud-layer {
          position: absolute; inset: -20%;
          background:
            radial-gradient(closest-side at 30% 30%, rgba(255,255,255,0.55), transparent 60%),
            radial-gradient(closest-side at 70% 60%, rgba(235,241,245,0.6), transparent 65%),
            radial-gradient(closest-side at 50% 80%, rgba(245,240,234,0.5), transparent 60%);
          animation: sn-cloud 30s ease-in-out infinite;
          pointer-events: none;
        }
        .sn-particle {
          position: absolute; bottom: -20px;
          width: 6px; height: 6px; border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0));
          animation: sn-rise linear infinite;
        }
        .sn-fade-up { animation: sn-fade-up 700ms ease-out both; }
        .sn-dawn { animation: sn-dawn 1200ms ease-out both; }
        .sn-underline-input {
          background: transparent; border: 0;
          border-bottom: 1px solid #d4d4d4;
          transition: border-color 400ms ease;
        }
        .sn-underline-input:focus { outline: none; border-bottom-color: #000; }
      `}</style>

      <div className="sn-cloud-layer" aria-hidden />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 22 }).map((_, i) => {
          const left = (i * 4.7) % 100;
          const size = 3 + ((i * 7) % 8);
          const dur = 18 + ((i * 3) % 18);
          const delay = (i * 1.3) % 16;
          const op = 0.15 + ((i % 4) * 0.05);
          return (
            <span
              key={i}
              className="sn-particle"
              style={{
                left: `${left}%`,
                width: size,
                height: size,
                animationDuration: `${dur}s`,
                animationDelay: `-${delay}s`,
                ["--o" as never]: op,
              }}
            />
          );
        })}
      </div>

      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-7">
        <div className="w-20" />
        <div className="font-display text-[11px] md:text-xs uppercase" style={{ fontWeight: 300, letterSpacing: "0.3em" }}>
          SAFENEST
        </div>
        <button
          onClick={leaveHome}
          className="text-[10px] tracking-[0.25em] uppercase font-light text-black/70 hover:text-black transition-colors"
          aria-label="Close and return home"
        >
          ✕ Close
        </button>
      </header>

      <main className="relative z-10 flex items-start justify-center px-4 md:px-8 pt-6 pb-24">
        <section
          className="w-full max-w-3xl bg-white/30 backdrop-blur-xl border-[0.5px] border-white/60 px-6 md:px-14 py-14 md:py-20 sn-dawn"
          style={{ borderRadius: 0 }}
        >
          {success ? (
            <SuccessScreen onHome={leaveHome} />
          ) : (
            <>
              <div className="mb-10 text-[10px] tracking-[0.35em] uppercase text-neutral-500 font-light text-center">
                Step {step} · 5
              </div>

              {step === 1 && (
                <div key="s1" className="sn-fade-up">
                  <h2 className="font-display italic text-2xl md:text-4xl text-black text-center" style={{ fontWeight: 300, letterSpacing: "0.02em" }}>
                    Whom shall we welcome to {BRAND_CONFIG.name}?
                  </h2>
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && goNext()}
                    placeholder="your full name"
                    className="sn-underline-input mt-12 w-full text-center text-xl md:text-2xl font-light py-3 placeholder:text-neutral-400 placeholder:lowercase"
                  />
                  <div className="mt-8 text-center min-h-[1.5rem]">
                    {name.trim().length > 1 && (
                      <button
                        onClick={goNext}
                        className="text-[10px] tracking-[0.25em] uppercase font-light underline underline-offset-[6px] decoration-[0.5px] hover:opacity-60 transition-opacity sn-fade-up"
                      >
                        Continue →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div key="s2" className="sn-fade-up">
                  <h2 className="font-display italic text-2xl md:text-4xl text-black text-center" style={{ fontWeight: 300 }}>
                    Where is your sanctuary located?
                  </h2>
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-3 font-light">
                        City / Hub
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="sn-underline-input w-full text-lg md:text-xl font-light py-3"
                      >
                        <option value="">— select —</option>
                        {CITY_HUBS.map((c) => (
                          <option key={c} value={c}>{c}</option>
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
                        onKeyDown={(e) => e.key === "Enter" && goNext()}
                        placeholder="6-digit pincode"
                        className="sn-underline-input w-full text-lg md:text-xl font-light py-3 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                  <StepNav onBack={goBack} onNext={goNext} canNext={canContinue} />
                </div>
              )}

              {step === 3 && (
                <div key="s3" className="sn-fade-up">
                  <h2 className="font-display italic text-2xl md:text-4xl text-black text-center" style={{ fontWeight: 300 }}>
                    What protection do you wish to cherish?
                  </h2>
                  <p className="mt-3 text-[10px] tracking-[0.25em] uppercase text-neutral-500 font-light text-center">
                    {preselected.length ? `${preselected.length} pre-selected from your wishlist` : "Curate your bespoke selections"}
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
                            const isPre = preselected.includes(key);
                            return (
                              <button
                                type="button"
                                key={key}
                                onClick={() => toggleService(key)}
                                className={`group relative bg-white/40 hover:bg-white/70 transition-all duration-300 px-4 py-6 text-left border ${checked ? "border-black" : "border-transparent"}`}
                                style={{ borderRadius: 0 }}
                              >
                                <div className="text-[11px] tracking-[0.2em] uppercase font-light text-black">{it}</div>
                                <div className="mt-3 text-[9px] tracking-[0.25em] uppercase text-neutral-500 font-light">
                                  {isPre ? "Pre-selected from wishlist" : "Tailored selection"}
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
                <div key="s4" className="sn-fade-up">
                  <h2 className="font-display italic text-2xl md:text-4xl text-black text-center" style={{ fontWeight: 300 }}>
                    How shall our advisor contact you?
                  </h2>
                  <input
                    autoFocus
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && goNext()}
                    placeholder="10-digit mobile number"
                    className="sn-underline-input mt-12 w-full text-center text-xl md:text-2xl font-light py-3 placeholder:text-neutral-400"
                  />
                  <StepNav onBack={goBack} onNext={goNext} canNext={canContinue} />
                </div>
              )}

              {step === 5 && (
                <div key="s5" className="sn-fade-up">
                  <h2 className="font-display italic text-2xl md:text-4xl text-black text-center" style={{ fontWeight: 300 }}>
                    A final glance, with our compliments.
                  </h2>
                  <dl className="mt-12 space-y-6">
                    <SummaryRow label="Curator" value={name} />
                    <SummaryRow label="Sanctuary" value={`${city} · Pincode ${pincode}`} />
                    <SummaryRow label="Selections" value={selectedServices.length ? selectedServices.join("  ·  ") : "— none —"} />
                    <SummaryRow label="Contact" value={phone} />
                  </dl>
                  <div className="mt-14 flex flex-col items-center gap-5">
                    <button
                      onClick={submit}
                      className="rounded-full bg-black text-white px-12 py-4 text-[11px] uppercase tracking-[0.25em] font-light hover:opacity-90 transition-opacity"
                    >
                      Request Bespoke Consultation
                    </button>
                    <button
                      onClick={goBack}
                      className="text-[10px] tracking-[0.25em] uppercase font-light underline underline-offset-[6px] decoration-[0.5px] hover:opacity-60 transition-opacity"
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

      <div className="absolute bottom-6 left-0 right-0 text-center z-10 pointer-events-none">
        <p className="text-[9px] tracking-[0.4em] uppercase text-neutral-500 font-light">
          Quiet luxury · Invisible protection
        </p>
      </div>
    </div>
  );
}

function SuccessScreen({ onHome }: { onHome: () => void }) {
  return (
    <div className="text-center sn-dawn py-6">
      <div className="mx-auto w-px h-12 bg-black/30 mb-10" aria-hidden />
      <h2 className="font-display italic text-2xl md:text-3xl text-black" style={{ fontWeight: 300 }}>
        Your sanctuary's protection is now in our care.
      </h2>
      <p className="mt-6 max-w-md mx-auto text-[12px] font-light tracking-wide text-neutral-600">
        A regional master advisor will connect with you within two hours to schedule site measurements and material reviews.
      </p>
      <button
        onClick={onHome}
        className="mt-12 inline-flex items-center justify-center rounded-full border border-black px-12 py-4 text-[11px] uppercase tracking-[0.25em] font-light hover:bg-black hover:text-white transition-colors"
      >
        Return to Home
      </button>
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

function StepNav({ onBack, onNext, canNext }: { onBack: () => void; onNext: () => void; canNext: boolean }) {
  return (
    <div className="mt-14 flex items-center justify-between">
      <button
        onClick={onBack}
        className="text-[10px] tracking-[0.25em] uppercase font-light underline underline-offset-[6px] decoration-[0.5px] hover:opacity-60 transition-opacity"
      >
        ← Back
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="text-[10px] tracking-[0.25em] uppercase font-light underline underline-offset-[6px] decoration-[0.5px] hover:opacity-60 transition-opacity disabled:opacity-30"
      >
        Continue →
      </button>
    </div>
  );
}