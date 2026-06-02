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
    <div
      key={link.label}
      style={columnLinkStyles(typography, butterSoft, transitions)}
    >
      {link.label}
    </div>
  ))}
</nav>
    </div>
  );
};

export default FooterLinkColumn;