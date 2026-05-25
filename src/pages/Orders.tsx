import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, ChevronRight, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";

// ── Mock orders ───────────────────────────────────────────────
const MOCK_ORDERS = [
  { id:"ORD-001", date:"May 20, 2025", status:"DELIVERED",  total:110.00, items:[{ name:"Radiance Serum", qty:1, price:68 },{ name:"Rose Toner", qty:1, price:38 }] },
  { id:"ORD-002", date:"May 10, 2025", status:"SHIPPED",    total:72.00,  items:[{ name:"Cloud Cream SPF 30", qty:1, price:72 }] },
  { id:"ORD-003", date:"Apr 28, 2025", status:"PROCESSING", total:55.00,  items:[{ name:"Velvet Body Butter", qty:1, price:55 }] },
];

const STATUS_CONFIG = {
  DELIVERED:  { label:"Delivered",  color:"#5A9E7A", bg:"#EBF5F0", icon:<CheckCircle size={14}/> },
  SHIPPED:    { label:"Shipped",    color:"#3D8BCD", bg:"#E8F2FB", icon:<Truck size={14}/>       },
  PROCESSING: { label:"Processing", color:"#C9A05A", bg:"#F5F0EB", icon:<Clock size={14}/>       },
  CANCELLED:  { label:"Cancelled",  color:"#C95A5A", bg:"#F5EBEB", icon:<XCircle size={14}/>     },
  PENDING:    { label:"Pending",    color:"#9AAABB", bg:"#F0F4F8", icon:<Clock size={14}/>       },
};

