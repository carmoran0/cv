import React from "react";
import { useTranslation } from "react-i18next";
import { m, AnimatePresence } from "framer-motion";
import { useMode } from "../../context/ModeContext";

const AboutSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { mode } = useMode();

  return (
    <div className="max-w-2xl">
      <div className="p-6 rounded-xl bg-surface border border-border">
        <AnimatePresence mode="wait">
          <m.p
            key={`about-${mode}-${i18n.language}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-text-primary leading-relaxed whitespace-pre-line"
          >
            {t(`about.${mode}`)}
          </m.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutSection;
