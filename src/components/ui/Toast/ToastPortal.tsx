import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import ToastItem from "./ToastItem";
import type { Toast } from "./types";

interface ToastPortalProps {
  toasts:      Toast[];
  onRemove:    (id: string) => void;
}

/**
 * Portals the toast stack into document.body at z-index 9999
 * so it floats above modals, drawers, and any other stacking contexts.
 *
 * AnimatePresence mode="popLayout" removes exiting toasts from layout flow
 * immediately — remaining pills reflow without waiting for exit animation.
 */
const ToastPortal = ({ toasts, onRemove }: ToastPortalProps) => {
  return createPortal(
    <div
      style={{
        position:       "fixed",
        bottom:         "1.5rem",
        right:          "1.5rem",
        zIndex:         9999,
        display:        "flex",
        flexDirection:  "column",
        gap:            "0.625rem",
        alignItems:     "flex-end",
      }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default ToastPortal;
