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

  const scrollToSection = (sectionId: string) => {
    setHasScrolled(true);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    scrollToSection("about");
  };

  const impactItems = [
    t("hero.impact_1"),
    t("hero.impact_2"),
    t("hero.impact_3"),
  ];

  const stackTags = [t("hero.tag_1"), t("hero.tag_2"), t("hero.tag_3")];

  return (
    <section
      ref={heroRef}
      className="relative isolate flex min-h-[100svh] shrink-0 items-center overflow-hidden px-4 py-10 md:px-8 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(0,229,160,0.15),transparent_45%),radial-gradient(circle_at_85%_24%,rgba(70,120,255,0.16),transparent_42%),radial-gradient(circle_at_50%_85%,rgba(0,229,160,0.08),transparent_46%)]" />
        <div className="absolute -left-16 top-[18%] h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -right-20 bottom-[8%] h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-x-8 top-[15%] h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
      >
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <BubbleText
            text="Carlos Moreno"
            className="mx-auto max-w-[9.2ch] overflow-visible text-4xl leading-[0.94] sm:text-5xl md:text-6xl lg:mx-0 lg:max-w-[9.6ch] lg:text-left lg:text-[5.2rem] xl:text-[5.8rem]"
          />

          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-text-secondary sm:text-xl md:text-2xl"
          >
            {t("hero.subtitle")}
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="mt-4 max-w-xl text-[11px] font-medium uppercase tracking-[0.24em] text-text-secondary/85 sm:text-[12px]"
          >
            {t("hero.role")}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <m.button
              type="button"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center rounded-full border border-accent/55 bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-bg shadow-[0_8px_24px_rgba(0,229,160,0.3)] transition-colors hover:bg-accent-green"
            >
              {t("hero.cta_evidence")}
            </m.button>

            <m.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center rounded-full border border-border bg-surface/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-text-primary transition-colors hover:border-accent/60 hover:text-accent"
            >
              {t("hero.cta_contact")}
            </m.button>
          </m.div>
        </div>

        <m.aside
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65 }}
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end"
        >
          <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[1.75rem] bg-gradient-to-br from-accent/20 via-transparent to-cyan-300/20 blur-xl" />

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="relative mt-4 overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface/80 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(0,229,160,0.14),transparent_45%,rgba(70,120,255,0.15))]" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t("hero.panel_label")}
              </p>
              <h3 className="mt-3 max-w-md text-2xl font-semibold leading-tight text-text-primary md:text-[2rem]">
                {t("hero.panel_title")}
              </h3>

              <ul className="mt-6 space-y-3">
                {impactItems.map((item, idx) => (
                  <m.li
                    key={item}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.68 + idx * 0.08, duration: 0.35 }}
                    className="flex items-start gap-3 rounded-xl border border-border/60 bg-bg/45 px-3 py-3"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-green shadow-[0_0_16px_rgba(0,229,160,0.9)]" />
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {item}
                    </span>
                  </m.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {stackTags.map((tag, idx) => (
                  <m.span
                    key={tag}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.92 + idx * 0.06, duration: 0.3 }}
                    className="rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-text-primary"
                  >
                    {tag}
                  </m.span>
                ))}
              </div>
            </div>
          </m.div>
        </m.aside>
      </m.div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!hasScrolled && (
          <m.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
            }}
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-text-secondary transition-colors hover:text-text-primary"
            onClick={scrollToAbout}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">
              {t("hero.scroll_hint")}
            </span>
            <span className="rounded-full border border-border/80 bg-bg/70 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </m.button>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
