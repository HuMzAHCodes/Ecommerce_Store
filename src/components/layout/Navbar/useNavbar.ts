import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SCROLL_THRESHOLD = 12;

const useNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileOpen,     setIsMobileOpen]     = useState(false);
  const [isSearchOpen,     setIsSearchOpen]     = useState(false);
  const [searchQuery,      setSearchQuery]      = useState("");
  const [activeDropdown,   setActiveDropdown]   = useState<string | null>(null);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close panels on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const isActivePath = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const toggleSearch     = () => setIsSearchOpen((prev) => !prev);
  const closeMobileMenu  = () => setIsMobileOpen(false);
  const closeSearch      = () => setIsSearchOpen(false);

  return {
    isScrolled, isMobileOpen, isSearchOpen,
    searchQuery, setSearchQuery,
    activeDropdown, setActiveDropdown,
    isActivePath,
    handleSearch,
    toggleMobileMenu, toggleSearch,
    closeMobileMenu,  closeSearch,
  };
};

export default useNavbar;