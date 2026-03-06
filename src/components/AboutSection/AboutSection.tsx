import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "../../context/ModeContext";

const AboutSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { mode } = useMode();

  return (
    <div className="max-w-2xl">
      <AnimatePresence mode="wait">
        <motion.h2
          key={`about-title-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-sans font-semibold tracking-widest text-text-secondary uppercase mb-4"
        >
          {t("about.title")}
        </motion.h2>
      </AnimatePresence>

      <div className="p-6 rounded-xl bg-surface border border-border">
        <AnimatePresence mode="wait">
          <motion.p
            key={`about-${mode}-${i18n.language}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-text-primary leading-relaxed whitespace-pre-line"
          >
            {t(`about.${mode}`)}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutSection;
