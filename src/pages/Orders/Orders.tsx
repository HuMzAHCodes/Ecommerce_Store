import { useTheme } from "../../theme/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import OrdersHeader from "./OrdersHeader";
import OrderCard from "./OrderCard";
import OrdersEmpty from "./OrdersEmpty";
import { pageStyles, ordersListStyles } from "./ordersStyles";
import type { Order } from "./ordersData";
import api from "../../lib/api";

// ── API → local Order shape mapper ────────────────────────────

function mapApiOrder(o: any): Order {
  return {
    id: o.id,
    date: new Date(o.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    status: o.status,
    total: o.total,
    items: (o.items ?? []).map((item: any) => ({
      name: item.product?.name ?? "Product",
      qty: item.quantity,
      price: item.price,
    })),
  };
}

// ── Component ─────────────────────────────────────────────────

const Orders = () => {
  const { colors } = useTheme();

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/api/orders");
      return (data.data ?? []).map(mapApiOrder);
    },
  });

  return (
    <div style={pageStyles(colors)}>
      <OrdersHeader orderCount={orders.length} />

      <div style={ordersListStyles}>
        {isLoading ? (
          <p
            style={{
              color: colors.textMuted,
              textAlign: "center",
              padding: "3rem 0",
            }}
          >
            Loading orders…
          </p>
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderCard
              key={order.id}
              order={order}
              animationDelay={index * 0.08}
            />
          ))
        ) : (
          <OrdersEmpty />
        )}
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
