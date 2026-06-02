export interface NavLink {
  label:     string;
  href:      string;
  children?: { label: string; href: string }[];
}

export const NAV_LINKS: NavLink[] = [
  {
    label: "Shop",
    href:  "/shop",
  },
  {
    label: "Collections",
    href:  "/collections",
    children: [
      { label: "Skincare",  href: "/collections/skincare" },
      { label: "Beauty",    href: "/collections/beauty" },
      { label: "Wellness",  href: "/collections/wellness" },
      { label: "Gift Sets", href: "/collections/gifts" },
    ],
  },
  { label: "About", href: "/about" },
];