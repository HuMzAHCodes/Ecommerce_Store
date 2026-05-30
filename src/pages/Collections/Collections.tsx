import { useTheme }           from "../../theme/ThemeContext";
import { useIsMobile }        from "../../hooks/useMediaQuery";
import useCollections         from "./useCollections";
import CollectionsBanner      from "./CollectionsBanner";
import CollectionsGrid        from "./CollectionsGrid";
import CollectionsBrowseAll   from "./CollectionsBrowseAll";
import { pageStyles, gridContainerStyles } from "./collectionsStyles";

// ── Component ─────────────────────────────────────────────────

const Collections = () => {
  const { colors }  = useTheme();
  const isMobile    = useIsMobile();

  const {
    activeTab, meta, products,
    isInCart, isWishlisted,
    handleAddToCart, handleWishlist,
  } = useCollections();

  return (
    <div style={pageStyles(colors)}>

      <CollectionsBanner activeTab={activeTab} meta={meta} />

      <div style={gridContainerStyles(isMobile)}>
        <CollectionsGrid
          activeTab={activeTab}
          products={products}
          isInCart={isInCart}
          isWishlisted={isWishlisted}
          onAddToCart={handleAddToCart}
          onWishlist={handleWishlist}
        />

        <CollectionsBrowseAll />
      </div>

    </div>
  );
};

export default Collections;

/*
 * ── Collections — What this folder does ─────────────────────────────────────
 *
 * Category collection page accessed via /collections/:category.
 *
 * Sections:
 *   CollectionsBanner     — animated hero with emoji, title, description,
 *                           and tab switcher (skincare/beauty/wellness/gifts)
 *   CollectionsGrid       — staggered product grid for the active collection
 *     CollectionsProductCard — single card with wishlist + add-to-cart
 *   CollectionsBrowseAll  — "Browse All Products" CTA linking to /shop
 *
 * Logic (useCollections.ts):
 *   - Reads :category from URL, falls back to "skincare"
 *   - Filters ALL_COLLECTION_PRODUCTS by active tab
 *   - handleAddToCart → addItem + openDrawer + success toast
 *   - handleWishlist  → toggle + info toast (saved / removed)
 *
 * Files in this folder:
 *   collectionsData.ts         — types, metadata, products, tabs, animation variant
 *   useCollections.ts          — active tab, filtered products, cart/wishlist handlers
 *   collectionsStyles.ts       — all CSSProperties factories
 *   CollectionsBanner.tsx      — hero banner + collection tab switcher
 *   CollectionsProductCard.tsx — single animated product card
 *   CollectionsGrid.tsx        — staggered grid wrapper
 *   CollectionsBrowseAll.tsx   — bottom CTA
 *   Collections.tsx            — thin orchestrator
 */