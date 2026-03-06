import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceItem } from "../../types";
import { experienceItems } from "../../data/cv";

const tagColors: Record<string, string> = {
  universidad: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const ExperienceTimeline: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sort by sortDate descending (most recent first)
  const sorted = [...experienceItems].sort((a, b) => b.sortDate - a.sortDate);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

      <div className="flex flex-col gap-0">
        {sorted.map((item, idx) => (
          <TimelineEntry
            key={item.id}
            item={item}
            index={idx}
            isExpanded={expandedId === item.id}
            onToggle={() => toggleExpand(item.id)}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

interface TimelineEntryProps {
  item: ExperienceItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  t: (key: string) => string;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({
  item,
  index,
  isExpanded,
  onToggle,
  t,
}) => {
  const hasDescription = !!item.descriptionKey;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-14 pr-2 py-4 group"
    >
      {/* Timeline dot */}
      <div className="absolute left-[18px] top-6 w-[17px] h-[17px] rounded-full border-2 border-accent bg-bg z-10 group-hover:shadow-[0_0_8px_rgba(0,229,160,0.5)] transition-shadow" />

      {/* Card */}
      <div
        className={`rounded-xl border border-border bg-surface/60 backdrop-blur-sm p-5 transition-all hover:border-accent/40 ${
          hasDescription ? "cursor-pointer" : ""
        }`}
        onClick={hasDescription ? onToggle : undefined}
      >
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            {item.logoUrl ? (
              <img
                src={item.logoUrl}
                alt=""
                className="w-10 h-10 rounded-lg object-contain bg-white/10 shrink-0"
              />
            ) : (
              <span className="text-2xl">{item.icon}</span>
            )}
            <div>
              <h3 className="text-lg font-semibold text-text-primary leading-tight">
                {t(item.roleKey)}
              </h3>
              <p className="text-sm text-text-secondary">
                {t(item.organizationKey)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:text-right">
            <span className="text-xs text-text-secondary whitespace-nowrap font-mono">
              {t(item.periodKey)}
            </span>
            {hasDescription && (
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-text-secondary text-sm"
              >
                ▼
              </motion.span>
            )}
          </div>
        </div>

        {/* Tags + Location */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {item.locationKey && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border text-text-secondary">
              {t(item.locationKey)}
            </span>
          )}
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider ${
                tagColors[tag] || "bg-accent/10 text-accent border-accent/30"
              }`}
            >
              {t(`experience.tags.${tag}`)}
            </span>
          ))}
        </div>

        {/* Expandable description */}
        <AnimatePresence>
          {isExpanded && item.descriptionKey && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-sm text-text-secondary leading-relaxed border-t border-border pt-4">
                {t(item.descriptionKey)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ExperienceTimeline;
