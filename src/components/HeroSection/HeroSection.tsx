import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { m, AnimatePresence } from "framer-motion";
import { BubbleText } from "../ui/bubble-text";
import BorderGlow from "../ui/BorderGlow";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (hasScrolled) return;
      const mainContainer = heroRef.current?.closest("main");
      if (!mainContainer) return;

      if (mainContainer.scrollTop < 50 && e.deltaY > 0) {
        e.preventDefault();
        scrollToAbout();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (hasScrolled) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (hasScrolled) return;
      const mainContainer = heroRef.current?.closest("main");
      if (!mainContainer) return;

      const touchEndY = e.touches[0].clientY;
      const isScrollingDown = touchStartY - touchEndY > 20;

      if (mainContainer.scrollTop < 50 && isScrollingDown) {
        e.preventDefault();
        scrollToAbout();
      }
    };

    const wheelOptions = { passive: false };
    
    // Attach event listeners
    const mainContainer = heroRef.current?.closest("main");
    if (mainContainer) {
      mainContainer.addEventListener("wheel", handleWheel, wheelOptions);
      mainContainer.addEventListener("touchstart", handleTouchStart, wheelOptions);
      mainContainer.addEventListener("touchmove", handleTouchMove, wheelOptions);
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener("wheel", handleWheel);
        mainContainer.removeEventListener("touchstart", handleTouchStart);
        mainContainer.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [hasScrolled]);

  const scrollToAbout = () => {
    setHasScrolled(true);
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-[100svh] shrink-0 px-4 md:px-6 py-10 md:py-20 text-center"
    >
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Name */}
        <BubbleText text="Carlos Moreno" />

        {/* Subtitle */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl text-lg font-light text-text-secondary sm:text-xl md:text-2xl"
        >
          {t("hero.subtitle")}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          whileHover={{ y: -1 }}
          className="inline-flex"
        >
          <BorderGlow
            edgeSensitivity={28}
            glowColor="155 100 45"
            backgroundColor="#111118"
            borderRadius={999}
            glowRadius={22}
            glowIntensity={0.55}
            coneSpread={25}
            animated={false}
            colors={["#00e5a0", "#14c98f", "#6ee7c8"]}
            className="border-accent/45"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent/25 via-accent-green/10 to-transparent px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-primary sm:text-xs">
                {t("hero.availability_badge")}
              </span>
            </div>
          </BorderGlow>
        </m.div>
      </m.div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!hasScrolled && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              opacity: { duration: 0.5 },
              y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
            className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
            onClick={scrollToAbout}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
