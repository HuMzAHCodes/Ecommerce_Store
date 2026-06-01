


import { motion }     from "framer-motion";
import { Link }       from "react-router-dom";
import { useTheme }   from "../../theme/ThemeContext";
import ScrollReveal   from "../../components/ui/ScrollReveal";
import { CATEGORIES } from "./constants";
import useCursor      from "../../components/cursor/useCursor";

const HomeCategories = () => {
  const { colors, typography, radius, shadows, transitions } = useTheme();
  const bloomCursor = useCursor("bloom");

  return (
    <section style={{ background: colors.bgTertiary }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>

        {/* Section Heading */}
        <ScrollReveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "0.75rem" }}>
            Shop by Category
          </h2>
          <p style={{ fontFamily: typography.fontBody, color: colors.textMuted, fontSize: typography.base }}>
            Find exactly what your skin needs
          </p>
        </ScrollReveal>

        {/* Category Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {CATEGORIES.map((cat) => (
            <ScrollReveal key={cat.label} y={36}>
              <Link to={cat.href} style={{ textDecoration: "none", display: "block" }}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: shadows?.lg }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background:   colors.bgSecondary,
                    borderRadius: radius?.xl,
                    border:       `1px solid ${colors.borderMedium}`,
                    cursor:       "none",
                    boxShadow:    shadows?.sm,
                    transition:   `all ${transitions?.normal}`,
                    // CHANGED: removed padding from card root — image now flush to top
                    // CHANGED: removed minHeight — card sizes naturally from content
                    overflow:     "hidden",
                    display:      "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = colors.accentPrimary;
                    bloomCursor.handlers.onMouseEnter();
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = colors.borderMedium;
                    bloomCursor.handlers.onMouseLeave();
                  }}
                >
                  {/* CHANGED: image now full-width flush to top edge of card,
                      no fixed square — fills the card width naturally */}
                  <div style={{ width: "100%", height: "200px", overflow: "hidden", flexShrink: 0 }}>
                    <img
                      src={cat.image}
                      alt={cat.label}
                      loading="lazy"
                      style={{
                        width:      "100%",
                        height:     "100%",
                        objectFit:  "cover",
                        display:    "block",
                        // Subtle zoom on card hover via parent motion.div
                        transition: `transform ${transitions?.normal}`,
                      }}
                    />
                  </div>

                  {/* CHANGED: tight padding only on text area below image */}
                  <div style={{ padding: "1.25rem 1.25rem 1.5rem", textAlign: "center" }}>
                    <div style={{ fontFamily: typography.fontDisplay, fontSize: typography.xl, color: colors.textPrimary, marginBottom: "0.4rem" }}>
                      {cat.label}
                    </div>
                    <div style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted, lineHeight: 1.6 }}>
                      {cat.desc}
                    </div>
                  </div>

                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
