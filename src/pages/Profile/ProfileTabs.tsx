import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Package, Heart } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import EmptyState from "./EmptyState";

interface AccountTabProps {
  userName:  string;
  userEmail: string;
}

/** Account tab — shows name, email, and edit profile button */
export const AccountTab = ({ userName, userEmail }: AccountTabProps) => {
  const { colors, typography, radius } = useTheme();
  const navigate = useNavigate();

  const fields = [
    { label: "Full Name", value: userName  },
    { label: "Email",     value: userEmail },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "1.5rem" }}>
        Account Details
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 420 }}>
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, fontWeight: typography.weightBold, color: colors.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
              {label}
            </p>
            <p style={{ fontFamily: typography.fontBody, fontSize: typography.base, color: colors.textPrimary, padding: "0.65rem 0.875rem", background: colors.bgSecondary, borderRadius: radius?.md, margin: 0 }}>
              {value}
            </p>
          </div>
        ))}

        <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted, marginTop: "0.25rem" }}>
          To update your name or email, use the Clerk account portal.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/account/profile")}
          style={{ alignSelf: "flex-start", padding: "0.7rem 1.5rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border: "none", cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium }}
        >
          Edit Profile
        </motion.button>
      </div>
    </div>
  );
};

/** Orders tab — empty state until order history is implemented */
export const OrdersTab = () => {
  const { colors, typography } = useTheme();
  return (
    <div>
      <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "1.5rem" }}>
        My Orders
      </h2>
      <EmptyState icon={<Package size={44} />} title="No orders yet" linkTo="/shop" linkLabel="Start shopping" />
    </div>
  );
};

/** Wishlist tab — empty state until wishlist is implemented */
export const WishlistTab = () => {
  const { colors, typography } = useTheme();
  return (
    <div>
      <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "1.5rem" }}>
        Wishlist
      </h2>
      <EmptyState icon={<Heart size={44} />} title="Nothing saved yet" linkTo="/wishlist" linkLabel="View Wishlist" />
    </div>
  );
};

/** Security tab — OAuth info and link to Clerk security settings */
export const SecurityTab = () => {
  const { colors, typography, radius } = useTheme();
  const navigate = useNavigate();

  return (
    <div>
      <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "0.75rem" }}>
        Security
      </h2>
      <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary, marginBottom: "1.5rem", lineHeight: 1.7 }}>
        Your account is secured via Google OAuth through Clerk. Password management is handled by your Google account.
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/account/profile")}
        style={{ padding: "0.7rem 1.5rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border: "none", cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium }}
      >
        Manage Security Settings
      </motion.button>
    </div>
  );
};
