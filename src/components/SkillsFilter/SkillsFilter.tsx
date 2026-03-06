import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { skillItems } from "../../data/cv";
import { useMode } from "../../context/ModeContext";

interface SkillsFilterProps {
  activeSkills: string[];
  onToggleSkill: (skillId: string) => void;
}

const SkillsFilter: React.FC<SkillsFilterProps> = ({ activeSkills, onToggleSkill }) => {
  const { t, i18n } = useTranslation();
  const { mode } = useMode();

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.h2
          key={`skills-title-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-sans font-semibold tracking-widest text-text-secondary uppercase mb-4"
        >
          {t("skills.title")}
        </motion.h2>
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        {skillItems.map((skill) => {
          const isActive = activeSkills.includes(skill.id);
          return (
            <motion.div key={skill.id} layout>
              <motion.button
                onClick={() => onToggleSkill(skill.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg font-sans text-xs font-medium border transition-all duration-200 ${
                  isActive
                    ? "bg-accent/20 text-accent border-accent/40 shadow-md shadow-accent/10"
                    : "bg-surface text-text-secondary border-border hover:border-accent/20 hover:text-text-primary"
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`skill-${skill.id}-${i18n.language}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {t(skill.labelKey)}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Technical mode: expanded note */}
              <AnimatePresence>
                {mode === "technical" && isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] text-text-secondary px-1 overflow-hidden"
                  >
                    {t(skill.noteKey)}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsFilter;
