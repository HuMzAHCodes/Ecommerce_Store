import { createElement } from "react";
import { Sparkles, Truck, RotateCcw, Shield } from "lucide-react";

export type Category = {
  label: string;
  href:  string;
  emoji: string;
  desc:  string;
};

export type FeaturedProduct = {
  id:        string;
  name:      string;
  price:     number;
  salePrice: number | null;
  badge:     string | null;
  bg:        string;
};

export type Perk = {
  icon:  React.ReactNode;
  title: string;
  desc:  string;
};

export const CATEGORIES: Category[] = [
  { label: "Skincare",  href: "/collections/skincare",  emoji: "🌿", desc: "Clean formulas"       },
  { label: "Beauty",    href: "/collections/beauty",    emoji: "✨", desc: "Effortless glow"      },
  { label: "Wellness",  href: "/collections/wellness",  emoji: "🫧", desc: "Feel-good rituals"    },
  { label: "Gift Sets", href: "/collections/gifts",     emoji: "🎁", desc: "Beautifully curated"  },
];

export const FEATURED: FeaturedProduct[] = [
  { id: "1", name: "Radiance Serum",     price: 68, salePrice: null, badge: "Best Seller", bg: "#FFEFB3" },
  { id: "2", name: "Glow Face Mist",     price: 42, salePrice: 35,  badge: "Sale",        bg: "#C5E8E3" },
  { id: "3", name: "Velvet Body Butter", price: 55, salePrice: null, badge: "New",         bg: "#FFF5D0" },
  { id: "4", name: "Rose Toner",         price: 38, salePrice: null, badge: null,          bg: "#A8D9D2" },
  { id: "5", name: "Cloud Cream SPF 30", price: 72, salePrice: null, badge: "New",         bg: "#FFF9E8" },
  { id: "6", name: "Lip Treatment Set",  price: 34, salePrice: 28,  badge: "Sale",        bg: "#E6F4F2" },
];

export const PERKS: Perk[] = [
  { icon: createElement(Truck,     { size: 22 }), title: "Free Shipping",        desc: "On all orders over $50"     },
  { icon: createElement(RotateCcw, { size: 22 }), title: "Easy Returns",         desc: "30-day hassle-free returns" },
  { icon: createElement(Shield,    { size: 22 }), title: "Clean Ingredients",    desc: "No harmful chemicals, ever" },
  { icon: createElement(Sparkles,  { size: 22 }), title: "Dermatologist Tested", desc: "Safe for all skin types"    },
];

/** Avatar background colors used in the hero social proof row */
export const AVATAR_COLORS = ["#FFEFB3", "#C5E8E3", "#FFF5D0", "#A8D9D2"];
