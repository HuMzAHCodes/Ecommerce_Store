import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";

interface EmptyStateProps {
  icon:      ReactNode;
  title:     string;
  linkTo:    string;
  linkLabel: string;
}

/**
 * Generic empty state — used in Orders and Wishlist tabs
 * when the user has no data to show yet.
 */
const EmptyState = ({ icon, title, linkTo, linkLabel }: EmptyStateProps) => {
  const { colors, typography } = useTheme();

  return (
    <div style={{ textAlign: "center", padding: "3rem 0" }}>
      <div style={{ color: colors.borderMedium, margin: "0 auto 1rem", display: "flex", justifyContent: "center" }}>
        {icon}
      </div>
      <p style={{ fontFamily: typography.fontBody, fontSize: typography.base, color: colors.textPrimary, marginBottom: "0.5rem" }}>
        {title}
      </p>
      <Link to={linkTo} style={{ color: colors.accentPrimary, fontFamily: typography.fontBody, fontSize: typography.sm }}>
        {linkLabel} →
      </Link>
    </div>
  );
};

export default EmptyState;
