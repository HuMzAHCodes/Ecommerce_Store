import { motion }      from "framer-motion";
import { Link }        from "react-router-dom";
import { useTheme }    from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import {
  tabRowStyles, tabLinkStyles,
} from "./collectionsStyles";
import { COLLECTION_META, COLLECTION_TABS, type CollectionMeta } from "./collectionsData";

interface CollectionsBannerProps {
  activeTab: string;
  meta:      CollectionMeta;
}

/**
 * CollectionsBanner
 *
 * CHANGED: replaced emoji + flat background with a full-width hero image.
 * Text (overline, title, description, tabs) is overlaid on top of the image
 * using a dark gradient from bottom so text is always readable regardless
 * of image brightness.
 *
 * Layout:
 *   [ full-width image ]
 *   [ dark gradient overlay from bottom 60% ]
 *   [ text content anchored to bottom-center ]
 *   [ tab switcher at the very bottom ]
 */
const CollectionsBanner = ({ activeTab, meta }: CollectionsBannerProps) => {
  const { colors, typography, radius, transitions } = useTheme();
  const isMobile = useIsMobile();

  return (
    <motion.section
      key={activeTab}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position:   "relative",
        width:      "100%",
        height:     isMobile ? "420px" : "520px",
        overflow:   "hidden",
        display:    "flex",
        flexDirection: "column",
        justifyContent: "flex-end",  // content anchors to bottom
      }}
    >
      {/* ── Hero image ───────────────────────────────────────── */}
      <motion.img
        key={meta.image}
        src={meta.image}
        alt={meta.label}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position:   "absolute",
          inset:      0,
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          objectPosition: "center",
        }}
      />

      {/* ── Gradient overlay — dark at bottom, transparent at top ── */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)",
      }} />

      {/* ── Text content ─────────────────────────────────────── */}
      <div style={{
        position:  "relative",
        zIndex:    1,
        textAlign: "center",
        padding:   isMobile ? "0 1.25rem 1.5rem" : "0 2rem 2rem",
      }}>
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{
            fontFamily:    typography.fontBody,
            fontSize:      typography.xs,
            fontWeight:    600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.75)",
            marginBottom:  "0.5rem",
          }}
        >
          Collection
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.45, delay: 0.2 }}
          style={{
            fontFamily:   typography.fontDisplay,
            fontSize:     isMobile ? typography["3xl"] : typography["5xl"],
            fontWeight:   typography.weightBold,
            fontStyle:    "italic",
            color:        "#ffffff",
            lineHeight:   1.1,
            marginBottom: "0.75rem",
            textShadow:   "0 2px 12px rgba(0,0,0,0.3)",
          }}
        >
          {meta.label}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.4, delay: 0.25 }}
          style={{
            fontFamily: typography.fontBody,
            fontSize:   isMobile ? typography.sm : typography.base,
            color:      "rgba(255,255,255,0.82)",
            maxWidth:   520,
            margin:     "0 auto 1.75rem",
            lineHeight: 1.7,
          }}
        >
          {meta.description}
        </motion.p>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={tabRowStyles}
        >
          {COLLECTION_TABS.map((tab) => (
            <Link
              key={tab}
              to={`/collections/${tab}`}
              style={tabLinkStyles(typography, colors, transitions, radius, activeTab === tab)}
            >
              {COLLECTION_META[tab].label}
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CollectionsBanner;
