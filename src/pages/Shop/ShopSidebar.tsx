import { useTheme }       from "../../theme/ThemeContext";
import ShopFiltersPanel   from "./ShopFiltersPanel";
import { sidebarStyles }  from "./shopStyles";

interface ShopSidebarProps {
  search:          string;
  category:        string;
  priceMax:        number;
  saleOnly:        boolean;
  onSearchChange:  (v: string) => void;
  onCategoryChange:(v: string) => void;
  onPriceChange:   (v: number) => void;
  onSaleToggle:    (v: boolean) => void;
  onClearAll:      () => void;
}

const ShopSidebar = (props: ShopSidebarProps) => {
  const { colors, radius, shadows } = useTheme();

  return (
    <aside style={sidebarStyles(colors, radius, shadows)}>
      <ShopFiltersPanel {...props} />
    </aside>
  );
};

export default ShopSidebar;