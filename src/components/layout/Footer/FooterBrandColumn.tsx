import { Link }        from "react-router-dom";
import { motion }      from "framer-motion";
import { useTheme }    from "../../../theme/ThemeContext";
import {
  footerPalette,      brandLogoStyles,
  brandTaglineStyles, socialRowStyles,
  socialButtonStyles,
} from "./footerStyles";
import { SOCIAL_LINKS, FOOTER_TAGLINE } from "./footerData";

const FooterBrandColumn = () => {
  const { colors, typography, radius, transitions } = useTheme();
  const { green, greenDark, butter, butterSoft, butterMuted } = footerPalette(colors);

  return (
    <div>
      <Link to="/" style={brandLogoStyles(typography, butter)}>
        BLÜM
      </Link>

      <p style={brandTaglineStyles(typography, butterMuted)}>
        {FOOTER_TAGLINE}
      </p>

      <div style={socialRowStyles}>
        {SOCIAL_LINKS.map(({ Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={socialButtonStyles(greenDark, butterSoft, radius, transitions)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = butter;
              e.currentTarget.style.color      = green;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = greenDark;
              e.currentTarget.style.color      = butterSoft;
            }}
          >
            <Icon />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default FooterBrandColumn;