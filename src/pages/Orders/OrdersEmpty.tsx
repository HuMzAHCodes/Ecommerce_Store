import { Link }      from "react-router-dom";
import { Package }   from "lucide-react";
import { useTheme }  from "../../theme/ThemeContext";
import { emptyStateStyles, emptyLinkStyles } from "./ordersStyles";

const OrdersEmpty = () => {
  const { colors, typography } = useTheme();

  return (
    <div style={emptyStateStyles}>
      <Package size={56} color={colors.borderMedium} style={{ margin: "0 auto 1rem" }} />
      <p style={{ fontFamily: typography.fontBody, fontSize: typography.lg, color: colors.textPrimary, marginBottom: "0.5rem" }}>
        No orders yet
      </p>
      <Link to="/shop" style={emptyLinkStyles(typography, colors)}>
        Start shopping →
      </Link>
    </div>
  );
};

export default OrdersEmpty;