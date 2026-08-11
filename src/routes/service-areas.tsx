import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/service-areas")({
  head: () =>
    buildMetaTags({
      title: "Verified Service Areas & Regional Hubs",
      description:
        "Explore SafeNest verified service areas across South India: Hyderabad, Bengaluru, Chennai, Kochi, and Visakhapatnam.",
      canonicalPath: "/service-areas",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Verified Service Areas & Regional Operations",
        description:
          "SafeNest regional architectural safety installation coverage across South India hubs.",
        publisher: {
          "@type": "Organization",
          name: BRAND_CONFIG.name,
          url: "https://safenestindia.com",
        },
      },
    }),
  component: ServiceAreasPage,
});

const REGIONAL_HUBS = [
  {
    city: "Hyderabad & Secunderabad",
    tag: "Telangana Central Hub",
    description:
      "Full architectural invisible grills and balcony safety netting for high-rise gated communities and luxury villas.",
    neighborhoods: [
      "Financial District",
      "Gachibowli",
      "HITEC City",
      "Jubilee Hills",
      "Kokapet",
      "Kondapur",
      "Madhapur",
      "Nanakramguda",
      "Banjara Hills",
      "Tellapur",
    ],
    climateNotes:
      "Calibrated for high thermal variation and intense summer sun with UV-stabilized Nylon-12 coating.",
  },
  {
    city: "Bengaluru (Bangalore)",
    tag: "Karnataka Regional Operations",
    description:
      "Modern apartment balconies, internal staircase lines, and pigeon deterrence for high-density tech corridors.",
    neighborhoods: [
      "Whitefield",
      "Sarjapur Road",
      "Indiranagar",
      "Koramangala",
      "Bellandur",
      "Hebbal",
      "HSR Layout",
      "Electronic City",
      "Yelahanka",
      "JP Nagar",
    ],
    climateNotes:
      "All-weather monofilament HDPE netting and stainless steel tracks suited for year-round urban living.",
  },
  {
    city: "Chennai",
    tag: "Tamil Nadu Coastal Hub",
    description:
      "Marine-grade AISI 316 invisible grills engineered specifically for coastal salt air and tropical humidity.",
    neighborhoods: [
      "Old Mahabalipuram Road (OMR)",
      "East Coast Road (ECR)",
      "Anna Nagar",
      "Adyar",
      "Besant Nagar",
      "Velachery",
      "Thiruvanmiyur",
      "Nungambakkam",
      "Porur",
      "Alwarpet",
    ],
    climateNotes:
      "Strict AISI 316 austenitic stainless steel core specified to eliminate pitting from coastal sea breeze.",
  },
  {
    city: "Kochi (Cochin)",
    tag: "Kerala Coastal Operations",
    description:
      "Monsoon-resistant safety netting, stainless steel window grids, and bird protection for waterfront residences.",
    neighborhoods: [
      "Marine Drive",
      "Kakkanad (Infopark)",
      "Edappally",
      "Panampilly Nagar",
      "Kadavanthra",
      "Aluva",
      "Vyttila",
      "Kaloor",
    ],
    climateNotes:
      "Heavy monsoon water shedding and high-tensile anchor fasteners embedded into dense concrete.",
  },
  {
    city: "Visakhapatnam (Vizag)",
    tag: "Andhra Pradesh Coastal Hub",
    description:
      "High-tensile balcony safety grids and bird deterrence for coastal high-rises and sea-facing apartments.",
    neighborhoods: [
      "Beach Road",
      "Madhurawada",
      "Rushikonda",
      "MVP Colony",
      "Seethammadhara",
      "Yendada",
      "Siripuram",
    ],
    climateNotes:
      "Wind-calibrated anchor tracks engineered for coastal gust exposures and seaside humidity.",
  },
];

function ServiceAreasPage() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 bg-[#050505] border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="sn-eyebrow text-neutral-400 mb-4">
            Regional Coverage
          </p>
          <h1 className="sn-h1 text-white mb-4">
            Verified Service Areas
          </h1>
          <p className="sn-subtext text-neutral-300 max-w-2xl mx-auto">
            {BRAND_CONFIG.name} deploys trained master technicians and digital laser survey teams
            across major metropolitan and coastal hubs in South India.
          </p>
        </div>
      </section>

      {/* Hubs Grid */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16">
        {REGIONAL_HUBS.map((hub, idx) => (
          <article
            key={hub.city}
            className="border border-white/10 p-8 md:p-12 bg-white/[0.02] hover:border-white/30 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  Hub 0{idx + 1}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-light text-white uppercase tracking-wide mt-1">
                  {hub.city}
                </h2>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-light">
                {hub.tag}
              </span>
            </div>

            <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
              {hub.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-light">
              <div>
                <h3 className="font-medium text-white uppercase tracking-wider mb-3">
                  Key Service Localities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hub.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="inline-block bg-white/[0.04] text-neutral-300 px-3 py-1.5 text-[11px] border border-white/10"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.02] p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-white uppercase tracking-wider mb-2">
                    Regional Climate &amp; Material Note
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">{hub.climateNotes}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    to="/consultation"
                    className="text-[10px] uppercase tracking-[0.2em] font-light text-neutral-300 hover:text-white hover:underline underline-offset-4 focus-ring"
                  >
                    Schedule Survey in {hub.city.split(" ")[0]} →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </main>

      <ProofSection />
      <Footer />
    </div>
  );
}
