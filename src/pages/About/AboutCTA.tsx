import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";

/**
 * Bottom call-to-action banner.
 * Scales up into view and links to the shop.
 */
const AboutCTA = () => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        maxWidth: 1280,
        margin:   "0 auto",
        padding:  isMobile ? "3.5rem 1.25rem" : "5rem 1.5rem",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          background:   `linear-gradient(135deg, ${colors.accentLight}, ${colors.bgSecondary})`,
          borderRadius: radius?.xl,
          padding:      isMobile ? "2.5rem 1.5rem" : "4rem 2rem",
          border:       `1px solid ${colors.borderLight}`,
        }}
      >
        <h2
          style={{
            fontFamily:   typography.fontDisplay,
            color:        colors.textPrimary,
            fontStyle:    "italic",
            marginBottom: "1rem",
          }}
        >
          Ready to start your glow?
        </h2>

        <p
          style={{
            fontFamily:   typography.fontBody,
            color:        colors.textSecondary,
            marginBottom: "2rem",
            maxWidth:     400,
            margin:       "0 auto 2rem",
          }}
        >
          Discover clean skincare that actually works. Free shipping on orders
          over $50.
        </p>

        <Link to="/shop">
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          8,
              background:   colors.accentPrimary,
              color:        colors.textOnAccent,
              borderRadius: radius?.full,
              padding:      "0.875rem 2rem",
              fontFamily:   typography.fontBody,
              fontWeight:   typography.weightMedium,
              cursor:       "pointer",
              boxShadow:    shadows?.md,
            }}
          >
            Shop Now <ArrowRight size={16} />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
};

export default AboutCTA;
