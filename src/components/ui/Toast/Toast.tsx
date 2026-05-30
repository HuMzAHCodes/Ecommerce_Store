import type { ReactNode } from "react";
import { ToastContext } from "./ToastContext";
import useToastManager from "./useToastManager";
import ToastPortal from "./ToastPortal";

/**
 * Wrap your app (or any subtree) with this provider.
 * Any component inside can then call useToast() to fire notifications.
 *
 * Intentionally thin — delegates to:
 *  useToastManager  → state, add/remove logic, context value
 *  ToastPortal      → renders the stack into document.body
 */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { toasts, contextValue, removeToast } = useToastManager();

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastPortal toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
