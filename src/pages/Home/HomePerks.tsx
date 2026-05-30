import { useTheme } from "../../theme/ThemeContext";
import ScrollReveal from "../../components/ui/ScrollReveal";
import { PERKS } from "./constants";

/**
 * Horizontal band of four trust-signal perks below the hero.
 * Each perk scroll-reveals independently.
 */
const HomePerks = () => {
  const { colors, typography } = useTheme();

  return (
    <section
      style={{
        background:    colors.bgSecondary,
        borderTop:     `1px solid ${colors.borderLight}`,
        borderBottom:  `1px solid ${colors.borderLight}`,
      }}
    >
      <div
        style={{
          maxWidth:             1280,
          margin:               "0 auto",
          padding:              "2rem 1.5rem",
          display:              "grid",
          gridTemplateColumns:  "repeat(auto-fit, minmax(200px, 1fr))",
          gap:                  "1.5rem",
        }}
      >
        {PERKS.map((perk) => (
          <ScrollReveal key={perk.title} y={28}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: colors.accentPrimary, flexShrink: 0 }}>{perk.icon}</div>
              <div>
                <div style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>
                  {perk.title}
                </div>
                <div style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>
                  {perk.desc}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default HomePerks;
