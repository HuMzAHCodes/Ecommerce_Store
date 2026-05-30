import { useTheme }    from "../../theme/ThemeContext";
import OrdersHeader    from "./OrdersHeader";
import OrderCard       from "./OrderCard";
import OrdersEmpty     from "./OrdersEmpty";
import { pageStyles, ordersListStyles } from "./ordersStyles";
import { MOCK_ORDERS } from "./ordersData";

// ── Component ─────────────────────────────────────────────────

const Orders = () => {
  const { colors } = useTheme();
  const hasOrders  = MOCK_ORDERS.length > 0;

  return (
    <div style={pageStyles(colors)}>

      <OrdersHeader orderCount={MOCK_ORDERS.length} />

      <div style={ordersListStyles}>
        {hasOrders
          ? MOCK_ORDERS.map((order, index) => (
              <OrderCard
                key={order.id}
                order={order}
                animationDelay={index * 0.08}
              />
            ))
          : <OrdersEmpty />
        }
      </div>

    </div>
  );
};

export default Orders;

/*
 * ── Orders — What this folder does ──────────────────────────────────────────
 *
 * Order history page listing all past orders for the logged-in user.
 *
 * Sections:
 *   OrdersHeader  — page title + order count band
 *   OrderCard     — one card per order; shows id, date, total, status badge,
 *                   and a line-item breakdown; staggered entrance animation
 *   OrdersEmpty   — shown when order list is empty; links back to shop
 *
 * Data (ordersData.ts):
 *   MOCK_ORDERS    — placeholder orders (replace with API call later)
 *   STATUS_CONFIG  — maps status string → label, color, bg, icon
 *
 * Files in this folder:
 *   ordersData.ts    — mock data, types, status config with icons
 *   ordersStyles.ts  — all CSSProperties factories
 *   OrdersHeader.tsx — heading band with title + count
 *   OrderCard.tsx    — single animated order card (header + line items)
 *   OrdersEmpty.tsx  — empty state with shop link
 *   Orders.tsx       — thin orchestrator
 */