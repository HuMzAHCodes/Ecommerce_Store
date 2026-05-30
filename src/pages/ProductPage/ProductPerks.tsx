import { Truck, RotateCcw, Shield } from "lucide-react";
import { useTheme }                 from "../../theme/ThemeContext";
import { perksContainerStyles, perkRowStyles } from "./productPageStyles";
import { PRODUCT_PERKS } from "./productData";

const PERK_ICONS = [<Truck size={14} />, <RotateCcw size={14} />, <Shield size={14} />];

const ProductPerks = () => {
  const { colors, typography, radius } = useTheme();

  return (
    <div style={perksContainerStyles(colors, radius)}>
      {PRODUCT_PERKS.map((perk, i) => (
        <div key={perk.text} style={perkRowStyles(typography, colors)}>
          <span style={{ color: colors.accentPrimary }}>{PERK_ICONS[i]}</span>
          {perk.text}
        </div>
      ))}
    </div>
  );
};

export default ProductPerks;