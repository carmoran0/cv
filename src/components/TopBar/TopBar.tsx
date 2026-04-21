import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const TopBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const baseUrl = import.meta.env.BASE_URL || "/";

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <m.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-6 py-3 bg-surface/90 backdrop-blur-md border-b border-border"
    >
      <div className="flex items-center gap-1 bg-bg rounded-lg p-1">
        <button
          type="button"
          onClick={() => switchLanguage("es")}
          aria-pressed={currentLang === "es"}
          aria-label={t("topbar.switch_to_es")}
          className={`px-3 py-1 rounded-md text-xs font-sans font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
            currentLang === "es"
              ? "bg-accent text-bg"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          ES
        </button>
        <button
          type="button"
          onClick={() => switchLanguage("en")}
          aria-pressed={currentLang === "en"}
          aria-label={t("topbar.switch_to_en")}
          className={`px-3 py-1 rounded-md text-xs font-sans font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
            currentLang === "en"
              ? "bg-accent text-bg"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          EN
        </button>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={`${baseUrl}CV2026.pdf`}
          download="CV2026.pdf"
          aria-label={t("topbar.download_cv_aria")}
          className="px-3 py-1.5 rounded-md text-xs font-medium bg-accent text-bg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <AnimatePresence mode="wait">
            <m.span
              key={`download-cv-${i18n.language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {t("topbar.download_cv")}
            </m.span>
          </AnimatePresence>
        </a>
      </div>
    </m.header>
  );
};

export default TopBar;
