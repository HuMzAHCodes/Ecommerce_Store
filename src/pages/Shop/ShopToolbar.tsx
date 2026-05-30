import { motion }        from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useTheme }      from "../../theme/ThemeContext";
import {
  toolbarStyles, filterToggleButtonStyles, sortSelectStyles,
} from "./shopStyles";
import { SORT_OPTIONS }  from "./shopData";

interface ShopToolbarProps {
  isMobile:        boolean;
  sort:            string;
  filteredCount:   number;
  hasActiveFilters:boolean;
  onSortChange:    (v: string) => void;
  onFiltersOpen:   () => void;
}

const ShopToolbar = ({
  isMobile, sort, filteredCount,
  hasActiveFilters, onSortChange, onFiltersOpen,
}: ShopToolbarProps) => {
  const { colors, typography, radius } = useTheme();

  return (
    <div style={toolbarStyles}>

      {/* Mobile: filter toggle button */}
      {isMobile && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onFiltersOpen}
          style={filterToggleButtonStyles(typography, colors, radius)}
        >
          <SlidersHorizontal size={15} /> Filters
          {hasActiveFilters && (
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: colors.accentPrimary }} />
          )}
        </motion.button>
      )}

      {/* Desktop: result count */}
      {!isMobile && (
        <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}>
          {filteredCount} results
        </span>
      )}

      {/* Sort dropdown */}
      <div style={{ position: "relative", marginLeft: "auto" }}>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          style={sortSelectStyles(typography, colors, radius)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDown size={13} style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", color: colors.textMuted, pointerEvents: "none" }} />
      </div>

    </div>
  );
};

export default ShopToolbar;