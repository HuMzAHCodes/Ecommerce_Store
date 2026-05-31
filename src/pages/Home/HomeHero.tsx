import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import {
  fadeUpVariant,
  staggerContainerVariant,
  heroVisualVariant,
  floatUpVariant,
  floatDownVariant,
} from "./animations";
import { AVATAR_COLORS } from "./constants";

/** Parallax blobs rendered behind the hero content */
const HeroBackground = ({ y }: { y: MotionValue<string> }) => {
  const { colors } = useTheme();
  return (
    <motion.div style={{ y, position: "absolute", inset: 0, zIndex: 0 }}>
      <div style={{ position: "absolute", top: "10%", right: "8%",  width: 420, height: 420, borderRadius: "50%", background: colors.accentLight,              filter: "blur(80px)", opacity: 0.55 }} />
      <div style={{ position: "absolute", bottom: "5%", left: "5%", width: 320, height: 320, borderRadius: "50%", background: colors.accentSecondary + "33",   filter: "blur(70px)", opacity: 0.4  }} />
    </motion.div>
  );
};

/** Star rating + customer count shown below the CTA buttons */
const SocialProof = () => {
  const { colors, typography } = useTheme();
  return (
    <motion.div
      variants={fadeUpVariant}
      style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "2.5rem" }}
    >
      {/* Stacked avatars */}
      <div style={{ display: "flex" }}>
        {AVATAR_COLORS.map((bg, i) => (
          <div
            key={i}
            style={{
              width:        34,
              height:       34,
              borderRadius: "50%",
              background:   bg,
              border:       `2px solid ${colors.bgPrimary}`,
              marginLeft:   i > 0 ? -10 : 0,
            }}
          />
        ))}
      </div>

      <div>
        <div style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>
          ★★★★★ <span style={{ color: colors.accentPrimary }}>4.9</span>
        </div>
        <div style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>
          From 2,400+ happy customers
        </div>
      </div>
    </motion.div>
  );
};

/** Left column — badge, headline, body copy, CTA buttons, social proof */
const HeroCopy = () => {
  const { colors, typography, radius, shadows, transitions } = useTheme();
  return (
    <motion.div variants={staggerContainerVariant} initial="hidden" animate="visible">

      {/* Eyebrow badge */}
      <motion.div variants={fadeUpVariant}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: colors.accentLight, color: colors.accentPrimary, borderRadius: radius?.full, padding: "0.35rem 1rem", fontSize: typography.xs, fontWeight: typography.weightMedium, fontFamily: typography.fontBody, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          <Sparkles size={12} /> New Collection 2026
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUpVariant}
        style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, lineHeight: 1.1, marginBottom: "1.25rem", fontWeight: typography.weightLight, fontStyle: "italic" }}
      >
        Simple.<br />
        <span style={{ fontStyle: "normal", fontWeight: typography.weightMedium }}>Clean.</span><br />
        Beautiful.
      </motion.h1>

      {/* Body */}
      <motion.p
        variants={fadeUpVariant}
        style={{ fontFamily: typography.fontBody, fontSize: typography.lg, color: colors.textSecondary, lineHeight: 1.7, marginBottom: "2rem", maxWidth: 440 }}
      >
        Skincare and beauty essentials crafted with clean ingredients for radiant, healthy skin — every single day.
      </motion.p>

      {/* CTA buttons */}
      <motion.div variants={fadeUpVariant} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link to="/shop">
          <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding: "0.875rem 1.75rem", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, cursor: "pointer", boxShadow: shadows?.md, transition: `background ${transitions?.fast}` }}>
            Shop Now <ArrowRight size={17} />
          </motion.span>
        </Link>
        <Link to="/about">
          <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: colors.textPrimary, borderRadius: radius?.full, padding: "0.875rem 1.75rem", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, cursor: "pointer", border: `1px solid ${colors.borderMedium}` }}>
            Our Story
          </motion.span>
        </Link>
      </motion.div>

      <SocialProof />
    </motion.div>
  );
};

/** Right column — product card with floating badge and review */
const HeroVisual = () => {
  const { colors, typography, radius, shadows } = useTheme();
  return (
    <motion.div
      {...heroVisualVariant}
      style={{ position: "relative", display: "flex", justifyContent: "center" }}
    >
      {/* Main product card */}
      <div style={{ width: 340, height: 420, borderRadius: radius?.xl, background: `linear-gradient(145deg, ${colors.accentLight}, ${colors.bgSecondary})`, boxShadow: shadows?.xl, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <img 
          src="/images/products/radiance-serum/radiance-serum.jpeg" 
          alt="Radiance Serum" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem", background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", textAlign: "center" }}>
          <p style={{ fontFamily: typography.fontDisplay, fontSize: typography["xl"], color: "#fff", fontStyle: "italic", margin: 0 }}>Radiance Serum</p>
          <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: "rgba(255,255,255,0.8)", marginTop: 4, marginBottom: 0 }}>30ml · Clean formula</p>
        </div>
      </div>

      {/* Floating price badge */}
      <motion.div
        animate={floatUpVariant.animate}
        transition={floatUpVariant.transition}
        style={{ position: "absolute", top: 28, right: 10, background: colors.bgCard, borderRadius: radius?.lg, padding: "0.75rem 1rem", boxShadow: shadows?.lg, fontFamily: typography.fontBody }}
      >
        <div style={{ fontSize: typography.xs, color: colors.textMuted, marginBottom: 2 }}>Best Seller</div>
        <div style={{ fontSize: typography.sm, fontWeight: typography.weightBold, color: colors.accentPrimary }}>$68.00</div>
      </motion.div>

      {/* Floating review snippet */}
      <motion.div
        animate={floatDownVariant.animate}
        transition={floatDownVariant.transition}
        style={{ position: "absolute", bottom: 40, left: -10, background: colors.bgCard, borderRadius: radius?.lg, padding: "0.75rem 1rem", boxShadow: shadows?.lg, fontFamily: typography.fontBody, maxWidth: 180 }}
      >
        <div style={{ fontSize: "0.65rem", color: colors.accentPrimary, marginBottom: 3 }}>★★★★★</div>
        <div style={{ fontSize: typography.xs, color: colors.textSecondary, lineHeight: 1.5 }}>"My skin has never looked better!"</div>
      </motion.div>
    </motion.div>
  );
};

/** Full hero section — parallax background + two-column layout */
const HomeHero = () => {
  const { colors } = useTheme();
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={heroRef}
      style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}
    >
      <HeroBackground y={heroY} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: isMobile ? "3rem 1.25rem" : "6rem 1.5rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "4rem", alignItems: "center", width: "100%" }}>
        <HeroCopy />
        <HeroVisual />
      </div>
    </section>
  );
};

export default HomeHero;
