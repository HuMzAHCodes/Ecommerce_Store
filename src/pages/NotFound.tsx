import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, ShoppingBag } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";

const NotFound = () => {
  const theme = useTheme();
  const { colors, typography, radius, shadows } = theme;

  return (
    <div style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", background: colors.bgPrimary, padding:"3rem 1.5rem" }}>
      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} style={{ textAlign:"center", maxWidth:480 }}>
        <motion.div animate={{ rotate:[0, -5, 5, -5, 0] }} transition={{ duration:0.5, delay:0.4 }}
          style={{ fontSize:"6rem", marginBottom:"1.5rem" }}>
          🌸
        </motion.div>
        <h1 style={{ fontFamily: typography.fontDisplay, fontSize: "6rem", color: colors.accentLight, fontStyle:"italic", lineHeight:1, marginBottom:"0.5rem" }}>404</h1>
        <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic", marginBottom:"0.875rem" }}>Page not found</h2>
        <p style={{ fontFamily: typography.fontBody, color: colors.textMuted, marginBottom:"2.5rem", lineHeight:1.7 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <Link to="/">
            <motion.span whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding:"0.875rem 1.75rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor:"pointer", boxShadow: shadows?.md }}>
              <Home size={16} /> Go Home
            </motion.span>
          </Link>
          <Link to="/shop">
            <motion.span whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background:"transparent", color: colors.textPrimary, borderRadius: radius?.full, padding:"0.875rem 1.75rem", fontFamily: typography.fontBody, fontWeight: typography.weightMedium, cursor:"pointer", border:`1.5px solid ${colors.borderMedium}` }}>
              <ShoppingBag size={16} /> Browse Shop <ArrowRight size={15} />
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;


// ── File Overview ─────────────────────────────────────────────────────────────
//
// NotFound.tsx
// 404 error page — shown when a user navigates to a route that doesn't exist.
// Fully static, no data fetching, no auth. Single centered card with two CTAs.
//
// ── Layout ────────────────────────────────────────────────────────────────────
//
// Outer div:  minHeight 80vh, flex center — vertically and horizontally
//             centers the card without taking the full screen height
// Inner card: maxWidth 480, textAlign center — compact, readable error message
//
// ── Animations ───────────────────────────────────────────────────────────────
//
// All animations here are INLINE (written directly as prop values, not as
// named variant objects). This means TypeScript infers types correctly
// without needing the [number,number,number,number] tuple cast that
// was required in About.tsx — no variants error in this file.
//
// 1. Card entrance — motion.div wrapping everything
//    opacity 0 + y 30 → opacity 1 + y 0 over 600ms (fires on mount)
//
// 2. Emoji wobble — motion.div around the 🌸 emoji
//    rotate: [0, -5, 5, -5, 0] — keyframe sequence that plays once
//    fires 400ms after mount (delay: 0.4) — gives the card time to
//    appear before the emoji draws attention with the wobble
//
// ── Content ───────────────────────────────────────────────────────────────────
//
// 🌸 emoji     — decorative, wobbles on mount to soften the error feel
// "404"        — large italic display font, colored accentLight (muted, not alarming)
// "Page not found" — h2 italic display font, textPrimary
// Body copy    — short explanation, textMuted, lineHeight 1.7
//
// ── CTA Buttons ───────────────────────────────────────────────────────────────
//
// Two buttons side by side (flex row, flexWrap for mobile):
//
// 1. "Go Home" → /
//    Filled pill button — accentPrimary background, textOnAccent color
//    Primary action — most users who land on 404 want to go home
//
// 2. "Browse Shop →" → /shop
//    Outlined pill button — transparent background, borderMedium border
//    Secondary action — gives an alternative destination
//
// Both buttons use whileHover: scale 1.03 and whileTap: scale 0.97
// for consistent micro-interaction feedback across the app
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom — Link (Go Home → /, Browse Shop → /shop)
//  framer-motion    — motion.div, motion.span
//  lucide-react     — Home, ShoppingBag, ArrowRight (button icons)
//  useTheme()       — colors, typography, radius, shadows tokens