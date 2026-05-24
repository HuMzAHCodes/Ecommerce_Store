import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { useTheme } from "../../theme/ThemeContext";

// ── Types ─────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:      string;
  error?:      string;
  hint?:       string;
  leftIcon?:   ReactNode;
  rightIcon?:  ReactNode;
  fullWidth?:  boolean;
}

// ── Component ─────────────────────────────────────────────────

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, fullWidth = true, style, ...rest }, ref) => {
    const theme = useTheme();
    const { colors, radius, transitions, typography } = theme;
    const [focused, setFocused] = useState(false);

    const borderColor = error
      ? colors.error
      : focused
      ? colors.borderFocus
      : colors.borderLight;

    const boxShadow = error
      ? `0 0 0 3px ${colors.errorBg}`
      : focused
      ? `0 0 0 3px ${colors.accentLight}`
      : "none";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: fullWidth ? "100%" : "auto" }}>

        {/* Label */}
        {label && (
          <label
            style={{
              fontSize:   typography.sm,
              fontWeight: typography.weightMedium,
              color:      error ? colors.error : colors.textPrimary,
              fontFamily: typography.fontBody,
            }}
          >
            {label}
            {rest.required && (
              <span style={{ color: colors.accentPrimary, marginLeft: 3 }}>*</span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>

          {/* Left icon */}
          {leftIcon && (
            <span style={{
              position: "absolute", left: 12,
              color: focused ? colors.accentPrimary : colors.textMuted,
              display: "flex", alignItems: "center",
              transition: `color ${transitions?.fast}`,
              pointerEvents: "none",
            }}>
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            onFocus={(e) => { setFocused(true);  rest.onFocus?.(e); }}
            onBlur={(e)  => { setFocused(false); rest.onBlur?.(e);  }}
            style={{
              width:          "100%",
              fontFamily:     typography.fontBody,
              fontSize:       typography.base,
              color:          colors.textPrimary,
              background:     colors.bgCard,
              border:         `1px solid ${borderColor}`,
              borderRadius:   radius?.md,
              padding:        `0.6rem ${rightIcon ? "2.75rem" : "0.875rem"} 0.6rem ${leftIcon ? "2.75rem" : "0.875rem"}`,
              outline:        "none",
              transition:     `border-color ${transitions?.fast}, box-shadow ${transitions?.fast}`,
              boxShadow,
              ...style,
            }}
            {...rest}
          />

          {/* Right icon */}
          {rightIcon && (
            <span style={{
              position: "absolute", right: 12,
              color: colors.textMuted,
              display: "flex", alignItems: "center",
            }}>
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <span style={{ fontSize: typography.xs, color: colors.error, fontFamily: typography.fontBody }}>
            {error}
          </span>
        )}

        {/* Hint text */}
        {!error && hint && (
          <span style={{ fontSize: typography.xs, color: colors.textMuted, fontFamily: typography.fontBody }}>
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Input.tsx
// A theme-aware, accessible text input component with built-in support for
// labels, validation errors, hint text, and leading/trailing icon slots.
// All styling is inline and driven by ThemeContext — no external CSS needed.
//
// ── What it renders ───────────────────────────────────────────────────────────
//
// A vertical flex column with up to four stacked elements:
//
//   [label]           — optional, shown above the field
//   [input wrapper]   — relative-positioned row containing:
//       [leftIcon]    — optional, absolutely positioned at left: 12
//       [<input>]     — the actual native input element
//       [rightIcon]   — optional, absolutely positioned at right: 12
//   [error message]   — shown below when `error` prop is set
//   [hint text]       — shown below when `hint` is set AND there is no error
//                       (error always takes priority over hint)
//
// ── Props ─────────────────────────────────────────────────────────────────────
//
//  label      — text rendered in a <label> above the input; turns red on error
//  error      — validation message shown below the field in error color;
//               also shifts border and ring to error styles
//  hint       — helper text shown below the field in muted color;
//               suppressed whenever `error` is present
//  leftIcon   — node placed inside the input on the left (e.g. search icon);
//               automatically shifts input padding-left to 2.75rem to avoid overlap
//  rightIcon  — node placed inside the input on the right (e.g. eye toggle);
//               automatically shifts input padding-right to 2.75rem
//  fullWidth  — stretches the outer wrapper to 100% width (default: true)
//  style      — inline-style overrides forwarded directly to the <input> element
//  ...rest    — all native <input> HTML attributes are spread onto the element
//               (type, placeholder, value, onChange, required, disabled, etc.)
//
// ── Focus state (local state) ─────────────────────────────────────────────────
//
//  `focused` is a boolean useState that is set true on input's onFocus and
//  false on onBlur. It drives two visual changes:
//    • leftIcon color transitions from textMuted → accentPrimary
//    • border / ring transition from borderLight → borderFocus + accentLight ring
//  Both the caller's onFocus/onBlur handlers are preserved via optional chaining
//  (rest.onFocus?.(e) / rest.onBlur?.(e)) so internal state never swallows events.
//
// ── Border & ring (boxShadow) priority ───────────────────────────────────────
//
//  error state  →  colors.error border  +  errorBg ring   (highest priority)
//  focused      →  colors.borderFocus   +  accentLight ring
//  default      →  colors.borderLight   +  no ring
//
//  Both borderColor and boxShadow are derived outside the JSX as plain
//  variables so the logic is easy to read and modify independently.
//
// ── Padding adaptation for icons ─────────────────────────────────────────────
//
//  Padding is computed inline inside the style prop:
//    padding-left  = leftIcon  ? "2.75rem" : "0.875rem"
//    padding-right = rightIcon ? "2.75rem" : "0.875rem"
//  This ensures the user's text never slides under an absolutely-positioned icon.
//
// ── Required indicator ────────────────────────────────────────────────────────
//
//  When rest.required is truthy, a small accentPrimary asterisk (*) is appended
//  inside the <label> — purely visual, the native required validation still
//  comes from the spread ...rest on the <input>.
//
// ── forwardRef ────────────────────────────────────────────────────────────────
//
//  Wrapped in forwardRef so parent components and form libraries (e.g. React
//  Hook Form) can attach a ref to the underlying <input> DOM node directly
//  for focus management, value reading, or imperative control.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  useTheme()  — pulls colors, radius, transitions, and typography tokens
//                from ThemeContext; makes the component fully portable and
//                SSR-safe with zero reliance on global CSS or class names.