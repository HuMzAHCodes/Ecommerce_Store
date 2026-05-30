import type { ShippingForm, PaymentForm } from "./types";

export type FormErrors = Record<string, string>;

/**
 * Validates shipping form fields.
 * Returns an error map — empty map means valid.
 */
export const validateShipping = (shipping: ShippingForm): FormErrors => {
  const errors: FormErrors = {};

  if (!shipping.firstName) errors.firstName = "Required";
  if (!shipping.lastName)  errors.lastName  = "Required";
  if (!shipping.email || !/\S+@\S+\.\S+/.test(shipping.email))
    errors.email = "Valid email required";
  if (!shipping.address) errors.address = "Required";
  if (!shipping.city)    errors.city    = "Required";
  if (!shipping.zip)     errors.zip     = "Required";

  return errors;
};

/**
 * Validates payment form fields.
 * Returns an error map — empty map means valid.
 */
export const validatePayment = (payment: PaymentForm): FormErrors => {
  const errors: FormErrors = {};

  if (!payment.cardName) errors.cardName = "Required";
  if (!payment.cardNumber || payment.cardNumber.replace(/\s/g, "").length < 16)
    errors.cardNumber = "Enter valid 16-digit card";
  if (!payment.expiry) errors.expiry = "Required";
  if (!payment.cvv || payment.cvv.length < 3)
    errors.cvv = "Enter valid CVV";

  return errors;
};

/** Returns true if the error map has no entries */
export const isValid = (errors: FormErrors): boolean =>
  Object.keys(errors).length === 0;