const Orders = () => {
  const theme = useTheme();
  const { colors, typography, radius, shadows } = theme;

  return (
    <div style={{ background: colors.bgPrimary, minHeight:"100vh" }}>
      <div style={{ background: colors.bgSecondary, borderBottom:`1px solid ${colors.borderLight}`, padding:"2.5rem 1.5rem 2rem" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <h1 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic" }}>Order History</h1>
          <p style={{ fontFamily: typography.fontBody, color: colors.textMuted, fontSize: typography.sm, marginTop:4 }}>{MOCK_ORDERS.length} orders</p>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"2.5rem 1.5rem", display:"flex", flexDirection:"column", gap:"1.25rem" }}>
        {MOCK_ORDERS.map((order, i) => {
          const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;
          return (
            <motion.div key={order.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:i*0.08 }}
              style={{ background: colors.bgCard, borderRadius: radius?.xl, border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm, overflow:"hidden" }}>

              {/* Header */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.25rem 1.5rem", borderBottom:`1px solid ${colors.borderLight}`, flexWrap:"wrap", gap:"0.75rem" }}>
                <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap" }}>
                  <div>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginBottom:2 }}>Order</p>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightBold, color: colors.textPrimary }}>{order.id}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginBottom:2 }}>Date</p>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textPrimary }}>{order.date}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginBottom:2 }}>Total</p>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightBold, color: colors.accentPrimary }}>${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 12px", borderRadius: radius?.full, background: status.bg, color: status.color, fontFamily: typography.fontBody, fontSize: typography.xs, fontWeight: typography.weightMedium }}>
                    {status.icon} {status.label}
                  </span>
                  <ChevronRight size={16} color={colors.textMuted} />
                </div>
              </div>

              {/* Items */}
              <div style={{ padding:"1rem 1.5rem", display:"flex", flexDirection:"column", gap:"0.625rem" }}>
                {order.items.map((item) => (
                  <div key={item.name} style={{ display:"flex", justifyContent:"space-between", fontFamily: typography.fontBody, fontSize: typography.sm }}>
                    <span style={{ color: colors.textSecondary }}>{item.name} × {item.qty}</span>
                    <span style={{ color: colors.textPrimary, fontWeight: typography.weightMedium }}>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {MOCK_ORDERS.length === 0 && (
          <div style={{ textAlign:"center", padding:"4rem 0" }}>
            <Package size={56} color={colors.borderMedium} style={{ margin:"0 auto 1rem" }} />
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.lg, color: colors.textPrimary, marginBottom:"0.5rem" }}>No orders yet</p>
            <Link to="/shop" style={{ color: colors.accentPrimary, fontFamily: typography.fontBody, fontSize: typography.sm }}>Start shopping →</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Orders.tsx
// The order history page. Renders a staggered list of order cards, each
// showing the order number, date, total, status badge, and line items.
// All data is currently mocked — no API calls or auth dependency.
//
// ── Page layout ───────────────────────────────────────────────────────────────
//
//  Header bar    — bgSecondary strip with "Order History" heading and order count
//  Order list    — vertical flex column of order cards (maxWidth 900, centered)
//  Empty state   — rendered when MOCK_ORDERS.length === 0 (Package icon + CTA)
//
// ── Module-level data constants ───────────────────────────────────────────────
//
//  MOCK_ORDERS — array of three hardcoded orders, each with:
//                  id       — display order number (e.g. "ORD-001")
//                  date     — human-readable date string
//                  status   — one of the STATUS_CONFIG keys
//                  total    — order total as a number
//                  items[]  — array of { name, qty, price } line items
//                These are UI stubs; the real implementation will fetch from
//                an API endpoint (e.g. GET /api/orders) via React Query,
//                filtered by the authenticated user's id.
//
//  STATUS_CONFIG — a lookup object keyed by status string. Each entry holds:
//                  label — human-readable status text
//                  color — foreground hex for the badge pill
//                  bg    — background hex for the badge pill
//                  icon  — pre-rendered lucide ReactNode for the badge
//                Status keys: DELIVERED, SHIPPED, PROCESSING, CANCELLED, PENDING.
//                Colors are hardcoded hex values (not ThemeContext tokens) so
//                they remain consistent regardless of the active theme.
//                The ?? STATUS_CONFIG.PENDING fallback handles any unknown
//                status string that isn't in the config object.
//
// ── Order card structure ──────────────────────────────────────────────────────
//
//  Each card is a motion.div with:
//    ├─ Header row (flex, space-between, borderBottom)
//    │   ├─ Left group — three label+value pairs: Order / Date / Total
//    │   │   Total is rendered in accentPrimary + weightBold for emphasis
//    │   └─ Right group — status badge pill + ChevronRight icon
//    │       ChevronRight implies the card is clickable/expandable (stub —
//    │       currently no onClick; a future implementation would navigate
//    │       to /orders/:id for the full order detail view)
//    └─ Items area — one row per line item: "name × qty" left, "$price" right
//
// ── Status badge pill ─────────────────────────────────────────────────────────
//
//  Rendered as an inline-flex <span> using status.bg and status.color from
//  STATUS_CONFIG. Contains the status icon (14px lucide) + label text.
//  Visual mapping:
//    DELIVERED  → green  (CheckCircle) — order fulfilled
//    SHIPPED    → blue   (Truck)       — in transit
//    PROCESSING → amber  (Clock)       — being prepared
//    CANCELLED  → red    (XCircle)     — order cancelled
//    PENDING    → grey   (Clock)       — awaiting confirmation / fallback
//
// ── Stagger animation ─────────────────────────────────────────────────────────
//
//  Each order card uses:
//    initial    — opacity: 0, y: +16
//    animate    — opacity: 1, y: 0
//    duration   — 400 ms
//    delay      — i * 0.08 s (80 ms per card)
//  This creates a cascading entrance effect without needing a parent stagger
//  variant — the delay is derived directly from the map index `i`.
//
// ── Empty state ───────────────────────────────────────────────────────────────
//
//  Rendered when MOCK_ORDERS.length === 0 (currently never shown since the
//  mock array has three items, but ready for when real data returns nothing).
//  Shows a large Package icon + "No orders yet" + "Start shopping →" link.
//
// ── What to replace for production ───────────────────────────────────────────
//
//  Replace MOCK_ORDERS with a React Query fetch:
//    const { data: orders } = useQuery(["orders"], () => fetchOrders(user.id))
//  Add a route guard to redirect unauthenticated users to /login.
//  Make each card clickable to navigate to /orders/:id for full detail.
//  Add pagination or infinite scroll for users with many orders.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — Link (empty state CTA to /shop)
//  framer-motion     — motion.div for per-card stagger entrance animation
//  lucide-react      — Package, ChevronRight, Truck, CheckCircle, Clock, XCircle
//  useTheme()        — colors, typography, radius, shadows tokens