import { motion, AnimatePresence } from "framer-motion";
import { useTheme }                from "../../theme/ThemeContext";
import { useIsMobile }             from "../../hooks/useMediaQuery";
import {
  mainImageStyles,    imageBadgeStyles,
  thumbnailRowStyles, thumbnailButtonStyles,
} from "./productPageStyles";
import type { ProductImage } from "./productData";

interface ProductImageGalleryProps {
  images:       ProductImage[];
  badge:        string | null;
  activeIndex:  number;
  onThumbClick: (index: number) => void;
}

const getBadgeColor = (badge: string, colors: ReturnType<typeof useTheme>["colors"]) => {
  if (badge === "Sale") return colors.accentPrimary;
  if (badge === "New")  return colors.accentSecondary;
  return colors.textPrimary;
};

const ProductImageGallery = ({
  images, badge, activeIndex, onThumbClick,
}: ProductImageGalleryProps) => {
  const { colors, typography, radius, shadows, transitions } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div>
      {/* Main image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1    }}
          exit={{    opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.28 }}
          style={mainImageStyles(images[activeIndex].bg, isMobile, radius, shadows)}
        >
          <span style={{ fontSize: isMobile ? "4rem" : "6rem" }}>✨</span>

          {badge && (
            <span style={imageBadgeStyles(getBadgeColor(badge, colors), typography, radius)}>
              {badge}
            </span>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails */}
      <div style={thumbnailRowStyles}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onThumbClick(i)}
            style={thumbnailButtonStyles(img.bg, activeIndex === i, isMobile, colors, radius, transitions)}
          >
            <span style={{ fontSize: "1.25rem" }}>✨</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;