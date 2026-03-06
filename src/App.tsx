import React, { useState } from "react";
import { ModeProvider } from "./context/ModeContext";
import TopBar from "./components/TopBar/TopBar";
import HeroSection from "./components/HeroSection/HeroSection";
import KPICard from "./components/KPICard/KPICard";
import SignalsRow from "./components/SignalsRow/SignalsRow";
import EvidenceGrid from "./components/EvidenceGrid/EvidenceGrid";
import SkillsFilter from "./components/SkillsFilter/SkillsFilter";
import AboutSection from "./components/AboutSection/AboutSection";
import ContactSection from "./components/ContactSection/ContactSection";
import { FlickeringGrid } from "./components/ui/flickering-grid";
import { kpiItems } from "./data/cv";
import { useTranslation } from "react-i18next";

function App() {
  const [activeSkills, setActiveSkills] = useState<string[]>([]);

  const handleToggleSkill = (skillId: string) => {
    setActiveSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((s) => s !== skillId)
        : [...prev, skillId]
    );
  };

  return (
    <ModeProvider>
      <div className="relative min-h-screen bg-bg text-text-primary flex flex-col">
        {/* Flickering grid background */}
        <FlickeringGrid
          className="z-0 absolute inset-0 size-full"
          squareSize={16}
          gridGap={6}
          color="#00ff3c"
          maxOpacity={0.20}
          flickerChance={0.05}
        />

        {/* App content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <TopBar />

          <main className="flex-1 overflow-y-auto">
            {/* Hero */}
            <HeroSection />

            {/* Overview */}
            <section id="overview" className="px-4 md:px-8 lg:px-16 py-12">
              <SectionHeading titleKey="sidebar.overview" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {kpiItems.map((item, idx) => (
                  <KPICard key={item.id} item={item} index={idx} />
                ))}
              </div>
              <div className="mt-8">
                <SignalsRow />
              </div>
            </section>

            {/* Evidence */}
            <section id="evidence" className="px-4 md:px-8 lg:px-16 py-12">
              <SectionHeading titleKey="evidence.title" />
              <EvidenceGrid activeSkills={activeSkills} />
            </section>

            {/* Skills */}
            <section id="skills" className="px-4 md:px-8 lg:px-16 py-12">
              <SectionHeading titleKey="skills.title" />
              <SkillsFilter
                activeSkills={activeSkills}
                onToggleSkill={handleToggleSkill}
              />
              <div className="mt-6">
                <EvidenceGrid activeSkills={activeSkills} />
              </div>
            </section>

            {/* Experience section removed */}

            {/* About */}
            <section id="about" className="px-4 md:px-8 lg:px-16 py-12">
              <AboutSection />
            </section>

            {/* Contact */}
            <section id="contact" className="px-4 md:px-8 lg:px-16 py-12">
              <ContactSection />
            </section>
          </main>
        </div>
      </div>
    </ModeProvider>
  );
}

const SectionHeading: React.FC<{ titleKey: string }> = ({ titleKey }) => {
  const { t } = useTranslation();
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-8 border-b border-border pb-4">
      {t(titleKey)}
    </h2>
  );
};

export default App;
