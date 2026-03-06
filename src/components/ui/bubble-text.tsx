import React, { useState } from "react";

interface BubbleTextProps {
  text?: string;
}

export const BubbleText: React.FC<BubbleTextProps> = ({
  text = "Carlos Moreno",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <h2
      onMouseLeave={() => setHoveredIndex(null)}
      className="text-center text-5xl sm:text-7xl md:text-8xl font-thin text-text-primary tracking-tight font-hero"
    >
      {text.split("").map((char, idx) => {
        const distance =
          hoveredIndex !== null ? Math.abs(hoveredIndex - idx) : null;

        let classes =
          "transition-all duration-300 ease-in-out cursor-default";

        switch (distance) {
          case 0:
            classes += " font-black text-accent";
            break;
          case 1:
            classes += " font-medium text-accent/70";
            break;
          case 2:
            classes += " font-light";
            break;
          default:
            break;
        }

        return (
          <span
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            className={classes}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </h2>
  );
};
