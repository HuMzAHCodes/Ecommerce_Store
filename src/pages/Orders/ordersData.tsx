import { CheckCircle, Truck, Clock, XCircle } from "lucide-react";
import type { ReactNode } from "react";

export interface OrderItem {
  name:  string;
  qty:   number;
  price: number;
}

export interface Order {
  id:     string;
  date:   string;
  status: string;
  total:  number;
  items:  OrderItem[];
}

export interface StatusConfig {
  label: string;
  color: string;
  bg:    string;
  icon:  ReactNode;
}

export const MOCK_ORDERS: Order[] = [
  {
    id:    "ORD-001",
    date:  "May 20, 2025",
    status:"DELIVERED",
    total: 110.00,
    items: [
      { name: "Radiance Serum",    qty: 1, price: 68 },
      { name: "Rose Toner",        qty: 1, price: 38 },
    ],
  },
  {
    id:    "ORD-002",
    date:  "May 10, 2025",
    status:"SHIPPED",
    total: 72.00,
    items: [
      { name: "Cloud Cream SPF 30", qty: 1, price: 72 },
    ],
  },
  {
    id:    "ORD-003",
    date:  "Apr 28, 2025",
    status:"PROCESSING",
    total: 55.00,
    items: [
      { name: "Velvet Body Butter", qty: 1, price: 55 },
    ],
  },
];

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  DELIVERED:  { label: "Delivered",  color: "#5A9E7A", bg: "#EBF5F0", icon: <CheckCircle size={14} /> },
  SHIPPED:    { label: "Shipped",    color: "#3D8BCD", bg: "#E8F2FB", icon: <Truck       size={14} /> },
  PROCESSING: { label: "Processing", color: "#C9A05A", bg: "#F5F0EB", icon: <Clock       size={14} /> },
  CANCELLED:  { label: "Cancelled",  color: "#C95A5A", bg: "#F5EBEB", icon: <XCircle     size={14} /> },
  PENDING:    { label: "Pending",    color: "#9AAABB", bg: "#F0F4F8", icon: <Clock       size={14} /> },
};