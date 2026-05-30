import { createContext, useContext } from "react";
import type { ToastContextValue } from "./types";

export const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Hook to fire toast notifications from any component inside <ToastProvider>.
 * Throws a clear error if used outside the provider tree.
 *
 * Usage:
 *   const toast = useToast();
 *   toast.success("Saved!");
 *   toast.error("Failed.", 6000);     // custom duration in ms
 *   toast.info("Update ready.", 0);   // 0 = persistent, no auto-dismiss
 */
export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};
