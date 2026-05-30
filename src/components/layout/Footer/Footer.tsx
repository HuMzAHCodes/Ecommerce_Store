import { useTheme }          from "../../../theme/ThemeContext";
import useFooter             from "./useFooter";
import FooterBrandColumn     from "./FooterBrandColumn";
import FooterLinkColumn      from "./FooterLinkColumn";
import FooterNewsletter      from "./FooterNewsletter";
import FooterBottomBar       from "./FooterBottomBar";
import { FOOTER_LINKS }      from "./footerData";
import { footerShellStyles, footerGridStyles } from "./footerStyles";

// ── Component ─────────────────────────────────────────────────

const Footer = () => {
  const { colors } = useTheme();
  const { emailInput, isSubscribed, handleEmailChange, handleSubscribe } = useFooter();

  return (
    <footer style={footerShellStyles(colors)}>

      {/* Main grid — brand, link columns, newsletter */}
      <div style={footerGridStyles}>
        <FooterBrandColumn />

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <FooterLinkColumn key={heading} heading={heading} links={links} />
        ))}

        <FooterNewsletter
          emailInput={emailInput}
          isSubscribed={isSubscribed}
          onEmailChange={handleEmailChange}
          onSubscribe={handleSubscribe}
        />
      </div>

      {/* Bottom bar — copyright + legal links */}
      <FooterBottomBar />

    </footer>
  );
};

export default Footer;

/*
 * ── Footer — What this folder does ──────────────────────────────────────────
 *
 * Site-wide footer for the BLÜM storefront.
 *
 * Sections:
 *   FooterBrandColumn  — logo, tagline, social icon row (Instagram/Twitter/Facebook/YouTube)
 *   FooterLinkColumn   — reusable column, rendered once per key in FOOTER_LINKS (Shop/Help/Company)
 *   FooterNewsletter   — email input + subscribe button; shows success message after submit
 *   FooterBottomBar    — copyright year (auto-computed) + Privacy/Terms/Cookie links
 *
 * Logic (useFooter.ts):
 *   - emailInput      → controlled input value
 *   - isSubscribed    → flips true on valid submit; replaces form with success message
 *   - handleSubscribe → guards empty input, sets subscribed, clears field
 *                       TODO: wire to Mailchimp / Klaviyo
 *
 * Data (footerData.ts):
 *   - FOOTER_LINKS  → Shop / Help / Company link arrays; edit here to add/remove links
 *   - SOCIAL_LINKS  → platform entries with inline SVG icon components
 *   - LEGAL_LINKS   → bottom bar link labels
 *   - FOOTER_TAGLINE → brand blurb string
 *
 * Styles (footerStyles.ts):
 *   - footerPalette() derives the green/butter color set from the theme
 *   - All CSSProperties factories accept only the theme slices they need
 *
 * Files in this folder:
 *   footerData.ts         — all constants, types, and inline SVG icon components
 *   useFooter.ts          — newsletter state and submit handler
 *   footerStyles.ts       — all CSSProperties factories + palette helper
 *   FooterBrandColumn.tsx — logo + tagline + social icons
 *   FooterLinkColumn.tsx  — reusable single link column (used 3×)
 *   FooterNewsletter.tsx  — email subscribe form + success state
 *   FooterBottomBar.tsx   — copyright line + legal links
 *   Footer.tsx            — thin orchestrator; assembles all sections
 */