import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";

/**
 * Two-column section: decorative image placeholder on the left,
 * mission copy and shop CTA on the right.
 * Collapses to a single column on mobile.
 */
const AboutMission = () => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        maxWidth:             1280,
        margin:               "0 auto",
        padding:              isMobile ? "3rem 1.25rem" : "5rem 1.5rem",
        display:              "grid",
        gridTemplateColumns:  isMobile ? "1fr" : "1fr 1fr",
        gap:                  isMobile ? "2rem" : "4rem",
        alignItems:           "center",
      }}
    >
      {/* Decorative image placeholder — slides in from the left */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          style={{
            height:          isMobile ? 260 : 400,
            borderRadius:    radius?.xl,
            background:      `linear-gradient(145deg, ${colors.accentLight}, ${colors.bgSecondary})`,
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontSize:        "8rem",
            boxShadow:       shadows?.lg,
          }}
        >
          🌿
        </div>
      </motion.div>

      {/* Mission copy — slides in from the right */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Eyebrow label */}
        <p
          style={{
            fontFamily:    typography.fontBody,
            fontSize:      typography.sm,
            fontWeight:    typography.weightMedium,
            color:         colors.accentPrimary,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom:  "0.875rem",
          }}
        >
          Our Mission
        </p>

        <h2
          style={{
            fontFamily:   typography.fontDisplay,
            color:        colors.textPrimary,
            fontStyle:    "italic",
            marginBottom: "1.25rem",
          }}
        >
          Honest skincare for real people
        </h2>

        <p
          style={{
            fontFamily:   typography.fontBody,
            color:        colors.textSecondary,
            fontSize:     typography.base,
            lineHeight:   1.8,
            marginBottom: "1rem",
          }}
        >
          We believe everyone deserves access to effective, clean skincare.
          That's why we keep our formulas simple, our ingredients transparent,
          and our prices fair.
        </p>

        <p
          style={{
            fontFamily:   typography.fontBody,
            color:        colors.textSecondary,
            fontSize:     typography.base,
            lineHeight:   1.8,
            marginBottom: "2rem",
          }}
        >
          Founded in 2022, Blüm has grown from a small home lab into a brand
          trusted by over 50,000 customers worldwide — all without compromising
          on what matters most: what goes on your skin.
        </p>

        {/* Shop CTA */}
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
              padding:      "0.875rem 1.75rem",
              fontFamily:   typography.fontBody,
              fontWeight:   typography.weightMedium,
              cursor:       "pointer",
              boxShadow:    shadows?.md,
            }}
          >
            Shop the Collection <ArrowRight size={16} />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
};

export default AboutMission;
