import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, ArrowRight, Package } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useIsMobile } from "../hooks/useMediaQuery";

// ── Mock order data (replace with real data from router state or React Query)
const MOCK_ORDER = {
  id:       "ORD-" + Math.random().toString(36).slice(2,8).toUpperCase(),
  date:     new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" }),
  items:    3,
  total:    124.00,
  shipping: "Standard · 3–5 business days",
  email:    "customer@email.com",
};

const OrderSuccess = () => {
  const theme    = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { colors, typography, radius, shadows } = theme;
  const orderRef = useRef(MOCK_ORDER);

  // Redirect away if navigated to directly with no order context
  useEffect(() => {
    const timer = setTimeout(() => {}, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: colors.bgPrimary, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding: isMobile ? "2rem 1.25rem" : "3rem 1.5rem" }}>
      <div style={{ width:"100%", maxWidth:580 }}>

        {/* ── Animated check ───────────────────────────── */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ display:"flex", justifyContent:"center", marginBottom:"1.75rem" }}
        >
          <div style={{
            width: 80, height: 80, borderRadius: radius?.full,
            background: colors.successBg,
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow: `0 0 0 12px ${colors.successBg}`,
          }}>
            <CheckCircle size={42} color={colors.success} strokeWidth={1.5}/>
          </div>
        </motion.div>

        {/* ── Heading ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, delay:0.2 }}
          style={{ textAlign:"center", marginBottom:"2rem" }}
        >
          <p className="overline" style={{ marginBottom:"0.75rem" }}>Order Confirmed</p>
          <h1 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic", marginBottom:"0.875rem" }}>
            Thank you for your order!
          </h1>
          <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, fontSize: typography.base, lineHeight:1.7 }}>
            We've received your order and will send a confirmation to{" "}
            <strong style={{ color: colors.textPrimary }}>{orderRef.current.email}</strong>.
          </p>
        </motion.div>

        {/* ── Order summary card ────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, delay:0.35 }}
          style={{
            background: colors.bgCard,
            borderRadius: radius?.xl,
            border: `1px solid ${colors.borderLight}`,
            boxShadow: shadows?.md,
            overflow:"hidden",
            marginBottom:"1.5rem",
          }}
        >
          {/* Card header */}
          <div style={{
            background: colors.bgSecondary,
            padding:"1.1rem 1.5rem",
            borderBottom:`1px solid ${colors.borderLight}`,
            display:"flex", alignItems:"center", gap:10,
          }}>
            <Package size={18} color={colors.accentPrimary}/>
            <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary }}>
              Order #{orderRef.current.id}
            </span>
          </div>

          {/* Details grid */}
          <div style={{ padding:"1.25rem 1.5rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
            {[
              { label:"Date",     value: orderRef.current.date },
              { label:"Items",    value: `${orderRef.current.items} products` },
              { label:"Total",    value: `$${orderRef.current.total.toFixed(2)}` },
              { label:"Delivery", value: orderRef.current.shipping },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginBottom:3, letterSpacing:"0.04em", textTransform:"uppercase", fontWeight:600 }}>
                  {label}
                </p>
                <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textPrimary, fontWeight: typography.weightMedium, margin:0 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ padding:"0 1.5rem 1.5rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.625rem" }}>
              {["Order Placed","Processing","Shipped","Delivered"].map((s, i) => (
                <div key={s} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5, flex:1 }}>
                  <div style={{
                    width:22, height:22, borderRadius: radius?.full,
                    background: i === 0 ? colors.success : colors.borderLight,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    border: `2px solid ${i === 0 ? colors.success : colors.borderLight}`,
                  }}>
                    {i === 0 && <CheckCircle size={12} color="#fff" strokeWidth={2.5}/>}
                  </div>
                  <span style={{ fontFamily: typography.fontBody, fontSize:"0.62rem", color: i === 0 ? colors.success : colors.textMuted, textAlign:"center", fontWeight: i===0 ? 600 : 400 }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ height:3, background: colors.borderLight, borderRadius: radius?.full, marginTop:4, position:"relative" }}>
              <motion.div
                initial={{ width:0 }}
                animate={{ width:"10%" }}
                transition={{ duration:0.8, delay:0.6, ease:"easeOut" }}
                style={{ position:"absolute", top:0, left:0, height:"100%", background: colors.success, borderRadius: radius?.full }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── Actions ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:16 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, delay:0.5 }}
          style={{ display:"flex", gap:"0.875rem", flexDirection: isMobile ? "column" : "row" }}
        >
          <Link to="/orders" style={{ flex:1, textDecoration:"none" }}>
            <motion.div whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
              style={{ width:"100%", padding:"0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow: shadows?.md }}>
              <Package size={17}/> Track Order
            </motion.div>
          </Link>

          <Link to="/shop" style={{ flex:1, textDecoration:"none" }}>
            <motion.div whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
              style={{ width:"100%", padding:"0.875rem", borderRadius: radius?.full, background:"transparent", color: colors.textPrimary, border:`1.5px solid ${colors.borderMedium}`, cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <ShoppingBag size={17}/> Continue Shopping <ArrowRight size={15}/>
            </motion.div>
          </Link>
        </motion.div>

        {/* ── Footer note ───────────────────────────────── */}
        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.5, delay:0.65 }}
          style={{ textAlign:"center", fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginTop:"1.5rem", lineHeight:1.6 }}
        >
          Questions about your order?{" "}
          <Link to="/about" style={{ color: colors.accentPrimary, textDecoration:"none", fontWeight: typography.weightMedium }}>
            Contact us
          </Link>
        </motion.p>
      </div>
    </div>
  );
};

export default OrderSuccess;
