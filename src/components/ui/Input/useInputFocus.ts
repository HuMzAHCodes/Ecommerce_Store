import { useState } from "react";
import type { FocusEvent } from "react";
import type { Theme } from "../../../theme/themes";

type Colors = Theme["colors"];

interface InputFocusState {
  isFocused:    boolean;
  borderColor:  string;
  boxShadow:    string;
  handleFocus:  (e: FocusEvent<HTMLInputElement>) => void;
  handleBlur:   (e: FocusEvent<HTMLInputElement>) => void;
}

const useInputFocus = (
  colors:        Colors,
  hasError:      boolean,
  onFocus?:      (e: FocusEvent<HTMLInputElement>) => void,
  onBlur?:       (e: FocusEvent<HTMLInputElement>) => void,
): InputFocusState => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = hasError
    ? colors.error
    : isFocused
    ? colors.borderFocus
    : colors.borderLight;

  const boxShadow = hasError
    ? `0 0 0 3px ${colors.errorBg}`
    : isFocused
    ? `0 0 0 3px ${colors.accentLight}`
    : "none";

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return { isFocused, borderColor, boxShadow, handleFocus, handleBlur };
};

export default useInputFocus;