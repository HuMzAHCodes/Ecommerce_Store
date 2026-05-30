import { useTheme } from "../../theme/ThemeContext";
import AboutHero    from "./AboutHero";
import AboutMission from "./AboutMission";
import AboutValues  from "./AboutValues";
import AboutCTA     from "./AboutCTA";

/**
 * About page — intentionally thin.
 * Each section owns its own layout, animations, and theme consumption.
 *
 *  AboutHero     → eyebrow + heading + intro (staggered fade-up)
 *  AboutMission  → two-column image + copy + shop CTA
 *  AboutValues   → auto-fit grid of value cards
 *  AboutCTA      → bottom banner with shop link
 */
const About = () => {
  const { colors } = useTheme();

  return (
    <div style={{ background: colors.bgPrimary }}>
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutCTA />
    </div>
  );
};

export default About;
