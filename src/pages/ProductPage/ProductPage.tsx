import { useTheme }           from "../../theme/ThemeContext";
import { useIsMobile }        from "../../hooks/useMediaQuery";
import useProductPage         from "./useProductPage";
import ProductBreadcrumb      from "./ProductBreadcrumb";
import ProductImageGallery    from "./ProductImageGallery";
import ProductInfo            from "./ProductInfo";
import ProductSizeSelector    from "./ProductSizeSelector";
import ProductActions         from "./ProductActions";
import ProductPerks           from "./ProductPerks";
import ProductTabs            from "./ProductTabs";
import { pageStyles, mainGridStyles } from "./productPageStyles";

// ── Component ─────────────────────────────────────────────────

const ProductPage = () => {
  const { colors } = useTheme();
  const isMobile   = useIsMobile();

  const {
    product, activeImg, qty, activeSize, activeTab,
    avgRating, isInCart, isWishlisted,
    setActiveImg, setActiveSize, setActiveTab,
    incrementQty, decrementQty,
    handleAddToCart, handleWishlist,
  } = useProductPage();

  return (
    <div style={pageStyles(colors)}>

      <ProductBreadcrumb productName={product.name} />

      <div style={mainGridStyles(isMobile)}>

        {/* Left — image gallery */}
        <ProductImageGallery
          images={product.images}
          badge={product.badge}
          activeIndex={activeImg}
          onThumbClick={setActiveImg}
        />

        {/* Right — product details */}
        <div>
          <ProductInfo
            name={product.name}
            category={product.category}
            price={product.price}
            salePrice={product.salePrice}
            avgRating={avgRating}
            reviewCount={product.reviews.length}
          />

          <ProductSizeSelector
            sizes={product.sizes}
            activeSize={activeSize}
            onSelect={setActiveSize}
          />

          <ProductActions
            qty={qty}
            isInCart={isInCart}
            isWishlisted={isWishlisted}
            onIncrement={incrementQty}
            onDecrement={decrementQty}
            onAddToCart={handleAddToCart}
            onWishlist={handleWishlist}
          />

          <ProductPerks />

          <ProductTabs
            activeTab={activeTab}
            product={product}
            onTabChange={setActiveTab}
          />
        </div>

      </div>
    </div>
  );
};

export default ProductPage;

/*
 * ── ProductPage — What this folder does ─────────────────────────────────────
 *
 * Individual product detail page, accessed via /shop/:slug.
 *
 * Sections:
 *   ProductBreadcrumb    — Home → Shop → Product Name nav
 *   ProductImageGallery  — animated main image + thumbnail row
 *   ProductInfo          — category link, title, star rating, price
 *   ProductSizeSelector  — pill buttons for size variants
 *   ProductActions       — qty stepper + add-to-cart + wishlist toggle
 *   ProductPerks         — shipping / returns / formula trust signals
 *   ProductTabs          — Details / How to Use / Reviews with AnimatePresence
 *
 * Logic (useProductPage.ts):
 *   - Reads :slug from URL, falls back to DEFAULT_PRODUCT
 *   - Manages activeImg, qty, activeSize, activeTab state
 *   - Derives avgRating, isInCart, isWishlisted
 *   - handleAddToCart adds qty copies, opens drawer, shows toast
 *   - handleWishlist toggles and shows appropriate toast message
 *
 * Files in this folder:
 *   productData.ts          — types, mock products, perks, tab config
 *   useProductPage.ts       — all state + cart/wishlist/toast handlers
 *   productPageStyles.ts    — all CSSProperties factories
 *   ProductBreadcrumb.tsx   — breadcrumb nav band
 *   ProductImageGallery.tsx — animated main image + thumbnails
 *   ProductInfo.tsx         — category, title, rating, price
 *   ProductSizeSelector.tsx — size pill buttons
 *   ProductActions.tsx      — qty + add-to-cart + wishlist
 *   ProductPerks.tsx        — trust signal row
 *   ProductTabs.tsx         — tabbed content panel
 *   ProductPage.tsx         — thin orchestrator
 */