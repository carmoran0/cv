import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { EvidenceItem } from "../../types";
import { useMode } from "../../context/ModeContext";

interface ProofTileProps {
  item: EvidenceItem;
  index: number;
  isHighlighted: boolean;
  hasActiveFilter: boolean;
}

const ProofTile: React.FC<ProofTileProps> = ({ item, index, isHighlighted, hasActiveFilter }) => {
  const { t, i18n } = useTranslation();
  const { mode } = useMode();

  const stackText = t(item.stackKey);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: hasActiveFilter ? (isHighlighted ? 1 : 0.25) : 1,
        y: 0,
        scale: hasActiveFilter && isHighlighted ? 1.02 : 1,
      }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`flex flex-col gap-2 p-4 rounded-xl bg-surface border transition-all ${
        hasActiveFilter && isHighlighted
          ? "border-accent/40 shadow-lg shadow-accent/5"
          : "border-border hover:border-accent/20"
      }`}
    >
      {/* Title */}
      <div className="flex items-start gap-2">
        <span className="text-lg">{item.icon}</span>
        <AnimatePresence mode="wait">
          <motion.h4
            key={`tile-title-${item.id}-${i18n.language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-semibold text-text-primary leading-tight"
          >
            {t(item.titleKey)}
          </motion.h4>
        </AnimatePresence>
      </div>

      {/* Stack tags — only in technical mode */}
      <AnimatePresence>
        {mode === "technical" && stackText && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-1"
          >
            {stackText.split(", ").map((tag: string) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-[10px] font-sans bg-accent/10 text-accent border border-accent/20"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goal */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-sans font-semibold tracking-wide text-text-secondary uppercase">
          {t("evidence.goal")}
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={`goal-${item.id}-${i18n.language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-text-secondary leading-relaxed"
          >
            {t(item.goalKey)}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Learned */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-sans font-semibold tracking-wide text-text-secondary uppercase">
          {t("evidence.learned")}
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={`learned-${item.id}-${i18n.language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-text-secondary leading-relaxed"
          >
            {t(item.learnedKey)}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* University badge */}
      {item.isUniversity && (
        <span className="self-start px-2 py-0.5 rounded text-[10px] font-sans bg-white/[0.04] text-text-secondary border border-border">
          {t("evidence.university")}
        </span>
      )}
    </motion.div>
  );
};

export default ProofTile;
