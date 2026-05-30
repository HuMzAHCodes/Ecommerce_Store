import { motion }   from "framer-motion";
import { Link }     from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { browseAllWrapperStyles, browseAllButtonStyles } from "./collectionsStyles";

const CollectionsBrowseAll = () => {
  const { colors, typography, radius } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={browseAllWrapperStyles}
    >
      <Link to="/shop">
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={browseAllButtonStyles(typography, colors, radius)}
        >
          Browse All Products <ArrowRight size={15} />
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default CollectionsBrowseAll;