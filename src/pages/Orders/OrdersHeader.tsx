import { useTheme } from "../../theme/ThemeContext";
import {
  headerBandStyles, headerInnerStyles,
  headerTitleStyles, headerCountStyles,
} from "./ordersStyles";

interface OrdersHeaderProps {
  orderCount: number;
}

const OrdersHeader = ({ orderCount }: OrdersHeaderProps) => {
  const { colors, typography } = useTheme();

  return (
    <div style={headerBandStyles(colors)}>
      <div style={headerInnerStyles}>
        <h1 style={headerTitleStyles(typography, colors)}>Order History</h1>
        <p style={headerCountStyles(typography, colors)}>{orderCount} orders</p>
      </div>
    </div>
  );
};

export default OrdersHeader;