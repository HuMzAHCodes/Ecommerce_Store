import { useTheme }    from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import {
  headerBandStyles, headerInnerStyles,
  headerTitleStyles, headerCountStyles,
} from "./wishlistStyles";

interface WishlistHeaderProps {
  itemCount: number;
}

const WishlistHeader = ({ itemCount }: WishlistHeaderProps) => {
  const { colors, typography } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div style={headerBandStyles(colors, isMobile)}>
      <div style={headerInnerStyles}>
        <h1 style={headerTitleStyles(typography, colors)}>Wishlist</h1>
        <p style={headerCountStyles(typography, colors)}>{itemCount} saved items</p>
      </div>
    </div>
  );
};

export default WishlistHeader;