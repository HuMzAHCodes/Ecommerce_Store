import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { fadeUpVariant, staggerContainerVariant } from "./animations";

/**
 * Full-width gradient hero with staggered text reveal.
 * Contains: eyebrow label, display heading, and supporting paragraph.
 */
const AboutHero = () => {
  const { colors, typography } = useTheme();
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        background:  `linear-gradient(135deg, ${colors.accentLight} 0%, ${colors.bgSecondary} 100%)`,
        padding:     isMobile ? "4rem 1.25rem" : "6rem 1.5rem",
        textAlign:   "center",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariant}
      >
        {/* Eyebrow label */}
        <motion.p
          variants={fadeUpVariant}
          style={{
            fontFamily:    typography.fontBody,
            fontSize:      typography.sm,
            fontWeight:    typography.weightMedium,
            color:         colors.accentPrimary,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom:  "1rem",
          }}
        >
          Our Story
        </motion.p>

        {/* Display heading */}
        <motion.h1
          variants={fadeUpVariant}
          style={{
            fontFamily:   typography.fontDisplay,
            color:        colors.textPrimary,
            fontStyle:    "italic",
            maxWidth:     640,
            margin:       "0 auto 1.25rem",
          }}
        >
          Beauty rooted in simplicity
        </motion.h1>

        {/* Supporting paragraph */}
        <motion.p
          variants={fadeUpVariant}
          style={{
            fontFamily:  typography.fontBody,
            fontSize:    typography.lg,
            color:       colors.textSecondary,
            maxWidth:    560,
            margin:      "0 auto 2rem",
            lineHeight:  1.7,
          }}
        >
          Blüm was born from a simple idea — skincare shouldn't be complicated,
          expensive, or harmful. We create products that work, with ingredients
          you can trust.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AboutHero;
