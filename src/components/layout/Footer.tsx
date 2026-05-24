import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";

// ── Social Icons (inline SVG — no lucide dependency) ──────────

const SocialIcons = {
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l16 16M4 20L20 4"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Youtube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
};

// ── Data ──────────────────────────────────────────────────────

const LINKS = {
  Shop: [
    { label: "New Arrivals",   href: "/shop?filter=new" },
    { label: "Best Sellers",   href: "/shop?filter=bestsellers" },
    { label: "Sale",           href: "/shop?filter=sale" },
    { label: "All Products",   href: "/shop" },
  ],
  Help: [
    { label: "FAQs",           href: "/faqs" },
    { label: "Shipping Info",  href: "/shipping" },
    { label: "Returns",        href: "/returns" },
    { label: "Track Order",    href: "/track" },
  ],
  Company: [
    { label: "About Us",       href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers",        href: "/careers" },
    { label: "Press",          href: "/press" },
  ],
};

const SOCIALS = [
  { Icon: SocialIcons.Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: SocialIcons.Twitter,   href: "https://twitter.com",   label: "Twitter"   },
  { Icon: SocialIcons.Facebook,  href: "https://facebook.com",  label: "Facebook"  },
  { Icon: SocialIcons.Youtube,   href: "https://youtube.com",   label: "YouTube"   },
];

// ── Component ─────────────────────────────────────────────────

const Footer = () => {
  const theme = useTheme();
  const { colors, typography, radius, transitions } = theme;
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const linkStyle: React.CSSProperties = {
    fontFamily:     typography.fontBody,
    fontSize:       typography.sm,
    color:          colors.textSecondary,
    textDecoration: "none",
    display:        "inline-block",
    transition:     `color ${transitions?.fast}`,
    lineHeight:     2,
  };

  return (
    <footer style={{ background: colors.bgSecondary, borderTop: `1px solid ${colors.borderLight}`, marginTop: "auto" }}>

      {/* ── Main grid ────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1280, margin: "0 auto",
          padding:  "4rem 1.5rem 3rem",
          display:  "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap:      "2.5rem",
        }}
      >
        {/* Brand */}
        <div>
          <Link to="/" style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], fontWeight: typography.weightMedium, color: colors.textPrimary, textDecoration: "none", letterSpacing: "0.06em", display: "block", marginBottom: "1rem" }}>
            BLÜM
          </Link>
          <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted, lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: 220 }}>
            Simple. Clean. Beautiful. Crafted with care for the ones who care about what they put on their skin.
          </p>

          {/* Socials */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {SOCIALS.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: radius?.full, background: colors.bgTertiary, color: colors.textSecondary, transition: `background ${transitions?.fast}, color ${transitions?.fast}` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = colors.accentPrimary; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = colors.bgTertiary;    (e.currentTarget as HTMLAnchorElement).style.color = colors.textSecondary; }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightBold, color: colors.textPrimary, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {heading}
            </h4>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {links.map((l) => (
                <Link
                  key={l.label} to={l.href} style={linkStyle}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.accentPrimary;  }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.textSecondary; }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h4 style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightBold, color: colors.textPrimary, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Stay in the loop
          </h4>
          <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted, marginBottom: "1rem", lineHeight: 1.6 }}>
            New drops, restocks, and offers — straight to your inbox.
          </p>

          {submitted ? (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: colors.success, fontSize: typography.sm, fontFamily: typography.fontBody }}>
              ✓ You're subscribed!
            </motion.p>
          ) : (
            <form onSubmit={handleNewsletter} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <input
                type="email" required placeholder="your@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "0.6rem 0.875rem", borderRadius: radius?.md, border: `1px solid ${colors.borderLight}`, background: colors.bgCard, fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textPrimary, outline: "none" }}
              />
              <motion.button
                type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.6rem 1rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, border: "none", cursor: "pointer" }}
              >
                Subscribe <ArrowRight size={15} />
              </motion.button>
            </form>
          )}
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${colors.borderLight}`, padding: "1.25rem 1.5rem", maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, margin: 0 }}>
          © {new Date().getFullYear()} Blüm. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
            <Link key={t} to="#"
              style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.accentPrimary; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = colors.textMuted; }}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// ── File Overview ──────────────────────────────────────────────────────────────
//
// Footer.tsx
// The site-wide footer for the BLÜM storefront. Renders a responsive multi-column
// grid with a brand blurb, three link sections, a newsletter signup form, and a
// legal bottom bar — all styled inline from ThemeContext.
//
// ── What it renders ───────────────────────────────────────────────────────────
//
//  <footer>
//   ├─ Main grid (CSS auto-fit, minmax 180px columns)
//   │   ├─ Brand column       — logo, tagline, social icon row
//   │   ├─ Shop column        — link list generated from LINKS.Shop
//   │   ├─ Help column        — link list generated from LINKS.Help
//   │   ├─ Company column     — link list generated from LINKS.Company
//   │   └─ Newsletter column  — email input + subscribe button (or success message)
//   └─ Bottom bar             — copyright line + Privacy / Terms / Cookie links
//
// ── Module-level data constants ───────────────────────────────────────────────
//
//  LINKS   — a plain object with three keys (Shop, Help, Company), each holding
//            an array of { label, href } pairs. Defined outside the component so
//            it is never re-created on render. Adding or removing footer links
//            only requires editing this object.
//
//  SOCIALS — array of { icon (ReactNode), href, label } for the four social
//            platform buttons. Also module-level for the same reason.
//
// ── State ─────────────────────────────────────────────────────────────────────
//
//  email      — controlled value for the newsletter email input
//  submitted  — boolean; flips to true on a valid submission, replacing the
//               form with an animated success message. Never resets to false
//               (intentional — no re-subscribe in the same session).
//
// ── Newsletter form logic ─────────────────────────────────────────────────────
//
//  handleNewsletter:
//    • Prevents default form submission (no page reload)
//    • Guards against empty/whitespace input
//    • Sets submitted = true and clears the email field
//    • No real API call — this is a UI stub ready to wire up to a
//      mailing list service (e.g. Mailchimp, Klaviyo)
//  Success state renders a motion.p that fades + slides in from y: +6.
//
// ── Link columns (Object.entries pattern) ─────────────────────────────────────
//
//  Object.entries(LINKS) maps the three sections dynamically, so all three
//  columns share identical markup — heading <h4> + <nav> of <Link> elements.
//  Hover color is handled imperatively via onMouseEnter/Leave mutating
//  element.style.color directly, keeping per-link state variables unnecessary.
//  The shared `linkStyle` object is defined once inside the component (it
//  reads from theme, so it must be inside) and spread onto every link.
//
// ── Social icons ──────────────────────────────────────────────────────────────
//
//  Each social is a motion.a with:
//    whileHover — scale: 1.1
//    whileTap   — scale: 0.95
//  Background and color swap to accentPrimary / white on hover via
//  onMouseEnter/Leave imperative style mutation (same pattern as link columns).
//  rel="noopener noreferrer" is set on all external links for security.
//  aria-label is provided on each for screen reader accessibility.
//
// ── Responsive grid ───────────────────────────────────────────────────────────
//
//  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
//  This creates as many columns as fit at ≥ 180px each, automatically
//  collapsing to fewer columns on narrow viewports — no media queries needed.
//  The brand column has gridColumn: "span 1" (no special spanning behavior);
//  it naturally takes one column like the others.
//
// ── Bottom bar ────────────────────────────────────────────────────────────────
//
//  A flex row (space-between) with flexWrap: "wrap" so it stacks gracefully
//  on very narrow screens. Copyright year is computed dynamically with
//  new Date().getFullYear() so it never needs a manual annual update.
//  The three legal links currently point to "#" — placeholders for real pages.
//
// ── Hover interactions (imperative style pattern) ─────────────────────────────
//
//  No hover state variables are used anywhere in this file. All hover effects
//  mutate element.style directly in onMouseEnter/Leave handlers. This is
//  consistent with the rest of the codebase (Navbar, Modal, etc.) and avoids
//  creating per-item useState for purely visual transitions.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — Link for internal navigation (no full page reload)
//  framer-motion     — motion.a (social icons), motion.button (subscribe),
//                      motion.p (success message fade-in)
//  lucide-react      — Instagram, Twitter, Facebook, Youtube, ArrowRight icons
//  useTheme()        — colors, typography, radius, transitions from ThemeContext



// ── Note on SocialIcons ───────────────────────────────────────────────────────
//
// This version replaces lucide-react's Instagram/Twitter/Facebook/Youtube
// imports with locally defined inline SVG functional components stored in
// the SocialIcons object. Each is a zero-prop () => <svg> component.
//
// The SOCIALS array stores { Icon, href, label } where Icon is a component
// reference (capitalized), rendered as <Icon /> inside the motion.a —
// as opposed to the previous version which stored pre-rendered ReactNodes
// as { icon } and rendered them as {icon}. Both approaches are equivalent
// in output; this version avoids the lucide-react peer dependency entirely.