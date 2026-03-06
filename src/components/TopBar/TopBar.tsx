import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "../../context/ModeContext";

const navItems = [
  { id: "overview", labelKey: "sidebar.overview" },
  { id: "evidence", labelKey: "sidebar.evidence" },
  { id: "skills", labelKey: "sidebar.skills" },
  { id: "about", labelKey: "sidebar.about" },
  { id: "contact", labelKey: "sidebar.contact" },
];

const TopBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { mode, toggleMode } = useMode();

  const currentLang = i18n.language;

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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

      {/* Center: Section navigation (desktop) */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-all duration-200"
          >
            {t(item.labelKey)}
          </button>
        ))}
      </nav>

      {/* Right: Mode Toggle + CTA */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-bg rounded-lg p-1">
          <button
            onClick={() => mode !== "recruiter" && toggleMode()}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              mode === "recruiter"
                ? "bg-accent text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`recruiter-${i18n.language}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {t("topbar.recruiter")}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={() => mode !== "technical" && toggleMode()}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              mode === "technical"
                ? "bg-accent text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`technical-${i18n.language}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {t("topbar.technical")}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollTo("contact")}
          className="hidden sm:block px-4 py-1.5 rounded-lg bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-semibold hover:bg-accent-green/20 transition-colors"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`cta-${i18n.language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {t("topbar.available")}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default TopBar;
