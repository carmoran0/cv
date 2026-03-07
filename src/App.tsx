import React from "react";
import { ModeProvider } from "./context/ModeContext";
import TopBar from "./components/TopBar/TopBar";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutSection from "./components/AboutSection/AboutSection";
import ContactSection from "./components/ContactSection/ContactSection";
import ExperienceTimeline from "./components/ExperienceTimeline/ExperienceTimeline";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection/CertificationsSection";
import { FlickeringGrid } from "./components/ui/flickering-grid";
import { LocationTag } from "./components/ui/LocationTag";
import { useTranslation } from "react-i18next";
import profileImg from "./images/profile.gif";

function App() {
  return (
    <ModeProvider>
      <div className="relative min-h-[calc(100vh-2rem)] w-[min(1200px,calc(100%-2rem))] mx-auto my-4 border-[10px] border-border bg-bg text-text-primary flex flex-col overflow-hidden">
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
        <div className="relative z-10 flex flex-col min-h-full">
          <TopBar />

          <main className="flex-1 overflow-y-auto">
            {/* Hero */}
            <HeroSection />

            {/* About */}
            <section id="about" className="px-4 md:px-8 lg:px-16 py-12">
              <SectionHeading titleKey="about.title" />
              <div className="flex justify-center">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <AboutSection />
                  <div className="flex w-56 flex-col items-center gap-3 shrink-0">
                    <img
                      src={profileImg}
                      alt="Carlos Moreno"
                      className="w-full h-40 rounded-xl border border-border/80 object-cover"
                    />
                    <LocationTag
                      city="Zaragoza"
                      country="Spain"
                      timezone="CET"
                      className="w-full justify-between px-3 py-1.5 text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="px-4 md:px-8 lg:px-16 py-12">
              <SectionHeading titleKey="experience.title" />
              <div className="flex justify-center">
                <ExperienceTimeline />
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="px-4 md:px-8 lg:px-16 py-12">
              <SectionHeading titleKey="projects.title" />
              <ProjectsSection />
            </section>

            {/* Certifications */}
            <section id="certifications" className="px-4 md:px-8 lg:px-16 py-12">
              <SectionHeading titleKey="certifications.title" />
              <CertificationsSection />
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
