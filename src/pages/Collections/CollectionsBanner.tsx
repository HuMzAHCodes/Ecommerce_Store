import { motion }   from "framer-motion";
import { Link }     from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import {
  bannerStyles,       bannerEmojiStyles,
  bannerTitleStyles,  bannerDescriptionStyles,
  tabRowStyles,       tabLinkStyles,
} from "./collectionsStyles";
import { COLLECTION_META, COLLECTION_TABS, type CollectionMeta } from "./collectionsData";

interface CollectionsBannerProps {
  activeTab: string;
  meta:      CollectionMeta;
}

const CollectionsBanner = ({ activeTab, meta }: CollectionsBannerProps) => {
  const { colors, typography, radius, transitions } = useTheme();
  const isMobile = useIsMobile();

  return (
    <motion.section
      key={activeTab}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={bannerStyles(meta.banner, colors, isMobile)}
    >
      {/* Emoji */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1,   opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={bannerEmojiStyles(isMobile)}
      >
        {meta.emoji}
      </motion.div>

      <p className="overline" style={{ marginBottom: "0.75rem" }}>Collection</p>

      <h1 style={bannerTitleStyles(typography, colors)}>{meta.label}</h1>

      <p style={bannerDescriptionStyles(typography, colors, isMobile)}>
        {meta.description}
      </p>

      {/* Tab switcher */}
      <div style={tabRowStyles}>
        {COLLECTION_TABS.map((tab) => (
          <Link
            key={tab}
            to={`/collections/${tab}`}
            style={tabLinkStyles(typography, colors, transitions, radius, activeTab === tab)}
          >
            {COLLECTION_META[tab].label}
          </Link>
        ))}
      </div>
    </motion.section>
  );
};

export default CollectionsBanner;