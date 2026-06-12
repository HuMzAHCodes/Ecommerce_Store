# BLÜM E-COMMERCE STORE — FRONTEND ARCHITECTURE & BACKEND INTEGRATION GUIDE

Hello Claude! This document provides a complete overview of the **Blüm E-Commerce Store** frontend codebase. Use this information to design, write, and integrate the backend services (API routes, database sync, authentication, and state management).

---

## 1. Project Stack Overview

*   **Core**: React 19 (TypeScript) + Vite
*   **Styling**: Vanilla CSS with Tailwind CSS v4 (`@tailwindcss/vite` & `tailwindcss` v4)
*   **Routing**: React Router DOM v7
*   **API State Management**: React Query (TanStack Query) v5 (installed and configured at root, ready to replace mocks)
*   **Authentication**: Firebase Authentication (configured in frontend for Email/Password & Google Sign-In)
*   **Animations**: Framer Motion & GSAP for smooth UI micro-interactions
*   **Icons**: Lucide React
*   **Database Schema**: Prisma Client v5 + MySQL (Schema is defined in `prisma/schema.prisma`)

---

## 2. Directory Structure

```text
ecommerce-store/
├── prisma/
│   └── schema.prisma         # Existing MySQL database models
├── public/
│   └── images/               # Product and assets images
├── src/
│   ├── assets/               # Local media/asset elements
│   ├── components/           # Shared components (layouts, UI primitives, auth status)
│   │   ├── auth/             # Firebase configuration & ProtectedRoute wrappers
│   │   ├── cart/             # Shopping cart drawer slide-out UI
│   │   ├── cursor/           # Custom cursor animations
│   │   ├── layout/           # Shared page wrappers, Navbar, Footer
│   │   └── ui/               # Reusable UI primitives (Buttons, Inputs, Toast alerts)
│   ├── context/              # Global React Context providers (Cart, Wishlist, Auth mapping)
│   ├── hooks/                # Custom utility hooks (debounce, local storage, media queries)
│   ├── pages/                # Page components and page-specific sub-components
│   │   ├── About/            # About/Brand information page
│   │   ├── Cart/             # Cart overview page
│   │   ├── Checkout/         # Multi-step Checkout page (Shipping → Payment → Review)
│   │   ├── Collections/      # Product category collections (Skincare, Beauty, Wellness, Gifts)
│   │   ├── Home/             # Store Home Page (Hero, categories grid, featured products)
│   │   ├── Login/            # Login forms
│   │   ├── Register/         # Registration forms
│   │   ├── NotFound/         # 404 Error page
│   │   ├── OrderSuccess/     # Receipt display after successful checkout
│   │   ├── Orders/           # Customer order history list
│   │   ├── ProductPage/      # Single product detail view (Image Gallery, Tabs, Reviews)
│   │   └── Profile/          # User profile settings dashboard
│   ├── theme/                # Custom styling system with light/dark palettes
│   ├── utils/                # Small utility helpers (clsx/tailwind-merge helper 'cn')
│   ├── App.tsx               # Root App: wraps providers and declares client routes
│   └── main.tsx              # Renders the app, initializes Toast, Cursor, and Theme providers
```

---

## 3. Database Schema Overview (`prisma/schema.prisma`)
The project contains a pre-defined MySQL Prisma schema that matches the database expectations. The models and their associations are:

*   **`User`**: Core user accounts.
    *   Fields: `id` (cuid), `email` (unique), `name`, `password`, `avatar` (url), `role` (`CUSTOMER` or `ADMIN`).
    *   Relations: `orders` (1-to-many), `reviews` (1-to-many), `wishlist` (1-to-many), `addresses` (1-to-many), `cart` (1-to-many).
*   **`Category`**: Product categories.
    *   Fields: `id` (cuid), `name` (unique), `slug` (unique), `description`, `image`.
    *   Relations: `products` (1-to-many).
*   **`Product`**: Store items.
    *   Fields: `id` (cuid), `name`, `slug` (unique), `description` (Text), `price` (Float), `salePrice` (Float, optional), `stock` (Int), `images` (Text storing stringified list/JSON), `tags` (Text storing comma-separated or JSON tags), `isActive` (Boolean).
    *   Relations: `categoryId` (belongs to `Category`), `reviews` (1-to-many), `orderItems` (1-to-many), `cartItems` (1-to-many), `wishlist` (1-to-many).
