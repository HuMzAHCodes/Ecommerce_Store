import { useTheme }      from "../../theme/ThemeContext";
import { useIsMobile }   from "../../hooks/useMediaQuery";
import useWishlistPage   from "./useWishlistPage";
import WishlistHeader    from "./WishlistHeader";
import WishlistEmpty     from "./WishlistEmpty";
import WishlistGrid      from "./WishlistGrid";
import { pageStyles, contentAreaStyles } from "./wishlistStyles";

// ── Component ─────────────────────────────────────────────────

const Wishlist = () => {
  const { colors } = useTheme();
  const isMobile   = useIsMobile();

  const { items, isInCart, handleAddToCart, handleRemoveItem } = useWishlistPage();

  return (
    <div style={pageStyles(colors)}>

      <WishlistHeader itemCount={items.length} />

      <div style={contentAreaStyles(isMobile)}>
        {items.length === 0
          ? <WishlistEmpty />
          : (
            <WishlistGrid
              items={items}
              isInCart={isInCart}
              onAddToCart={handleAddToCart}
              onRemove={handleRemoveItem}
            />
          )
        }
      </div>

    </div>
  );
};

export default Wishlist;

/*
 * ── Wishlist — What this folder does ────────────────────────────────────────
 *
 * Saved items page showing all products the user has hearted.
 *
 * Sections:
 *   WishlistHeader  — page title + saved item count
 *   WishlistEmpty   — shown when list is empty; links to shop
 *   WishlistGrid    — animated staggered grid of WishlistCard items
 *     WishlistCard  — single item with remove (X) + add-to-cart button
 *
 * Logic (useWishlistPage.ts):
 *   - handleAddToCart → addItem + openDrawer + success toast
 *   - handleRemoveItem → removeItem + info toast
 *
 * Files in this folder:
 *   useWishlistPage.ts  — cart/wishlist action handlers
 *   wishlistStyles.ts   — all CSSProperties factories
 *   WishlistHeader.tsx  — heading band with count
 *   WishlistEmpty.tsx   — empty state with shop CTA
 *   WishlistCard.tsx    — single animated item card
 *   WishlistGrid.tsx    — staggered AnimatePresence grid
 *   Wishlist.tsx        — thin orchestrator
 */