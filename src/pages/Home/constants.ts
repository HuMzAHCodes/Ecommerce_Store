import { createElement } from "react";
import { Sparkles, Truck, RotateCcw, Shield } from "lucide-react";

export type Category = {
  label: string;
  href: string;
  image: string;
  desc: string;
};

export type FeaturedProduct = {
  id:        string;
  name:      string;
  price:     number;
  salePrice: number | null;
  badge:     string | null;
  bg:        string;
  image:     string;
  slug:      string;
};

export type Perk = {
  icon:  React.ReactNode;
  title: string;
  desc:  string;
};

export const CATEGORIES: Category[] = [
  {
    label: "Skincare",
    href: "/collections/skincare",
    image: "/images/products/skincare/skincare.jpeg",
    desc: "Clean formulas",
  },
  {
    label: "Beauty",
    href: "/collections/beauty",
    image: "/images/products/beauty/beauty.jpeg",
    desc: "Effortless glow",
  },
  {
    label: "Wellness",
    href: "/collections/wellness",
    image: "/images/products/wellness/wellness.jpeg",
    desc: "Feel-good rituals",
  },
  {
    label: "Gift Sets",
    href: "/collections/gifts",
    image:  "/images/products/gift-sets/gift-sets.jpeg",
    desc: "Beautifully curated",
  },
];

export const FEATURED: FeaturedProduct[] = [
  { id: "1", name: "Radiance Serum",     price: 68, salePrice: null, badge: "Best Seller", bg: "#FFEFB3", image: "/images/products/radiance-serum/radiance-serum.jpeg", slug: "radiance-serum" },
  { id: "2", name: "Glow Face Mist",     price: 42, salePrice: 35,  badge: "Sale",        bg: "#C5E8E3", image: "/images/products/glow-face-mist/glow-face-mist.jpeg", slug: "glow-face-mist" },
  { id: "3", name: "Velvet Body Butter", price: 55, salePrice: null, badge: "New",         bg: "#FFF5D0", image: "/images/products/velvet-body-butter/velvet-body-butter.jpeg", slug: "velvet-body-butter" },
  { id: "4", name: "Rose Toner",         price: 38, salePrice: null, badge: null,          bg: "#A8D9D2", image: "/images/products/rose-toner/rose-toner.jpeg", slug: "rose-toner" },
  { id: "5", name: "Cloud Cream SPF 30", price: 72, salePrice: null, badge: "New",         bg: "#FFF9E8", image: "/images/products/could-cream-spf/cloud-cream-spf.jpeg", slug: "cloud-cream-spf" },
  { id: "6", name: "Lip Treatment Set",  price: 34, salePrice: 28,  badge: "Sale",        bg: "#E6F4F2", image: "/images/products/lip-treatment-set/lip-treatment-set.jpeg", slug: "lip-treatment-set" },
  { id: "7", name: "Deep Clean Mask",    price: 48, salePrice: null, badge: null,          bg: "#B8E8E3", image: "/images/products/deep-clean-mask/deep-clean-mask.jpeg",         slug: "deep-clean-mask",    },
{ id: "8", name: "Vitamin C Booster",  price: 85, salePrice: null, badge: "Best Seller", bg: "#FFF0B8", image: "/images/products/vitamin-c-booster/vitamin-c-booster.jpeg",     slug: "vitamin-c-booster",  },
{ id: "9", name: "Overnight Recovery", price: 92, salePrice: 75,  badge: "Sale",        bg: "#9ECFC6", image: "/images/products/overnight-recovery/overnight-recovery.jpeg",   slug: "overnight-recovery", },
];

export const PERKS: Perk[] = [
  { icon: createElement(Truck,     { size: 22 }), title: "Free Shipping",        desc: "On all orders over $50"     },
  { icon: createElement(RotateCcw, { size: 22 }), title: "Easy Returns",         desc: "30-day hassle-free returns" },
  { icon: createElement(Shield,    { size: 22 }), title: "Clean Ingredients",    desc: "No harmful chemicals, ever" },
  { icon: createElement(Sparkles,  { size: 22 }), title: "Dermatologist Tested", desc: "Safe for all skin types"    },
];

/** Avatar background colors used in the hero social proof row */
export const AVATAR_COLORS = ["#FFEFB3", "#C5E8E3", "#FFF5D0", "#A8D9D2"];
