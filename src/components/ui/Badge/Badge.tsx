import type { ReactNode }   from "react";
import { useTheme }         from "../../../theme/ThemeContext";
import {
  badgeBaseStyles, badgeVariantStyles, badgeSizeStyles,
  type BadgeVariant, type BadgeSize,
} from "./badgeStyles";

// ── Types ─────────────────────────────────────────────────────

interface BadgeProps {
  variant?:  BadgeVariant;
  size?:     BadgeSize;
  children?: ReactNode;
  sale?:     boolean;
  new?:      boolean;
  soldOut?:  boolean;
}

// ── Helpers ───────────────────────────────────────────────────

const resolveVariant = (
  sale?:    boolean,
  isNew?:   boolean,
  soldOut?: boolean,
  variant:  BadgeVariant = "info",
): BadgeVariant =>
  sale    ? "sale"    :
  isNew   ? "new"     :
  soldOut ? "soldOut" : variant;

const resolveLabel = (
  children?: ReactNode,
  sale?:     boolean,
  isNew?:    boolean,
  soldOut?:  boolean,
): ReactNode =>
  children ??
  (sale    ? "Sale"     :
   isNew   ? "New"      :
   soldOut ? "Sold Out" : "");

// ── Component ─────────────────────────────────────────────────

const Badge = ({ variant = "info", size = "md", sale, new: isNew, soldOut, children }: BadgeProps) => {
  const theme = useTheme();

  const activeVariant = resolveVariant(sale, isNew, soldOut, variant);
  const activeLabel   = resolveLabel(children, sale, isNew, soldOut);

  return (
    <span
      style={{
        ...badgeBaseStyles(theme),
        ...badgeVariantStyles(theme.colors)[activeVariant],
        ...badgeSizeStyles[size],
      }}
    >
      {activeLabel}
    </span>
  );
};

export default Badge;

/*
 * ── Badge — What this folder does ───────────────────────────────────────────
 *
 * A small pill label for product and status states.
 *
 * Variants: sale | new | soldOut | featured | info | success | warning | error
 * Sizes:    sm | md
 *
 * Convenience props (sale, new, soldOut) auto-set both the variant and label
 * so callers don't need to pass children for the common product badge cases.
 * Children override the auto-label when provided.
 *
 * Files in this folder:
 *   badgeStyles.ts  — variant map, size map, base styles; all typed CSSProperties
 *   Badge.tsx       — resolves variant/label then applies the three style layers
 */