export type Step = "shipping" | "payment" | "review";

export type CheckoutStep = {
  id:    Step;
  label: string;
};

export const STEPS: CheckoutStep[] = [
  { id: "shipping", label: "Shipping" },
  { id: "payment",  label: "Payment"  },
  { id: "review",   label: "Review"   },
];

export type ShippingForm = {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  address:   string;
  city:      string;
  state:     string;
  zip:       string;
  country:   string;
};

export type PaymentForm = {
  cardName:   string;
  cardNumber: string;
  expiry:     string;
  cvv:        string;
};

export const INITIAL_SHIPPING: ShippingForm = {
  firstName: "", lastName: "", email: "",    phone: "",
  address:   "", city:     "", state: "",    zip:   "",
  country:   "Pakistan",
};

export const INITIAL_PAYMENT: PaymentForm = {
  cardName: "", cardNumber: "", expiry: "", cvv: "",
};
