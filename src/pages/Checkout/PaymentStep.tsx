import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { FieldLabel, FieldError, useInputStyle, useInputFocusHandlers } from "./FormPrimitives";
import type { PaymentForm } from "./types";
import type { FormErrors } from "./validation";

interface PaymentStepProps {
  payment:  PaymentForm;
  errors:   FormErrors;
  onChange: (field: keyof PaymentForm, value: string) => void;
  onNext:   () => void;
  onBack:   () => void;
}

type FieldConfig = {
  field:     keyof PaymentForm;
  label:     string;
  maxLength?: number;
};

const FIELD_CONFIG: FieldConfig[] = [
  { field: "cardName",   label: "Name on Card"    },
  { field: "cardNumber", label: "Card Number", maxLength: 19 },
  { field: "expiry",     label: "Expiry (MM/YY)"  },
  { field: "cvv",        label: "CVV",         maxLength: 4  },
];

/**
 * Step 2 — collects card name, number, expiry, and CVV.
 * Animates in from the right, exits to the left.
 */
const PaymentStep = ({ payment, errors, onChange, onNext, onBack }: PaymentStepProps) => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile   = useIsMobile();
  const inputStyle = useInputStyle();

  return (
    <motion.div
      key="payment"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.28 }}
      style={{ background: colors.bgCard, borderRadius: radius?.xl, padding: isMobile ? "1.25rem" : "2rem", border: `1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}
    >
      <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "1.5rem" }}>
        Payment
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {FIELD_CONFIG.map(({ field, label, maxLength }) => {
          const focusHandlers = useInputFocusHandlers(errors[field]);
          return (
            <div key={field}>
              <FieldLabel>{label}</FieldLabel>
              <input
                type="text"
                value={payment[field]}
                onChange={(e) => onChange(field, e.target.value)}
                style={inputStyle(errors[field])}
                maxLength={maxLength}
                {...focusHandlers}
              />
              <FieldError message={errors[field]} />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
        <button
          onClick={onBack}
          style={{ flex: 1, padding: "0.875rem", borderRadius: radius?.full, border: `1.5px solid ${colors.borderLight}`, background: "transparent", cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.sm, color: colors.textSecondary }}
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          style={{ flex: 2, padding: "0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border: "none", cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium }}
        >
          Review Order
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PaymentStep;
