import { createElement } from "react";
import { Package, Heart, Lock, User } from "lucide-react";

export type TabId = "account" | "orders" | "wishlist" | "security";

export type Tab = {
  id:    TabId;
  label: string;
  icon:  React.ReactNode;
};

export const TABS: Tab[] = [
  { id: "account",  label: "Account",  icon: createElement(User,    { size: 15 }) },
  { id: "orders",   label: "Orders",   icon: createElement(Package, { size: 15 }) },
  { id: "wishlist", label: "Wishlist", icon: createElement(Heart,   { size: 15 }) },
  { id: "security", label: "Security", icon: createElement(Lock,    { size: 15 }) },
];
