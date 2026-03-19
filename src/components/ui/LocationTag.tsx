import { useState, useEffect } from "react";
import BorderGlow from "./BorderGlow";

interface LocationTagProps {
  city?: string;
  country?: string;
  timezone?: string;
  className?: string;
  onHoverChange?: (isHovered: boolean) => void;
}

export function LocationTag({
  city = "Zaragoza",
  country = "Spain",
  timezone = "CET",
  className = "",
  onHoverChange,
}: LocationTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BorderGlow
      edgeSensitivity={32}
      glowColor="155 100 45"
      backgroundColor="#111118"
      borderRadius={999}
      glowRadius={18}
      glowIntensity={0.45}
      coneSpread={24}
      animated={false}
      colors={["#00e5a0", "#14c98f", "#6ee7c8"]}
      className={`rounded-full border-border/60 ${className}`}
    >
      <button
        onMouseEnter={() => {
          setIsHovered(true);
          onHoverChange?.(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHoverChange?.(false);
        }}
        className="group relative flex max-w-full items-center gap-3 overflow-hidden rounded-full border border-transparent bg-surface/50 px-4 py-2.5 transition-all duration-500 ease-out hover:bg-surface/80 whitespace-nowrap"
      >
        <div className="relative flex items-center justify-center">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <span
            className="block text-sm font-medium text-text-primary transition-all duration-500 whitespace-nowrap"
            style={{
              transform: isHovered ? "translateY(-100%)" : "translateY(0)",
              opacity: isHovered ? 0 : 1,
            }}
          >
            {city}, {country}
          </span>

          <span
            className="pointer-events-none absolute inset-0 text-sm font-medium text-text-primary transition-all duration-500 whitespace-nowrap"
            style={{
              transform: isHovered ? "translateY(0)" : "translateY(100%)",
              opacity: isHovered ? 1 : 0,
            }}
          >
            {currentTime} {timezone}
          </span>
        </div>

        <svg
          className="h-3 w-3 text-text-secondary transition-all duration-300"
          style={{
            transform: isHovered
              ? "translateX(2px) rotate(-45deg)"
              : "translateX(0) rotate(0)",
            opacity: isHovered ? 1 : 0.5,
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </button>
    </BorderGlow>
  );
}
