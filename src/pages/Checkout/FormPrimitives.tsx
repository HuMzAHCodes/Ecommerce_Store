import type { ReactNode, CSSProperties } from "react";
import { useTheme } from "../../theme/ThemeContext";

/** Field label — consistent typography across all form fields */
export const FieldLabel = ({ children }: { children: ReactNode }) => {
  const { typography, colors } = useTheme();
  return (
    <label
      style={{
        fontFamily:   typography.fontBody,
        fontSize:     typography.xs,
        fontWeight:   typography.weightMedium,
        color:        colors.textPrimary,
        display:      "block",
        marginBottom: 4,
      }}
    >
      {children}
    </label>
  );
};

/** Inline validation error message shown below a field */
export const FieldError = ({ message }: { message?: string }) => {
  const { typography, colors } = useTheme();
  if (!message) return null;
  return (
    <p style={{ fontFamily: typography.fontBody, fontSize: "0.68rem", color: colors.error, marginTop: 3 }}>
      {message}
    </p>
  );
};

/**
 * Returns base input styles, with error border if a message is provided.
 * Used inline on every <input> across shipping and payment forms.
 */
export const useInputStyle = () => {
  const { colors, typography, radius, transitions } = useTheme();

  return (errorMessage?: string): CSSProperties => ({
    width:        "100%",
    padding:      "0.65rem 0.875rem",
    border:       `1.5px solid ${errorMessage ? colors.error : colors.borderLight}`,
    borderRadius: radius?.md,
    fontFamily:   typography.fontBody,
    fontSize:     typography.sm,
    color:        colors.textPrimary,
    background:   colors.bgPrimary,
    outline:      "none",
    transition:   `border-color ${transitions?.fast}`,
  });
};

/**
 * Returns focus and blur handlers that apply highlight styles to an input.
 * Keeps inline event logic out of form components.
 */
export const useInputFocusHandlers = (errorMessage?: string) => {
  const { colors } = useTheme();

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = colors.borderFocus;
    e.currentTarget.style.boxShadow   = `0 0 0 3px ${colors.accentLight}`;
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = errorMessage ? colors.error : colors.borderLight;
    e.currentTarget.style.boxShadow   = "none";
  };

  return { onFocus, onBlur };
};
