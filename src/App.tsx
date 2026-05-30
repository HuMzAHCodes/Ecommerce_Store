import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { CartProvider, useCart }         from "./context/CartContext";
import { AuthProvider, useAuth }         from "./context/AuthContext";
import { WishlistProvider, useWishlist } from "./context/WishlistContext";
// import PageLayout     from "./components/layout/PageLayout/PageLayout";
// import CartDrawer     from "./components/cart/CartDrawer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useTheme }   from "./theme/ThemeContext";


import PageLayout from "./components/layout/PageLayout";
import Navbar     from "./components/layout/Navbar";
import Footer     from "./components/layout/Footer";
import CartDrawer from "./components/cart/CartDrawer";



const Home         = lazy(() => import("./pages/Home/Home"));
const Shop         = lazy(() => import("./pages/Shop/Shop"));
const ProductPage  = lazy(() => import("./pages/ProductPage/ProductPage"));
const Cart         = lazy(() => import("./pages/Cart/Cart"));
const Checkout     = lazy(() => import("./pages/Checkout/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess/OrderSuccess"));
const Login        = lazy(() => import("./pages/Login/Login"));
const Register     = lazy(() => import("./pages/Register/Register"));
const Profile      = lazy(() => import("./pages/Profile/Profile"));
const AccountProfile = lazy(() => import("./pages/AccountProfile"));
const Orders       = lazy(() => import("./pages/Orders/Orders"));
const Wishlist     = lazy(() => import("./pages/Wishlist/Wishlist"));
const About        = lazy(() => import("./pages/About/About"));
const Collections  = lazy(() => import("./pages/Collections/Collections"));
const NotFound     = lazy(() => import("./pages/NotFound/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1, refetchOnWindowFocus: false },
  },
});

const PageLoader = () => {
  const theme = useTheme();
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
      <div style={{ width:34, height:34, borderRadius:"50%", border:`3px solid ${theme.colors.borderLight}`, borderTopColor: theme.colors.accentPrimary, animation:"spin 0.8s linear infinite" }}/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const AppInner = () => {
  const { totalItems }                = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { isLoggedIn, user }          = useAuth();

  return (
    <PageLayout
      cartCount={totalItems}
      wishlistCount={wishlistCount}
      isLoggedIn={isLoggedIn}
      userName={user?.name}
    >
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Public ─────────────────────────────────── */}
          <Route path="/"                       element={<Home />}         />
          <Route path="/shop"                   element={<Shop />}         />
          <Route path="/shop/:slug"             element={<ProductPage />}  />
          <Route path="/cart"                   element={<Cart />}         />
          <Route path="/login"                  element={<Login />}        />
          <Route path="/register"               element={<Register />}     />
          <Route path="/about"                  element={<About />}        />
          <Route path="/collections"            element={<Collections />}  />
          <Route path="/collections/:category"  element={<Collections />}  />
          <Route path="/account/profile" element={<ProtectedRoute> <AccountProfile /></ProtectedRoute>
}/>

          {/* ── Protected ──────────────────────────────── */}
          <Route path="/checkout" element={
            <ProtectedRoute><Checkout /></ProtectedRoute>
          }/>
          <Route path="/order-success" element={
            <ProtectedRoute><OrderSuccess /></ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          }/>
          <Route path="/orders" element={
            <ProtectedRoute><Orders /></ProtectedRoute>
          }/>
          <Route path="/wishlist" element={
            <ProtectedRoute><Wishlist /></ProtectedRoute>
          }/>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PageLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppInner />
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;



// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: App.tsx
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// This is the root of the entire React application. It is responsible for
// three things: wrapping the app in every global provider it needs, defining
// all client-side routes, and lazy-loading each page so the initial bundle
// stays small.
//
//
// KEY BUILDING BLOCKS
// -------------------
//
// 1. Lazy-loaded pages
//    Every page component is imported with React.lazy(). This means the
//    JavaScript for each page is only downloaded when the user actually
//    navigates to that route — not on the initial load. The trade-off is
//    that a page takes a brief moment to load the first time it is visited,
//    which is handled by the <Suspense> fallback below.
//
// 2. QueryClient
//    A single QueryClient instance is created outside any component so it is
//    never recreated on re-renders. Its default options are:
//    - staleTime: 5 minutes  — cached server data is considered fresh for 5
//                              minutes, preventing redundant network requests
//                              when the user navigates between pages quickly.
//    - retry: 1              — a failed request is retried once before React
//                              Query gives up and reports an error.
//    - refetchOnWindowFocus: false — data is NOT re-fetched automatically when
//                              the user switches browser tabs and comes back,
//                              avoiding surprise loading states.
//
// 3. PageLoader (spinner)
//    A centred spinning circle shown by <Suspense> while a lazy page chunk is
//    being downloaded. It reads accent and border colours from ThemeContext so
//    the spinner always matches the active theme, even before the page renders.
//
// 4. AppInner
//    A separate inner component whose only job is to read from the three
//    context hooks (useCart, useWishlist, useAuth) and pass the derived values
//    down to PageLayout. It must be a child of all three providers — that is
//    why it is split out from the root <App> component. If these hooks were
//    called directly inside <App>, they would run before their providers mount
//    and throw an error.
//    It also owns the <Routes> tree, mapping every URL path to its page:
//    - "/"            → Home
//    - "/shop"        → Shop (product listing)
//    - "/shop/:slug"  → ProductPage (single product, slug is the URL identifier)
//    - "/cart"        → Cart
//    - "/checkout"    → Checkout
//    - "/login"       → Login
//    - "/register"    → Register
//    - "/profile"     → Profile
//    - "/orders"      → Orders
//    - "/wishlist"    → Wishlist
//    - "/about"       → About
//    - "*"            → NotFound (catches any unrecognised URL)
//
// 5. App (root component)
//    The outermost component. It stacks all providers in the correct order
//    from outermost to innermost:
//
//    QueryClientProvider   — makes React Query available everywhere
//      BrowserRouter       — enables client-side routing via the History API
//        AuthProvider      — global auth state (user, token, login, logout)
//          CartProvider    — global cart state (items, totals, add/remove)
//            WishlistProvider — global wishlist state (saved products)
//              AppInner    — reads contexts, renders layout + routes
//
//    Provider order matters: inner providers can depend on outer ones, but
//    not the reverse. For example, CartProvider or WishlistProvider could
//    theoretically use auth state in the future, which is why AuthProvider
//    wraps them both.
//
//
// WHY AppInner IS SEPARATE FROM App
// -----------------------------------
// React Context hooks (useCart, useWishlist, useAuth) can only be called
// inside a component that is already a descendant of the matching Provider.
// If <App> called useCart() directly, it would crash because <CartProvider>
// hadn't mounted yet. Splitting into <App> (providers) + <AppInner>
// (consumers) is the standard pattern to solve this cleanly.
//
//
// ADDING A NEW PAGE
// -----------------
// 1. Create the page component under src/pages/.
// 2. Add a lazy() import at the top of this file.
// 3. Add a <Route path="/your-path" element={<YourPage />} /> inside <Routes>.
// No other file needs to change for basic routing.
//
// ──────────────────────────────────────────────────────────────────────────────