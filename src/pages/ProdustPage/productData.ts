export interface ProductReview {
  id:     string;
  name:   string;
  rating: number;
  date:   string;
  body:   string;
}

export interface ProductImage {
  bg:    string;
  label: string;
}

export interface ProductDetail {
  id:          string;
  name:        string;
  price:       number;
  salePrice:   number | null;
  category:    string;
  badge:       string | null;
  slug:        string;
  description: string;
  benefits:    string[];
  howToUse:    string;
  images:      ProductImage[];
  reviews:     ProductReview[];
  sizes:       string[];
}

export const MOCK_PRODUCTS: Record<string, ProductDetail> = {
  "radiance-serum": {
    id:          "1",
    name:        "Radiance Serum",
    price:       68,
    salePrice:   null,
    category:    "Skincare",
    badge:       "Best Seller",
    slug:        "radiance-serum",
    description: "A lightweight, fast-absorbing serum packed with Vitamin C and hyaluronic acid that visibly brightens, evens skin tone, and delivers lasting hydration. Formulated without parabens, sulfates, or artificial fragrances.",
    benefits: [
      "Visibly brightens in 2 weeks",
      "Evens skin tone",
      "24hr hydration",
      "Dermatologist tested",
      "Fragrance-free",
    ],
    howToUse: "Apply 3–4 drops to cleansed skin morning and evening. Gently pat into face and neck. Follow with moisturiser. Use SPF in the morning.",
    images: [
      { bg: "#FFEFB3", label: "Front"  },
      { bg: "#FFF5D0", label: "Side"   },
      { bg: "#C5E8E3", label: "Detail" },
    ],
    reviews: [
      { id: "r1", name: "Amara K.",  rating: 5, date: "May 2025", body: "Genuinely the best serum I've ever used. My skin is glowing after just two weeks." },
      { id: "r2", name: "Priya M.",  rating: 5, date: "Apr 2025", body: "Lightweight, absorbs fast, and my dark spots have faded noticeably."               },
      { id: "r3", name: "Sophie L.", rating: 4, date: "Mar 2025", body: "Love this. Wish the bottle was bigger for the price."                               },
    ],
    sizes: ["15ml", "30ml", "50ml"],
  },
};

export const DEFAULT_PRODUCT = Object.values(MOCK_PRODUCTS)[0];

export const PRODUCT_PERKS = [
  { text: "Free shipping on orders over $50" },
  { text: "30-day easy returns"              },
  { text: "Clean, dermatologist-tested formula" },
];

export type TabId = "details" | "how-to" | "reviews";

export const TABS: { id: TabId; label: string }[] = [
  { id: "details",  label: "Details"    },
  { id: "how-to",   label: "How to Use" },
  { id: "reviews",  label: "Reviews"    },
];