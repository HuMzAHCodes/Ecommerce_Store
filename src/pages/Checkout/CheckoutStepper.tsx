import { Check, ChevronRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { STEPS, type Step } from "./types";

interface CheckoutStepperProps {
  currentStep: Step;
}

/**
 * Horizontal stepper showing Shipping → Payment → Review.
 * Completed steps show a green check; active step is accent-colored.
 */
const CheckoutStepper = ({ currentStep }: CheckoutStepperProps) => {
  const { colors, typography, radius, transitions } = useTheme();
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
      {STEPS.map(({ id, label }, i) => {
        const isDone   = i < currentIndex;
        const isActive = id === currentStep;

        return (
          <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

              {/* Step circle — green check when done, accent when active, grey otherwise */}
              <div
                style={{
                  width:           24,
                  height:          24,
                  borderRadius:    radius?.full,
                  background:      isDone ? colors.success : isActive ? colors.accentPrimary : colors.borderMedium,
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  transition:      `background ${transitions?.normal}`,
                }}
              >
                {isDone ? (
                  <Check size={12} color="#fff" />
                ) : (
                  <span style={{ fontFamily: typography.fontBody, fontSize: "0.65rem", fontWeight: typography.weightBold, color: "#fff" }}>
                    {i + 1}
                  </span>
                )}
              </div>

              {/* Step label */}
              <span
                style={{
                  fontFamily: typography.fontBody,
                  fontSize:   typography.sm,
                  fontWeight: isActive ? typography.weightMedium : typography.weightRegular,
                  color:      isActive ? colors.textPrimary : colors.textMuted,
                }}
              >
                {label}
              </span>
            </div>

            {/* Separator arrow between steps */}
            {i < STEPS.length - 1 && <ChevronRight size={12} color={colors.textMuted} />}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutStepper;
