// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { useTheme } from "../../theme/ThemeContext";
// import ScrollReveal from "../../components/ui/ScrollReveal";
// import { CATEGORIES } from "./constants";

// /**
//  * Responsive grid of category cards.
//  * Premium cosmetics-style category section.
//  */
// const HomeCategories = () => {
//   const { colors, typography, radius, shadows, transitions } = useTheme();

//   return (
//     <section
//       style={{
//         maxWidth: 1280,
//         margin: "0 auto",
//         padding: "5rem 1.5rem",
//       }}
//     >
//       {/* Section Heading */}
//       <ScrollReveal
//         style={{
//           textAlign: "center",
//           marginBottom: "3.5rem",
//         }}
//       >
//         <h2
//           style={{
//             fontFamily: typography.fontDisplay,
//             color: colors.textPrimary,
//             fontStyle: "italic",
//             marginBottom: "0.75rem",
//           }}
//         >
//           Shop by Category
//         </h2>

//         <p
//           style={{
//             fontFamily: typography.fontBody,
//             color: colors.textMuted,
//             fontSize: typography.base,
//           }}
//         >
//           Find exactly what your skin needs
//         </p>
//       </ScrollReveal>

//       {/* Category Grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//           gap: "1.5rem",
//         }}
//       >
//         {CATEGORIES.map((cat) => (
//           <ScrollReveal key={cat.label} y={36}>
//             <Link
//               to={cat.href}
//               style={{
//                 textDecoration: "none",
//                 display: "block",
//               }}
//             >
//               <motion.div
//                 whileHover={{
//                   y: -8,
//                   boxShadow: shadows?.lg,
//                 }}
//                 transition={{ duration: 0.25 }}
//                 style={{
//                   background: colors.bgSecondary,
//                   borderRadius: radius?.xl,
//                   padding: "2rem 1.5rem",
//                   textAlign: "center",
//                   border: `1px solid ${colors.borderLight}`,
//                   cursor: "pointer",
//                   boxShadow: shadows?.sm,
//                   transition: `all ${transitions?.normal}`,
//                   minHeight: "340px",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//                 onMouseEnter={(e) => {
//                   (e.currentTarget as HTMLDivElement).style.borderColor =
//                     colors.accentPrimary;
//                 }}
//                 onMouseLeave={(e) => {
//                   (e.currentTarget as HTMLDivElement).style.borderColor =
//                     colors.borderLight;
//                 }}
//               >
//                 {/* Category Image */}
//                 <div
//                   style={{
//                     width: "160px",
//                     height: "160px",
//                     borderRadius: "20px",
//                     overflow: "hidden",
//                     marginBottom: "1.5rem",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <img
//                     src={cat.image}
//                     alt={cat.label}
//                     loading="lazy"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       display: "block",
//                     }}
//                   />
//                 </div>

//                 {/* Category Title */}
//                 <div
//                   style={{
//                     fontFamily: typography.fontDisplay,
//                     fontSize: typography.xl,
//                     color: colors.textPrimary,
//                     marginBottom: "0.5rem",
//                   }}
//                 >
//                   {cat.label}
//                 </div>

//                 {/* Category Description */}
//                 <div
//                   style={{
//                     fontFamily: typography.fontBody,
//                     fontSize: typography.sm,
//                     color: colors.textMuted,
//                     lineHeight: 1.6,
//                   }}
//                 >
//                   {cat.desc}
//                 </div>
//               </motion.div>
//             </Link>
//           </ScrollReveal>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HomeCategories;



import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";
import ScrollReveal from "../../components/ui/ScrollReveal";
import { CATEGORIES } from "./constants";

/**
 * Responsive grid of category cards.
 * Premium cosmetics-style category section.
 *
 * CHANGED: Section background is now colors.bgTertiary (#5A4432) — the lightest
 * brown in the Twilight Sand palette. This is the KEY visual rhythm fix:
 * it creates a clear 3rd tone so the page doesn't just alternate between
 * two near-identical dark browns all the way down.
 */
const HomeCategories = () => {
  const { colors, typography, radius, shadows, transitions } = useTheme();

  return (
    // CHANGED: wrapped in a full-width section with bgTertiary background
    <section style={{ background: colors.bgTertiary }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "5rem 1.5rem",
        }}
      >
        {/* Section Heading */}
        <ScrollReveal
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: typography.fontDisplay,
              color: colors.textPrimary,
              fontStyle: "italic",
              marginBottom: "0.75rem",
            }}
          >
            Shop by Category
          </h2>

          <p
            style={{
              fontFamily: typography.fontBody,
              color: colors.textMuted,
              fontSize: typography.base,
            }}
          >
            Find exactly what your skin needs
          </p>
        </ScrollReveal>

        {/* Category Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {CATEGORIES.map((cat) => (
            <ScrollReveal key={cat.label} y={36}>
              <Link
                to={cat.href}
                style={{
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    boxShadow: shadows?.lg,
                  }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: colors.bgSecondary,
                    borderRadius: radius?.xl,
                    padding: "2rem 1.5rem",
                    textAlign: "center",
                    // CHANGED: bumped border opacity from 10% to 20% so cards
                    // are clearly visible against the lighter bgTertiary section bg
                    border: `1px solid ${colors.borderMedium}`,
                    cursor: "pointer",
                    boxShadow: shadows?.sm,
                    transition: `all ${transitions?.normal}`,
                    minHeight: "340px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      colors.accentPrimary;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      colors.borderMedium;
                  }}
                >
                  {/* Category Image */}
                  <div
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "20px",
                      overflow: "hidden",
                      marginBottom: "1.5rem",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Category Title */}
                  <div
                    style={{
                      fontFamily: typography.fontDisplay,
                      fontSize: typography.xl,
                      color: colors.textPrimary,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {cat.label}
                  </div>

                  {/* Category Description */}
                  <div
                    style={{
                      fontFamily: typography.fontBody,
                      fontSize: typography.sm,
                      color: colors.textMuted,
                      lineHeight: 1.6,
                    }}
                  >
                    {cat.desc}
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
