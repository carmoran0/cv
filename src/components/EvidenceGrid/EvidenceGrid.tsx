import React from "react";
import { useTranslation } from "react-i18next";
import { m, AnimatePresence } from "framer-motion";
import { evidenceItems } from "../../data/cv";
import ProofTile from "../ProofTile/ProofTile";

interface EvidenceGridProps {
  activeSkills: string[];
}

const EvidenceGrid: React.FC<EvidenceGridProps> = ({ activeSkills }) => {
  const { t, i18n } = useTranslation();
  const hasActiveFilter = activeSkills.length > 0;
  const highlightedCount = evidenceItems.filter((item) =>
    !hasActiveFilter || item.skills.some((s) => activeSkills.includes(s))
  ).length;

  return (
    <div>
      <AnimatePresence mode="wait">
        <m.h2
          key={`evidence-title-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-sans font-semibold tracking-widest text-text-secondary uppercase mb-4"
        >
          {t("evidence.title")}
        </m.h2>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {evidenceItems.map((item, idx) => {
          const isHighlighted =
            !hasActiveFilter ||
            item.skills.some((s) => activeSkills.includes(s));
          return (
            <ProofTile
              key={item.id}
              item={item}
              index={idx}
              isHighlighted={isHighlighted}
              hasActiveFilter={hasActiveFilter}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <m.p
          key={`evidence-counter-${i18n.language}-${highlightedCount}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-4 text-xs text-text-secondary"
        >
          {t("evidence.counter", {
            visible: highlightedCount,
            total: evidenceItems.length,
          })}
        </m.p>
      </AnimatePresence>
    </div>
  );
};

export default EvidenceGrid;
