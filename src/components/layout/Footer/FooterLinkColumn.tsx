import { Link }     from "react-router-dom";
import { useTheme } from "../../../theme/ThemeContext";
import {
  footerPalette,      columnHeadingStyles,
  columnNavStyles,    columnLinkStyles,
} from "./footerStyles";
import type { FooterLink } from "./footerData";

interface FooterLinkColumnProps {
  heading: string;
  links:   FooterLink[];
}

const FooterLinkColumn = ({ heading, links }: FooterLinkColumnProps) => {
  const { colors, typography, transitions } = useTheme();
  const { butter, butterSoft } = footerPalette(colors);

  return (
    <div>
      <h4 style={columnHeadingStyles(typography, butter)}>
        {heading}
      </h4>

      <nav style={columnNavStyles}>
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            style={columnLinkStyles(typography, butterSoft, transitions)}
            onMouseEnter={(e) => { e.currentTarget.style.color = butter;     }}
            onMouseLeave={(e) => { e.currentTarget.style.color = butterSoft; }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FooterLinkColumn;