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
  { id:"1",  name:"Radiance Serum",       price:68,  salePrice:null, collection:"skincare", badge:"Best Seller", bg:"#F5DDD0", image:"/images/products/radiance-serum.png", slug:"radiance-serum"       },
  { id:"2",  name:"Glow Face Mist",       price:42,  salePrice:35,   collection:"skincare", badge:"Sale",        bg:"#D0E8F5", image:"/images/products/glow-face-mist.png", slug:"glow-face-mist"        },
  { id:"4",  name:"Rose Toner",           price:38,  salePrice:null, collection:"skincare", badge:null,          bg:"#F5D0E8", image:"/images/products/rose-toner.png", slug:"rose-toner"            },
  { id:"5",  name:"Cloud Cream SPF 30",   price:72,  salePrice:null, collection:"skincare", badge:"New",         bg:"#EDE0F5", image:"/images/products/cloud-cream-spf.png", slug:"cloud-cream-spf"       },
  { id:"7",  name:"Deep Clean Mask",      price:48,  salePrice:null, collection:"skincare", badge:null,          bg:"#D0F5E8", image:"/images/products/deep-clean-mask.png", slug:"deep-clean-mask"       },
  { id:"8",  name:"Vitamin C Booster",    price:85,  salePrice:null, collection:"skincare", badge:"Best Seller", bg:"#F5F0D0", image:"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", slug:"vitamin-c-booster"     },
  { id:"9",  name:"Overnight Recovery",   price:92,  salePrice:75,   collection:"skincare", badge:"Sale",        bg:"#E8D0F5", image:"https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop", slug:"overnight-recovery"    },
  { id:"11", name:"Hydra Boost Essence",  price:65,  salePrice:null, collection:"skincare", badge:null,          bg:"#F5D8D0", image:"https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop", slug:"hydra-boost-essence"   },
  { id:"6",  name:"Lip Treatment Set",    price:34,  salePrice:28,   collection:"beauty",   badge:"Sale",        bg:"#F5EDD0", image:"/images/products/lip-treatment-set.png", slug:"lip-treatment-set"     },
  { id:"10", name:"Calming Eye Cream",    price:58,  salePrice:null, collection:"beauty",   badge:"New",         bg:"#D0EAF5", image:"https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop", slug:"calming-eye-cream"     },
  { id:"3",  name:"Velvet Body Butter",   price:55,  salePrice:null, collection:"wellness", badge:"New",         bg:"#D5EDD5", image:"/images/products/velvet-body-butter.png", slug:"velvet-body-butter"    },
  { id:"12", name:"Wellness Bundle",      price:120, salePrice:99,   collection:"wellness", badge:"Sale",        bg:"#D0F5D0", image:"https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop", slug:"wellness-bundle"       },
  { id:"13", name:"Glow Gift Set",        price:95,  salePrice:null, collection:"gifts",    badge:"New",         bg:"#EDE0F5", image:"https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop", slug:"glow-gift-set"         },
  { id:"14", name:"Skincare Starter Kit", price:75,  salePrice:null, collection:"gifts",    badge:null,          bg:"#F5DDD0", image:"https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop", slug:"skincare-starter-kit"  },
];

export const CARD_FADE_UP_VARIANT = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] },
  },
};