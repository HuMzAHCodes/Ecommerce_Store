import { useTheme }  from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import {
  headerBandStyles, headerInnerStyles,
  headerTitleStyles, headerCountStyles,
} from "./shopStyles";

interface ShopHeaderProps {
  productCount: number;
}

const ShopHeader = ({ productCount }: ShopHeaderProps) => {
  const { colors, typography } = useTheme();
  const isMobile = useIsMobile();

  return (
    <div style={headerBandStyles(colors, isMobile)}>
      <div style={headerInnerStyles}>
        <h1 style={headerTitleStyles(typography, colors)}>Shop All</h1>
        <p style={headerCountStyles(typography, colors)}>{productCount} products</p>
      </div>
    </div>
  );
};

export default ShopHeader;