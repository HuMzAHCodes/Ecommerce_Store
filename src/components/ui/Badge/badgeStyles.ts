import type { CSSProperties } from "react";
import type { Theme }         from "../../../theme/themes";

type Colors  = Theme["colors"];
type BadgeVariant = "sale" | "new" | "soldOut" | "featured" | "info" | "success" | "warning" | "error";
type BadgeSize    = "sm" | "md";

export type { BadgeVariant, BadgeSize };

export const badgeVariantStyles = (colors: Colors): Record<BadgeVariant, CSSProperties> => ({
  sale:     { background: colors.accentPrimary,   color: colors.textOnAccent  },
  new:      { background: colors.accentSecondary, color: colors.textOnAccent  },
  soldOut:  { background: colors.textMuted,       color: "#fff"               },
  featured: { background: colors.textPrimary,     color: colors.textOnDark    },
  info:     { background: colors.accentLight,     color: colors.accentPrimary },
  success:  { background: colors.successBg,       color: colors.success       },
  warning:  { background: colors.warningBg,       color: colors.warning       },
  error:    { background: colors.errorBg,         color: colors.error         },
});

export const badgeSizeStyles: Record<BadgeSize, CSSProperties> = {
  sm: { fontSize: "0.65rem", padding: "2px 7px"  },
  md: { fontSize: "0.72rem", padding: "3px 10px" },
};

export const badgeBaseStyles = (theme: Theme): CSSProperties => ({
  display:       "inline-flex",
  alignItems:    "center",
  borderRadius:  theme.radius?.full,
  fontFamily:    theme.typography.fontBody,
  fontWeight:    theme.typography.weightMedium,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  whiteSpace:    "nowrap",
  lineHeight:    1,
});