import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";

// ── Image placeholders — replace with your generated images ───
const IMAGES = {
  heroBanner:   "/images/products/about/hero-banner.webp",
  mission:      "/images/products/about/mission.jpeg",
  valueClean:   "/images/products/about/value-clean-ingredients.jpeg",
  valueDerm:    "/images/products/about/value-dermatologist.jpeg",
  valueCruelty: "/images/products/about/value-cruelty-free.jpeg",
  valueSustain: "/images/products/about/value-sustainable.jpeg",
};

// ── Data ──────────────────────────────────────────────────────

const VALUES = [
  {
    image:  IMAGES.valueClean,
    title:  "Clean Ingredients",
    desc:   "Every product formulated without parabens, sulfates, or artificial fragrances.",
  },
  {
    image:  IMAGES.valueDerm,
    title:  "Dermatologist Tested",
    desc:   "Tested and approved for all skin types, including sensitive skin.",
  },
  {
    image:  IMAGES.valueCruelty,
    title:  "Cruelty-Free",
    desc:   "We never test on animals. Certified cruelty-free and vegan-friendly.",
  },
  {
    image:  IMAGES.valueSustain,
    title:  "Sustainable",
    desc:   "Eco-conscious packaging and a commitment to reducing our environmental footprint.",
  },
];

// ── Animation variants ────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Sub-components ────────────────────────────────────────────

// Large hero banner with text overlay
const HeroBanner = ({ isMobile, colors, typography, radius }: {
  isMobile: boolean;
  colors: ReturnType<typeof useTheme>["colors"];
  typography: ReturnType<typeof useTheme>["typography"];
  radius: ReturnType<typeof useTheme>["radius"];
}) => (
  <section style={{ position: "relative", height: isMobile ? 340 : 520, overflow: "hidden" }}>
    {/* Background image */}
    <img
      src={IMAGES.heroBanner}
      alt="Blüm brand story"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
    />

    {/* Dark overlay */}
    <div style={{ position: "absolute", inset: 0, background: "rgba(1,62,55,0.52)" }} />

    {/* Text */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position:  "absolute",
        inset:     0,
        display:   "flex",
        flexDirection: "column",
        alignItems:    "center",
        justifyContent:"center",
        textAlign: "center",
        padding:   "0 1.5rem",
      }}
    >
      <p className="overline" style={{ color: colors.accentSecondary, marginBottom: "0.875rem" }}>
        Our Story
      </p>
      <h1
        className="display-hero"
        style={{
          color:     "#fff",
          fontSize:  isMobile ? "clamp(2rem,7vw,2.75rem)" : "clamp(2.75rem,5vw,4rem)",
          maxWidth:  640,
          textShadow:"0 2px 20px rgba(0,0,0,0.25)",
        }}
      >
        Beauty rooted in simplicity
      </h1>
      <p
        style={{
          fontFamily: typography.fontBody,
          fontSize:   isMobile ? typography.base : typography.lg,
          color:      "rgba(255,255,255,0.88)",
          maxWidth:   500,
          marginTop:  "1rem",
          lineHeight: 1.7,
        }}
      >
        Blüm was born from a simple idea — skincare shouldn't be complicated, expensive, or harmful.
      </p>
    </motion.div>
  </section>
);

// Mission section with image + text side by side
const MissionSection = ({ isMobile, colors, typography, radius, shadows }: {
  isMobile: boolean;
  colors: ReturnType<typeof useTheme>["colors"];
  typography: ReturnType<typeof useTheme>["typography"];
  radius: ReturnType<typeof useTheme>["radius"];
  shadows: ReturnType<typeof useTheme>["shadows"];
}) => (
  <section style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "3rem 1.25rem" : "5rem 1.5rem" }}>
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "4rem", alignItems: "center" }}>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 0 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={IMAGES.mission}
          alt="Our mission"
          style={{ width: "100%", height: isMobile ? 260 : 420, objectFit: "cover", borderRadius: radius?.xl, boxShadow: shadows?.lg }}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 0 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="overline" style={{ marginBottom: "0.875rem" }}>Our Mission</p>
        <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "1.25rem" }}>
          Honest skincare for real people
        </h2>
        <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, lineHeight: 1.8, marginBottom: "1rem" }}>
          We believe everyone deserves access to effective, clean skincare. Simple formulas, transparent ingredients, fair prices.
        </p>
        <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, lineHeight: 1.8, marginBottom: "2rem" }}>
          Founded in 2022, Blüm has grown to be trusted by over 50,000 customers worldwide — without ever compromising on what matters most.
        </p>
        <Link to="/shop">
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding: "0.875rem 1.75rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor: "pointer", boxShadow: shadows?.md }}
          >
            Shop the Collection <ArrowRight size={15} />
          </motion.span>
        </Link>
      </motion.div>
    </div>
  </section>
);

