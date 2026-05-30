import type { ShippingForm, PaymentForm } from "./types";

export type FormErrors = Record<string, string>;

/**
 * Validates shipping form fields.
 * Returns an error map — empty map means valid.
 */
export const validateShipping = (shipping: ShippingForm): FormErrors => {
  const errors: FormErrors = {};

  // First Name: required, only alphabets
  if (!shipping.firstName) {
    errors.firstName = "Required";
  } else if (!/^[a-zA-Z\s]+$/.test(shipping.firstName)) {
    errors.firstName = "First name must contain only alphabets";
  }

  // Last Name: required, only alphabets
  if (!shipping.lastName) {
    errors.lastName = "Required";
  } else if (!/^[a-zA-Z\s]+$/.test(shipping.lastName)) {
    errors.lastName = "Last name must contain only alphabets";
  }

  // Email: required, must end in @gmail.com
  if (!shipping.email) {
    errors.email = "Required";
  } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(shipping.email)) {
    errors.email = "Must be a valid Gmail address (ending in @gmail.com)";
  }

  // Phone: required, only digits, max 11 digits
  if (!shipping.phone) {
    errors.phone = "Required";
  } else if (!/^\d+$/.test(shipping.phone)) {
    errors.phone = "Phone number must contain only digits";
  } else if (shipping.phone.length > 11) {
    errors.phone = "Phone number must not be more than 11 digits";
  }

  // Address: required
  if (!shipping.address) {
    errors.address = "Required";
  }

  // City: required, only alphabets
  if (!shipping.city) {
    errors.city = "Required";
  } else if (!/^[a-zA-Z\s]+$/.test(shipping.city)) {
    errors.city = "City must contain only alphabets";
  }

  // State: required, only alphabets
  if (!shipping.state) {
    errors.state = "Required";
  } else if (!/^[a-zA-Z\s]+$/.test(shipping.state)) {
    errors.state = "State must contain only alphabets";
  }

  // ZIP Code: required, exactly 4-digit number
  if (!shipping.zip) {
    errors.zip = "Required";
  } else if (!/^\d{4}$/.test(shipping.zip)) {
    errors.zip = "ZIP code must be exactly a 4-digit number";
  }

  return errors;
};

/**
 * Validates payment form fields.
 * Returns an error map — empty map means valid.
 */
export const validatePayment = (payment: PaymentForm): FormErrors => {
  const errors: FormErrors = {};

  // Name on Card: required, only alphabets
  if (!payment.cardName) {
    errors.cardName = "Required";
  } else if (!/^[a-zA-Z\s]+$/.test(payment.cardName)) {
    errors.cardName = "Name on card must contain only alphabets";
  }

  // Card Number: required, exactly 16 digits
  const cleanCardNumber = payment.cardNumber.replace(/\s/g, "");
  if (!cleanCardNumber) {
    errors.cardNumber = "Required";
  } else if (!/^\d+$/.test(cleanCardNumber)) {
    errors.cardNumber = "Card number must contain only digits";
  } else if (cleanCardNumber.length !== 16) {
    errors.cardNumber = "Card number must be exactly 16 digits";
  }

  // Expiry Date: required, MM/YY format, future date
  if (!payment.expiry) {
    errors.expiry = "Required";
  } else {
    const match = payment.expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/);
    if (!match) {
      errors.expiry = "Use MM/YY format (e.g. 12/28)";
    } else {
      const inputMonth = parseInt(match[1], 10);
      const inputYear = parseInt("20" + match[2], 10);
      
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // 1-indexed
      const currentYear = now.getFullYear();

      if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
        errors.expiry = "Card has expired";
      }
    }
  }

  // CVV: required, 3 or 4-digit number
  if (!payment.cvv) {
    errors.cvv = "Required";
  } else if (!/^\d{3,4}$/.test(payment.cvv)) {
    errors.cvv = "CVV must be a 3 or 4-digit number";
  }

  return errors;
};

/** Returns true if the error map has no entries */
export const isValid = (errors: FormErrors): boolean =>
  Object.keys(errors).length === 0;
