import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { VALUES } from "./constants";

/**
 * Responsive auto-fit grid of value cards.
 * Each card reveals with a staggered delay based on its index.
 */
const AboutValues = () => {
  const { colors, typography, radius, shadows } = useTheme();

  return (
    <section
      style={{
        background: colors.bgSecondary,
        padding:    "5rem 0",
        borderTop:  `1px solid ${colors.borderLight}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2
            style={{
              fontFamily: typography.fontDisplay,
              color:      colors.textPrimary,
              fontStyle:  "italic",
            }}
          >
            What we stand for
          </h2>
        </motion.div>

        {/* Values grid */}
        <div
          style={{
            display:               "grid",
            gridTemplateColumns:   "repeat(auto-fit, minmax(240px, 1fr))",
            gap:                   "1.5rem",
          }}
        >
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                background:   colors.bgCard,
                borderRadius: radius?.xl,
                padding:      "2rem",
                border:       `1px solid ${colors.borderLight}`,
                boxShadow:    shadows?.sm,
              }}
            >
              {/* Icon */}
              <div style={{ color: colors.accentPrimary, marginBottom: "1rem" }}>
                {value.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily:   typography.fontBody,
                  fontSize:     typography.base,
                  fontWeight:   typography.weightBold,
                  color:        colors.textPrimary,
                  marginBottom: "0.625rem",
                }}
              >
                {value.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: typography.fontBody,
                  fontSize:   typography.sm,
                  color:      colors.textSecondary,
                  lineHeight: 1.7,
                  margin:     0,
                }}
              >
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
