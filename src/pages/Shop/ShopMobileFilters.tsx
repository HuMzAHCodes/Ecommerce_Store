import { motion, AnimatePresence } from "framer-motion";
import { X }                       from "lucide-react";
import { useTheme }                from "../../theme/ThemeContext";
import ShopFiltersPanel            from "./ShopFiltersPanel";
import {
  mobileOverlayStyles, mobileDrawerStyles,
  mobileDrawerShowButtonStyles,
} from "./shopStyles";

interface ShopMobileFiltersProps {
  isOpen:          boolean;
  filteredCount:   number;
  search:          string;
  category:        string;
  priceMax:        number;
  saleOnly:        boolean;
  onClose:         () => void;
  onSearchChange:  (v: string) => void;
  onCategoryChange:(v: string) => void;
  onPriceChange:   (v: number) => void;
  onSaleToggle:    (v: boolean) => void;
  onClearAll:      () => void;
}

const ShopMobileFilters = ({
  isOpen, filteredCount, onClose, ...filterProps
}: ShopMobileFiltersProps) => {
  const { colors, typography, radius, shadows } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="foverlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={mobileOverlayStyles(colors)}
          />

          {/* Bottom sheet */}
          <motion.div
            key="fdrawer"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={mobileDrawerStyles(colors, radius, shadows)}
          >
            {/* Drawer header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <span style={{ fontFamily: typography.fontDisplay, fontSize: typography.xl, color: colors.textPrimary }}>
                Filters
              </span>
              <button
                onClick={onClose}
                style={{ background: "none", border: "none", cursor: "pointer", color: colors.textMuted, display: "flex" }}
              >
                <X size={20} />
              </button>
            </div>

            <ShopFiltersPanel {...filterProps} />

            {/* Show results button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              style={mobileDrawerShowButtonStyles(typography, colors, radius)}
            >
              Show {filteredCount} products
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShopMobileFilters;