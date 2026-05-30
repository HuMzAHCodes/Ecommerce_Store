import type { ComponentType } from "react";

// ── Types ─────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href:  string;
}

export interface SocialEntry {
  Icon:  ComponentType;
  href:  string;
  label: string;
}

// ── Social SVG icons ──────────────────────────────────────────

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20L20 4"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

// ── Data constants ────────────────────────────────────────────

export const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Shop: [
    { label: "New Arrivals",  href: "/shop?filter=new"         },
    { label: "Best Sellers",  href: "/shop?filter=bestsellers" },
    { label: "Sale",          href: "/shop?filter=sale"        },
    { label: "All Products",  href: "/shop"                    },
  ],
  Help: [
    { label: "FAQs",          href: "/faqs"     },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns",       href: "/returns"  },
    { label: "Track Order",   href: "/track"    },
  ],
  Company: [
    { label: "About Us",       href: "/about"          },
    { label: "Sustainability", href: "/sustainability"  },
    { label: "Careers",        href: "/careers"        },
    { label: "Press",          href: "/press"          },
  ],
};

export const SOCIAL_LINKS: SocialEntry[] = [
  { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { Icon: TwitterIcon,   href: "https://twitter.com",   label: "Twitter"   },
  { Icon: FacebookIcon,  href: "https://facebook.com",  label: "Facebook"  },
  { Icon: YoutubeIcon,   href: "https://youtube.com",   label: "YouTube"   },
];

export const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export const FOOTER_TAGLINE =
  "Simple, Clean, Beautiful. Crafted with care for the ones who care about what they put on their skin.";