import type { ReactNode } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
  id:        string;
  type:      ToastType;
  message:   string;
  duration?: number;
};

export type ToastContextValue = {
  success: (message: string, duration?: number) => void;
  error:   (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info:    (message: string, duration?: number) => void;
};

/** Maps each toast type to its theme-driven visual config */
export type ToastVisualConfig = {
  bg:    string;
  color: string;
  icon:  ReactNode;
};
