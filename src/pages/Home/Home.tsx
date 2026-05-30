import { useTheme } from "../../theme/ThemeContext";
import HomeHero            from "./HomeHero";
import HomePerks           from "./HomePerks";
import HomeCategories      from "./HomeCategories";
import HomeFeaturedProducts from "./HomeFeaturedProducts";
import HomeBanner          from "./HomeBanner";

/**
 * Home page — intentionally thin orchestrator.
 *
 *  HomeHero             → parallax hero, copy, CTA, social proof
 *  HomePerks            → four trust-signal icons
 *  HomeCategories       → browsable category grid
 *  HomeFeaturedProducts → product cards with badge + price
 *  HomeBanner           → promotional discount CTA
 */
const Home = () => {
  const { colors } = useTheme();

  return (
    <div style={{ background: colors.bgPrimary }}>
      <HomeHero />
      <HomePerks />
      <HomeCategories />
      <HomeFeaturedProducts />
      <HomeBanner />
    </div>
  );
};

export default Home;
