export type OrderData = {
  id:       string;
  date:     string;
  items:    number;
  total:    number;
  shipping: string;
  email:    string;
};

export type OrderProgressStep = {
  label:     string;
  isComplete: boolean;
};

/** Progress steps shown in the order tracking bar */
export const ORDER_PROGRESS_STEPS: OrderProgressStep[] = [
  { label: "Order Placed", isComplete: true  },
  { label: "Processing",   isComplete: false },
  { label: "Shipped",      isComplete: false },
  { label: "Delivered",    isComplete: false },
];

/**
 * Mock order — replace with real data from router state or React Query
 * once the backend is wired up.
 */
export const MOCK_ORDER: OrderData = {
  id:       "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
  date:     new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  items:    3,
  total:    124.00,
  shipping: "Standard · 3–5 business days",
  email:    "customer@email.com",
};
