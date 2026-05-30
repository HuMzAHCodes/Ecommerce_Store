import { type CSSProperties, type ReactNode } from "react";
import useScrollReveal from "./useScrollReveal";
import ScrollRevealUI from "./ScrollRevealUI";

export type ScrollRevealProps = {
  children: ReactNode;
  style?: CSSProperties;
  /** Viewport position (0–1) when reveal begins. Default: 0.94 */
  start?: number;
  /** Viewport position (0–1) when reveal finishes. Default: 0.62 */
  end?: number;
  /** Starting vertical offset in px that scrubs to 0. Default: 40 */
  y?: number;
  className?: string;
};

const ScrollReveal = ({
  children,
  style,
  start = 0.94,
  end = 0.62,
  y = 40,
  className,
}: ScrollRevealProps) => {
  const { targetRef, animatedOpacity, animatedY, isReducedMotion } =
    useScrollReveal({ start, end, verticalOffset: y });

  return (
    <ScrollRevealUI
      targetRef={targetRef}
      animatedOpacity={animatedOpacity}
      animatedY={animatedY}
      isReducedMotion={isReducedMotion}
      style={style}
      className={className}
    >
      {children}
    </ScrollRevealUI>
  );
};

export default ScrollReveal;
