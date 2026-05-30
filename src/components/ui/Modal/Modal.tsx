import type { ReactNode }          from "react";
import { createPortal }            from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X }                       from "lucide-react";
import { useTheme }                from "../../../theme/ThemeContext";
import useModal                    from "./useModal";
import {
  MODAL_MAX_WIDTHS,
  overlayStyles, panelPositionerStyles, panelCardStyles,
  headerStyles,  titleStyles,           closeButtonStyles,
  bodyStyles,    footerStyles,
  type ModalSize,
} from "./modalStyles";

// ── Types ─────────────────────────────────────────────────────

interface ModalProps {
  isOpen:          boolean;
  onClose:         () => void;
  title?:          string;
  children:        ReactNode;
  size?:           ModalSize;
  closeOnOverlay?: boolean;
  showClose?:      boolean;
  footer?:         ReactNode;
}

// ── Animation config ──────────────────────────────────────────

const OVERLAY_ANIMATION = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  exit:       { opacity: 0 },
  transition: { duration: 0.2 },
};

const PANEL_ANIMATION = {
  initial:    { opacity: 0, scale: 0.94, y: 20 },
  animate:    { opacity: 1, scale: 1,    y: 0  },
  exit:       { opacity: 0, scale: 0.94, y: 20 },
  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
};

// ── Component ─────────────────────────────────────────────────

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size           = "md",
  closeOnOverlay = true,
  showClose      = true,
  footer,
}: ModalProps) => {
  const { colors, radius, shadows, typography, transitions } = useTheme();

  useModal({ isOpen, onClose });

  const hasHeader = title || showClose;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            {...OVERLAY_ANIMATION}
            onClick={closeOnOverlay ? onClose : undefined}
            style={overlayStyles(colors)}
          />

          {/* Centering positioner */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            {...PANEL_ANIMATION}
            style={panelPositionerStyles}
          >
            {/* Panel card */}
            <div style={panelCardStyles(colors, radius, shadows, MODAL_MAX_WIDTHS[size])}>

              {/* Header */}
              {hasHeader && (
                <div style={headerStyles(colors)}>
                  {title && (
                    <h3 id="modal-title" style={titleStyles(typography, colors)}>
                      {title}
                    </h3>
                  )}
                  {showClose && (
                    <button
                      onClick={onClose}
                      aria-label="Close modal"
                      style={closeButtonStyles(colors, radius, transitions)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = colors.bgTertiary;
                        e.currentTarget.style.color      = colors.textPrimary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = colors.bgSecondary;
                        e.currentTarget.style.color      = colors.textSecondary;
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div style={bodyStyles(typography, colors)}>
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div style={footerStyles(colors)}>
                  {footer}
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;

/*
 * ── Modal — What this folder does ───────────────────────────────────────────
 *
 * A portal-rendered dialog with overlay, animated panel, and three content slots.
 *
 * Structure:
 *   Overlay      — fixed backdrop with blur; click closes if closeOnOverlay=true
 *   Panel card   — centered, max-height 90vh, scrollable body
 *     Header     — title + close button; hidden if neither title nor showClose
 *     Body       — scrollable ReactNode slot (children)
 *     Footer     — optional ReactNode slot (caller passes action buttons)
 *
 * Side effects (useModal.ts):
 *   - Locks body scroll (overflow: hidden) while isOpen=true
 *   - Attaches Escape key listener; calls onClose when pressed
 *   - Both effects clean up on unmount / isOpen toggle
 *
 * Sizes (maxWidth):
 *   sm → 400px | md → 560px | lg → 720px | xl → 960px | full → 95vw
 *
 * Animations:
 *   Overlay  — opacity 0 → 1 over 200ms
 *   Panel    — opacity + scale (0.94→1) + y (20→0) over 250ms
 *
 * Files in this folder:
 *   useModal.ts     — body scroll lock + Escape key listener
 *   modalStyles.ts  — all CSSProperties factories + size map + ModalSize type
 *   Modal.tsx       — orchestrator; assembles overlay, panel, header, body, footer
 */