import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../components/ui/Toast";
import { useIsMobile } from "../hooks/useMediaQuery";

// ── Collection metadata ───────────────────────────────────────

const COLLECTION_META: Record<string, {
  label: string; emoji: string; description: string; banner: string;
}> = {
  skincare: {
    label: "Skincare",
    emoji: "🌿",
    description: "Clean, effective skincare formulated for every skin type. No harmful chemicals. Just results.",
    banner: "#F5DDD0",
  },
  beauty: {
    label: "Beauty",
    emoji: "✨",
    description: "Effortless beauty essentials that enhance your natural glow — minimal effort, maximum radiance.",
    banner: "#F5D0E8",
  },
  wellness: {
    label: "Wellness",
    emoji: "🫧",
    description: "Feel-good rituals for body and mind. Clean ingredients that nourish from the outside in.",
    banner: "#D5EDD5",
  },
  gifts: {
    label: "Gift Sets",
    emoji: "🎁",
    description: "Beautifully curated sets for every occasion. The perfect gift — for someone special, or yourself.",
    banner: "#EDE0F5",
  },
};

// ── All products by collection ────────────────────────────────

const ALL_PRODUCTS = [
  { id:"1",  name:"Radiance Serum",      price:68,  salePrice:null, collection:"skincare", badge:"Best Seller", bg:"#F5DDD0", slug:"radiance-serum"      },
  { id:"2",  name:"Glow Face Mist",      price:42,  salePrice:35,  collection:"skincare", badge:"Sale",        bg:"#D0E8F5", slug:"glow-face-mist"       },
  { id:"4",  name:"Rose Toner",          price:38,  salePrice:null, collection:"skincare", badge:null,          bg:"#F5D0E8", slug:"rose-toner"           },
  { id:"5",  name:"Cloud Cream SPF 30",  price:72,  salePrice:null, collection:"skincare", badge:"New",         bg:"#EDE0F5", slug:"cloud-cream-spf"      },
  { id:"7",  name:"Deep Clean Mask",     price:48,  salePrice:null, collection:"skincare", badge:null,          bg:"#D0F5E8", slug:"deep-clean-mask"      },
  { id:"8",  name:"Vitamin C Booster",   price:85,  salePrice:null, collection:"skincare", badge:"Best Seller", bg:"#F5F0D0", slug:"vitamin-c-booster"    },
  { id:"9",  name:"Overnight Recovery",  price:92,  salePrice:75,  collection:"skincare", badge:"Sale",        bg:"#E8D0F5", slug:"overnight-recovery"   },
  { id:"11", name:"Hydra Boost Essence", price:65,  salePrice:null, collection:"skincare", badge:null,          bg:"#F5D8D0", slug:"hydra-boost-essence"  },
  { id:"6",  name:"Lip Treatment Set",   price:34,  salePrice:28,  collection:"beauty",   badge:"Sale",        bg:"#F5EDD0", slug:"lip-treatment-set"    },
  { id:"10", name:"Calming Eye Cream",   price:58,  salePrice:null, collection:"beauty",   badge:"New",         bg:"#D0EAF5", slug:"calming-eye-cream"    },
  { id:"3",  name:"Velvet Body Butter",  price:55,  salePrice:null, collection:"wellness", badge:"New",         bg:"#D5EDD5", slug:"velvet-body-butter"   },
  { id:"12", name:"Wellness Bundle",     price:120, salePrice:99,  collection:"wellness", badge:"Sale",        bg:"#D0F5D0", slug:"wellness-bundle"      },
  { id:"13", name:"Glow Gift Set",       price:95,  salePrice:null, collection:"gifts",    badge:"New",         bg:"#EDE0F5", slug:"glow-gift-set"        },
  { id:"14", name:"Skincare Starter Kit",price:75,  salePrice:null, collection:"gifts",    badge:null,          bg:"#F5DDD0", slug:"skincare-starter-kit" },
];

const TABS = ["skincare","beauty","wellness","gifts"];

const fadeUp = {
  hidden:  { opacity:0, y:20 },
  visible: { opacity:1, y:0, transition:{ duration:0.4, ease:[0.4,0,0.2,1] as [number,number,number,number] } },
};

