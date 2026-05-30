import { useState, useCallback } from "react";
import type { Toast, ToastType, ToastContextValue } from "./types";

/** Generates a short unique ID — negligible collision risk for UI usage */
const generateToastId = (): string => Math.random().toString(36).slice(2);

interface UseToastManagerResult {
  toasts:        Toast[];
  contextValue:  ToastContextValue;
  removeToast:   (id: string) => void;
}

/**
 * Owns all toast state and exposes:
 *  - toasts        → current list, consumed by ToastPortal
 *  - contextValue  → the four trigger functions passed into ToastContext
 *  - removeToast   → called by ToastItem's X button and auto-dismiss timer
 */
const useToastManager = (): UseToastManagerResult => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, duration = 4000) => {
      const id = generateToastId();

      setToasts((prev) => [...prev, { id, type, message, duration }]);

      // duration = 0 means persistent — skip the auto-dismiss timer
      if (duration > 0) setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  const contextValue: ToastContextValue = {
    success: (msg, dur) => addToast("success", msg, dur),
    error:   (msg, dur) => addToast("error",   msg, dur),
    warning: (msg, dur) => addToast("warning", msg, dur),
    info:    (msg, dur) => addToast("info",    msg, dur),
  };

  return { toasts, contextValue, removeToast };
};

export default useToastManager;
