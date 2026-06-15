import { useState, useMemo } from "react";
import { useSearchParams }   from "react-router-dom";
import useDebounce           from "../../hooks/useDebounce";
import { ALL_PRODUCTS, type Product } from "./shopData";

const PRICE_MAX_DEFAULT = 200;
const SEARCH_DEBOUNCE_MS = 350;

interface ShopFiltersState {
  search:       string;
  category:     string;
  sort:         string;
  priceMax:     number;
  saleOnly:     boolean;
  filtersOpen:  boolean;
  filteredProducts: Product[];
  hasActiveFilters: boolean;
  setSearch:    (v: string) => void;
  setCategory:  (v: string) => void;
  setSort:      (v: string) => void;
  setPriceMax:  (v: number) => void;
  setSaleOnly:  (v: boolean) => void;
  setFiltersOpen:(v: boolean | ((prev: boolean) => boolean)) => void;
  clearAllFilters: () => void;
}

const useShopFilters = (): ShopFiltersState => {
  const [searchParams] = useSearchParams();

  const [search,       setSearch]       = useState(searchParams.get("search")   ?? "");
  const [category,     setCategory]     = useState(searchParams.get("category") ?? "All");
  const [sort,         setSort]         = useState("featured");
  const [priceMax,     setPriceMax]     = useState(PRICE_MAX_DEFAULT);
  const [saleOnly,     setSaleOnly]     = useState(searchParams.get("filter") === "sale");
  const [filtersOpen,  setFiltersOpen]  = useState(false);

  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);

  const filteredProducts = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.includes(query))
      );
    }

    if (category !== "All") list = list.filter(p => p.category === category);
    if (saleOnly)           list = list.filter(p => p.salePrice != null);

    list = list.filter(p => (p.salePrice ?? p.price) <= priceMax);

    switch (sort) {
      case "price-asc":  list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "price-desc": list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "rating":     list.sort((a, b) => b.rating  - a.rating);  break;
      case "reviews":    list.sort((a, b) => b.reviews - a.reviews); break;
    }

    return list;
  }, [debouncedSearch, category, sort, priceMax, saleOnly]);

  const hasActiveFilters = category !== "All" || saleOnly || priceMax < PRICE_MAX_DEFAULT;

  const clearAllFilters = () => {
    setCategory("All");
    setSaleOnly(false);
    setPriceMax(PRICE_MAX_DEFAULT);
    setSearch("");
  };

  return {
    search, category, sort, priceMax, saleOnly, filtersOpen,
    filteredProducts, hasActiveFilters,
    setSearch, setCategory, setSort, setPriceMax, setSaleOnly, setFiltersOpen,
    clearAllFilters,
  };
};

export default useShopFilters;