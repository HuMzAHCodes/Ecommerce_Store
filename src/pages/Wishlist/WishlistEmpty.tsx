import { motion }   from "framer-motion";
import { Link }     from "react-router-dom";
import { Heart }    from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import {
  emptyWrapperStyles,    emptyPrimaryTextStyles,
  emptySubTextStyles,    emptyShopButtonStyles,
} from "./wishlistStyles";

const WishlistEmpty = () => {
  const { colors, typography, radius } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={emptyWrapperStyles}
    >
      <Heart size={60} color={colors.borderMedium} style={{ margin: "0 auto 1rem" }} />

      <p style={emptyPrimaryTextStyles(typography, colors)}>Nothing saved yet</p>
      <p style={emptySubTextStyles(typography, colors)}>
        Heart items you love while browsing.
      </p>

      <Link to="/shop">
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={emptyShopButtonStyles(typography, colors, radius)}
        >
          Browse Shop
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default WishlistEmpty;