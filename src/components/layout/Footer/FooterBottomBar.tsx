import { Link }     from "react-router-dom";
import { useTheme } from "../../../theme/ThemeContext";
import {
  footerPalette,
  bottomBarOuterStyles, copyrightStyles,
  legalLinksRowStyles,  legalLinkStyles,
} from "./footerStyles";
import { LEGAL_LINKS } from "./footerData";

const FooterBottomBar = () => {
  const { colors, typography } = useTheme();
  const { butter, butterMuted, borderButter } = footerPalette(colors);
  const currentYear = new Date().getFullYear();

  return (
    <div style={bottomBarOuterStyles(borderButter)}>
      <p style={copyrightStyles(typography, butterMuted)}>
        © {currentYear} Blüm. All rights reserved.
      </p>

      <div style={legalLinksRowStyles}>
        {LEGAL_LINKS.map((linkText) => (
          <Link
            key={linkText}
            to="#"
            style={legalLinkStyles(typography, butterMuted)}
            onMouseEnter={(e) => { e.currentTarget.style.color = butter;     }}
            onMouseLeave={(e) => { e.currentTarget.style.color = butterMuted; }}
          >
            {linkText}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterBottomBar;