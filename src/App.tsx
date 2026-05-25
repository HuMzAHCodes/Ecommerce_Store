import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageLayout from "./components/layout/PageLayout";

// ── Pages (lazy loaded for performance) ───────────────────────
import { lazy, Suspense } from "react";
import { useTheme } from "./theme/ThemeContext";

const Home         = lazy(() => import("./pages/Home"));
const Shop         = lazy(() => import("./pages/Shop"));
const ProductPage  = lazy(() => import("./pages/ProductPage"));
const Cart         = lazy(() => import("./pages/Cart"));
const Checkout     = lazy(() => import("./pages/Checkout"));
const Login        = lazy(() => import("./pages/Login"));
const Register     = lazy(() => import("./pages/Register"));
const Profile      = lazy(() => import("./pages/profile"));
const Orders       = lazy(() => import("./pages/Orders"));
const Wishlist     = lazy(() => import("./pages/Wishlist"));
const About        = lazy(() => import("./pages/About"));
const NotFound     = lazy(() => import("./pages/NotFound"));

// ── Query Client ──────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:        1000 * 60 * 5, // 5 min
      retry:            1,
      refetchOnWindowFocus: false,
    },
  },
});

// ── Page Loader ───────────────────────────────────────────────
const PageLoader = () => {
  const theme = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        border: `3px solid ${theme.colors.borderLight}`,
        borderTopColor: theme.colors.accentPrimary,
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ── App ───────────────────────────────────────────────────────
const App = () => {
  // TODO: replace with real values from AuthContext + CartContext
  const cartCount     = 0;
  const wishlistCount = 0;
  const isLoggedIn    = false;
  const userName      = undefined;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PageLayout
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          isLoggedIn={isLoggedIn}
          userName={userName}
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"              element={<Home />}        />
              <Route path="/shop"          element={<Shop />}        />
              <Route path="/shop/:slug"    element={<ProductPage />} />
              <Route path="/cart"          element={<Cart />}        />
              <Route path="/checkout"      element={<Checkout />}    />
              <Route path="/login"         element={<Login />}       />
              <Route path="/register"      element={<Register />}    />
              <Route path="/profile"       element={<Profile />}     />
              <Route path="/orders"        element={<Orders />}      />
              <Route path="/wishlist"      element={<Wishlist />}    />
              <Route path="/about"         element={<About />}       />
              <Route path="*"              element={<NotFound />}    />
            </Routes>
          </Suspense>
        </PageLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// App.tsx
// The application root. Wires together the provider stack, client-side router,
// global layout shell, and all page routes. This is the single file that owns
// the full app composition — every other component is a descendant of what
// is set up here.
//
// ── Provider stack (outer → inner) ───────────────────────────────────────────
//
//  QueryClientProvider   — makes React Query's cache available to the entire tree
//  BrowserRouter         — enables client-side routing via the HTML5 History API
//  PageLayout            — renders Navbar + animated <main> + Footer around pages
//  Suspense              — catches lazy-loaded page chunks while they load,
//                          showing <PageLoader /> as the fallback
//
// ── Lazy loading ──────────────────────────────────────────────────────────────
//
//  Every page component is wrapped in React.lazy() with a dynamic import.
//  This means each page is split into its own JS bundle chunk and only
//  downloaded when the user first navigates to that route — keeping the
//  initial bundle small and TTI (time to interactive) fast.
//  All lazy components are children of a single <Suspense> boundary so
//  any in-flight page load shows the same <PageLoader /> spinner.
//
// ── Route table ───────────────────────────────────────────────────────────────
//
//  /                  → Home          (landing / hero page)
//  /shop              → Shop          (product listing, supports ?filter= queries)
//  /shop/:slug        → ProductPage   (individual product detail, :slug is the ID/handle)
//  /cart              → Cart          (shopping bag)
//  /checkout          → Checkout      (order flow; hideFooter would be set here)
//  /login             → Login         (authentication)
//  /register          → Register      (new account creation)
//  /profile           → Profile       (account settings)
//  /orders            → Orders        (order history)
//  /wishlist          → Wishlist      (saved items)
//  /about             → About         (brand / company info)
//  *                  → NotFound      (catch-all 404 page)
//
// ── QueryClient configuration ─────────────────────────────────────────────────
//
//  Defined at module level (outside the component) so it is created exactly
//  once for the lifetime of the app and never re-instantiated on re-renders.
//
//  staleTime: 5 minutes   — cached query data is considered fresh for 5 min;
//                           no background refetch within that window
//  retry: 1               — failed requests are retried once before throwing
//  refetchOnWindowFocus: false — prevents automatic refetches when the user
//                           switches tabs/windows back to the app
//
// ── PageLoader ────────────────────────────────────────────────────────────────
//
//  A centered spinner shown while a lazy page chunk is downloading.
//  Rendered at minHeight: 60vh so it appears in the vertical middle of the
//  content area (below the Navbar, above the Footer) without causing layout
//  shift. The spinner is a pure CSS animation — a bordered circle with one
//  colored arc rotating via a keyframes rule injected inline with <style>.
//  Uses theme.colors so the spinner matches the active theme automatically.
//
// ── Auth & cart state (TODO) ──────────────────────────────────────────────────
//
//  cartCount, wishlistCount, isLoggedIn, and userName are currently hardcoded
//  as placeholder values (0 / false / undefined) inside <App>. The inline
//  TODO comment marks these as the integration point for real context values:
//    cartCount / wishlistCount  ← CartContext (e.g. derived from cart items array)
//    isLoggedIn / userName      ← AuthContext (e.g. from a session or JWT hook)
//  Once those contexts exist, these four lines are the only change needed
//  in App.tsx to make the Navbar reflect live state.
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-router-dom        — BrowserRouter, Routes, Route for client-side routing
//  @tanstack/react-query   — QueryClient + QueryClientProvider for server state
//  PageLayout              — global shell (Navbar + main + Footer)
//  useTheme()              — consumed only by PageLoader for spinner colors
//  React.lazy + Suspense   — code-split page loading with fallback UI