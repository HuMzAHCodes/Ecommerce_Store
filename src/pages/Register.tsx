import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ui/Toast";

const Register = () => {
  const theme = useTheme();
  const { colors, typography, radius, shadows, transitions } = theme;
  const { register, isLoading } = useAuth();
  const toast    = useToast();
  const navigate = useNavigate();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [errors,   setErrors]   = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!name.trim())                          e.name     = "Name is required";
    if (!email)                                e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))      e.email    = "Enter a valid email";
    if (!password)                             e.password = "Password is required";
    else if (password.length < 6)              e.password = "Minimum 6 characters";
    if (confirm !== password)                  e.confirm  = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      await register(name, email, password);
      toast.success("Account created! Welcome to Blüm 🌿");
      navigate("/");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    }
  };

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width:"100%", padding:"0.7rem 0.875rem 0.7rem 2.5rem",
    border:`1.5px solid ${hasError ? colors.error : colors.borderLight}`,
    borderRadius: radius?.md, fontFamily: typography.fontBody, fontSize: typography.base,
    color: colors.textPrimary, background: colors.bgCard, outline:"none",
    transition:`border-color ${transitions?.fast}, box-shadow ${transitions?.fast}`,
  });

  const fields = [
    { id:"name",     label:"Full Name",       icon:<User size={16}/>,  type:"text",     value:name,     set:setName,     placeholder:"Jane Doe" },
    { id:"email",    label:"Email",           icon:<Mail size={16}/>,  type:"email",    value:email,    set:setEmail,    placeholder:"you@email.com" },
    { id:"password", label:"Password",        icon:<Lock size={16}/>,  type:"password", value:password, set:setPassword, placeholder:"Min. 6 characters" },
    { id:"confirm",  label:"Confirm Password",icon:<Lock size={16}/>,  type:"password", value:confirm,  set:setConfirm,  placeholder:"Repeat password" },
  ];

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background: colors.bgPrimary, padding:"2rem 1.5rem" }}>
      <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ width:"100%", maxWidth:440, background: colors.bgCard, borderRadius: radius?.xl, padding:"2.5rem", boxShadow: shadows?.xl, border:`1px solid ${colors.borderLight}` }}>

        <Link to="/" style={{ display:"block", textAlign:"center", fontFamily: typography.fontDisplay, fontSize: typography["3xl"], color: colors.textPrimary, textDecoration:"none", letterSpacing:"0.06em", marginBottom:"0.5rem" }}>
          BLÜM
        </Link>
        <h2 style={{ fontFamily: typography.fontDisplay, textAlign:"center", color: colors.textPrimary, fontStyle:"italic", marginBottom:"0.375rem", fontSize: typography["2xl"] }}>Create an account</h2>
        <p style={{ fontFamily: typography.fontBody, textAlign:"center", color: colors.textMuted, fontSize: typography.sm, marginBottom:"2rem" }}>Join thousands of happy customers</p>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {fields.map(({ id, label, icon, type, value, set, placeholder }) => {
            const isPassword = id === "password" || id === "confirm";
            return (
              <div key={id}>
                <label style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, display:"block", marginBottom:5 }}>{label}</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color: colors.textMuted, pointerEvents:"none", display:"flex" }}>{icon}</span>
                  <input
                    type={isPassword ? (showPw ? "text" : "password") : type}
                    value={value} onChange={(e) => set(e.target.value)}
                    placeholder={placeholder}
                    style={{ ...inputStyle(errors[id]), paddingRight: isPassword ? "2.5rem" : "0.875rem" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = colors.borderFocus; e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accentLight}`; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = errors[id] ? colors.error : colors.borderLight; e.currentTarget.style.boxShadow="none"; }}
                  />
                  {id === "password" && (
                    <button type="button" onClick={() => setShowPw(p=>!p)}
                      style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color: colors.textMuted, display:"flex" }}>
                      {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  )}
                </div>
                {errors[id] && <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.error, marginTop:3 }}>{errors[id]}</p>}
              </div>
            );
          })}

          <motion.button type="submit" disabled={isLoading} whileHover={!isLoading?{scale:1.02}:{}} whileTap={!isLoading?{scale:0.97}:{}}
            style={{ width:"100%", padding:"0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border:"none", cursor: isLoading?"not-allowed":"pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, opacity: isLoading?0.7:1, marginTop:"0.25rem" }}>
            {isLoading ? "Creating account…" : "Create Account"}
          </motion.button>
        </form>

        <p style={{ textAlign:"center", marginTop:"1.5rem", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textMuted }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: colors.accentPrimary, fontWeight: typography.weightMedium, textDecoration:"none" }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Register.tsx
// The account creation page for the BLÜM storefront. Renders a centered card
// with a four-field registration form, client-side validation, a shared
// password visibility toggle across both password fields, and navigation to
// the home page on successful registration.
//
// ── What it renders ───────────────────────────────────────────────────────────
//
//  Full-viewport centered flex container (bgPrimary background)
//  └─ Animated card (motion.div, maxWidth 440, fades + slides up on mount)
//      ├─ BLÜM logo link → /
//      ├─ "Create an account" heading + "Join thousands of happy customers" sub
//      ├─ <form> — four fields rendered from the `fields` array
//      │   ├─ Full Name    (User icon)
//      │   ├─ Email        (Mail icon)
//      │   ├─ Password     (Lock icon + Eye/EyeOff toggle)
//      │   └─ Confirm Password (Lock icon, same showPw toggle)
//      │   └─ Submit button ("Create Account" / "Creating account…")
//      └─ "Already have an account? Sign in" → /login
//
// ── State ─────────────────────────────────────────────────────────────────────
//
//  name      — controlled value for the Full Name input
//  email     — controlled value for the Email input
//  password  — controlled value for the Password input
//  confirm   — controlled value for the Confirm Password input
//  showPw    — single boolean shared by BOTH password fields; toggling the
//              Eye button on the Password field reveals/hides both password
//              and confirm password inputs simultaneously
//  errors    — Record<string, string> keyed by field id; populated by
//              validate(), drives red border + inline error message per field
//
// ── fields array (data-driven form) ──────────────────────────────────────────
//
//  All four inputs are described as objects in the `fields` array:
//    { id, label, icon, type, value, set, placeholder }
//  The form maps over this array to render each field, eliminating repetitive
//  JSX. Each field's `set` function is the corresponding useState setter,
//  called directly in onChange: (e) => set(e.target.value).
//
//  isPassword flag (id === "password" || id === "confirm"):
//    • Switches input type to "text" or "password" based on showPw
//    • Adds paddingRight: "2.5rem" to leave room for the Eye button
//    • The Eye/EyeOff toggle button is only rendered when id === "password"
//      (not on "confirm") to avoid showing two toggle buttons, while both
//      inputs still respect the same showPw state.
//
// ── Validation ────────────────────────────────────────────────────────────────
//
//  validate() runs on submit before any API call:
//    name     — required (trimmed, so whitespace-only fails)
//    email    — required; must match /\S+@\S+\.\S+/
//    password — required; minimum 6 characters
//    confirm  — must strictly equal password (checked with !==)
//  Returns true only if the errors object is empty after all checks.
//  All four fields are validated in one pass; every failing field gets
//  its own error message simultaneously rather than stopping at the first.
//
// ── handleSubmit (async) ──────────────────────────────────────────────────────
//
//  1. Prevents default form submission
//  2. Runs validate(); returns early if any field is invalid
//  3. Calls register(name, email, password) from AuthContext
//     (confirm is not sent — it's a UI-only validation field)
//  4. On success: fires toast.success("Account created! Welcome to Blüm 🌿")
//     and navigates to "/" (home page)
//  5. On failure: catches the error and fires toast.error() with the thrown
//     message or a generic "Registration failed" fallback
//
// ── Comparison with Login.tsx ─────────────────────────────────────────────────
//
//  Register follows the same structural patterns as Login:
//    • Same inputStyle(hasError?) function for border + focus ring styling
//    • Same onFocus/onBlur imperative style mutation pattern
//    • Same motion.button disabled state (opacity, cursor, empty whileHover/Tap)
//    • Same card mount animation (opacity 0 + y 24 → opacity 1 + y 0, 500 ms)
//  Key differences:
//    • Four fields instead of two (uses a fields array to avoid repetition)
//    • No redirect-back logic (no `from` — always navigates to "/" on success)
//    • A confirm password field with cross-field equality validation
//    • Single showPw toggle controls both password fields
//    • useAuth().register() instead of useAuth().login()
//
// ── Submit button disabled state ─────────────────────────────────────────────
//
//  When isLoading is true (AuthContext call in flight):
//    • native disabled attribute blocks clicks
//    • cursor becomes "not-allowed"
//    • opacity drops to 0.7
//    • whileHover and whileTap receive empty objects (no scale animation)
//    • label changes to "Creating account…"
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom  — Link (logo + sign-in link), useNavigate (post-register)
//  framer-motion     — motion.div (card mount), motion.button (submit)
//  lucide-react      — User, Mail, Lock (input icons), Eye, EyeOff (pw toggle)
//  useTheme()        — colors, typography, radius, shadows, transitions tokens
//  useAuth()         — register() function + isLoading boolean from AuthContext
//  useToast()        — success / error toast notifications