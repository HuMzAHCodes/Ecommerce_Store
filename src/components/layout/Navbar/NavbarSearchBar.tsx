import { Search, X }       from "lucide-react";
import { motion }          from "framer-motion";
import { useTheme }        from "../../../theme/ThemeContext";
import {
  searchPanelStyles, searchInnerStyles,
  searchInputStyles, iconButtonStyles,
  NAV_HOVER_BG, NAV_HOVER_COLOR,
} from "./navbarStyles";

interface NavbarSearchBarProps {
  searchQuery:    string;
  isScrolled:     boolean;
  onQueryChange:  (value: string) => void;
  onSubmit:       (e: React.FormEvent) => void;
  onClose:        () => void;
}

const NavbarSearchBar = ({
  searchQuery, isScrolled,
  onQueryChange, onSubmit, onClose,
}: NavbarSearchBarProps) => {
  const { colors, typography, radius, transitions } = useTheme();

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{    height: 0, opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={searchPanelStyles(colors, isScrolled)}
    >
      <form onSubmit={onSubmit} style={searchInnerStyles}>
        <Search size={17} style={{ color: colors.textMuted, flexShrink: 0 }} />
        <input
          autoFocus
          type="text"
          placeholder="Search products…"
          value={searchQuery}
          onChange={(e) => onQueryChange(e.target.value)}
          style={searchInputStyles(typography, colors)}
        />
        <button
          type="button"
          onClick={onClose}
          style={{ ...iconButtonStyles(radius, transitions), width: 34, height: 34, color: colors.textMuted }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = NAV_HOVER_BG;
            e.currentTarget.style.color      = NAV_HOVER_COLOR;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color      = colors.textMuted;
          }}
          aria-label="Close search"
        >
          <X size={17} />
        </button>
      </form>
    </motion.div>
  );
};

export default NavbarSearchBar;