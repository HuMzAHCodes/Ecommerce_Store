export interface Product {
  id:        string;
  name:      string;
  price:     number;
  salePrice: number | null;
  category:  string;
  badge:     string | null;
  bg:        string;
  slug:      string;
  tags:      string[];
  rating:    number;
  reviews:   number;
}

export const ALL_PRODUCTS: Product[] = [
  { id:"1",  name:"Radiance Serum",      price:68,  salePrice:null, category:"Skincare", badge:"Best Seller", bg:"#FFEFB3", slug:"radiance-serum",      tags:["serum","glow"],        rating:4.9, reviews:312 },
  { id:"2",  name:"Glow Face Mist",      price:42,  salePrice:35,   category:"Skincare", badge:"Sale",        bg:"#C5E8E3", slug:"glow-face-mist",       tags:["mist","hydration"],    rating:4.7, reviews:198 },
  { id:"3",  name:"Velvet Body Butter",  price:55,  salePrice:null, category:"Wellness", badge:"New",         bg:"#FFF5D0", slug:"velvet-body-butter",   tags:["body","moisturizer"],  rating:4.8, reviews:145 },
  { id:"4",  name:"Rose Toner",          price:38,  salePrice:null, category:"Skincare", badge:null,          bg:"#A8D9D2", slug:"rose-toner",           tags:["toner","rose"],        rating:4.6, reviews:89  },
  { id:"5",  name:"Cloud Cream SPF 30",  price:72,  salePrice:null, category:"Skincare", badge:"New",         bg:"#FFF9E8", slug:"cloud-cream-spf",      tags:["spf","moisturizer"],   rating:4.9, reviews:267 },
  { id:"6",  name:"Lip Treatment Set",   price:34,  salePrice:28,   category:"Beauty",   badge:"Sale",        bg:"#E6F4F2", slug:"lip-treatment-set",    tags:["lips","set"],          rating:4.5, reviews:73  },
  { id:"7",  name:"Deep Clean Mask",     price:48,  salePrice:null, category:"Skincare", badge:null,          bg:"#B8E8E3", slug:"deep-clean-mask",      tags:["mask","cleansing"],    rating:4.7, reviews:156 },
  { id:"8",  name:"Vitamin C Booster",   price:85,  salePrice:null, category:"Skincare", badge:"Best Seller", bg:"#FFF0B8", slug:"vitamin-c-booster",    tags:["vitamin-c","serum"],   rating:4.8, reviews:421 },
  { id:"9",  name:"Overnight Recovery",  price:92,  salePrice:75,   category:"Skincare", badge:"Sale",        bg:"#9ECFC6", slug:"overnight-recovery",   tags:["night","repair"],      rating:4.9, reviews:203 },
  { id:"10", name:"Calming Eye Cream",   price:58,  salePrice:null, category:"Beauty",   badge:"New",         bg:"#D4EDE8", slug:"calming-eye-cream",    tags:["eyes","sensitive"],    rating:4.6, reviews:88  },
  { id:"11", name:"Hydra Boost Essence", price:65,  salePrice:null, category:"Skincare", badge:null,          bg:"#F5F8C0", slug:"hydra-boost-essence",  tags:["essence","hydration"], rating:4.7, reviews:134 },
  { id:"12", name:"Wellness Bundle",     price:120, salePrice:99,   category:"Wellness", badge:"Sale",        bg:"#8BC4BC", slug:"wellness-bundle",      tags:["bundle","set"],        rating:4.9, reviews:67  },
];

export const CATEGORIES = ["All", "Skincare", "Beauty", "Wellness"];

export const SORT_OPTIONS = [
  { label: "Featured",        value: "featured"   },
  { label: "Price: Low–High", value: "price-asc"  },
  { label: "Price: High–Low", value: "price-desc" },
  { label: "Best Rated",      value: "rating"     },
  { label: "Most Reviewed",   value: "reviews"    },
];

export const CARD_FADE_UP_VARIANT = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] },
  },
};