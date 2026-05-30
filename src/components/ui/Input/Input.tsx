import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { useTheme }      from "../../../theme/ThemeContext";
import useInputFocus     from "./useInputFocus";
import {
  inputWrapperStyles, labelStyles,      requiredAsteriskStyles,
  inputRowStyles,     leftIconStyles,   rightIconStyles,
  inputFieldStyles,   helperTextStyles,
} from "./inputStyles";

// ── Types ─────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:     string;
  error?:     string;
  hint?:      string;
  leftIcon?:  ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// ── Component ─────────────────────────────────────────────────

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, fullWidth = true, style, ...rest }, ref) => {
    const { colors, radius, transitions, typography } = useTheme();

    const { isFocused, borderColor, boxShadow, handleFocus, handleBlur } = useInputFocus(
      colors,
      !!error,
      rest.onFocus,
      rest.onBlur,
    );

    const hasError = !!error;

    return (
      <div style={inputWrapperStyles(fullWidth ?? true)}>

        {/* Label */}
        {label && (
          <label style={labelStyles(typography, colors, hasError)}>
            {label}
            {rest.required && <span style={requiredAsteriskStyles(colors)}>*</span>}
          </label>
        )}

        {/* Input row */}
        <div style={inputRowStyles}>
          {leftIcon  && <span style={leftIconStyles(colors, transitions, isFocused)}>{leftIcon}</span>}

          <input
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              ...inputFieldStyles(
                typography, colors, radius, transitions,
                borderColor, boxShadow,
                !!leftIcon, !!rightIcon,
              ),
              ...style,
            }}
            {...rest}
          />

          {rightIcon && <span style={rightIconStyles(colors)}>{rightIcon}</span>}
        </div>

        {/* Error or hint */}
        {hasError && (
          <span style={helperTextStyles(typography, colors.error)}>{error}</span>
        )}
        {!hasError && hint && (
          <span style={helperTextStyles(typography, colors.textMuted)}>{hint}</span>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

/*
 * ── Input — What this folder does ───────────────────────────────────────────
 *
 * A theme-aware text input with label, error, hint, and icon slot support.
 *
 * Slots:   [leftIcon]  [<input>]  [rightIcon]
 * Below:   error message (priority) | hint text (fallback)
 *
 * Focus logic (useInputFocus.ts):
 *   Tracks isFocused, derives borderColor and boxShadow based on
 *   error > focused > default priority. Preserves caller onFocus/onBlur.
 *
 * Padding adapts automatically:
 *   leftIcon  present → padding-left  2.75rem (text clears the icon)
 *   rightIcon present → padding-right 2.75rem
 *
 * Files in this folder:
 *   useInputFocus.ts  — focus state, border color, box shadow derivation
 *   inputStyles.ts    — all CSSProperties factories
 *   Input.tsx         — forwardRef component; assembles styles + slots
 */