const Collections = () => {
  const { category }  = useParams<{ category?: string }>();
  const activeTab     = TABS.includes(category ?? "") ? category! : "skincare";
  const theme         = useTheme();
  const isMobile      = useIsMobile();
  const { colors, typography, radius, shadows, transitions } = theme;
  const { addItem, isInCart, openDrawer } = useCart();
  const { toggle, isWishlisted }          = useWishlist();
  const toast = useToast();

  const meta     = COLLECTION_META[activeTab];
  const products = ALL_PRODUCTS.filter(p => p.collection === activeTab);

  const handleAddToCart = (p: typeof ALL_PRODUCTS[0]) => {
    addItem({ id:p.id, name:p.name, price:p.price, salePrice:p.salePrice, image:p.bg, slug:p.slug });
    openDrawer();
    toast.success(`${p.name} added to cart!`);
  };

  const handleWishlist = (p: typeof ALL_PRODUCTS[0]) => {
    toggle({ id:p.id, name:p.name, price:p.price, salePrice:p.salePrice, image:p.bg, slug:p.slug });
    toast.info(isWishlisted(p.id) ? "Removed from wishlist" : `${p.name} saved!`);
  };

  return (
    <div style={{ background: colors.bgPrimary, minHeight:"100vh" }}>

      {/* ── Banner ──────────────────────────────────────── */}
      <motion.section
        key={activeTab}
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ duration:0.4 }}
        style={{
          background: `linear-gradient(135deg, ${meta.banner}88 0%, ${colors.bgSecondary} 100%)`,
          borderBottom: `1px solid ${colors.borderLight}`,
          padding: isMobile ? "3rem 1.25rem 2.5rem" : "4rem 1.5rem 3.5rem",
          textAlign:"center",
        }}
      >
        <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.4, delay:0.1 }}
          style={{ fontSize: isMobile?"3rem":"4rem", marginBottom:"1rem" }}>
          {meta.emoji}
        </motion.div>
        <p className="overline" style={{ marginBottom:"0.75rem" }}>Collection</p>
        <h1 style={{ fontFamily:typography.fontDisplay, color:colors.textPrimary, fontStyle:"italic", marginBottom:"0.875rem" }}>
          {meta.label}
        </h1>
        <p style={{ fontFamily:typography.fontBody, color:colors.textSecondary, fontSize: isMobile?typography.base:typography.lg, maxWidth:520, margin:"0 auto 2rem", lineHeight:1.7 }}>
          {meta.description}
        </p>

        {/* ── Collection tabs ──────────────────────────── */}
        <div style={{ display:"flex", justifyContent:"center", gap:"0.5rem", flexWrap:"wrap" }}>
          {TABS.map(tab => (
            <Link key={tab} to={`/collections/${tab}`}
              style={{
                padding:"0.5rem 1.25rem",
                borderRadius: radius?.full,
                fontFamily: typography.fontBody,
                fontSize: typography.sm,
                fontWeight: activeTab===tab ? typography.weightMedium : typography.weightRegular,
                background: activeTab===tab ? colors.accentPrimary : colors.bgCard,
                color: activeTab===tab ? colors.textOnAccent : colors.textSecondary,
                textDecoration:"none",
                border: `1px solid ${activeTab===tab ? colors.accentPrimary : colors.borderLight}`,
                transition:`all ${transitions?.normal}`,
              }}>
              {COLLECTION_META[tab].label}
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ── Products grid ───────────────────────────────── */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding: isMobile?"2rem 1.25rem":"3rem 1.5rem" }}>
        <motion.div
          key={activeTab + "-grid"}
          initial="hidden" animate="visible"
          variants={{ visible:{ transition:{ staggerChildren:0.07 } } }}
          style={{ display:"grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(auto-fill,minmax(240px,1fr))", gap: isMobile?"0.875rem":"1.5rem" }}
        >
          {products.map(product => (
            <motion.div key={product.id} variants={fadeUp}>
              <motion.div whileHover={{ y:-4, boxShadow: shadows?.lg }} transition={{ duration:0.2 }}
                style={{ background:colors.bgCard, borderRadius:radius?.xl, overflow:"hidden", border:`1px solid ${colors.borderLight}`, boxShadow:shadows?.sm }}>

                <div style={{ height: isMobile?150:210, background:product.bg, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize: isMobile?"2.5rem":"3.5rem" }}>✨</span>

                  {product.badge && (
                    <span style={{ position:"absolute", top:10, left:10, background: product.badge==="Sale" ? colors.accentPrimary : product.badge==="New" ? colors.accentSecondary : colors.textPrimary, color:"#fff", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", padding:"3px 9px", borderRadius:radius?.full, fontFamily:typography.fontBody }}>
                      {product.badge}
                    </span>
                  )}

                  <motion.button whileTap={{ scale:0.88 }} onClick={() => handleWishlist(product)}
                    style={{ position:"absolute", top:10, right:10, width:32, height:32, borderRadius:radius?.full, background:colors.bgCard, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:shadows?.sm }}>
                    <Heart size={14} fill={isWishlisted(product.id) ? colors.accentPrimary : "none"} color={isWishlisted(product.id) ? colors.accentPrimary : colors.textMuted}/>
                  </motion.button>
                </div>

                <div style={{ padding: isMobile?"0.875rem":"1.25rem" }}>
                  <Link to={`/shop/${product.slug}`} style={{ textDecoration:"none" }}>
                    <h3 className="product-name" style={{ marginBottom:"0.375rem", fontSize: isMobile?typography.xs:typography.sm }}>{product.name}</h3>
                  </Link>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span className="price" style={{ fontSize: isMobile?typography.sm:typography.base }}>${product.salePrice ?? product.price}</span>
                      {product.salePrice && <span className="price-original">${product.price}</span>}
                    </div>
                    <motion.button whileTap={{ scale:0.9 }} onClick={() => handleAddToCart(product)}
                      style={{ width:32, height:32, borderRadius:radius?.full, background: isInCart(product.id) ? colors.accentPrimary : colors.bgSecondary, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:`background ${transitions?.fast}` }}>
                      <ShoppingBag size={14} color={isInCart(product.id) ? "#fff" : colors.textSecondary}/>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all in shop */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          style={{ textAlign:"center", marginTop:"3rem" }}>
          <Link to="/shop">
            <motion.span whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background:"transparent", color:colors.textPrimary, border:`1.5px solid ${colors.borderMedium}`, borderRadius:radius?.full, padding:"0.875rem 2rem", fontFamily:typography.fontBody, fontWeight:typography.weightMedium, cursor:"pointer" }}>
              Browse All Products <ArrowRight size={15}/>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Collections;
