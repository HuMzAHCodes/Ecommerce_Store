import { useTheme }  from "../../theme/ThemeContext";
import { getSpinnerWrapperStyles, getSpinnerDiscStyles, SPIN_KEYFRAMES } from "./spinnerStyles";

const LoadingSpinner = () => {
  const { colors } = useTheme();

  const wrapperStyles = getSpinnerWrapperStyles();
  const discStyles    = getSpinnerDiscStyles(colors);

  return (
    <div style={wrapperStyles}>
      <div style={discStyles} />
      <style>{SPIN_KEYFRAMES}</style>
    </div>
  );
};

export default LoadingSpinner;