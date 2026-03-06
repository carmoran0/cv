import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { signalItems } from "../../data/cv";

const SignalsRow: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      {signalItems.map((signal, idx) => (
        <motion.div
          key={signal.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.06 }}
          className="flex items-start gap-2 p-3 rounded-lg bg-surface border border-border hover:border-accent/20 transition-colors"
        >
          <span className="text-sm flex-shrink-0">{signal.icon}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`signal-${signal.id}-${i18n.language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-sans text-text-secondary leading-snug"
            >
              {t(signal.textKey)}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default SignalsRow;
