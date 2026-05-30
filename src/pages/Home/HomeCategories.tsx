import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";
import ScrollReveal from "../../components/ui/ScrollReveal";
import { CATEGORIES } from "./constants";

/**
 * Responsive grid of category cards.
 * Each card highlights its border on hover and lifts with a shadow.
 */
const HomeCategories = () => {
  const { colors, typography, radius, shadows, transitions } = useTheme();

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>

      {/* Section heading */}
      <ScrollReveal style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "0.5rem" }}>
          Shop by Category
        </h2>
        <p style={{ fontFamily: typography.fontBody, color: colors.textMuted, fontSize: typography.base }}>
          Find exactly what your skin needs
        </p>
      </ScrollReveal>

      {/* Category grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        {CATEGORIES.map((cat) => (
          <ScrollReveal key={cat.label} y={36}>
            <Link to={cat.href} style={{ textDecoration: "none", display: "block" }}>
              <motion.div
                whileHover={{ y: -5, boxShadow: shadows?.lg }}
                transition={{ duration: 0.25 }}
                style={{ background: colors.bgSecondary, borderRadius: radius?.xl, padding: "2.5rem 1.5rem", textAlign: "center", border: `1px solid ${colors.borderLight}`, cursor: "pointer", boxShadow: shadows?.sm, transition: `border-color ${transitions?.normal}` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = colors.accentPrimary; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = colors.borderLight; }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{cat.emoji}</div>
                <div style={{ fontFamily: typography.fontDisplay, fontSize: typography.xl, color: colors.textPrimary, marginBottom: "0.375rem" }}>{cat.label}</div>
                <div style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}>{cat.desc}</div>
              </motion.div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;
