import React from "react";
import { useTranslation } from "react-i18next";
import { m, AnimatePresence } from "framer-motion";
import { skillItems } from "../../data/cv";
import { useMode } from "../../context/ModeContext";
import BorderGlow from "../ui/BorderGlow";

interface SkillsFilterProps {
  activeSkills: string[];
  onToggleSkill: (skillId: string) => void;
}

const SkillsFilter: React.FC<SkillsFilterProps> = ({ activeSkills, onToggleSkill }) => {
  const { t, i18n } = useTranslation();
  const { mode } = useMode();

  return (
    <div>
      <m.h2
        key={`skills-title-${i18n.language}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="text-xs font-sans font-semibold tracking-widest text-text-secondary uppercase mb-4"
      >
        {t("skills.title")}
      </m.h2>

      <div className="flex flex-wrap gap-2">
        {skillItems.map((skill) => {
          const isActive = activeSkills.includes(skill.id);
          const label = (
            <m.span
              key={`skill-${skill.id}-${i18n.language}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              {t(skill.labelKey)}
            </m.span>
          );

          return (
            <m.div key={skill.id} layout>
              {isActive ? (
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="155 100 45"
                  backgroundColor="#111118"
                  borderRadius={8}
                  glowRadius={18}
                  glowIntensity={0.7}
                  coneSpread={25}
                  animated={false}
                  colors={["#00e5a0", "#14c98f", "#6ee7c8"]}
                  className="rounded-lg border-accent/40"
                >
                  <m.button
                    type="button"
                    onClick={() => onToggleSkill(skill.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-pressed={isActive}
                    aria-label={t(skill.labelKey)}
                    className="px-3 py-1.5 rounded-lg font-sans text-xs font-medium border border-transparent bg-accent/20 text-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    {label}
                  </m.button>
                </BorderGlow>
              ) : (
                <m.button
                  type="button"
                  onClick={() => onToggleSkill(skill.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={isActive}
                  aria-label={t(skill.labelKey)}
                  className="px-3 py-1.5 rounded-lg font-sans text-xs font-medium border transition-all duration-200 bg-surface text-text-secondary border-border hover:border-accent/20 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {label}
                </m.button>
              )}

              {/* Technical mode: expanded note */}
              <AnimatePresence>
                {mode === "technical" && isActive && (
                  <m.p
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] text-text-secondary px-1 overflow-hidden"
                  >
                    {t(skill.noteKey)}
                  </m.p>
                )}
              </AnimatePresence>
            </m.div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsFilter;
