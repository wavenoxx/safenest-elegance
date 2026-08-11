import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SanctuaryChronicle = () => {
  const [timeString, setTimeString] = useState("");
  const [atmosphere, setAtmosphere] = useState("");

  useEffect(() => {
    const updateChronicle = () => {
      const now = new Date();
      const hours = now.getHours();
      // Clean 12-hour format using standard sans-serif font (matching footer body text)
      const formattedTime = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).toUpperCase();
      setTimeString(formattedTime);

      // Architectural sun-cycle atmospheric states
      if (hours >= 5 && hours < 12) {
        setAtmosphere("MORNING LIGHT & SUNBEAMS");
      } else if (hours >= 12 && hours < 17) {
        setAtmosphere("ZENITH SUN & SHADOWS");
      } else if (hours >= 17 && hours < 19) {
        setAtmosphere("GOLDEN HOUR & TWILIGHT SERENITY");
      } else {
        setAtmosphere("SILENT NIGHT & SECURED SANCTUARY");
      }
    };

    updateChronicle();
    const timer = setInterval(updateChronicle, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-start select-none">
      {/* Column Header matching SERVICES, CUSTOMER CARE, CUSTOMER SERVICE */}
      <h3 className="font-sans text-[11px] tracking-[0.25em] uppercase font-light text-neutral-500 mb-4">
        THE SANCTUARY CHRONICLE
      </h3>

      {/* Time Display matching footer sans-serif light body style */}
      <div className="flex items-center space-x-2 text-[12px] font-sans font-light text-neutral-600 tracking-[0.15em] mb-1.5">
        <span className="w-1 h-1 rounded-full bg-neutral-400 animate-pulse" />
        <span>{timeString || "05:58:11 PM"}</span>
      </div>

      {/* Atmospheric Subtitle matching brand serif italic style */}
      <p className="font-serif italic text-[12px] font-light text-neutral-400 tracking-wider leading-relaxed">
        {atmosphere || "GOLDEN HOUR & TWILIGHT SERENITY"}
      </p>
    </div>
  );
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showServiceArea, setShowServiceArea] = useState(false);
  const [legalModal, setLegalModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const legalContent: Record<string, { title: string; body: React.ReactNode }> = {
    terms: {
      title: "Terms and Conditions",
      body: (
        <div className="space-y-3 text-xs font-light text-neutral-600 leading-relaxed">
          <p>
            Welcome to {BRAND_CONFIG.name}. These terms govern your use of our website and services. By accessing or using our platform, you agree to comply with these terms.
          </p>
          <p>
            All products and services are subject to availability and confirmation of the order price. We reserve the right to modify or discontinue any service without prior notice.
          </p>
          <p>
            {BRAND_CONFIG.name} shall not be liable for any indirect, incidental, or consequential damages arising from the use of our safety solutions. Warranty claims are subject to inspection and approval by our technical team.
          </p>
        </div>
      ),
    },
    privacy: {
      title: "Privacy & Cookies",
      body: (
        <div className="space-y-3 text-xs font-light text-neutral-600 leading-relaxed">
          <p>
            {BRAND_CONFIG.name} is committed to protecting your privacy. We collect only the information necessary to provide our safety consultation and installation services.
          </p>
          <p>
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You may disable cookies in your browser settings, though this may affect site functionality.
          </p>
          <p>
            We do not sell or share your personal data with third parties for marketing purposes. All data is stored securely and handled in accordance with applicable Indian data protection laws.
          </p>
        </div>
      ),
    },
    sitemap: {
      title: "Sitemap",
      body: (
        <div className="grid grid-cols-2 gap-4 text-xs font-light text-neutral-600 leading-relaxed">
          <div className="space-y-2">
            <p className="font-medium text-neutral-900">Services</p>
            <Link to="/solutions" className="block hover:text-neutral-900 hover:underline underline-offset-4">Solutions Explorer</Link>
            <Link to="/category/invisible-grills" className="block hover:text-neutral-900 hover:underline underline-offset-4">Invisible Grills</Link>
            <Link to="/category/core-safety-nets" className="block hover:text-neutral-900 hover:underline underline-offset-4">Core Safety Nets</Link>
            <Link to="/category/construction-industrial" className="block hover:text-neutral-900 hover:underline underline-offset-4">Construction & Industrial</Link>
            <Link to="/category/animal-bird-protection" className="block hover:text-neutral-900 hover:underline underline-offset-4">Animal & Bird Protection</Link>
            <Link to="/category/specialty-solutions" className="block hover:text-neutral-900 hover:underline underline-offset-4">Specialty Solutions</Link>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-neutral-900">Company</p>
            <Link to="/our-story" className="block hover:text-neutral-900 hover:underline underline-offset-4">Our Story</Link>
            <Link to="/craftsmanship" className="block hover:text-neutral-900 hover:underline underline-offset-4">The Craftsmanship</Link>
            <Link to="/lifestyle" className="block hover:text-neutral-900 hover:underline underline-offset-4">The Lifestyle</Link>
            <Link to="/consultation" className="block hover:text-neutral-900 hover:underline underline-offset-4">Consultation</Link>
            <p className="font-medium text-neutral-900 pt-2">Campaigns</p>
            <Link to="/campaigns/silent-promise" className="block hover:text-neutral-900 hover:underline underline-offset-4">The Silent Promise</Link>
            <Link to="/campaigns/light-and-sanctuary" className="block hover:text-neutral-900 hover:underline underline-offset-4">Light & Sanctuary</Link>
          </div>
        </div>
      ),
    },
  };

  return (
    <footer style={{ backgroundColor: "#FDFCF7" }}>
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
            <ul className="space-y-4">
              {[
                { label: "Invisible Grills", to: "/category/invisible-grills" },
                { label: "Core Safety Nets", to: "/category/core-safety-nets" },
                { label: "Construction & Industrial", to: "/category/construction-industrial" },
                { label: "Animal & Bird Protection", to: "/category/animal-bird-protection" },
                { label: "Specialty Solutions", to: "/category/specialty-solutions" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
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
            <ul className="space-y-4">
              <li>
                <Link
                  to="/consultation"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
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
                <a
                  href="mailto:safenestind@gmail.com?subject=Maintenance%20Request"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Maintenance & Repair
                </a>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal("terms")}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors text-left bg-transparent border-0 cursor-pointer"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  10-Year Warranty Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal("privacy")}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors text-left bg-transparent border-0 cursor-pointer"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Safety FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal("terms")}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors text-left bg-transparent border-0 cursor-pointer"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Material Standards
                </button>
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
            <ul className="space-y-4">
              <li>
                <Link
                  to="/our-story"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
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
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
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
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
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
                <a
                  href="mailto:safenestind@gmail.com?subject=Career%20Application"
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: LEGAL */}
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
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setLegalModal("terms")}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors text-left bg-transparent border-0 cursor-pointer"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal("privacy")}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors text-left bg-transparent border-0 cursor-pointer"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Privacy & Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal("sitemap")}
                  className="text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors text-left bg-transparent border-0 cursor-pointer"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Sitemap
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: MIDDLE PANEL */}
      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
            {/* CUSTOMER SERVICE */}
            <div className="text-center md:text-left">
              <h4
                className="uppercase mb-5"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.25em",
                  color: "#737373",
                }}
              >
                Customer Service
              </h4>
              <p
                className="mb-5"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "#333333",
                  lineHeight: 1.8,
                }}
              >
                A Safety Advisor is available for scheduling site surveys:
              </p>
              <div className="space-y-2">
                <a
                  href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
                  onClick={() => (window as any).trackGoogleConversion?.('phone')}
                  className="block text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Call: {BRAND_CONFIG.contact.phoneDisplay}
                </a>
                <a
                  href={BRAND_CONFIG.socials.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => (window as any).trackGoogleConversion?.('whatsapp')}
                  className="block text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  WhatsApp: {BRAND_CONFIG.contact.whatsappDisplay}
                </a>
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="block text-neutral-600 hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Email:{" "}
                  <span className="underline text-neutral-500 hover:text-neutral-800">
                    {BRAND_CONFIG.contact.email}
                  </span>
                </a>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="text-center">
              <h4
                className="uppercase mb-5"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.25em",
                  color: "#737373",
                }}
              >
                Newsletter
              </h4>
              <p
                className="mb-5 max-w-sm mx-auto"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "#333333",
                  lineHeight: 1.8,
                }}
              >
                Receive our newsletter and discover our stories, safety tips, and project announcements.
              </p>
              {subscribed ? (
                <p
                  className="text-neutral-800"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Thank you for subscribing to {BRAND_CONFIG.name} Journals.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-stretch max-w-sm mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 bg-white border border-neutral-300 text-xs px-4 py-2.5 outline-none focus:border-neutral-900 font-light"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 border border-neutral-900 bg-neutral-900 text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* SANCTUARY CHRONICLE */}
            <div className="text-center md:text-right">
              <SanctuaryChronicle />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SUB-BOTTOM BAR */}
      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* SERVICE AREA */}
            <div className="relative">
              <button
                onClick={() => setShowServiceArea(!showServiceArea)}
                className="uppercase text-neutral-800 hover:text-neutral-600 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                }}
              >
                Service Area : South India <span className="text-[10px]">&gt;</span>
              </button>
              {showServiceArea && (
                <div
                  className="absolute bottom-full left-0 mb-3 bg-white border border-neutral-200 shadow-lg p-5 w-72 z-50 text-left"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  <h5
                    className="uppercase mb-3"
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      letterSpacing: "0.2em",
                      color: "#737373",
                    }}
                  >
                    South India Regional Coverage
                  </h5>
                  <p
                    className="mb-3"
                    style={{ fontSize: "11px", fontWeight: 300, color: "#333", lineHeight: 1.6 }}
                  >
                    Our operations team covers all major hubs across the South India region:
                  </p>
                  <ul
                    className="mb-3 space-y-1"
                    style={{ fontSize: "11px", fontWeight: 300, color: "#333", lineHeight: 1.6 }}
                  >
                    <li>• Hyderabad</li>
                    <li>• Bengaluru</li>
                    <li>• Chennai</li>
                    <li>• Kochi</li>
                    <li>• Visakhapatnam</li>
                  </ul>
                  <p style={{ fontSize: "11px", fontWeight: 300, color: "#737373", lineHeight: 1.6 }}>
                    Serving: Andhra Pradesh (AP), Telangana (TS), Karnataka (KA), Tamil Nadu (TN), &amp; Kerala (KL)
                  </p>
                </div>
              )}
            </div>

            {/* COPYRIGHT */}
            <p
              className="text-center md:text-right"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 300,
                color: "#737373",
              }}
            >
              © {BRAND_CONFIG.name} 2026. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* LEGAL MODAL */}
      <Dialog open={!!legalModal} onOpenChange={(open) => !open && setLegalModal(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle
              className="uppercase tracking-widest"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "13px", fontWeight: 400 }}
            >
              {legalModal ? legalContent[legalModal]?.title : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">{legalModal ? legalContent[legalModal]?.body : null}</div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
