import { useTheme }  from "../../theme/ThemeContext";
import { useIsMobile } from "../../hooks/useMediaQuery";
import {
  headerBandStyles, headerInnerStyles,
  headerTitleStyles, headerCountStyles,
} from "./shopStyles";

import useCursor from "../../components/cursor/useCursor";

interface ShopHeaderProps {
  productCount: number;
}

const ShopHeader = ({ productCount }: ShopHeaderProps) => {
  const { colors, typography } = useTheme();
  const isMobile = useIsMobile();
  const blobCursor = useCursor("blob");

  return (
    <div style={headerBandStyles(colors, isMobile)}>
      <div style={headerInnerStyles}>
        <h1
  {...blobCursor.handlers}
  style={{ ...headerTitleStyles(typography, colors), cursor: "none", display: "inline-block" }}>Shop All
</h1>
        <p style={headerCountStyles(typography, colors)}>{productCount} products</p>
      </div>
    </div>
  );
};

export default ShopHeader;