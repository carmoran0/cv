import { useState, useEffect } from "react";

interface LocationTagProps {
  city?: string;
  country?: string;
  timezone?: string;
  className?: string;
}

export function LocationTag({
  city = "Zaragoza",
  country = "Spain",
  timezone = "CET",
  className = "",
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
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex max-w-full items-center gap-3 overflow-hidden rounded-full border border-border/60 bg-surface/50 px-4 py-2.5 transition-all duration-500 ease-out hover:border-text-primary/20 hover:bg-surface/80 hover:shadow-[0_0_20px_rgba(0,0,0,0.04)] whitespace-nowrap ${className}`}
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
  );
}
