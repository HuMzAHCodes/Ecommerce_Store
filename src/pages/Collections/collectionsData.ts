export interface CollectionProduct {
  id:         string;
  name:       string;
  price:      number;
  salePrice:  number | null;
  collection: string;
  badge:      string | null;
  bg:         string;
  slug:       string;
}

export interface CollectionMeta {
  label:       string;
  emoji:       string;
  description: string;
  banner:      string;
}

export const COLLECTION_META: Record<string, CollectionMeta> = {
  skincare: {
    label:       "Skincare",
    emoji:       "🌿",
    description: "Clean, effective skincare formulated for every skin type. No harmful chemicals. Just results.",
    banner:      "#F5DDD0",
  },
  beauty: {
    label:       "Beauty",
    emoji:       "✨",
    description: "Effortless beauty essentials that enhance your natural glow — minimal effort, maximum radiance.",
    banner:      "#F5D0E8",
  },
  wellness: {
    label:       "Wellness",
    emoji:       "🫧",
    description: "Feel-good rituals for body and mind. Clean ingredients that nourish from the outside in.",
    banner:      "#D5EDD5",
  },
  gifts: {
    label:       "Gift Sets",
    emoji:       "🎁",
    description: "Beautifully curated sets for every occasion. The perfect gift — for someone special, or yourself.",
    banner:      "#EDE0F5",
  },
};

export const COLLECTION_TABS = ["skincare", "beauty", "wellness", "gifts"];

export const ALL_COLLECTION_PRODUCTS: CollectionProduct[] = [
  { id:"1",  name:"Radiance Serum",       price:68,  salePrice:null, collection:"skincare", badge:"Best Seller", bg:"#F5DDD0", slug:"radiance-serum"       },
  { id:"2",  name:"Glow Face Mist",       price:42,  salePrice:35,   collection:"skincare", badge:"Sale",        bg:"#D0E8F5", slug:"glow-face-mist"        },
  { id:"4",  name:"Rose Toner",           price:38,  salePrice:null, collection:"skincare", badge:null,          bg:"#F5D0E8", slug:"rose-toner"            },
  { id:"5",  name:"Cloud Cream SPF 30",   price:72,  salePrice:null, collection:"skincare", badge:"New",         bg:"#EDE0F5", slug:"cloud-cream-spf"       },
  { id:"7",  name:"Deep Clean Mask",      price:48,  salePrice:null, collection:"skincare", badge:null,          bg:"#D0F5E8", slug:"deep-clean-mask"       },
  { id:"8",  name:"Vitamin C Booster",    price:85,  salePrice:null, collection:"skincare", badge:"Best Seller", bg:"#F5F0D0", slug:"vitamin-c-booster"     },
  { id:"9",  name:"Overnight Recovery",   price:92,  salePrice:75,   collection:"skincare", badge:"Sale",        bg:"#E8D0F5", slug:"overnight-recovery"    },
  { id:"11", name:"Hydra Boost Essence",  price:65,  salePrice:null, collection:"skincare", badge:null,          bg:"#F5D8D0", slug:"hydra-boost-essence"   },
  { id:"6",  name:"Lip Treatment Set",    price:34,  salePrice:28,   collection:"beauty",   badge:"Sale",        bg:"#F5EDD0", slug:"lip-treatment-set"     },
  { id:"10", name:"Calming Eye Cream",    price:58,  salePrice:null, collection:"beauty",   badge:"New",         bg:"#D0EAF5", slug:"calming-eye-cream"     },
  { id:"3",  name:"Velvet Body Butter",   price:55,  salePrice:null, collection:"wellness", badge:"New",         bg:"#D5EDD5", slug:"velvet-body-butter"    },
  { id:"12", name:"Wellness Bundle",      price:120, salePrice:99,   collection:"wellness", badge:"Sale",        bg:"#D0F5D0", slug:"wellness-bundle"       },
  { id:"13", name:"Glow Gift Set",        price:95,  salePrice:null, collection:"gifts",    badge:"New",         bg:"#EDE0F5", slug:"glow-gift-set"         },
  { id:"14", name:"Skincare Starter Kit", price:75,  salePrice:null, collection:"gifts",    badge:null,          bg:"#F5DDD0", slug:"skincare-starter-kit"  },
];

export const CARD_FADE_UP_VARIANT = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] },
  },
};