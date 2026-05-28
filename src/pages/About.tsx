import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Heart, Sparkles, Shield } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useIsMobile } from "../hooks/useMediaQuery";

const VALUES = [
  { icon:<Leaf size={24}/>,     title:"Clean Ingredients",  desc:"Every product is formulated without parabens, sulfates, artificial fragrances, or harmful chemicals." },
  { icon:<Shield size={24}/>,   title:"Dermatologist Tested",desc:"All formulas are tested and approved by dermatologists for all skin types, including sensitive skin." },
  { icon:<Heart size={24}/>,    title:"Cruelty-Free",        desc:"We never test on animals. Ever. Our products are certified cruelty-free and vegan-friendly." },
  { icon:<Sparkles size={24}/>, title:"Sustainable",         desc:"Eco-conscious packaging, carbon-neutral shipping, and a commitment to reducing our environmental footprint." },
];

const fadeUp = {
  hidden:  { opacity:0, y:24 },
  visible: {
    opacity:1,
    y:0,
    transition:{
      duration:0.5,
      // ❌ ease: number[] — TypeScript infers this as number[], not a tuple
      // ✅ cast as [number,number,number,number] — Framer Motion requires a fixed-length tuple
      //    for cubic-bezier easing values
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
    }
  },
};

const About = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { colors, typography, radius, shadows } = theme;

  return (
    <div style={{ background: colors.bgPrimary }}>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${colors.accentLight} 0%, ${colors.bgSecondary} 100%)`, padding: isMobile ? "4rem 1.25rem" : "6rem 1.5rem", textAlign:"center" }}>
        <motion.div initial="hidden" animate="visible" variants={{ visible:{ transition:{ staggerChildren:0.1 } } }}>
          <motion.p variants={fadeUp} style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.accentPrimary, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1rem" }}>
            Our Story
          </motion.p>
          <motion.h1 variants={fadeUp} style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic", maxWidth:640, margin:"0 auto 1.25rem" }}>
            Beauty rooted in simplicity
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontFamily: typography.fontBody, fontSize: typography.lg, color: colors.textSecondary, maxWidth:560, margin:"0 auto 2rem", lineHeight:1.7 }}>
            Blüm was born from a simple idea — skincare shouldn't be complicated, expensive, or harmful. We create products that work, with ingredients you can trust.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding: isMobile ? "3rem 1.25rem" : "5rem 1.5rem", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "4rem", alignItems:"center" }}>
        <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <div style={{ height: isMobile ? 260 : 400, borderRadius: radius?.xl, background: `linear-gradient(145deg, ${colors.accentLight}, ${colors.bgSecondary})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"8rem", boxShadow: shadows?.lg }}>
            🌿
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.accentPrimary, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.875rem" }}>Our Mission</p>
          <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic", marginBottom:"1.25rem" }}>
            Honest skincare for real people
          </h2>
          <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, fontSize: typography.base, lineHeight:1.8, marginBottom:"1rem" }}>
            We believe everyone deserves access to effective, clean skincare. That's why we keep our formulas simple, our ingredients transparent, and our prices fair.
          </p>
          <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, fontSize: typography.base, lineHeight:1.8, marginBottom:"2rem" }}>
            Founded in 2022, Blüm has grown from a small home lab into a brand trusted by over 50,000 customers worldwide — all without compromising on what matters most: what goes on your skin.
          </p>
          <Link to="/shop">
            <motion.span whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding:"0.875rem 1.75rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor:"pointer", boxShadow: shadows?.md }}>
              Shop the Collection <ArrowRight size={16} />
            </motion.span>
          </Link>
        </motion.div>
      </section>

      {/* Values */}
      <section style={{ background: colors.bgSecondary, padding:"5rem 0", borderTop:`1px solid ${colors.borderLight}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 1.5rem" }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} style={{ textAlign:"center", marginBottom:"3rem" }}>
            <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic" }}>What we stand for</h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:"1.5rem" }}>
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.1 }}
                style={{ background: colors.bgCard, borderRadius: radius?.xl, padding:"2rem", border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}>
                <div style={{ color: colors.accentPrimary, marginBottom:"1rem" }}>{v.icon}</div>
                <h3 style={{ fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightBold, color: colors.textPrimary, marginBottom:"0.625rem" }}>{v.title}</h3>
                <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, lineHeight:1.7, margin:0 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding: isMobile ? "3.5rem 1.25rem" : "5rem 1.5rem", textAlign:"center" }}>
        <motion.div initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          style={{ background: `linear-gradient(135deg, ${colors.accentLight}, ${colors.bgSecondary})`, borderRadius: radius?.xl, padding: isMobile ? "2.5rem 1.5rem" : "4rem 2rem", border:`1px solid ${colors.borderLight}` }}>
          <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic", marginBottom:"1rem" }}>Ready to start your glow?</h2>
          <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, marginBottom:"2rem", maxWidth:400, margin:"0 auto 2rem" }}>Discover clean skincare that actually works. Free shipping on orders over $50.</p>
          <Link to="/shop">
            <motion.span whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding:"0.875rem 2rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor:"pointer", boxShadow: shadows?.md }}>
              Shop Now <ArrowRight size={16} />
            </motion.span>
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default About;


// ── File Overview ──────────────────────────────────────────────────────────────
//
// About.tsx
// The brand story and values page. Fully static — no data fetching, no auth,
// no context dependencies. Four sections rendered top-to-bottom, each with
// scroll-triggered Framer Motion animations and ThemeContext styling.
//
// ── Page sections (top → bottom) ─────────────────────────────────────────────
//
//  1. Hero     — gradient banner with staggered "Our Story" label + h1 + tagline
//  2. Mission  — two-column split: decorative visual left, brand copy + CTA right
//  3. Values   — bgSecondary grid of four brand value cards
//  4. CTA      — gradient rounded banner with "Shop Now" button → /shop
//
// ── Module-level data constants ───────────────────────────────────────────────
//
//  VALUES — four brand value objects { icon, title, desc }, defined outside
//           the component so they are never re-created on render.
//           Each renders as a card in the Values section grid.
//           Adding or editing a value requires only changing this array.
//
//  fadeUp — Framer Motion variant object used by the Hero section's stagger
//           children. opacity 0 + y 24 → opacity 1 + y 0 over 500 ms.
//           ease is cast as [number, number, number, number] tuple because
//           Framer Motion's TypeScript types require a fixed-length tuple
//           for cubic-bezier easing — a plain number[] is not assignable
//           to the Easing type and causes a TypeScript error.
//
// ── Hero section ──────────────────────────────────────────────────────────────
//
//  Full-width gradient banner (accentLight → bgSecondary, 135deg), center-aligned.
//  Parent motion.div uses inline variants with staggerChildren: 0.1 s.
//  Three staggered fadeUp children:
//    1. "Our Story" uppercase label (accentPrimary, 0.1em letter-spacing)
//    2. <h1> italic display font headline
//    3. Brand tagline paragraph (maxWidth 560, lineHeight 1.7)
//  Uses initial/animate (not whileInView) since it's above the fold.
//
// ── Mission section ───────────────────────────────────────────────────────────
//
//  Two-column CSS grid (1fr 1fr, gap 4rem, maxWidth 1280).
//  Both columns use whileInView with viewport: { once: true } and slide
//  in from opposite horizontal directions:
//    Left  — x: -24 → 0 (slides in from the left)
//    Right — x: +24 → 0 (slides in from the right)
//  This creates a converging entrance effect on scroll.
//
//  Left column: a 400px gradient card with a large 🌿 emoji placeholder
//  (intended to be replaced with a real brand/product photo).
//
//  Right column: "Our Mission" label + h2 + two body paragraphs + CTA button.
//  The CTA ("Shop the Collection →") links to /shop.
//
// ── Values section ────────────────────────────────────────────────────────────
//
//  bgSecondary background with borderTop separator.
//  Centered "What we stand for" heading animates in on scroll.
//  auto-fit grid (minmax 240px) of four value cards, each:
//    Entrance: opacity 0 + y 20 → opacity 1 + y 0, delay: i * 0.1 s
//    Card content: accentPrimary icon + bold title + muted description
//  The stagger is achieved via index-based delay (not a parent variant)
//  since the grid wrapper is a plain <div>, not a motion element.
//
// ── CTA section ───────────────────────────────────────────────────────────────
//
//  Gradient rounded card (accentLight → bgSecondary) centered in the page.
//  Animates in with scale: 0.97 → 1 + opacity on scroll (single block).
//  "Shop Now →" button links to /shop — same pill button style as Mission CTA.
//
// ── Animation strategy ────────────────────────────────────────────────────────
//
//  Hero        — initial/animate (above fold, fires on mount)
//  All others  — whileInView + viewport: { once: true } (scroll-triggered,
//                animates only once per session)
//  No AnimatePresence needed — all content is statically present,
//  nothing conditionally mounts or unmounts.
//

//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — Link (Mission CTA + CTA section button → /shop)
//  framer-motion     — motion.div, motion.p, motion.h1, motion.span
//  lucide-react      — ArrowRight, Leaf, Heart, Sparkles, Shield (value icons)
//  useTheme()        — colors, typography, radius, shadows tokens