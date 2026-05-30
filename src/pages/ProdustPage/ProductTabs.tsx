import { motion, AnimatePresence } from "framer-motion";
import { Star }                    from "lucide-react";
import { useTheme }                from "../../theme/ThemeContext";
import { useIsMobile }             from "../../hooks/useMediaQuery";
import {
  tabBarStyles, tabButtonStyles,
  reviewCardStyles, reviewHeaderStyles,
} from "./productPageStyles";
import { TABS, type TabId, type ProductDetail } from "./productData";

interface ProductTabsProps {
  activeTab:   TabId;
  product:     ProductDetail;
  onTabChange: (tab: TabId) => void;
}

const TAB_ANIMATION = {
  initial:    { opacity: 0, y: 8 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0       },
  transition: { duration: 0.22   },
};

const ProductTabs = ({ activeTab, product, onTabChange }: ProductTabsProps) => {
  const { colors, typography, radius, transitions } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div>
      {/* Tab bar */}
      <div style={tabBarStyles(colors)}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={tabButtonStyles(typography, colors, transitions, isMobile, activeTab === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">

        {activeTab === "details" && (
          <motion.div key="details" {...TAB_ANIMATION}>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, lineHeight: 1.75, marginBottom: "1rem" }}>
              {product.description}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {product.benefits.map((benefit) => (
                <li key={benefit} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}>
                  <span style={{ color: colors.accentPrimary, fontSize: "0.65rem" }}>●</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {activeTab === "how-to" && (
          <motion.div key="how-to" {...TAB_ANIMATION}>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, lineHeight: 1.8 }}>
              {product.howToUse}
            </p>
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div key="reviews" {...TAB_ANIMATION} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {product.reviews.map((review) => (
              <div key={review.id} style={reviewCardStyles(colors, radius)}>
                <div style={reviewHeaderStyles}>
                  <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>
                    {review.name}
                  </span>
                  <span style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>
                    {review.date}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 2, marginBottom: "0.4rem" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={11} fill={star <= review.rating ? colors.accentPrimary : "none"} color={colors.accentPrimary} />
                  ))}
                </div>
                <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, lineHeight: 1.6, margin: 0 }}>
                  {review.body}
                </p>
              </div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default ProductTabs;