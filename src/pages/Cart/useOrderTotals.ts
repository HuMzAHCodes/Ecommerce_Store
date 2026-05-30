import type { OrderTotals } from "./types";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST            = 5.99;

/**
 * Derives all order totals from the cart subtotal and applied discount.
 * Free shipping kicks in when subtotal >= $50.
 */
const useOrderTotals = (subtotal: number, discountPct: number): OrderTotals => {
  const shipping    = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discountAmt = (subtotal * discountPct) / 100;
  const orderTotal  = subtotal - discountAmt + shipping;

  return { subtotal, shipping, discountAmt, orderTotal };
};

export default useOrderTotals;
