import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import { trackEngagement } from "@/lib/analytics";

export function Footer() {
  const [showServiceArea, setShowServiceArea] = useState(false);

  return (
    <footer style={{ backgroundColor: "#FDFCF7" }} className="border-t border-neutral-200">
      {/* SECTION 1: 4-COLUMN LINK GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: SERVICES */}
          <div>
            <h4
              className="uppercase mb-6"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.25em",
                color: "#737373",
              }}
            >
              Services
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: "Invisible Grills", to: "/category/invisible-grills" },
                { label: "Core Safety Nets", to: "/category/core-safety-nets" },
                { label: "Construction & Industrial", to: "/category/construction-industrial" },
                { label: "Animal & Bird Protection", to: "/category/animal-bird-protection" },
                { label: "Specialty Solutions", to: "/category/specialty-solutions" },
                { label: "Solutions Explorer", to: "/solutions" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "12px",
                      fontWeight: 300,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: CUSTOMER CARE */}
          <div>
            <h4
              className="uppercase mb-6"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.25em",
                color: "#737373",
              }}
            >
              Customer Care
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/consultation"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Request Site Survey
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Warranty Policy &amp; Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/safety-faq"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Safety &amp; Architecture FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/material-standards"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Material Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/maintenance-repair"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Care &amp; Maintenance Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: THE SAFENEST HOUSE */}
          <div>
            <h4
              className="uppercase mb-6"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.25em",
                color: "#737373",
              }}
            >
              The {BRAND_CONFIG.name} House
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/our-story"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/craftsmanship"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  The Craftsmanship
                </Link>
              </li>
              <li>
                <Link
                  to="/lifestyle"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  The Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/service-areas"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring font-medium"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                  }}
                >
                  Verified Service Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: LEGAL & DIRECTORY */}
          <div>
            <h4
              className="uppercase mb-6"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.25em",
                color: "#737373",
              }}
            >
              Legal &amp; Index
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/terms"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Privacy &amp; Cookies
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Site Directory
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: CLIENT SERVICE & REGIONAL ADVISORY */}
      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Direct Contact */}
            <div>
              <h4
                className="uppercase mb-3"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.25em",
                  color: "#737373",
                }}
              >
                Client Service &amp; Site Surveys
              </h4>
              <p
                className="mb-4 text-xs font-light text-neutral-600 leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                A safety advisor is available for scheduling on-site architectural measurements
                across South India:
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-light text-neutral-800">
                <a
                  href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
                  onClick={() => trackEngagement("phone", "footer")}
                  className="hover:underline underline-offset-4 font-normal text-neutral-900 focus-ring"
                >
                  Call: {BRAND_CONFIG.contact.phoneDisplay}
                </a>
                <a
                  href={BRAND_CONFIG.socials.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEngagement("whatsapp", "footer")}
                  className="hover:underline underline-offset-4 font-normal text-neutral-900 focus-ring"
                >
                  WhatsApp: {BRAND_CONFIG.contact.whatsappDisplay}
                </a>
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  onClick={() => trackEngagement("email", "footer")}
                  className="hover:underline underline-offset-4 text-neutral-600 hover:text-neutral-900 focus-ring"
                >
                  Email: {BRAND_CONFIG.contact.email}
                </a>
              </div>
            </div>

            {/* Quiet Brand Mission Statement */}
            <div className="md:text-right">
              <p className="font-serif italic text-base md:text-lg text-neutral-800 font-light leading-relaxed">
                "The art of invisible protection — securing your sanctuary with quiet architectural
                grace."
              </p>
              <p className="mt-2 text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light">
                Hyderabad · Bengaluru · Chennai · Kochi · Visakhapatnam
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SUB-BOTTOM BAR */}
      <div className="border-t border-neutral-200 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* SERVICE AREA */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowServiceArea(!showServiceArea)}
                className="text-[11px] text-neutral-600 hover:text-neutral-950 font-light uppercase tracking-widest flex items-center gap-1.5 focus-ring cursor-pointer"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                aria-expanded={showServiceArea}
              >
                <span>Verified Service Hubs: South India</span>
                <span className="text-[9px]">{showServiceArea ? "▲" : "▼"}</span>
              </button>
              {showServiceArea && (
                <div
                  className="absolute bottom-full left-0 mb-2 w-80 bg-white border border-neutral-200 p-4 shadow-md text-xs font-light text-neutral-600 space-y-2 z-50"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  <p className="font-medium text-neutral-900 text-[11px] uppercase tracking-wider">
                    Operational Hubs
                  </p>
                  <p>• Telangana: Hyderabad &amp; Secunderabad</p>
                  <p>• Karnataka: Bengaluru &amp; Suburbs</p>
                  <p>• Tamil Nadu: Chennai &amp; Coastal Corridor</p>
                  <p>• Kerala: Kochi &amp; Ernakulam</p>
                  <p>• Andhra Pradesh: Visakhapatnam &amp; Coastal Hubs</p>
                  <div className="pt-2 border-t border-neutral-100">
                    <Link
                      to="/service-areas"
                      className="text-[10px] uppercase tracking-wider text-neutral-900 underline underline-offset-4"
                    >
                      View All Locality Details →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* COPYRIGHT */}
            <p
              className="text-[10px] uppercase font-light text-neutral-500 tracking-[0.2em]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              © {new Date().getFullYear()} {BRAND_CONFIG.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
