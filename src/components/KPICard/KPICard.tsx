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
      className="relative flex flex-col gap-1 p-4 rounded-xl bg-surface/95 border border-border hover:border-accent/50 hover:shadow-[0_0_18px_rgba(0,229,160,0.14)] transition-all duration-300"
    >
      {/* Status light for the STATUS card */}
      {item.type === "status" && (
        <>
          <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-accent-green/20 animate-ping" />
          <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse_status" />
        </>
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
