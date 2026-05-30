import { countBadgeStyles } from "./navbarStyles";

interface CountBadgeProps {
  count: number;
  color: string;
}

const CountBadge = ({ count, color }: CountBadgeProps) => (
  <span style={countBadgeStyles(color)}>
    {count > 99 ? "99+" : count}
  </span>
);

export default CountBadge;