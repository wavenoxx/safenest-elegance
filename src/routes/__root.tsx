import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { BRAND_CONFIG } from "@/config/brand";
import { captureAttribution } from "@/lib/attribution";
import { trackEngagement } from "@/lib/analytics";
import { ConsentBanner, initializeGoogleConsentDefaults } from "@/components/ConsentBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-light text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-normal text-foreground uppercase tracking-widest">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground font-light">
          The requested page does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-light uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 min-h-11 focus-ring"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-normal tracking-wide text-foreground uppercase">
          An error occurred
        </h1>
        <p className="mt-2 text-sm text-muted-foreground font-light">
          Something went wrong loading this view. You may refresh or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-light uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 min-h-11 focus-ring"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-2.5 text-xs font-light uppercase tracking-widest text-foreground transition-colors hover:bg-accent min-h-11 focus-ring"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SafeNest",
  legalName: "SafeNest Architectural Safety Atelier",
  url: "https://safenestindia.com",
  logo: "https://safenestindia.com/images/homepage/banner-1.jpg",
  image: "https://safenestindia.com/images/homepage/banner-1.jpg",
  description:
    "Bespoke architectural safety solutions: invisible grills, safety netting, and bird protection across verified South India service areas.",
  telephone: "+919553879931",
  email: "safenestind@gmail.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919553879931",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Telugu", "Hindi"],
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}` },
      { name: "description", content: BRAND_CONFIG.description },
      { name: "author", content: BRAND_CONFIG.name },
      { property: "og:title", content: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}` },
      { property: "og:description", content: BRAND_CONFIG.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://safenestindia.com" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://safenestindia.com/" },
      { rel: "stylesheet", href: appCss },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
      {
        rel: "preload",
        as: "image",
        href: "/images/homepage/banner-1.jpg",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize Google Consent Mode v2 defaults immediately
    initializeGoogleConsentDefaults();

    // Capture attribution parameters (gclid, wbraid, gbraid, utms)
    captureAttribution();

    // Compatibility shim: map legacy trackGoogleConversion calls safely to secondary trackEngagement
    window.trackGoogleConversion = function (actionType: string) {
      trackEngagement(
        actionType === "whatsapp" ? "whatsapp" : actionType === "phone" ? "phone" : "navigation",
        "legacy_shim",
      );
    };
  }, []);

  return (
    <html lang="en" style={{ backgroundColor: "#050505", color: "#ffffff" }} className="bg-[#050505]">
      <head>
        <HeadContent />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18289280987"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18289280987', {
                'send_page_view': true
              });
            `,
          }}
        />
      </head>
      <body style={{ backgroundColor: "#050505", color: "#ffffff" }} className="bg-[#050505] text-white selection:bg-white/20">
        {children}
        <ConsentBanner />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}
