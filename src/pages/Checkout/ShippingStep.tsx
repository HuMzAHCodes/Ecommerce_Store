import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { FieldLabel, FieldError, useInputStyle, useInputFocusHandlers } from "./FormPrimitives";
import type { ShippingForm } from "./types";
import type { FormErrors } from "./validation";

interface ShippingStepProps {
  shipping:    ShippingForm;
  errors:      FormErrors;
  onChange:    (field: keyof ShippingForm, value: string) => void;
  onNext:      () => void;
}

type FieldConfig = {
  field:  keyof ShippingForm;
  label:  string;
  isFullWidth: boolean;
};

const FIELD_CONFIG: FieldConfig[] = [
  { field: "firstName", label: "First Name",  isFullWidth: false },
  { field: "lastName",  label: "Last Name",   isFullWidth: false },
  { field: "email",     label: "Email",        isFullWidth: true  },
  { field: "phone",     label: "Phone",        isFullWidth: true  },
  { field: "address",   label: "Address",      isFullWidth: true  },
  { field: "city",      label: "City",         isFullWidth: false },
  { field: "state",     label: "State",        isFullWidth: false },
  { field: "zip",       label: "ZIP Code",     isFullWidth: false },
];

/**
 * Step 1 — collects name, email, phone, and delivery address.
 * Animates in from the right, exits to the left.
 */
const ShippingStep = ({ shipping, errors, onChange, onNext }: ShippingStepProps) => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile   = useIsMobile();
  const inputStyle = useInputStyle();

  return (
    <motion.div
      key="shipping"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.28 }}
      style={{ background: colors.bgCard, borderRadius: radius?.xl, padding: isMobile ? "1.25rem" : "2rem", border: `1px solid ${colors.borderLight}`, boxShadow: shadows?.sm }}
    >
      <h2 style={{ fontFamily: typography.fontDisplay, fontSize: typography["2xl"], color: colors.textPrimary, marginBottom: "1.5rem" }}>
        Shipping Details
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0.875rem" }}>
        {FIELD_CONFIG.map(({ field, label, isFullWidth }) => {
          const focusHandlers = useInputFocusHandlers(errors[field]);
          return (
            <div key={field} style={{ gridColumn: isFullWidth && !isMobile ? "1 / -1" : undefined }}>
              <FieldLabel>{label}</FieldLabel>
              <input
                value={shipping[field]}
                onChange={(e) => onChange(field, e.target.value)}
                style={inputStyle(errors[field])}
                {...focusHandlers}
              />
              <FieldError message={errors[field]} />
            </div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        style={{ marginTop: "1.5rem", width: "100%", padding: "0.875rem", borderRadius: radius?.full, background: colors.accentPrimary, color: colors.textOnAccent, border: "none", cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium }}
      >
        Continue to Payment
      </motion.button>
    </motion.div>
  );
};

export default ShippingStep;
