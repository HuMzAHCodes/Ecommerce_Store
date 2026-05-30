import { Search }   from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import {
  filterLabelStyles, filterSearchInputStyles,
  categoryButtonStyles,
} from "./shopStyles";
import { CATEGORIES } from "./shopData";

interface ShopFiltersPanelProps {
  search:         string;
  category:       string;
  priceMax:       number;
  saleOnly:       boolean;
  onSearchChange: (v: string) => void;
  onCategoryChange:(v: string) => void;
  onPriceChange:  (v: number) => void;
  onSaleToggle:   (v: boolean) => void;
  onClearAll:     () => void;
}

const ShopFiltersPanel = ({
  search, category, priceMax, saleOnly,
  onSearchChange, onCategoryChange,
  onPriceChange, onSaleToggle, onClearAll,
}: ShopFiltersPanelProps) => {
  const { colors, typography, radius, transitions } = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* Panel heading + clear */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: typography.fontDisplay, fontSize: typography.lg, color: colors.textPrimary }}>
          Filters
        </span>
        <button
          onClick={onClearAll}
          style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.accentPrimary, background: "none", border: "none", cursor: "pointer" }}
        >
          Clear all
        </button>
      </div>

      {/* Search */}
      <div>
        <span style={filterLabelStyles(typography, colors)}>Search</span>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: colors.textMuted, pointerEvents: "none" }} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search…"
            style={filterSearchInputStyles(typography, colors, radius)}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <span style={filterLabelStyles(typography, colors)}>Category</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              style={categoryButtonStyles(typography, colors, transitions, radius, category === cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Max price */}
      <div>
        <span style={filterLabelStyles(typography, colors)}>
          Max Price — <span style={{ color: colors.accentPrimary }}>${priceMax}</span>
        </span>
        <input
          type="range" min={20} max={200} step={5}
          value={priceMax}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          style={{ width: "100%", accentColor: colors.accentPrimary, cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginTop: 3 }}>
          <span>$20</span><span>$200</span>
        </div>
      </div>

      {/* Sale only */}
      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={saleOnly}
          onChange={(e) => onSaleToggle(e.target.checked)}
          style={{ width: 15, height: 15, accentColor: colors.accentPrimary, cursor: "pointer" }}
        />
        <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}>
          Sale items only
        </span>
      </label>

    </div>
  );
};

export default ShopFiltersPanel;