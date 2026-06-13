import { useTheme } from "../../theme/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../components/ui/Toast";
import { useIsMobile } from "../../hooks/useMediaQuery";
import useShopFilters from "./useShopFilters";
import ShopHeader from "./ShopHeader";
import ShopSidebar from "./ShopSidebar";
import ShopMobileFilters from "./ShopMobileFilters";
import ShopToolbar from "./ShopToolbar";
import ShopProductGrid from "./ShopProductGrid";
import { pageStyles, contentGridStyles } from "./shopStyles";
import type { Product } from "./shopData";

// ── Component ─────────────────────────────────────────────────

const Shop = () => {
  const { colors } = useTheme();
  const isMobile = useIsMobile();
  const { addItem, isInCart, openDrawer } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const toast = useToast();

  const {
    search,
    category,
    sort,
    priceMax,
    saleOnly,
    filtersOpen,
    filteredProducts,
    hasActiveFilters,
    isLoading,
    setSearch,
    setCategory,
    setSort,
    setPriceMax,
    setSaleOnly,
    setFiltersOpen,
    clearAllFilters,
  } = useShopFilters();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      slug: product.slug,
    });
    openDrawer();
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (product: Product) => {
    toggle({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      slug: product.slug,
    });
    toast.info(
      isWishlisted(product.id)
        ? "Removed from wishlist"
        : `${product.name} saved!`,
    );
  };

  const sharedFilterProps = {
    search,
    category,
    priceMax,
    saleOnly,
    onSearchChange: setSearch,
    onCategoryChange: setCategory,
    onPriceChange: setPriceMax,
    onSaleToggle: setSaleOnly,
    onClearAll: clearAllFilters,
  };

  return (
    <div style={pageStyles(colors)}>
      <ShopHeader productCount={filteredProducts.length} />

      <div style={contentGridStyles(isMobile)}>
        {/* Desktop sidebar */}
        {!isMobile && <ShopSidebar {...sharedFilterProps} />}

        {/* Product area */}
        <div>
          <ShopToolbar
            isMobile={isMobile}
            sort={sort}
            filteredCount={filteredProducts.length}
            hasActiveFilters={hasActiveFilters}
            onSortChange={setSort}
            onFiltersOpen={() => setFiltersOpen(true)}
          />

          {/* Mobile filter bottom sheet */}
          {isMobile && (
            <ShopMobileFilters
              isOpen={filtersOpen}
              filteredCount={filteredProducts.length}
              onClose={() => setFiltersOpen(false)}
              {...sharedFilterProps}
            />
          )}

          <ShopProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            isInCart={isInCart}
            isWishlisted={isWishlisted}
            onAddToCart={handleAddToCart}
            onWishlist={handleWishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;

/*
 * ── Shop — What this folder does ────────────────────────────────────────────
 *
 * The main product listing page for the BLÜM storefront.
 *
 * Sections:
 *   ShopHeader         — page title + live product count
 *   ShopSidebar        — desktop sticky filter panel (hidden on mobile)
 *   ShopToolbar        — sort dropdown + mobile filter toggle button
 *   ShopMobileFilters  — bottom sheet filter drawer (mobile only)
 *   ShopProductGrid    — animated product grid or empty state
 *     ShopProductCard  — individual product card with wishlist + add-to-cart
 *
 * Shared filter props flow:
 *   useShopFilters → sharedFilterProps object → ShopSidebar + ShopMobileFilters
 *   Both panels render the same ShopFiltersPanel internally.
 *
 * Logic (useShopFilters.ts):
 *   - Reads initial state from URL search params (search, category, filter=sale)
 *   - Debounces search input (350ms) before filtering
 *   - Derives filteredProducts via useMemo (search + category + price + sale + sort)
 *   - hasActiveFilters drives the dot indicator on the mobile filter button
 *   - clearAllFilters resets all filters to defaults in one call
 *
 * Data (shopData.ts):
 *   - ALL_PRODUCTS, CATEGORIES, SORT_OPTIONS, CARD_FADE_UP_VARIANT
 *
 * Files in this folder:
 *   shopData.ts           — products, categories, sort options, animation variant
 *   useShopFilters.ts     — all filter/sort/search state and derived values
 *   shopStyles.ts         — all CSSProperties factories
 *   ShopHeader.tsx        — heading + product count band
 *   ShopFiltersPanel.tsx  — shared filter UI (used by sidebar and mobile drawer)
 *   ShopSidebar.tsx       — sticky desktop sidebar wrapping FiltersPanel
 *   ShopMobileFilters.tsx — bottom sheet wrapping FiltersPanel
 *   ShopToolbar.tsx       — sort select + mobile filter toggle
 *   ShopProductCard.tsx   — single product card
 *   ShopProductGrid.tsx   — animated grid + empty state
 *   Shop.tsx              — orchestrator; wires all sections together
 */
