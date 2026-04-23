import React, { useMemo, useState } from "react";

interface BubbleTextProps {
  text?: string;
  className?: string;
}

export const BubbleText: React.FC<BubbleTextProps> = ({
  text = "Carlos Moreno",
  className = "",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const characters = useMemo(() => {
    const counts = new Map<string, number>();
    return text.split("").map((char) => {
      const count = (counts.get(char) ?? 0) + 1;
      counts.set(char, count);
      const keyPrefix = char === " " ? "space" : char;
      return {
        char,
        key: `${keyPrefix}-${count}`,
      };
    });
  }, [text]);

  return (
    <h2
      onMouseLeave={() => setHoveredIndex(null)}
      className={`max-w-full overflow-visible text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-thin text-text-primary tracking-tight font-hero ${className}`}
    >
      {characters.map(({ char, key }, idx) => {
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
            key={key}
            onMouseEnter={() => setHoveredIndex(idx)}
            className={classes}
          >
            {char}
          </span>
        );
      })}
    </h2>
  );
};
