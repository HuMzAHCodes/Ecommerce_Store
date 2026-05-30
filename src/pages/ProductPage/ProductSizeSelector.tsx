import { useTheme }  from "../../theme/ThemeContext";
import { sizeLabelStyles, sizeButtonStyles } from "./productPageStyles";

interface ProductSizeSelectorProps {
  sizes:      string[];
  activeSize: string;
  onSelect:   (size: string) => void;
}

const ProductSizeSelector = ({ sizes, activeSize, onSelect }: ProductSizeSelectorProps) => {
  const { colors, typography, radius, transitions } = useTheme();

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <p style={sizeLabelStyles(typography, colors)}>
        Size — <span style={{ color: colors.accentPrimary }}>{activeSize}</span>
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            style={sizeButtonStyles(typography, colors, transitions, radius, activeSize === size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizeSelector;