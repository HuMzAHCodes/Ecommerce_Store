export type PromoCode = {
  code:     string;
  discount: number; // percentage
};

/** Valid promo codes and their discount percentages */
export const PROMO_CODES: Record<string, number> = {
  BLUM10:    10,
  WELCOME20: 20,
};

export type PromoState = {
  inputValue:   string;
  appliedCode:  string;
  discountPct:  number;
  errorMessage: string;
};

export type OrderTotals = {
  subtotal:    number;
  shipping:    number;
  discountAmt: number;
  orderTotal:  number;
};
