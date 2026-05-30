import { Link }            from "react-router-dom";
import { motion }          from "framer-motion";
import { useTheme }        from "../../../theme/ThemeContext";
import {
  dropdownPanelStyles,
  dropdownItemStyles,
  NAV_HOVER_BG,
  NAV_HOVER_COLOR,
} from "./navbarStyles";

interface DropdownItem {
  label: string;
  href:  string;
}

interface NavbarDropdownProps {
  items: DropdownItem[];
}

const NavbarDropdown = ({ items }: NavbarDropdownProps) => {
  const { colors, typography, radius, shadows, transitions } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1    }}
      exit={{    opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      style={dropdownPanelStyles(colors, radius, shadows)}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          style={dropdownItemStyles(typography, colors, transitions, radius)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = NAV_HOVER_BG;
            e.currentTarget.style.color      = NAV_HOVER_COLOR;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color      = colors.textSecondary;
          }}
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
};

export default NavbarDropdown;