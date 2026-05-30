import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/ui/Toast";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { INITIAL_SHIPPING, INITIAL_PAYMENT, type Step, type ShippingForm, type PaymentForm } from "./types";
import { validateShipping, validatePayment, isValid, type FormErrors } from "./validation";
import CheckoutStepper      from "./CheckoutStepper";
import ShippingStep         from "./ShippingStep";
import PaymentStep          from "./PaymentStep";
import ReviewStep           from "./ReviewStep";
import CheckoutOrderSummary from "./CheckoutOrderSummary";

/**
 * Checkout page — thin orchestrator.
 *
 *  CheckoutStepper      → progress indicator (Shipping → Payment → Review)
 *  ShippingStep         → form for delivery details
 *  PaymentStep          → form for card details
 *  ReviewStep           → order confirmation + place order button
 *  CheckoutOrderSummary → sticky sidebar with item list and totals
 *
 *  validation.ts        → validateShipping / validatePayment pure functions
 *  types.ts             → Step, ShippingForm, PaymentForm, STEPS constant
 */
const Checkout = () => {
  const { colors, typography, radius } = useTheme();
  const isMobile = useIsMobile();
  const { items, totalPrice, clearCart } = useCart();
  const toast    = useToast();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [isPlacing,   setIsPlacing]   = useState(false);
  const [shipping,    setShipping]    = useState<ShippingForm>(INITIAL_SHIPPING);
  const [payment,     setPayment]     = useState<PaymentForm>(INITIAL_PAYMENT);
  const [errors,      setErrors]      = useState<FormErrors>({});

  const shippingFee = totalPrice >= 50 ? 0 : 5.99;
  const orderTotal  = totalPrice + shippingFee;

  const handleShippingChange = (field: keyof ShippingForm, value: string) =>
    setShipping((prev) => ({ ...prev, [field]: value }));

  const handlePaymentChange = (field: keyof PaymentForm, value: string) =>
    setPayment((prev) => ({ ...prev, [field]: value }));

  const handleNext = () => {
    if (currentStep === "shipping") {
      const errs = validateShipping(shipping);
      if (!isValid(errs)) { setErrors(errs); return; }
      setErrors({});
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      const errs = validatePayment(payment);
      if (!isValid(errs)) { setErrors(errs); return; }
      setErrors({});
      setCurrentStep("review");
    }
  };

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    toast.success("Order placed! Thank you 🎉");
    navigate("/order-success");
    setIsPlacing(false);
  };

  return (
    <div style={{ background: colors.bgPrimary, minHeight: "100vh" }}>

      {/* Page header + stepper */}
      <div style={{ background: colors.bgSecondary, borderBottom: `1px solid ${colors.borderLight}`, padding: isMobile ? "1.5rem 1.25rem" : "2rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "1.25rem", fontSize: isMobile ? typography["2xl"] : undefined }}>
            Checkout
          </h1>
          <CheckoutStepper currentStep={currentStep} />
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth:             1280,
          margin:               "0 auto",
          padding:              isMobile ? "1.25rem" : "2.5rem 1.5rem",
          display:              "grid",
          gridTemplateColumns:  isMobile ? "1fr" : "1fr 320px",
          gap:                  isMobile ? "1.5rem" : "2.5rem",
          alignItems:           "start",
        }}
      >
        {/* Left — animated step forms */}
        <AnimatePresence mode="wait">
          {currentStep === "shipping" && (
            <ShippingStep
              shipping={shipping}
              errors={errors}
              onChange={handleShippingChange}
              onNext={handleNext}
            />
          )}
          {currentStep === "payment" && (
            <PaymentStep
              payment={payment}
              errors={errors}
              onChange={handlePaymentChange}
              onNext={handleNext}
              onBack={() => setCurrentStep("shipping")}
            />
          )}
          {currentStep === "review" && (
            <ReviewStep
              items={items}
              shipping={shipping}
              orderTotal={orderTotal}
              isPlacing={isPlacing}
              onBack={() => setCurrentStep("payment")}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
        </AnimatePresence>

        {/* Right — sticky order summary */}
        <CheckoutOrderSummary
          items={items}
          totalPrice={totalPrice}
          shippingFee={shippingFee}
          orderTotal={orderTotal}
        />
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
