import { motion }        from "framer-motion";
import { ChevronRight }  from "lucide-react";
import { useTheme }      from "../../theme/ThemeContext";
import {
  cardStyles,       cardHeaderStyles,    cardMetaGroupStyles,
  metaLabelStyles,  metaValueStyles,     statusBadgeStyles,
  itemsAreaStyles,  itemRowStyles,       itemNameStyles,
  itemPriceStyles,
} from "./ordersStyles";
import { STATUS_CONFIG, type Order } from "./ordersData";

interface OrderCardProps {
  order:         Order;
  animationDelay:number;
}

const OrderCard = ({ order, animationDelay }: OrderCardProps) => {
  const { colors, typography, radius, shadows } = useTheme();

  const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.PENDING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.4, delay: animationDelay }}
      style={cardStyles(colors, radius, shadows)}
    >
      {/* Card header — id, date, total, status */}
      <div style={cardHeaderStyles(colors)}>
        <div style={cardMetaGroupStyles}>

          <div>
            <p style={metaLabelStyles(typography, colors)}>Order</p>
            <p style={metaValueStyles(typography, colors, true)}>{order.id}</p>
          </div>

          <div>
            <p style={metaLabelStyles(typography, colors)}>Date</p>
            <p style={metaValueStyles(typography, colors)}>{order.date}</p>
          </div>

          <div>
            <p style={metaLabelStyles(typography, colors)}>Total</p>
            <p style={metaValueStyles(typography, colors, true, true)}>${order.total.toFixed(2)}</p>
          </div>

        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={statusBadgeStyles(typography, radius, status.color, status.bg)}>
            {status.icon} {status.label}
          </span>
          <ChevronRight size={16} color={colors.textMuted} />
        </div>
      </div>

      {/* Line items */}
      <div style={itemsAreaStyles}>
        {order.items.map((item) => (
          <div key={item.name} style={itemRowStyles}>
            <span style={itemNameStyles(typography, colors)}>
              {item.name} × {item.qty}
            </span>
            <span style={itemPriceStyles(typography, colors)}>
              ${item.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

    </motion.div>
  );
};

export default OrderCard;