import { useCursorContext, type CursorMode } from "./CursorContext";

/**
 * useCursor(mode)
 *
 * Returns onMouseEnter / onMouseLeave handlers that switch the
 * global cursor to `mode` on hover and back to "default" on leave.
 *
 * Usage:
 *   const cursor = useCursor("view");
 *   <div {...cursor.handlers}>...</div>
 *
 * The hook is fully reusable — pass any CursorMode string.
 * Adding a new mode only requires updating CursorContext.tsx + CursorDot.tsx.
 */
const useCursor = (mode: CursorMode) => {
  const { setMode } = useCursorContext();

  return {
    handlers: {
      onMouseEnter: () => setMode(mode),
      onMouseLeave: () => setMode("default"),
    },
  };
};

export default useCursor;
