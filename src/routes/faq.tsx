import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: `Safety & Installation FAQ — ${BRAND_CONFIG.name}` },
      {
        name: "description",
        content: `Frequently asked questions regarding invisible grills, safety net installation, building permissions, tensile load capacity, and maintenance.`,
      },
    ],
    links: [{ rel: "canonical", href: "https://safenestindia.com/faq" }],
  }),
  component: FAQPage,
});

const faqs = [
  {
    q: "How do Invisible Grills compare to traditional iron window grills?",
    a: "Invisible grills utilize high-tensile AISI 316 marine-grade stainless steel cables encased in clear nylon-12. They provide strong fall-prevention protection while maintaining 98%+ optical transparency, allowing unrestricted light and airflow without the visual cage effect of iron bars.",
  },
  {
    q: "Will society or gated community associations approve SafeNest invisible grills?",
    a: "Yes. Most luxury gated communities and high-rise apartment associations across Hyderabad, Bengaluru, Chennai, and Kochi approve invisible grills because they do not alter the building exterior elevation or facade aesthetics, unlike bulky iron grills.",
  },
  {
    q: "Can invisible grills be installed on balconies, windows, and open staircases?",
    a: "Yes. SafeNest engineers custom structural tracks tailored to straight balconies, curved layouts, sliding window tracks, and vertical open staircase banisters.",
  },
  {
    q: "How do you ensure child and pet safety?",
    a: "We offer calibrated 2-inch (50 mm) micro-gap spacing configurations specifically designed for homes with toddlers and pets, preventing head entrapment and accidental edge falls.",
  },
  {
    q: "What is the process for scheduling a site survey?",
    a: "You can request a complimentary site survey through our consultation page or WhatsApp. A regional safety advisor will visit your residence to take precision laser measurements, evaluate sub-base anchoring, and provide a clear quotation.",
  },
  {
    q: "How are SafeNest safety nets protected against sun and rain weathering?",
    a: "Our safety nets are manufactured from 100% virgin high-density polyethylene (HDPE) embedded with UV stabilizers during extrusion. They resist rot, mold, and brittleness in high-humidity coastal climates.",
  },
];

function FAQPage() {
  return (
    <div className="bg-white text-neutral-900 min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-neutral-200">
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-3">
            Knowledge &amp; Advisory
          </p>
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-[0.1em] font-light text-neutral-950">
            Safety &amp; Installation FAQ
          </h1>
          <p className="mt-3 text-xs text-neutral-500 font-light">
            Clear answers to common questions about our architectural safety solutions.
          </p>
        </header>

        <div className="divide-y divide-neutral-200">
          {faqs.map((faq, index) => (
            <section key={index} className="py-8 space-y-3">
              <h2 className="text-base font-normal text-neutral-950 tracking-wide">{faq.q}</h2>
              <p className="text-sm font-light leading-relaxed text-neutral-600">{faq.a}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-neutral-200 text-center">
          <p className="text-xs text-neutral-500 font-light mb-4">
            Have a specific architectural or layout question?
          </p>
          <Link
            to="/consultation"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-10 py-3.5 text-[11px] uppercase tracking-[0.25em] font-light hover:bg-neutral-800 transition-colors min-h-11 focus-ring"
          >
            Request Bespoke Advisory
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
