import { useState, useMemo } from "react";
import { useSearchParams }   from "react-router-dom";
import useDebounce           from "../../hooks/useDebounce";
import { useProducts, type ProductsParams } from "../../hooks/useProducts";
import type { Product }      from "./shopData";

const PRICE_MAX_DEFAULT  = 200;
const SEARCH_DEBOUNCE_MS = 350;

// Maps sort dropdown value → backend params
const SORT_MAP: Record<string, Pick<ProductsParams, "sortBy" | "sortOrder">> = {
  featured:     { sortBy: "createdAt", sortOrder: "desc" },
  "price-asc":  { sortBy: "price",     sortOrder: "asc"  },
  "price-desc": { sortBy: "price",     sortOrder: "desc" },
  rating:       { sortBy: "createdAt", sortOrder: "desc" }, // no backend rating sort yet
  reviews:      { sortBy: "createdAt", sortOrder: "desc" },
};

interface ShopFiltersState {
  search:           string;
  category:         string;
  sort:             string;
  priceMax:         number;
  saleOnly:         boolean;
  filtersOpen:      boolean;
  filteredProducts: Product[];
  hasActiveFilters: boolean;
  isLoading:        boolean;
  setSearch:        (v: string) => void;
  setCategory:      (v: string) => void;
  setSort:          (v: string) => void;
  setPriceMax:      (v: number) => void;
  setSaleOnly:      (v: boolean) => void;
  setFiltersOpen:   (v: boolean | ((prev: boolean) => boolean)) => void;
  clearAllFilters:  () => void;
}

const useShopFilters = (): ShopFiltersState => {
  const [searchParams] = useSearchParams();

  const [search,      setSearch]      = useState(searchParams.get("search")   ?? "");
  const [category,    setCategory]    = useState(searchParams.get("category") ?? "All");
  const [sort,        setSort]        = useState("featured");
  const [priceMax,    setPriceMax]    = useState(PRICE_MAX_DEFAULT);
  const [saleOnly,    setSaleOnly]    = useState(searchParams.get("filter") === "sale");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);

  // Build API params — pass category + search + sort to the backend
  const apiParams: ProductsParams = {
    limit:  100,                             // fetch all for client-side price/sale filter
    search: debouncedSearch || undefined,
    ...SORT_MAP[sort],
    ...(category !== "All" && { category }),
  };

  const { data, isLoading } = useProducts(apiParams);
  const rawProducts = data?.products ?? [];

  // Client-side price + saleOnly filters (not supported as backend query params)
  const filteredProducts = useMemo(() => {
    let list = [...rawProducts];
    if (saleOnly)  list = list.filter((p) => p.salePrice != null);
    list = list.filter((p) => (p.salePrice ?? p.price) <= priceMax);
    return list;
  }, [rawProducts, saleOnly, priceMax]);

  const hasActiveFilters =
    category !== "All" || saleOnly || priceMax < PRICE_MAX_DEFAULT;

  const clearAllFilters = () => {
    setCategory("All");
    setSaleOnly(false);
    setPriceMax(PRICE_MAX_DEFAULT);
    setSearch("");
  };

  return {
    search, category, sort, priceMax, saleOnly, filtersOpen,
    filteredProducts, hasActiveFilters, isLoading,
    setSearch, setCategory, setSort, setPriceMax, setSaleOnly,
    setFiltersOpen, clearAllFilters,
  };
};

export default useShopFilters;
