import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceItem } from "../../types";
import { experienceItems } from "../../data/cv";
import BorderGlow from "../ui/BorderGlow";

const tagColors: Record<string, string> = {
  universidad: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  politica: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const ExperienceTimeline: React.FC = () => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Sort by sortDate ascending (oldest first → left to right)
  const sorted = [...experienceItems].sort((a, b) => a.sortDate - b.sortDate);
  const selectedItem = sorted.find((item) => item.id === selectedId);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = Math.max(180, Math.floor(el.clientWidth * 0.8));
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative max-w-full overflow-hidden"
    >
      {/* Scroll arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-surface/90 border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all backdrop-blur-sm"
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-surface/90 border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all backdrop-blur-sm"
          aria-label="Scroll right"
        >
          ›
        </button>
      )}

      {/* Fade edges */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg/80 to-transparent z-10 pointer-events-none" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg/80 to-transparent z-10 pointer-events-none" />
      )}

      {/* Horizontal scrollable timeline */}
      <motion.div
        layout
        ref={scrollRef}
        className="max-w-full overflow-x-auto scrollbar-hide pb-4 [overscroll-behavior-x:contain]"
      >
        <motion.div
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative flex items-end gap-0 min-w-max px-4 md:px-6 pt-4 pb-2"
        >
          {/* Horizontal line */}
          <div className="absolute bottom-[15px] left-0 right-0 h-px bg-border" />
          <div className="absolute bottom-[15px] left-0 right-0 h-px bg-accent/20" />

          {sorted.map((item, idx) => (
            <TimelineNode
              key={item.id}
              item={item}
              index={idx}
              isSelected={selectedId === item.id}
              onSelect={() => handleSelect(item.id)}
              t={t}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Expanded detail panel */}
      <AnimatePresence mode="wait">
        {selectedItem && selectedItem.descriptionKey && (
          <motion.div
            layout
            key={selectedItem.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-5 rounded-xl border border-accent/30 bg-surface">
              <div className="flex items-center gap-2 mb-3">
                {selectedItem.logoUrl ? (
                  <img
                    src={selectedItem.logoUrl}
                    alt={t(selectedItem.organizationKey).toString()}
                    className="w-6 h-6 rounded-md object-contain bg-white/10 shrink-0"
                  />
                ) : (
                  <span className="text-lg">{selectedItem.icon}</span>
                )}
                <h4 className="text-sm font-semibold text-accent">
                  {t(selectedItem.roleKey)}
                </h4>
                <span className="text-xs text-text-secondary">
                  — {t(selectedItem.organizationKey)}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t(selectedItem.descriptionKey)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface TimelineNodeProps {
  item: ExperienceItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  t: (key: string) => string;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({
  item,
  index,
  isSelected,
  onSelect,
  t,
}) => {
  const hasDescription = !!item.descriptionKey;
  const cardBody = (
    <>
      <div className="flex items-center gap-2 mb-2">
        {item.logoUrl ? (
          <img
            src={item.logoUrl}
            alt={t(item.organizationKey).toString()}
            className="w-7 h-7 rounded-md object-contain bg-white/10 shrink-0"
          />
        ) : (
          <span className="text-xl">{item.icon}</span>
        )}
        <span className="text-[10px] font-mono text-text-secondary leading-tight min-w-0 break-words [overflow-wrap:anywhere]">
          {t(item.periodKey).split("·")[0].trim()}
        </span>
      </div>

      <div className="flex-grow flex flex-col">
        <h3 className="text-sm font-semibold text-text-primary leading-snug mb-1">
          {t(item.roleKey)}
        </h3>
        <p className="text-xs text-text-secondary leading-tight">
          {t(item.organizationKey)}
        </p>
      </div>

      <div className="mt-auto">
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium uppercase tracking-wider ${
                  tagColors[tag] || "bg-accent/10 text-accent border-accent/30"
                }`}
              >
                {t(`experience.tags.${tag}`)}
              </span>
            ))}
          </div>
        )}

        {item.locationKey && (
          <span className="inline-block mb-2 text-[10px] px-1.5 py-0.5 rounded-full bg-surface border border-border text-text-secondary">
            {t(item.locationKey)}
          </span>
        )}

        {hasDescription && (
          <div className="flex items-center gap-1 text-[10px] text-accent/70">
            <span>{isSelected ? "▲" : "▼"}</span>
            <span className="font-medium">{isSelected ? t("experience.hide_details") : t("experience.show_details")}</span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="relative flex min-w-[160px] sm:min-w-[180px] md:min-w-[200px] flex-col items-center"
    >
      {/* Card above the line */}
      <motion.div layout whileHover={{ y: -4 }} className="mb-4">
        {isSelected ? (
          <BorderGlow
            edgeSensitivity={28}
            glowColor="155 100 45"
            backgroundColor="#111118"
            borderRadius={12}
            glowRadius={28}
            glowIntensity={0.95}
            coneSpread={24}
            animated={false}
            colors={["#00e5a0", "#14c98f", "#6ee7c8"]}
            className={`w-[150px] sm:w-[170px] md:w-[180px] h-[200px] rounded-xl border-accent/60 transition-all ${hasDescription ? "cursor-pointer" : ""}`}
          >
            <div
              onClick={hasDescription ? onSelect : undefined}
              className="w-full h-full rounded-xl bg-gradient-to-b from-accent/25 to-surface p-3 md:p-4 flex flex-col"
            >
              {cardBody}
            </div>
          </BorderGlow>
        ) : (
          <div
            onClick={hasDescription ? onSelect : undefined}
            className={`w-[150px] sm:w-[170px] md:w-[180px] h-[200px] rounded-xl border p-3 md:p-4 transition-all flex flex-col border-border bg-surface/60 hover:border-accent/40 hover:bg-surface/85 ${
              hasDescription ? "cursor-pointer" : ""
            }`}
          >
            {cardBody}
          </div>
        )}
      </motion.div>

      {/* Timeline dot */}
      <motion.div
        layout
        animate={
          isSelected
            ? { scale: 1.3, boxShadow: "0 0 12px rgba(0,229,160,0.6)" }
            : { scale: 1, boxShadow: "0 0 0px rgba(0,229,160,0)" }
        }
        transition={{ duration: 0.2 }}
        className="w-3.5 h-3.5 rounded-full border-2 border-accent bg-bg z-10 shrink-0"
      />
    </motion.div>
  );
};

export default ExperienceTimeline;
