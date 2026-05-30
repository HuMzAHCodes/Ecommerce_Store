import { Leaf, Heart, Sparkles, Shield } from "lucide-react";
import { createElement } from "react";

export type ValueItem = {
  icon:  React.ReactNode;
  title: string;
  desc:  string;
};

export const VALUES: ValueItem[] = [
  {
    icon:  createElement(Leaf,     { size: 24 }),
    title: "Clean Ingredients",
    desc:  "Every product is formulated without parabens, sulfates, artificial fragrances, or harmful chemicals.",
  },
  {
    icon:  createElement(Shield,   { size: 24 }),
    title: "Dermatologist Tested",
    desc:  "All formulas are tested and approved by dermatologists for all skin types, including sensitive skin.",
  },
  {
    icon:  createElement(Heart,    { size: 24 }),
    title: "Cruelty-Free",
    desc:  "We never test on animals. Ever. Our products are certified cruelty-free and vegan-friendly.",
  },
  {
    icon:  createElement(Sparkles, { size: 24 }),
    title: "Sustainable",
    desc:  "Eco-conscious packaging, carbon-neutral shipping, and a commitment to reducing our environmental footprint.",
  },
];
