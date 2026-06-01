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
      { bg: "/images/products/radiance-serum/radiance-serum.jpeg", label: "Front"  },
      { bg: "/images/products/radiance-serum/radiance-serum-top.jpeg", label: "Texture" },
      { bg: "/images/products/radiance-serum/radiance-serum-side.jpeg", label: "Detail" },
    ],
    reviews: [
      { id: "r1", name: "Amara K.",  rating: 5, date: "May 2025", body: "Genuinely the best serum I've ever used. My skin is glowing after just two weeks." },
      { id: "r2", name: "Priya M.",  rating: 5, date: "Apr 2025", body: "Lightweight, absorbs fast, and my dark spots have faded noticeably."               },
      { id: "r3", name: "Sophie L.", rating: 4, date: "Mar 2025", body: "Love this. Wish the bottle was bigger for the price."                               },
    ],
    sizes: ["15ml", "30ml", "50ml"],
  },
  "glow-face-mist": {
    id:          "2",
    name:        "Glow Face Mist",
    price:       42,
    salePrice:   35,
    category:    "Skincare",
    badge:       "Sale",
    slug:        "glow-face-mist",
    description: "A refreshing face mist that hydrates, preps, and sets makeup. Infused with rosewater, aloe vera, and herbal extracts to soothe and revive dull skin instantly with a fine, refreshing spray.",
    benefits: [
      "Instantly refreshes and hydrates",
      "Soothes sensitive skin",
      "Can be used over or under makeup",
      "Rich in natural antioxidants",
      "Light, calming botanical scent",
    ],
    howToUse: "Mist onto face before skincare, after makeup application, or anytime throughout the day for an instant pick-me-up.",
    images: [
      { bg: "/images/products/glow-face-mist/glow-face-mist.jpeg", label: "Front" },
      { bg: "/images/products/glow-face-mist/glow-face-mist-top.jpeg", label: "top" },
       { bg: "/images/products/glow-face-mist/glow-face-mist-close.jpeg", label: "close" },
    ],
    reviews: [
      { id: "r4", name: "Emma T.", rating: 5, date: "May 2025", body: "Keep this on my desk and spray it all day long. Incredibly hydrating!" },
      { id: "r5", name: "Lucas M.", rating: 4, date: "Apr 2025", body: "Very fine mist, doesn't mess up makeup. Great soothing effect." },
    ],
    sizes: ["50ml", "100ml"],
  },
  "velvet-body-butter": {
    id:          "3",
    name:        "Velvet Body Butter",
    price:       55,
    salePrice:   null,
    category:    "Wellness",
    badge:       "New",
    slug:        "velvet-body-butter",
    description: "A rich, whipped body cream that melts into the skin to provide deep, lasting nourishment. Packed with shea butter, cocoa butter, and sweet almond oil to restore skin elasticity and softness.",
    benefits: [
      "Melts like butter, non-greasy finish",
      "Locks in moisture for 48 hours",
      "Improves skin elasticity",
      "Delicious vanilla-almond scent",
      "100% organic, vegan formula",
    ],
    howToUse: "Massage generously into clean skin all over the body, paying extra attention to dry areas like elbows and knees.",
    images: [
      { bg: "/images/products/velvet-body-butter/velvet-body-butter.jpeg", label: "Front" },
      { bg: "/images/products/velvet-body-butter/velvet-body-butter-top.jpeg", label: "top" },
      { bg: "/images/products/velvet-body-butter/velvet-body-butter-close.jpeg", label: "close" },
    ],
    reviews: [
      { id: "r6", name: "Sarah L.", rating: 5, date: "May 2025", body: "Honestly feels like velvet. Smells incredible too!" },
    ],
    sizes: ["100ml", "200ml"],
  },
  "rose-toner": {
    id:          "4",
    name:        "Rose Toner",
    price:       38,
    salePrice:   null,
    category:    "Skincare",
    badge:       null,
    slug:        "rose-toner",
    description: "A gentle, alcohol-free toner crafted with pure rose hydrosol and witch hazel to balance pH, refine pores, and prepare skin for serum absorption. Suitable for all skin types.",
    benefits: [
      "Alcohol-free and non-drying",
      "Balances skin pH levels",
      "Helps tighten and refine pores",
      "Prepares skin for serums",
    ],
    howToUse: "After cleansing, sweep over face and neck using a cotton pad, or pat directly into the skin using clean hands.",
    images: [
      { bg: "/images/products/rose-toner/rose-toner.jpeg", label: "Front" },
      { bg: "/images/products/rose-toner/rose-toner-top.jpeg", label: "top" },
      { bg: "/images/products/rose-toner/rose-toner-close.jpeg", label: "close" },
    ],
    reviews: [
      { id: "r7", name: "Diana B.", rating: 5, date: "Mar 2025", body: "Super gentle and smells like real roses. My skin loves this." },
    ],
    sizes: ["120ml"],
  },
  "cloud-cream-spf": {
    id:          "5",
    name:        "Cloud Cream SPF 30",
    price:       72,
    salePrice:   null,
    category:    "Skincare",
    badge:       "New",
    slug:        "cloud-cream-spf",
    description: "A fluffy, cloud-like daily moisturizer that provides high-performing SPF 30 broad-spectrum protection. Leaves absolutely zero white cast and creates a perfect hydrating base for makeup.",
    benefits: [
      "SPF 30 broad-spectrum protection",
      "Ultra-lightweight, whipped cream texture",
      "No greasy residue or white cast",
      "Hydrates with hyaluronic acid",
    ],
    howToUse: "Apply generously to face and neck 15 minutes before sun exposure as the final step of your morning skincare routine.",
    images: [
      { bg: "/images/products/cloud-cream-spf.png", label: "Front" },
    ],
    reviews: [
      { id: "r8", name: "Jessica K.", rating: 5, date: "May 2025", body: "Finally an SPF that doesn't break me out! Lightweight and invisible." },
    ],
    sizes: ["50ml"],
  },
  "lip-treatment-set": {
    id:          "6",
    name:        "Lip Treatment Set",
    price:       34,
    salePrice:   28,
    category:    "Beauty",
    badge:       "Sale",
    slug:        "lip-treatment-set",
    description: "A nourishing lip set featuring our conditioning day balm and a repairing overnight lip mask. Restores chapped lips to pillow-soft hydration.",
    benefits: [
      "Includes both daytime balm and night mask",
      "Rich in natural oils and berry extracts",
      "Deeply hydrates and prevents chapping",
      "Delivers a soft, healthy shine",
    ],
    howToUse: "Use the day balm throughout the day as needed. Apply a generous layer of the night mask before bed to wake up to soft, plump lips.",
    images: [
      { bg: "/images/products/lip-treatment-set.png", label: "Front" },
    ],
    reviews: [
      { id: "r9", name: "Celine W.", rating: 5, date: "Apr 2025", body: "My dry lips were healed in one night. This set is a absolute must-have." },
    ],
    sizes: ["Set of 2"],
  },
  "deep-clean-mask": {
    id:          "7",
    name:        "Deep Clean Mask",
    price:       48,
    salePrice:   null,
    category:    "Skincare",
    badge:       null,
    slug:        "deep-clean-mask",
    description: "A clarifying clay mask formulated with French green clay and botanical extracts. Unclogs pores, absorbs excess oil, and gently exfoliates without stripping moisture.",
    benefits: [
      "Draws out impurities and absorbs sebum",
      "Refines pores and skin texture",
      "Non-drying clay formula",
      "Infused with soothing green tea extract",
    ],
    howToUse: "Apply an even layer to clean skin, avoiding the eye area. Leave on for 10 minutes until dry. Rinse thoroughly with warm water.",
    images: [
      { bg: "/images/products/deep-clean-mask.png", label: "Front" },
    ],
    reviews: [
      { id: "r10", name: "Nathan S.", rating: 5, date: "May 2025", body: "My skin feels so clean and smooth after using this. Doesn't feel tight at all." },
    ],
    sizes: ["75ml"],
  },
  "vitamin-c-booster": {
    id:          "8",
    name:        "Vitamin C Booster",
    price:       85,
    salePrice:   null,
    category:    "Skincare",
    badge:       "Best Seller",
    slug:        "vitamin-c-booster",
    description: "A highly concentrated Vitamin C booster designed to target dark spots, hyperpigmentation, and dull skin. Revitalizes skin radiance and boosts collagen production.",
    benefits: [
      "15% active Vitamin C complex",
      "Targets dark spots and hyperpigmentation",
      "Boosts skin radiance and firmness",
      "Packed with nourishing antioxidants",
    ],
    howToUse: "Mix 1–2 drops into your serum or moisturizer, or apply directly to clean skin before heavier creams.",
    images: [
      { bg: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", label: "Front" },
    ],
    reviews: [
      { id: "r11", name: "Rachel F.", rating: 5, date: "May 2025", body: "This is a miracle worker. My acne scars faded so fast." },
    ],
    sizes: ["15ml", "30ml"],
  },
  "overnight-recovery": {
    id:          "9",
    name:        "Overnight Recovery",
    price:       92,
    salePrice:   75,
    category:    "Skincare",
    badge:       "Sale",
    slug:        "overnight-recovery",
    description: "An ultra-nourishing nighttime facial oil that works overnight to restore the skin barrier, calm redness, and lock in deep moisture.",
    benefits: [
      "Restores skin barrier overnight",
      "Soothes dry, irritated skin",
      "Packed with squalane and jojoba oil",
      "Wake up to a plump, radiant complexion",
    ],
    howToUse: "Apply 2–3 drops to face and neck as the final step of your nighttime routine. Press gently into the skin.",
    images: [
      { bg: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop", label: "Front" },
    ],
    reviews: [
      { id: "r12", name: "Michael V.", rating: 5, date: "May 2025", body: "Super nourishing without feeling heavy or clogged. Woke up with glowing skin." },
    ],
    sizes: ["30ml"],
  },
  "calming-eye-cream": {
    id:          "10",
    name:        "Calming Eye Cream",
    price:       58,
    salePrice:   null,
    category:    "Beauty",
    badge:       "New",
    slug:        "calming-eye-cream",
    description: "A soothing eye treatment that targets puffiness, dark circles, and fine lines. Formulated with chamomile and caffeine to wake up tired-looking eyes.",
    benefits: [
      "Reduces puffiness and dark circles",
      "Calms sensitive skin around the eyes",
      "Hydrates and softens fine lines",
      "Cooling, lightweight metal-tip applicator feel",
    ],
    howToUse: "Gently pat a small amount around the orbital bone using your ring finger, morning and night.",
    images: [
      { bg: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop", label: "Front" },
    ],
    reviews: [
      { id: "r13", name: "Lily H.", rating: 4, date: "Apr 2025", body: "Really soothing and works wonders on morning puffiness." },
    ],
    sizes: ["15ml"],
  },
  "hydra-boost-essence": {
    id:          "11",
    name:        "Hydra Boost Essence",
    price:       65,
    salePrice:   null,
    category:    "Skincare",
    badge:       null,
    slug:        "hydra-boost-essence",
    description: "A lightweight, water-like hydrating essence that floods skin with moisture. Plumps, smooths, and primes skin to double the absorption of subsequent serums.",
    benefits: [
      "Floods skin with deep moisture",
      "Plumps and softens skin instantly",
      "Boosts serum absorption",
      "Formulated with mineral-rich thermal water",
    ],
    howToUse: "Pour a few drops into palms and gently press onto face and neck immediately after cleansing, before serums.",
    images: [
      { bg: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop", label: "Front" },
    ],
    reviews: [
      { id: "r14", name: "Hannah P.", rating: 5, date: "May 2025", body: "My skin is so hydrated now. Plumps up fine lines beautifully." },
    ],
    sizes: ["150ml"],
  },
  "wellness-bundle": {
    id:          "12",
    name:        "Wellness Bundle",
    price:       120,
    salePrice:   99,
    category:    "Wellness",
    badge:       "Sale",
    slug:        "wellness-bundle",
    description: "The ultimate self-care pack. Includes our Velvet Body Butter, Glow Face Mist, and a clean-burning botanical candle for a relaxing, luxurious ritual.",
    benefits: [
      "Includes Velvet Body Butter, Glow Face Mist & Candle",
      "Perfect routine for a relaxing self-care evening",
      "Packaged in a luxurious gift box",
      "Great savings compared to buying individually",
    ],
    howToUse: "Light the botanical candle, mist your face, and indulge in our body butter for a complete sensory wellness ritual.",
    images: [
      { bg: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop", label: "Front" },
    ],
    reviews: [
      { id: "r15", name: "Sophia K.", rating: 5, date: "May 2025", body: "Bought this for myself and it's the absolute best. Beautiful packaging too!" },
    ],
    sizes: ["Standard Bundle"],
  },
  "glow-gift-set": {
    id:          "13",
    name:        "Glow Gift Set",
    price:       95,
    salePrice:   null,
    category:    "Gift Sets",
    badge:       "New",
    slug:        "glow-gift-set",
    description: "A curated gift set to deliver a glowing complexion. Includes our Radiance Serum, Rose Toner, and a beautiful muslin facial cloth in a premium presentation box.",
    benefits: [
      "Curated set for radiant, glowing skin",
      "Includes flagship Radiance Serum & Rose Toner",
      "Wrapped in an elegant, eco-friendly gift box",
      "Suitable for all skin types",
    ],
    howToUse: "Use Rose Toner after cleansing, follow with Radiance Serum, and gently exfoliate with the muslin cloth.",
    images: [
      { bg: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop", label: "Front" },
    ],
    reviews: [
      { id: "r16", name: "Amelie G.", rating: 5, date: "May 2025", body: "Gifted this to my mom and she loved it. The presentation is so premium." },
    ],
    sizes: ["Standard Set"],
  },
  "skincare-starter-kit": {
    id:          "14",
    name:        "Skincare Starter Kit",
    price:       75,
    salePrice:   null,
    category:    "Gift Sets",
    badge:       null,
    slug:        "skincare-starter-kit",
    description: "The perfect introduction to clean skincare. Travel-sized essentials of our Radiance Serum, Glow Face Mist, Rose Toner, and Deep Clean Mask in a neat cotton pouch.",
    benefits: [
      "Travel-sized versions of 4 best-sellers",
      "Comes with a reusable canvas bag",
      "Perfect for trying out the products",
      "TSA-friendly sizes",
    ],
    howToUse: "Follow the mini routines inside the pouch: Cleanse, Tone, Mist, and Glow on the go.",
    images: [
      { bg: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop", label: "Front" },
    ],
    reviews: [
      { id: "r17", name: "Nico L.", rating: 5, date: "May 2025", body: "Fantastic value. Great way to sample everything before committing to full sizes." },
    ],
    sizes: ["Starter Set"],
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