// Value card with image background + text overlay
const ValueCard = ({ value, index, isMobile, colors, typography, radius }: {
  value: typeof VALUES[0];
  index: number;
  isMobile: boolean;
  colors: ReturnType<typeof useTheme>["colors"];
  typography: ReturnType<typeof useTheme>["typography"];
  radius: ReturnType<typeof useTheme>["radius"];
}) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.22 }}
    style={{
      position:     "relative",
      height:       isMobile ? 220 : 300,
      borderRadius: radius?.xl,
      overflow:     "hidden",
      cursor:       "default",
    }}
  >
    {/* Background image */}
    <img
      src={value.image}
      alt={value.title}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
    />

    {/* Gradient overlay — dark at bottom for text readability */}
    <div
      style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(to bottom, rgba(1,62,55,0.15) 0%, rgba(1,62,55,0.75) 100%)",
      }}
    />

    {/* Text at bottom */}
    <div
      style={{
        position: "absolute",
        bottom:   0,
        left:     0,
        right:    0,
        padding:  isMobile ? "1.25rem" : "1.5rem",
      }}
    >
      <h3
        style={{
          fontFamily:  typography.fontDisplay,
          fontSize:    isMobile ? typography.lg : typography.xl,
          fontWeight:  typography.weightBold,
          color:       "#fff",
          marginBottom:"0.375rem",
          textShadow:  "0 1px 8px rgba(0,0,0,0.3)",
        }}
      >
        {value.title}
      </h3>
      <p
        style={{
          fontFamily: typography.fontBody,
          fontSize:   isMobile ? typography.xs : typography.sm,
          color:      "rgba(255,255,255,0.88)",
          lineHeight: 1.6,
          margin:     0,
          textShadow: "0 1px 6px rgba(0,0,0,0.25)",
        }}
      >
        {value.desc}
      </p>
    </div>
  </motion.div>
);

// ── Main Component ────────────────────────────────────────────

const About = () => {
  const theme    = useTheme();
  const isMobile = useIsMobile();
  const { colors, typography, radius, shadows } = theme;

  return (
    <div style={{ background: colors.bgPrimary }}>

      {/* ── Hero banner with image ────────────────────── */}
      <HeroBanner
        isMobile={isMobile}
        colors={colors}
        typography={typography}
        radius={radius}
      />

      {/* ── Mission section ───────────────────────────── */}
      <MissionSection
        isMobile={isMobile}
        colors={colors}
        typography={typography}
        radius={radius}
        shadows={shadows}
      />

      {/* ── Values section ────────────────────────────── */}
      <section style={{ background: colors.bgSecondary, padding: isMobile ? "3rem 0" : "5rem 0", borderTop: `1px solid ${colors.borderLight}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 1.25rem" : "0 1.5rem" }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: "2.5rem" }}
          >
            <p className="overline" style={{ marginBottom: "0.625rem" }}>Our Values</p>
            <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic" }}>
              What we stand for
            </h2>
          </motion.div>

          {/* 4 value cards with image backgrounds */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            style={{
              display:             "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap:                 isMobile ? "0.875rem" : "1.25rem",
            }}
          >
            {VALUES.map((value, i) => (
              <ValueCard
                key={value.title}
                value={value}
                index={i}
                isMobile={isMobile}
                colors={colors}
                typography={typography}
                radius={radius}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA section ───────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "3rem 1.25rem" : "5rem 1.5rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ background: `linear-gradient(135deg,${colors.accentLight},${colors.bgSecondary})`, borderRadius: radius?.xl, padding: isMobile ? "2.5rem 1.5rem" : "4rem 2rem", border: `1px solid ${colors.borderLight}` }}
        >
          <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "1rem" }}>
            Ready to start your glow?
          </h2>
          <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, marginBottom: "2rem", maxWidth: 400, margin: "0 auto 2rem" }}>
            Discover clean skincare that actually works. Free shipping on orders over $50.
          </p>
          <Link to="/shop">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding: "0.875rem 2rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor: "pointer", boxShadow: shadows?.md }}
            >
              Shop Now <ArrowRight size={15} />
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