*   **`CartItem`**: Shopping cart persistence.
    *   Fields: `id` (cuid), `quantity` (Int), `userId` (belongs to `User`), `productId` (belongs to `Product`).
    *   Unique constraint: `[userId, productId]` (prevents duplicates).
*   **`WishlistItem`**: User wishlist.
    *   Fields: `id` (cuid), `userId` (belongs to `User`), `productId` (belongs to `Product`).
    *   Unique constraint: `[userId, productId]`.
*   **`Order`**: Checkout receipts.
    *   Fields: `id` (cuid), `status` (Enum: `PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `REFUNDED`), `total` (Float), `discount` (Float), `notes`, `userId` (belongs to `User`), `addressId` (belongs to `Address`).
    *   Relations: `items` (1-to-many `OrderItem`), `payment` (1-to-1).
*   **`OrderItem`**: Individual items inside an Order.
    *   Fields: `id` (cuid), `quantity` (Int), `price` (Float), `orderId` (belongs to `Order`), `productId` (belongs to `Product`).
*   **`Payment`**: Payment record.
    *   Fields: `id` (cuid), `amount` (Float), `status` (Enum: `PENDING`, `COMPLETED`, `FAILED`, `REFUNDED`), `method` (String), `transactionId` (String), `orderId` (unique, belongs to `Order`).
*   **`Address`**: Billing and delivery records.
    *   Fields: `id` (cuid), `label` (String like "Home", "Work"), `street`, `city`, `state`, `zip`, `country`, `isDefault` (Boolean), `userId` (belongs to `User`).
*   **`Review`**: Customer feedback.
    *   Fields: `id` (cuid), `rating` (Int 1-5), `title`, `body` (Text), `userId` (belongs to `User`), `productId` (belongs to `Product`).
    *   Unique constraint: `[userId, productId]` (one review per product per user).

---

## 4. Key Files & What They Do

### A. Root & Setup Files
1.  **`src/main.tsx`**: Initializes React, mounts the app under the React StrictMode, and wraps `<App />` inside `<AuthProvider>` (Firebase authentication state), `<ThemeProvider>` (theme colors setup), `<ToastProvider>` (toast alert controls), and `<CursorProvider>` (custom mouse cursor effects).
2.  **`src/App.tsx`**: Root layout. Integrates `<QueryClientProvider>` (React Query) and `<BrowserRouter>` (React Router). Wraps routes with `<CartProvider>` and `<WishlistProvider>`.
    *   Defines **Public Routes**: `/` (Home), `/shop` (Product Listing), `/shop/:slug` (Product Details), `/cart` (Cart Page), `/collections`, `/collections/:category`, `/login`, `/register`, `/about`.
    *   Defines **Protected Routes** (wrapped in `<ProtectedRoute>`): `/checkout`, `/order-success`, `/profile`, `/orders`, `/wishlist`, `/account/profile`.
3.  **`src/components/auth/firebase.ts`**: Initializes the client-side Firebase App using config values from environment variables (`VITE_FIREBASE_API_KEY`, etc.) and exports the `auth` instance.

---

### B. Global State & Context Providers (`src/context/`)
The frontend is currently built to function autonomously using local state and `localStorage`. For backend integration, these files must be updated to trigger backend database syncs.

1.  **`AuthContext.tsx` (in `src/context/`)**:
    *   Maps the active Firebase User to an internal `AuthUser` profile object (`id` maps to `uid`, role is default `CUSTOMER`).
    *   Exposes `getToken()`, which returns the Firebase client's ID Token (`firebaseUser.getIdToken()`). This token should be sent in the HTTP Headers (`Authorization: Bearer <token>`) for all secure backend API requests.
2.  **`AuthContext.tsx` (in `src/components/auth/`)**:
    *   Contains the actual Firebase Authentication bindings.
    *   Handles `onAuthStateChanged` to resolve session, `signInWithEmailAndPassword` (`login`), `createUserWithEmailAndPassword` (`register`), `GoogleAuthProvider` popup (`loginGoogle`), and `signOut` (`logout`).
3.  **`CartContext.tsx`**:
    *   Uses a `cartReducer` to manage an array of `CartItem` elements.
    *   Exposes helpers: `addItem()`, `removeItem()`, `updateQty()`, `clearCart()`, `openDrawer()`, `closeDrawer()`.
    *   Calculates derived totals: `totalItems` and `totalPrice`.
    *   **Current Sync**: Saves cart contents to `localStorage` under `blum_cart_${userId}` (or `blum_cart_guest`).
4.  **`WishlistContext.tsx`**:
    *   Uses a reducer to store saved items. Exposes `toggle()`, `addItem()`, `removeItem()`, `clear()`, `isWishlisted()`.
    *   **Current Sync**: Saves to `localStorage` under `blum_wishlist_${userId}` (or `blum_wishlist_guest`).

---

### C. Pages & UI Flows (`src/pages/`)

#### 1. Home (`src/pages/Home/`)
*   **`Home.tsx`**: Assembles the homepage.
*   **`HomeHero.tsx`**: Elegant GSAP/Framer Motion animated landing slide showcasing brand aesthetic.
*   **`HomeCategories.tsx`**: Quick links pointing to `/collections/:category`.
*   **`HomeFeaturedProducts.tsx`**: Displays featured product cards. Uses products defined statically.

#### 2. Shop (`src/pages/Shop/`)
*   **`Shop.tsx`**: Displays the product catalogue. Pulls filter state from `useShopFilters.ts` and maps products from `shopData.ts`.
*   **`ShopFiltersPanel.tsx` / `ShopSidebar.tsx`**: Filter items by Category (Skincare, Beauty, Wellness), Tag (serum, hydration, SPF, etc.), and Price range slider.
*   **`ShopToolbar.tsx`**: Handles sorting options (Price Low-High, High-Low, Best Rated, Most Reviewed, Featured) and Grid/List layout toggle.
*   **`shopData.ts`**: Contains mock products (`ALL_PRODUCTS`) containing details like `bg` (background color for card cards), rating, category name, badge, and tags.

#### 3. Product Details (`src/pages/ProductPage/`)
*   **`ProductPage.tsx`**: Displays detailed information of a single product based on the `:slug` URL parameter.
*   **`ProductImageGallery.tsx`**: Renders product images with thumbnails.
*   **`ProductInfo.tsx` / `ProductActions.tsx`**: Handles sizing options, quantity inputs, and add-to-cart/wishlist triggers.
*   **`ProductTabs.tsx`**: Renders tabs:
    *   *Details*: Description & Bulleted list of benefits.
    *   *How to Use*: Clear text instructions.
    *   *Reviews*: List of client ratings and reviews.
*   **`productData.ts`**: Contains detailed mock schemas (`MOCK_PRODUCTS`) for single products including their benefits, sizes, images, and reviews arrays.

#### 4. Multi-Step Checkout (`src/pages/Checkout/`)
*   **`Checkout.tsx`**: Orchestrates the order placement wizard:
    *   *Step 1: Shipping* (`ShippingStep.tsx`) — Collects user email, delivery address, and telephone number.
    *   *Step 2: Payment* (`PaymentStep.tsx`) — Input card details (dummy inputs).
    *   *Step 3: Review* (`ReviewStep.tsx`) — Confirms address details, item list, and totals before placing the order.
*   **Order Creation**:
    *   On placing order, it mocks a network delay, generates an order ID (`ORD-XXXXXX`), formats the checkout payload, appends the order to `localStorage` under `blum_orders_${userId}`, clears the cart, and redirects to `/order-success`.
*   **`validation.ts`**: Handles regex format validation for inputs before allowing step progression.

#### 5. Profile & Order History (`src/pages/Profile/` & `src/pages/Orders/`)
*   **`Profile.tsx`**: Multi-tab user dashboard:
    *   *Account Details*: Form modifying user name (triggers Firebase `updateProfile` for display name).
    *   *Security*: Form updating password (reauthenticates user and calls Firebase `updatePassword`).
    *   *Orders & Wishlist tabs*: Display components pointing to the user's order lists and wishlist contexts.
*   **`Orders.tsx`**: Reads order records from `localStorage` under `blum_orders_${userId}` (or `_guest`) and maps them using `OrderCard.tsx`.

---

## 5. Backend Integration Plan

To build the backend for this app, your server needs to handle these core domains. You can build these APIs using Node.js/Express, Next.js API routes, or Fastify.

### A. Authentication & User Sync
*   **How Auth Works**: The frontend handles authentication directly with Firebase. On successful registration or login, the client receives a Firebase token.
*   **Database Sync (User Upsert)**:
    *   Create a backend endpoint `POST /api/users/sync`.
    *   Whenever a user signs in/up, the frontend will call this endpoint, sending their Firebase token.
    *   The backend must verify the Firebase ID Token (using `firebase-admin` SDK), extract the `uid`, `email`, and `name`, and upsert this user in the MySQL database (using Prisma `prisma.user.upsert`).

### B. Authorization Middleware
*   Secure endpoints (Cart sync, Wishlist sync, Checkout, Order history, Address management) must require an `Authorization: Bearer <firebase_id_token>` header.
*   Backend middleware flow:
    1. Extract token from header.
    2. Validate token using `admin.auth().verifyIdToken(token)`.
    3. Attach the validated `uid` and user details to the request object.
    4. Query your database using the user's `id` mapping to Firebase `uid`.

### C. Suggested API Endpoints to Implement

#### 1. Products & Categories
*   `GET /api/categories` -> Returns all categories from the `Category` table.
*   `GET /api/products` -> Returns products from the `Product` table.
    *   Support query parameters: `category` (slug/name), `search` (text search against name/description), `sort` (featured, price-asc, price-desc, rating, reviews), and pagination.
*   `GET /api/products/:slug` -> Returns full details of a product, including its reviews list, images list, benefits, and sizes.

#### 2. Cart Syncing (Replacing LocalStorage)
Currently, `CartContext.tsx` handles cart operations in `localStorage`. You should create endpoints to sync the cart state to the database so carts survive across devices:
*   `GET /api/cart` (Authorized) -> Retrieve current user's `CartItem` rows.
*   `POST /api/cart` (Authorized) -> Add a product to the cart or increment quantity (creates/updates `CartItem` row).
*   `PUT /api/cart/:productId` (Authorized) -> Update the quantity of a specific item.
*   `DELETE /api/cart/:productId` (Authorized) -> Remove an item from the user's cart.
*   `DELETE /api/cart` (Authorized) -> Clear the user's cart.

#### 3. Wishlist Syncing (Replacing LocalStorage)
*   `GET /api/wishlist` (Authorized) -> Returns list of products saved in `WishlistItem` table.
*   `POST /api/wishlist` (Authorized) -> Adds a product to `WishlistItem`.
*   `DELETE /api/wishlist/:productId` (Authorized) -> Removes a product.

#### 4. Checkout & Orders
*   `POST /api/orders` (Authorized) -> Place an order.
    *   *Payload*: Shipping address fields (`street`, `city`, `state`, `zip`, `country`), list of items/quantities, billing/payment token/method.
    *   *Backend Logic (Transactional)*:
        1. Find or create the `Address` record for the user.
        2. Create an `Order` record in state `PENDING` or `CONFIRMED`.
        3. Insert `OrderItem` records matching the products and quantities.
        4. Calculate total amount, apply any discounts.
        5. Process payment (create a `Payment` record).
        6. Reduce the `stock` amount of each purchased `Product`.
        7. Clear the user's database `CartItem` entries.
        8. Return the created Order details.
*   `GET /api/orders` (Authorized) -> Returns the authenticated user's order history (`Order` join `OrderItem` join `Product`).
*   `GET /api/orders/:id` (Authorized) -> Returns details for a specific order.

#### 5. Reviews
*   `POST /api/products/:id/reviews` (Authorized) -> Create a product review (saves rating 1-5, title, body to `Review` table).
*   `DELETE /api/reviews/:id` (Authorized) -> Allow a user to remove their review.

---

## 6. Frontend to Backend Code Adjustments (Quick Tips)

*   **Replacing Static Data**: When you build the product listing routes, replace the static arrays `ALL_PRODUCTS` inside `src/pages/Shop/Shop.tsx` and `MOCK_PRODUCTS` inside `src/pages/ProductPage/ProductPage.tsx` with TanStack `useQuery` calls pointing to `/api/products` and `/api/products/${slug}`.
*   **Integrating Cart & Wishlist**: In `CartContext.tsx` and `WishlistContext.tsx`, you can trigger `useMutation` hooks when users add/remove items. If the user is logged in, sync changes to `/api/cart` / `/api/wishlist`. If guest, fallback to local storage.
*   **Order Submissions**: In `Checkout.tsx`, update the `handlePlaceOrder` function to perform a `POST` request to `/api/orders` sending the active cart items and shipping inputs, then navigate to `/order-success` passing the server-returned order object.
