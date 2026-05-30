import { Link }         from "react-router-dom";
import { motion }       from "framer-motion";
import { X, User }      from "lucide-react";
import { useTheme }     from "../../../theme/ThemeContext";
import {
  mobileOverlayStyles, mobileDrawerStyles,
  mobileLinkStyles,    mobileSubLinkStyles,
  mobileAuthLinkStyles, iconButtonStyles,
  NAV_HOVER_BG, NAV_HOVER_COLOR,
} from "./navbarStyles";
import { NAV_LINKS } from "./navbarData";

interface NavbarMobileMenuProps {
  isLoggedIn:  boolean;
  userName?:   string;
  isActivePath:(href: string) => boolean;
  onClose:     () => void;
}

const NavbarMobileMenu = ({
  isLoggedIn, userName,
  isActivePath, onClose,
}: NavbarMobileMenuProps) => {
  const { colors, typography, radius, shadows, transitions } = useTheme();

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={mobileOverlayStyles(colors)}
      />

      {/* Drawer panel */}
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={mobileDrawerStyles(colors, shadows)}
      >
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
          <span
            style={{ fontFamily: typography.fontDisplay, fontSize: typography.xl, color: colors.textPrimary, padding: "0.35rem 0.5rem", borderRadius: radius?.md, transition: `color ${transitions?.fast}, background ${transitions?.fast}` }}
            onMouseEnter={(e) => { e.currentTarget.style.color = NAV_HOVER_COLOR; e.currentTarget.style.background = NAV_HOVER_BG; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = colors.textPrimary; e.currentTarget.style.background = "transparent"; }}
          >
            BLÜM
          </span>
          <button
            onClick={onClose}
            style={{ ...iconButtonStyles(radius, transitions), color: colors.textPrimary }}
            onMouseEnter={(e) => { e.currentTarget.style.background = NAV_HOVER_BG; e.currentTarget.style.color = NAV_HOVER_COLOR; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.textPrimary; }}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link
                to={link.href}
                style={mobileLinkStyles(typography, colors, transitions, radius, isActivePath(link.href))}
                onMouseEnter={(e) => { e.currentTarget.style.background = NAV_HOVER_BG; e.currentTarget.style.color = NAV_HOVER_COLOR; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = isActivePath(link.href) ? NAV_HOVER_BG : "transparent"; e.currentTarget.style.color = isActivePath(link.href) ? NAV_HOVER_COLOR : colors.textPrimary; }}
              >
                {link.label}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.label}
                  to={child.href}
                  style={mobileSubLinkStyles(typography, colors, transitions, radius)}
                  onMouseEnter={(e) => { e.currentTarget.style.background = NAV_HOVER_BG; e.currentTarget.style.color = NAV_HOVER_COLOR; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.textSecondary; }}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Auth row */}
        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: `1px solid ${colors.borderLight}` }}>
          <Link
            to={isLoggedIn ? "/profile" : "/login"}
            style={mobileAuthLinkStyles(typography, colors, transitions, radius)}
            onMouseEnter={(e) => { e.currentTarget.style.background = NAV_HOVER_BG; e.currentTarget.style.color = NAV_HOVER_COLOR; (e.currentTarget as HTMLElement).style.transform = "translateX(4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgSecondary; e.currentTarget.style.color = colors.textPrimary; (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; }}
          >
            <User size={17} />
            {isLoggedIn ? `Hi, ${userName}` : "Sign in / Register"}
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default NavbarMobileMenu;