import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ── cn utility ────────────────────────────────────────────────
// Merges Tailwind classes safely, resolving conflicts.
//
// Usage:
//   cn("px-4 py-2", isActive && "bg-accent-primary", className)
//   cn("text-sm font-medium", variant === "ghost" && "text-text-muted")

const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export default cn;
