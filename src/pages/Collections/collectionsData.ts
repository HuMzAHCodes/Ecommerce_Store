export interface CollectionProduct {
  id:         string;
  name:       string;
  price:      number;
  salePrice:  number | null;
  collection: string;
  badge:      string | null;
  bg:         string;
  image:      string;
  slug:       string;
}

export interface CollectionMeta {
  label:       string;
  emoji:       string;
  description: string;
  banner:      string;
  // ADDED: actual hero image path for the banner section
  image:       string;
}

export const COLLECTION_META: Record<string, CollectionMeta> = {
  skincare: {
    label:       "Skincare",
    emoji:       "🌿",
    description: "Clean, effective skincare formulated for every skin type. No harmful chemicals. Just results.",
    banner:      "#F5DDD0",
    image:       "/images/products/skincare/skincare-banner.webp",
  },
  beauty: {
    label:       "Beauty",
    emoji:       "✨",
    description: "Effortless beauty essentials that enhance your natural glow — minimal effort, maximum radiance.",
    banner:      "#F5D0E8",
    image:       "/images/products/beauty/beauty-banner.webp",
  },
  wellness: {
    label:       "Wellness",
    emoji:       "🫧",
    description: "Feel-good rituals for body and mind. Clean ingredients that nourish from the outside in.",
    banner:      "#D5EDD5",
    image:       "/images/products/wellness/wellness-banner.webp",
  },
  gifts: {
    label:       "Gift Sets",
    emoji:       "🎁",
    description: "Beautifully curated sets for every occasion. The perfect gift — for someone special, or yourself.",
    banner:      "#EDE0F5",
    image:       "/images/products/gift-sets/gift-sets-banner.webp",
  },
};

export const COLLECTION_TABS = ["skincare", "beauty", "wellness", "gifts"];

export const ALL_COLLECTION_PRODUCTS: CollectionProduct[] = [
  { id:"1",  name:"Radiance Serum",       price:68,  salePrice:null, collection:"skincare", badge:"Best Seller", bg:"#F5DDD0", image:"/images/products/radiance-serum/radiance-serum.webp",      slug:"radiance-serum"       },
  { id:"2",  name:"Glow Face Mist",       price:42,  salePrice:35,   collection:"skincare", badge:"Sale",        bg:"#D0E8F5", image:"/images/products/glow-face-mist/glow-face-mist.webp",      slug:"glow-face-mist"        },
  { id:"4",  name:"Rose Toner",           price:38,  salePrice:null, collection:"skincare", badge:null,          bg:"#F5D0E8", image:"/images/products/rose-toner/rose-toner.webp",           slug:"rose-toner"            },
  { id:"5",  name:"Cloud Cream SPF 30",   price:72,  salePrice:null, collection:"skincare", badge:"New",         bg:"#EDE0F5", image:"/images/products/could-cream-spf/cloud-cream-spf.webp",      slug:"cloud-cream-spf"       },
  { id:"7",  name:"Deep Clean Mask",      price:48,  salePrice:null, collection:"skincare", badge:null,          bg:"#D0F5E8", image:"/images/products/deep-clean-mask/deep-clean-mask.webp",      slug:"deep-clean-mask"       },
  { id:"8",  name:"Vitamin C Booster",    price:85,  salePrice:null, collection:"skincare", badge:"Best Seller", bg:"#F5F0D0", image:"/images/products/vitamin-c-booster/vitamin-c-booster.webp", slug:"vitamin-c-booster"     },
  { id:"9",  name:"Overnight Recovery",   price:92,  salePrice:75,   collection:"skincare", badge:"Sale",        bg:"#E8D0F5", image:"/images/products/overnight-recovery/overnight-recovery.webp", slug:"overnight-recovery"    },
  { id:"11", name:"Hydra Boost Essence",  price:65,  salePrice:null, collection:"skincare", badge:null,          bg:"#F5D8D0", image:"/images/products/hydra-boost-essence/hydra-boost-essence.webp", slug:"hydra-boost-essence"   },
  { id:"6",  name:"Lip Treatment Set",    price:34,  salePrice:28,   collection:"beauty",   badge:"Sale",        bg:"#F5EDD0", image:"/images/products/lip-treatment-set/lip-treatment-set.webp",    slug:"lip-treatment-set"     },
  { id:"10", name:"Calming Eye Cream",    price:58,  salePrice:null, collection:"beauty",   badge:"New",         bg:"#D0EAF5", image:"/images/products/calming-eye-cream/calming-eye-cream.webp", slug:"calming-eye-cream"     },
  { id:"3",  name:"Velvet Body Butter",   price:55,  salePrice:null, collection:"wellness", badge:"New",         bg:"#D5EDD5", image:"/images/products/velvet-body-butter/velvet-body-butter.webp",   slug:"velvet-body-butter"    },
  { id:"12", name:"Wellness Bundle",      price:120, salePrice:99,   collection:"wellness", badge:"Sale",        bg:"#D0F5D0", image:"/images/products/wellness-bundle/wellness-bundle.webp", slug:"wellness-bundle"       },
  { id:"13", name:"Glow Gift Set",        price:95,  salePrice:null, collection:"gifts",    badge:"New",         bg:"#EDE0F5", image:"/images/products/glow-gift-set/glow-gift-set.webp", slug:"glow-gift-set"         },
  { id:"14", name:"Skincare Starter Kit", price:75,  salePrice:null, collection:"gifts",    badge:null,          bg:"#F5DDD0", image:"/images/products/skincare-starter-kit/skincare-starter-kit.webp", slug:"skincare-starter-kit"  },
];

export const CARD_FADE_UP_VARIANT = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] },
  },
};
