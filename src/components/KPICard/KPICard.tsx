import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { KPIItem } from "../../types";

interface KPICardProps {
  item: KPIItem;
  index: number;
}

const KPICard: React.FC<KPICardProps> = ({ item, index }) => {
  const { t, i18n } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="relative flex flex-col gap-1 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors"
    >
      {/* Status light for the STATUS card */}
      {item.type === "status" && (
        <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse_status" />
      )}

      <AnimatePresence mode="wait">
        <motion.span
          key={`label-${item.id}-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-[10px] font-sans font-semibold tracking-widest text-text-secondary uppercase"
        >
          {t(item.labelKey)}
        </motion.span>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.span
          key={`value-${item.id}-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`text-sm font-semibold ${
            item.type === "status" ? "text-accent-green" : "text-text-primary"
          }`}
        >
          {t(item.valueKey)}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

export default KPICard;
