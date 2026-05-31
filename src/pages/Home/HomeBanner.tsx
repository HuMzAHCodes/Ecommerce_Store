// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { useTheme } from "../../theme/ThemeContext";
// import { useIsMobile } from "../../hooks/useMediaQuery";
// import ScrollReveal from "../../components/ui/ScrollReveal";

// /**
//  * Full-width promotional banner with a discount offer and sign-up CTA.
//  * Scroll-reveals as a unit on entry.
//  */
// const HomeBanner = () => {
//   const { colors, typography, radius, shadows } = useTheme();
//   const isMobile = useIsMobile();

//   return (
//     <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>
//       <ScrollReveal y={32}>
//         <div
//           style={{
//             background:      `linear-gradient(135deg, ${colors.accentLight} 0%, ${colors.bgSecondary} 60%, ${colors.accentSecondary}22 100%)`,
//             borderRadius:    radius?.xl,
//             padding:         isMobile ? "2.5rem 1.5rem" : "4rem 3rem",
//             display:         "flex",
//             alignItems:      "center",
//             justifyContent:  "space-between",
//             flexWrap:        "wrap",
//             gap:             "2rem",
//             border:          `1px solid ${colors.borderLight}`,
//           }}
//         >
//           {/* Copy */}
//           <div>
//             <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.accentPrimary, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
//               Limited Time Offer
//             </p>
//             <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "0.75rem" }}>
//               20% off your first order
//             </h2>
//             <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, fontSize: typography.base, maxWidth: 400 }}>
//               Sign up to our newsletter and get 20% off your first purchase. No strings attached.
//             </p>
//           </div>

//           {/* CTA */}
//           <Link to="/register">
//             <motion.span
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.97 }}
//               style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding: "0.875rem 2rem", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, cursor: "pointer", boxShadow: shadows?.md, whiteSpace: "nowrap" }}
//             >
//               Claim Discount <ArrowRight size={17} />
//             </motion.span>
//           </Link>
//         </div>
//       </ScrollReveal>
//     </section>
//   );
// };

// export default HomeBanner;



import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import ScrollReveal from "../../components/ui/ScrollReveal";

/**
 * Full-width promotional banner with a discount offer and sign-up CTA.
 * Scroll-reveals as a unit on entry.
 *
 * CHANGED: outer <section> now has background: colors.bgSecondary (#4A3828).
 * This gives the gradient inner card a proper "stage" to sit on — instead of
 * the card floating on whatever the page default renders beneath it.
 * The section bg also signals a visual transition from the dark Featured section.
 */
const HomeBanner = () => {
  const { colors, typography, radius, shadows } = useTheme();
  const isMobile = useIsMobile();

  return (
    // CHANGED: full-width bgSecondary wrapper added
    <section style={{ background: colors.bgSecondary }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <ScrollReveal y={32}>
          <div
            style={{
              background:      `linear-gradient(135deg, ${colors.accentLight} 0%, ${colors.bgSecondary} 60%, ${colors.accentSecondary}22 100%)`,
              borderRadius:    radius?.xl,
              padding:         isMobile ? "2.5rem 1.5rem" : "4rem 3rem",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "space-between",
              flexWrap:        "wrap",
              gap:             "2rem",
              border:          `1px solid ${colors.borderMedium}`,
            }}
          >
            {/* Copy */}
            <div>
              <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.accentPrimary, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Limited Time Offer
              </p>
              <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontStyle: "italic", marginBottom: "0.75rem" }}>
                20% off your first order
              </h2>
              <p style={{ fontFamily: typography.fontBody, color: colors.textSecondary, fontSize: typography.base, maxWidth: 400 }}>
                Sign up to our newsletter and get 20% off your first purchase. No strings attached.
              </p>
            </div>

            {/* CTA */}
            <Link to="/register">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accentPrimary, color: colors.textOnAccent, borderRadius: radius?.full, padding: "0.875rem 2rem", fontFamily: typography.fontBody, fontSize: typography.base, fontWeight: typography.weightMedium, cursor: "pointer", boxShadow: shadows?.md, whiteSpace: "nowrap" }}
              >
                Claim Discount <ArrowRight size={17} />
              </motion.span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HomeBanner;
