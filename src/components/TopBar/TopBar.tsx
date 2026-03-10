import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const TopBar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 bg-surface/90 backdrop-blur-md border-b border-border"
    >
      {/* Left: Language Toggle */}
      <div className="flex items-center gap-1 bg-bg rounded-lg p-1">
        <button
          onClick={() => switchLanguage("es")}
          className={`px-3 py-1 rounded-md text-xs font-sans font-semibold transition-all duration-200 ${
            currentLang === "es"
              ? "bg-accent text-bg"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          ES
        </button>
        <button
          onClick={() => switchLanguage("en")}
          className={`px-3 py-1 rounded-md text-xs font-sans font-semibold transition-all duration-200 ${
            currentLang === "en"
              ? "bg-accent text-bg"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          EN
        </button>
      </div>

      {/* Right: CV Download */}
      <div className="flex items-center gap-3">
        <a
          href={`${process.env.PUBLIC_URL}/CV2026.pdf`}
          download="CV2026.pdf"
          className="px-3 py-1.5 rounded-md text-xs font-medium bg-accent text-bg hover:opacity-90 transition-opacity"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`download-cv-${i18n.language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {t("topbar.download_cv")}
            </motion.span>
          </AnimatePresence>
        </a>
      </div>
    </motion.header>
  );
};

export default TopBar;
