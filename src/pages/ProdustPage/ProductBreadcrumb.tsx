import { Link }      from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTheme }  from "../../theme/ThemeContext";
import {
  breadcrumbBandStyles, breadcrumbInnerStyles, breadcrumbLinkStyles,
} from "./productPageStyles";

interface ProductBreadcrumbProps {
  productName: string;
}

const ProductBreadcrumb = ({ productName }: ProductBreadcrumbProps) => {
  const { colors, typography } = useTheme();

  return (
    <div style={breadcrumbBandStyles(colors)}>
      <div style={{ ...breadcrumbInnerStyles, fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>
        <Link to="/"     style={breadcrumbLinkStyles(colors)}>Home</Link>
        <ChevronRight size={11} />
        <Link to="/shop" style={breadcrumbLinkStyles(colors)}>Shop</Link>
        <ChevronRight size={11} />
        <span style={{ color: colors.textPrimary }}>{productName}</span>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;