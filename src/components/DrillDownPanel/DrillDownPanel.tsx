import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../types";
import { kpiItems } from "../../data/cv";
import KPICard from "../KPICard/KPICard";
import ArchitectureDiagram from "../ArchitectureDiagram/ArchitectureDiagram";
import SignalsRow from "../SignalsRow/SignalsRow";
import EvidenceGrid from "../EvidenceGrid/EvidenceGrid";
import SkillsFilter from "../SkillsFilter/SkillsFilter";
import AboutSection from "../AboutSection/AboutSection";
import ContactSection from "../ContactSection/ContactSection";

interface DrillDownPanelProps {
  section: Section;
  activeSkills: string[];
  onToggleSkill: (skillId: string) => void;
}

const DrillDownPanel: React.FC<DrillDownPanelProps> = ({
  section,
  activeSkills,
  onToggleSkill,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {section === "overview" && (
            <div className="flex flex-col gap-6">
              {/* KPI Cards row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {kpiItems.map((item, idx) => (
                  <KPICard key={item.id} item={item} index={idx} />
                ))}
              </div>

              {/* Architecture diagram */}
              <ArchitectureDiagram />

              {/* Signals row */}
              <SignalsRow />
            </div>
          )}

          {section === "evidence" && (
            <EvidenceGrid activeSkills={activeSkills} />
          )}

          {section === "skills" && (
            <div className="flex flex-col gap-6">
              <SkillsFilter
                activeSkills={activeSkills}
                onToggleSkill={onToggleSkill}
              />
              {/* Show evidence grid below skills with filter applied */}
              <EvidenceGrid activeSkills={activeSkills} />
            </div>
          )}

          {section === "about" && <AboutSection />}

          {section === "contact" && <ContactSection />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DrillDownPanel;
