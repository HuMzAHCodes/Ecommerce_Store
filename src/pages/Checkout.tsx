import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/ui/Toast";

type Step = "shipping" | "payment" | "review";

const STEPS: { id: Step; label: string }[] = [
  { id:"shipping", label:"Shipping" },
  { id:"payment",  label:"Payment"  },
  { id:"review",   label:"Review"   },
];

const Checkout = () => {
  const theme = useTheme();
  const { colors, typography, radius, shadows, transitions } = theme;
  const { items, totalPrice, clearCart } = useCart();
  const toast    = useToast();
  const navigate = useNavigate();

  const [step,      setStep]      = useState<Step>("shipping");
  const [placing,   setPlacing]   = useState(false);

  const [shipping, setShipping] = useState({
    firstName:"", lastName:"", email:"", phone:"",
    address:"", city:"", state:"", zip:"", country:"Pakistan",
  });
  const [payment, setPayment] = useState({
    cardName:"", cardNumber:"", expiry:"", cvv:"",
  });
  const [errors, setErrors] = useState<Record<string,string>>({});

  const shippingFee = totalPrice >= 50 ? 0 : 5.99;
  const orderTotal  = totalPrice + shippingFee;

  const validateShipping = () => {
    const e: Record<string,string> = {};
    if (!shipping.firstName) e.firstName = "Required";
    if (!shipping.lastName)  e.lastName  = "Required";
    if (!shipping.email || !/\S+@\S+\.\S+/.test(shipping.email)) e.email = "Valid email required";
    if (!shipping.address)   e.address   = "Required";
    if (!shipping.city)      e.city      = "Required";
    if (!shipping.zip)       e.zip       = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string,string> = {};
    if (!payment.cardName)   e.cardName   = "Required";
    if (!payment.cardNumber || payment.cardNumber.replace(/\s/g,"").length < 16) e.cardNumber = "Enter valid 16-digit card";
    if (!payment.expiry)     e.expiry     = "Required";
    if (!payment.cvv || payment.cvv.length < 3) e.cvv = "Enter valid CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === "shipping" && validateShipping()) { setStep("payment"); setErrors({}); }
    else if (step === "payment" && validatePayment()) { setStep("review"); setErrors({}); }
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    // TODO: POST /api/orders
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    toast.success("Order placed! Thank you 🎉");
    navigate("/orders");
    setPlacing(false);
  };

  const inputStyle = (err?: string): React.CSSProperties => ({
    width:"100%", padding:"0.65rem 0.875rem",
    border:`1.5px solid ${err ? colors.error : colors.borderLight}`,
    borderRadius: radius?.md, fontFamily: typography.fontBody, fontSize: typography.sm,
    color: colors.textPrimary, background: colors.bgCard, outline:"none",
    transition:`border-color ${transitions?.fast}`,
  });

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label style={{ fontFamily: typography.fontBody, fontSize: typography.xs, fontWeight: typography.weightMedium, color: colors.textPrimary, display:"block", marginBottom:4 }}>
      {children}
    </label>
  );

  const FieldErr = ({ msg }: { msg?: string }) =>
    msg ? <p style={{ fontFamily: typography.fontBody, fontSize: "0.68rem", color: colors.error, marginTop:2 }}>{msg}</p> : null;

  const currentIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div style={{ background: colors.bgPrimary, minHeight:"100vh" }}>
      <div style={{ background: colors.bgSecondary, borderBottom:`1px solid ${colors.borderLight}`, padding:"2rem 1.5rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <h1 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle:"italic", marginBottom:"1.25rem" }}>Checkout</h1>

          {/* Step indicator */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
            {STEPS.map(({ id, label }, i) => {
              const done   = i < currentIndex;
              const active = id === step;
              return (
                <div key={id} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:26, height:26, borderRadius: radius?.full, background: done ? colors.success : active ? colors.accentPrimary : colors.borderMedium, display:"flex", alignItems:"center", justifyContent:"center", transition:`background ${transitions?.normal}` }}>
                      {done
                        ? <Check size={13} color="#fff" />
                        : <span style={{ fontFamily: typography.fontBody, fontSize:"0.68rem", fontWeight: typography.weightBold, color:"#fff" }}>{i+1}</span>
                      }
                    </div>
                    <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: active ? typography.weightMedium : typography.weightRegular, color: active ? colors.textPrimary : colors.textMuted }}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length-1 && <ChevronRight size={14} color={colors.textMuted} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"2.5rem 1.5rem", display:"grid", gridTemplateColumns:"1fr 340px", gap:"2.5rem", alignItems:"start" }}>

        {/* ── Form area ──────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {step === "shipping" && (
            <motion.div key="shipping" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.3 }}
              style={{ background: colors.bgCard, borderRadius: radius?.xl, padding:"2rem", border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}>
              <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom:"1.5rem" }}>Shipping Details</h2>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                {([["firstName","First Name",""],["lastName","Last Name",""],["email","Email","full"],["phone","Phone","full"],["address","Address","full"],["city","City",""],["state","State",""],["zip","ZIP Code",""],] as [keyof typeof shipping, string, string][]).map(([field, label, span]) => (
                  <div key={field} style={{ gridColumn: span==="full" ? "1/-1" : undefined }}>
                    <Label>{label}</Label>
                    <input value={shipping[field]} onChange={(e) => setShipping(s=>({...s,[field]:e.target.value}))} style={inputStyle(errors[field])}
                      onFocus={(e) => { e.currentTarget.style.borderColor = colors.borderFocus; e.currentTarget.style.boxShadow=`0 0 0 3px ${colors.accentLight}`; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = errors[field] ? colors.error : colors.borderLight; e.currentTarget.style.boxShadow="none"; }} />
                    <FieldErr msg={errors[field]} />
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={handleNext}
                style={{ marginTop:"1.5rem", width:"100%", padding:"0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium }}>
                Continue to Payment
              </motion.button>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div key="payment" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.3 }}
              style={{ background: colors.bgCard, borderRadius: radius?.xl, padding:"2rem", border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}>
              <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom:"1.5rem" }}>Payment</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                {([["cardName","Name on Card","text"],["cardNumber","Card Number","text"],["expiry","Expiry (MM/YY)","text"],["cvv","CVV","text"]] as [keyof typeof payment,string,string][]).map(([field,label,type]) => (
                  <div key={field}>
                    <Label>{label}</Label>
                    <input type={type} value={payment[field]} onChange={(e) => setPayment(p=>({...p,[field]:e.target.value}))} style={inputStyle(errors[field])} maxLength={field==="cardNumber"?19:field==="cvv"?4:undefined}
                      onFocus={(e) => { e.currentTarget.style.borderColor = colors.borderFocus; e.currentTarget.style.boxShadow=`0 0 0 3px ${colors.accentLight}`; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = errors[field] ? colors.error : colors.borderLight; e.currentTarget.style.boxShadow="none"; }} />
                    <FieldErr msg={errors[field]} />
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:"0.75rem", marginTop:"1.5rem" }}>
                <button onClick={() => setStep("shipping")} style={{ flex:1, padding:"0.875rem", borderRadius: radius?.full, border:`1.5px solid ${colors.borderLight}`, background:"transparent", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}>
                  Back
                </button>
                <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={handleNext}
                  style={{ flex:2, padding:"0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium }}>
                  Review Order
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "review" && (
            <motion.div key="review" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.3 }}
              style={{ background: colors.bgCard, borderRadius: radius?.xl, padding:"2rem", border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}>
              <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom:"1.5rem" }}>Review Your Order</h2>

              {items.map(({ product, quantity }) => (
                <div key={product.id} style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"0.875rem 0", borderBottom:`1px solid ${colors.borderLight}` }}>
                  <div style={{ width:52, height:52, borderRadius: radius?.md, background: product.image, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.25rem", flexShrink:0 }}>✨</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, margin:0 }}>{product.name}</p>
                    <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, margin:0 }}>Qty: {quantity}</p>
                  </div>
                  <span style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightBold, color: colors.textPrimary }}>
                    ${((product.salePrice ?? product.price) * quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div style={{ margin:"1.25rem 0", padding:"1rem", background: colors.bgSecondary, borderRadius: radius?.lg }}>
                <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, margin:0 }}>
                  <strong style={{ color: colors.textPrimary }}>Ship to:</strong> {shipping.address}, {shipping.city}, {shipping.zip}
                </p>
              </div>

              <div style={{ display:"flex", gap:"0.75rem" }}>
                <button onClick={() => setStep("payment")} style={{ flex:1, padding:"0.875rem", borderRadius: radius?.full, border:`1.5px solid ${colors.borderLight}`, background:"transparent", cursor:"pointer", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}>
                  Back
                </button>
                <motion.button whileHover={!placing?{scale:1.02}:{}} whileTap={!placing?{scale:0.97}:{}} onClick={handlePlaceOrder} disabled={placing}
                  style={{ flex:2, padding:"0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor: placing?"not-allowed":"pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, opacity: placing?0.75:1 }}>
                  {placing ? "Placing Order…" : `Place Order · $${orderTotal.toFixed(2)}`}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Order summary sidebar ───────────────────────── */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.15 }}
          style={{ background: colors.bgCard, borderRadius: radius?.xl, padding:"1.75rem", border:`1px solid ${colors.borderLight}`, boxShadow: shadows?.sm, position:"sticky", top:84 }}>
          <h3 style={{ fontFamily: typography.fontDisplay, fontSize: typography.xl, color: colors.textPrimary, marginBottom:"1.25rem" }}>Order Summary</h3>
          {items.map(({ product, quantity }) => (
            <div key={product.id} style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.625rem", fontFamily: typography.fontBody, fontSize: typography.sm }}>
              <span style={{ color: colors.textSecondary }}>{product.name} × {quantity}</span>
              <span style={{ color: colors.textPrimary, fontWeight: typography.weightMedium }}>${((product.salePrice??product.price)*quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop:`1px solid ${colors.borderLight}`, marginTop:"1rem", paddingTop:"1rem" }}>
            {[["Subtotal", `$${totalPrice.toFixed(2)}`], ["Shipping", shippingFee===0?"Free":"$5.99"], ["Total", `$${orderTotal.toFixed(2)}`]].map(([l,v],i) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom: i<2?"0.5rem":0, fontFamily: typography.fontBody, fontSize: i===2?typography.base:typography.sm, fontWeight: i===2?typography.weightBold:typography.weightRegular, color: i===2?colors.textPrimary:colors.textSecondary }}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Checkout.tsx
// A fully functional three-step checkout flow: Shipping → Payment → Review.
// Each step renders its own animated form panel; a sticky sidebar shows the
// live order summary throughout. All state is local — no external form library.
//
// ── Page layout ───────────────────────────────────────────────────────────────
//
//  Header bar      — page title + step indicator breadcrumb
//  Main grid       — two columns: [form area (1fr)] [order summary sidebar (340px)]
//    Form area     — AnimatePresence renders one step panel at a time
//    Sidebar       — sticky (top: 84px), always visible regardless of active step
//
// ── Step flow ─────────────────────────────────────────────────────────────────
//
//  STEPS constant defines the three steps as { id, label } pairs.
//  `step` state (type Step = "shipping" | "payment" | "review") tracks the
//  current position. Navigation:
//    Forward  — handleNext() validates the current step; advances only on pass
//    Backward — "Back" buttons call setStep() directly with no validation
//
//  Step indicator (header):
//    currentIndex = STEPS.findIndex(s => s.id === step)
//    done   (i < currentIndex) → green circle with Check icon
//    active (id === step)      → accentPrimary circle with step number
//    future (i > currentIndex) → borderMedium grey circle with step number
//    Steps are separated by ChevronRight icons.
//
// ── State ─────────────────────────────────────────────────────────────────────
//
//  step      — current step id; drives which form panel AnimatePresence renders
//  placing   — true while the fake API call is in flight; disables the
//              Place Order button and shows "Placing Order…" label
//  shipping  — controlled object for all shipping form fields
//              (firstName, lastName, email, phone, address, city, state, zip, country)
//  payment   — controlled object for all payment form fields
//              (cardName, cardNumber, expiry, cvv)
//  errors    — flat Record<fieldKey, errorMessage>; populated by validators,
//              cleared on successful step advance; drives red border + FieldErr display
//
// ── Derived values ────────────────────────────────────────────────────────────
//
//  shippingFee  — 0 if totalPrice ≥ $50 (free shipping threshold), else $5.99
//  orderTotal   — totalPrice + shippingFee; displayed on the Place Order button
//                 and in the sidebar Total row
//
// ── Validation ────────────────────────────────────────────────────────────────
//
//  validateShipping():
//    Required: firstName, lastName, address, city, zip
//    Format:   email must match /\S+@\S+\.\S+/
//    Returns true only if the errors object is empty after all checks.
//
//  validatePayment():
//    Required: cardName, expiry
//    cardNumber: stripped of spaces must be ≥ 16 characters
//    cvv: must be ≥ 3 characters
//    Returns true only if the errors object is empty after all checks.
//
//  Both validators write to setErrors() and return a boolean.
//  handleNext() calls the appropriate validator for the current step and
//  only advances + clears errors on a true return.
//
// ── handlePlaceOrder (async) ──────────────────────────────────────────────────
//
//  Called from the Review step's "Place Order" button.
//  1. Sets placing = true (disables button, shows loading label)
//  2. Awaits a 1500 ms fake delay (TODO: replace with POST /api/orders)
//  3. Calls clearCart() to empty the CartContext
//  4. Fires toast.success("Order placed! Thank you 🎉")
//  5. Navigates to /orders
//  6. Sets placing = false (unreachable in practice since navigate unmounts,
//     but kept for correctness if the flow changes)
//
// ── Form rendering pattern ────────────────────────────────────────────────────
//
//  Both the Shipping and Payment forms use a mapped array of field tuples
//  rather than repeating individual JSX blocks:
//    Shipping: [keyof shipping, label, span ("full" | "")][]
//      span === "full" sets gridColumn: "1/-1" to stretch across both columns
//    Payment:  [keyof payment, label, inputType][]
//  This keeps the form definitions data-driven and easy to extend.
//
// ── Inline helper components ──────────────────────────────────────────────────
//
//  Label     — a thin <label> wrapper applying consistent typography styles.
//              Defined inside the component so it closes over theme tokens
//              without needing props for colors/typography.
//
//  FieldErr  — renders a small red error <p> when msg is truthy, null otherwise.
//              Used below every input to show validation messages.
//
//  inputStyle(err?) — a function returning a CSSProperties object for inputs.
//              Switches border color to colors.error when err is truthy.
//              onFocus/onBlur handlers on each input mutate style imperatively
//              to show the accentLight focus ring without a focused state variable.
//
// ── Step panel animations ─────────────────────────────────────────────────────
//
//  AnimatePresence mode="wait" ensures the exiting panel fully animates out
//  before the entering panel animates in (no overlap).
//  Each panel:
//    initial — opacity: 0, x: +20  (slides in from the right)
//    animate — opacity: 1, x: 0
//    exit    — opacity: 0, x: -20  (slides out to the left)
//  This gives a left-to-right forward / right-to-left backward feel naturally
//  since Back buttons also trigger the same exit animation.
//
// ── Order summary sidebar ─────────────────────────────────────────────────────
//
//  Reads items[], totalPrice from CartContext (via useCart()).
//  Renders each cart item as "name × qty" + line total.
//  Below the item list: Subtotal / Shipping / Total rows.
//  The Total row is visually emphasized (larger font, weightBold, textPrimary).
//  position: sticky + top: 84px keeps it visible while the form scrolls.
//  Fades + slides in on mount (initial y:16 → y:0) with a 150 ms delay so
//  it appears slightly after the form panel for a staggered feel.
//
// ── Review step ───────────────────────────────────────────────────────────────
//
//  Renders all cart items with a ✨ emoji placeholder (product.image is used
//  as a CSS background color fallback — real images would use an <img> tag).
//  Shows a "Ship to" summary block pulling from the shipping state object.
//  Price per line = (salePrice ?? price) × quantity, formatted to 2 decimals.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — useNavigate to redirect to /orders after placement
//  framer-motion     — motion.div/button, AnimatePresence for step transitions
//  lucide-react      — Check (completed step icon), ChevronRight (step separator)
//  useTheme()        — colors, typography, radius, shadows, transitions tokens
//  useCart()         — items, totalPrice, clearCart from CartContext
//  useToast()        — success toast on order placement