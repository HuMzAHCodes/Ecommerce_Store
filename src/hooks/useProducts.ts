import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import type { Product } from "../pages/Shop/shopData";
import type { ProductDetail, ProductReview } from "../pages/ProductPage/productData";

// ── Raw API shapes ────────────────────────────────────────────

interface ApiReview {
  id:        string;
  rating:    number;
  title:     string | null;
  body:      string;
  createdAt: string;
  user: {
    id:     string;
    name:   string | null;
    avatar: string | null;
  };
}

interface ApiProduct {
  id:           string;
  name:         string;
  slug:         string;
  description:  string;
  price:        number;
  salePrice:    number | null;
  stock:        number;
  images:       string[];   // already parsed by backend mapProduct
  tags:         string[];   // already parsed by backend mapProduct
  isActive:     boolean;
  category:     { id: string; name: string; slug: string };
  reviews?:     ApiReview[];
  averageRating?: number;
  reviewCount?:   number;
}

interface ApiProductsResponse {
  products: ApiProduct[];
  total:    number;
  page:     number;
  limit:    number;
  pages:    number;
}

// ── Mappers ───────────────────────────────────────────────────

// Maps API product → Shop Product (card shape)
export function toShopProduct(p: ApiProduct): Product {
  return {
    id:        p.id,
    name:      p.name,
    slug:      p.slug,
    price:     p.price,
    salePrice: p.salePrice,
    category:  p.category.name,
    badge:     null,          // derive below
    bg:        "#FFEFB3",     // fallback bg — no DB field, keep static
    image:     p.images[0] ?? "",
    tags:      p.tags,
    rating:    p.averageRating ?? 0,
    reviews:   p.reviewCount   ?? 0,
  };
}

// Maps API product → ProductDetail (detail page shape)
// images come as string[] from backend; ProductDetail expects ProductImage[]
export function toProductDetail(p: ApiProduct): ProductDetail {
  const reviews: ProductReview[] = (p.reviews ?? []).map((r) => ({
    id:     r.id,
    name:   r.user.name ?? "Anonymous",
    rating: r.rating,
    date:   new Date(r.createdAt).toLocaleDateString("en-US", {
              month: "short", year: "numeric",
            }),
    body:   r.body,
  }));

  return {
    id:          p.id,
    name:        p.name,
    slug:        p.slug,
    price:       p.price,
    salePrice:   p.salePrice,
    category:    p.category.name,
    badge:       null,
    description: p.description,
    benefits:    [],          // not stored in DB — keep static per product or leave empty
    howToUse:    "",          // same — add a DB field later if needed
    images:      p.images.map((url, i) => ({ bg: url, label: `Image ${i + 1}` })),
    reviews,
    sizes:       ["15ml", "30ml", "50ml"],  // no DB field yet — keep static
  };
}

// ── Hooks ─────────────────────────────────────────────────────

export interface ProductsParams {
  page?:      number;
  limit?:     number;
  category?:  string;
  search?:    string;
  minPrice?:  number;
  maxPrice?:  number;
  sortBy?:    "price" | "createdAt" | "name";
  sortOrder?: "asc" | "desc";
}

export function useProducts(params?: ProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn:  async () => {
      const { data } = await api.get<{ status: string; data: ApiProductsResponse }>(
        "/api/products",
        { params }
      );
      return {
        ...data.data,
        products: data.data.products.map(toShopProduct),
      };
    },
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn:  async () => {
      const { data } = await api.get<{ status: string; data: ApiProduct }>(
        `/api/products/${slug}`
      );
      return toProductDetail(data.data);
    },
    enabled:   !!slug,
    staleTime: 1000 * 60 * 5,
  });
}
