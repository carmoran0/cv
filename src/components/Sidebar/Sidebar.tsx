import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../types";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const sections: { id: Section; labelKey: string; icon: string }[] = [
  { id: "overview", labelKey: "sidebar.overview", icon: "◈" },
  { id: "evidence", labelKey: "sidebar.evidence", icon: "◆" },
  { id: "skills", labelKey: "sidebar.skills", icon: "⬡" },
  { id: "about", labelKey: "sidebar.about", icon: "○" },
  { id: "contact", labelKey: "sidebar.contact", icon: "△" },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col gap-1 w-48 min-h-full p-4 bg-surface border-r border-border">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left font-medium transition-all duration-200 ${
              activeSection === section.id
                ? "bg-accent/10 text-accent border border-accent/20"
                : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03] border border-transparent"
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-sans text-xs">{section.icon}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`${section.id}-${i18n.language}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {t(section.labelKey)}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        ))}
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 bg-surface/95 backdrop-blur-md border-t border-border">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs transition-colors ${
              activeSection === section.id
                ? "text-accent"
                : "text-text-secondary"
            }`}
          >
            <span className="text-sm">{section.icon}</span>
            <span className="text-[10px]">{t(section.labelKey)}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
