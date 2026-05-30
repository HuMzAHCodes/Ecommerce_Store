import { useState } from "react";
import { useToast } from "../../components/ui/Toast";
import { PROMO_CODES } from "./types";

interface UsePromoResult {
  inputValue:   string;
  appliedCode:  string;
  discountPct:  number;
  errorMessage: string;
  setInputValue:  (val: string) => void;
  applyPromo:     () => void;
}

/**
 * Manages promo code input, validation, and applied discount state.
 * Fires a success toast on valid code, sets an error message on invalid.
 */
const usePromo = (): UsePromoResult => {
  const toast = useToast();

  const [inputValue,   setInputValue]   = useState("");
  const [appliedCode,  setAppliedCode]  = useState("");
  const [discountPct,  setDiscountPct]  = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const applyPromo = () => {
    const normalizedCode = inputValue.trim().toUpperCase();

    if (appliedCode) {
      setErrorMessage("A promo code is already applied.");
      return;
    }

    if (PROMO_CODES[normalizedCode]) {
      const pct = PROMO_CODES[normalizedCode];
      setDiscountPct(pct);
      setAppliedCode(normalizedCode);
      setErrorMessage("");
      toast.success(`${pct}% discount applied!`);
    } else {
      setErrorMessage("Invalid promo code.");
    }
  };

  return {
    inputValue,
    appliedCode,
    discountPct,
    errorMessage,
    setInputValue: (val: string) => { setInputValue(val); setErrorMessage(""); },
    applyPromo,
  };
};

export default usePromo;
