import React, { Suspense, lazy, useEffect, useState } from "react";
import { ModeProvider } from "./context/ModeContext";
import TopBar from "./components/TopBar/TopBar";
import MobileNotice from "./components/MobileNotice/MobileNotice";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutSection from "./components/AboutSection/AboutSection";
import ContactSection from "./components/ContactSection/ContactSection";
import ExperienceTimeline from "./components/ExperienceTimeline/ExperienceTimeline";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import GitHubSection from "./components/GitHubSection/GitHubSection";
import CertificationsSection from "./components/CertificationsSection/CertificationsSection";
import { FlickeringGrid } from "./components/ui/flickering-grid";
import { LocationTag } from "./components/ui/LocationTag";
import { m } from "framer-motion";
import { useTranslation } from "react-i18next";
import profileImg from "./images/profile.webp";

const LazyZaragozaMap = lazy(() =>
  import("./components/ui/ZaragozaMap").then((module) => ({
    default: module.ZaragozaMap,
  }))
);

function App() {
  const { t, i18n } = useTranslation();
  const [isLocationHovered, setIsLocationHovered] = useState(false);

  useEffect(() => {
    document.title = t("app.title");
  }, [i18n.language, t]);

  // Auto-hide mapa después de 2.5 segundos
  useEffect(() => {
    if (!isLocationHovered) return;

    const timeoutId = window.setTimeout(() => {
      setIsLocationHovered(false);
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [isLocationHovered]);

  return (
    <ModeProvider>
      <div className="relative min-h-[calc(100vh-0.5rem)] md:min-h-[calc(100vh-2rem)] w-[min(1200px,calc(100%-0.5rem))] md:w-[min(1200px,calc(100%-2rem))] mx-auto my-1 md:my-4 border-[4px] md:border-[10px] border-border bg-bg text-text-primary flex flex-col overflow-hidden">
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

          <main className="flex-1 overflow-y-auto scroll-smooth scroll-pt-[72px]">
            <MobileNotice />
            {/* Hero */}
            <HeroSection />

            {/* About */}
            <section id="about" className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
              <SectionHeading titleKey="about.title" />
              <div className="flex justify-center">
                <div className="flex w-full flex-col md:flex-row gap-8 items-center md:items-start">
                  <AboutSection />
                  <div className="flex w-full max-w-56 md:w-56 flex-col items-center gap-3 shrink-0">
                    {/* Profile Image Container with Map Animation */}
                    <div className="relative w-full h-40 rounded-xl border border-border/80 overflow-hidden">
                      {/* Base profile image */}
                      <img
                        src={profileImg}
                        alt={t("app.profile_alt")}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Map overlay */}
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLocationHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 w-full h-full z-20"
                      >
                        <Suspense fallback={null}>
                          <LazyZaragozaMap />
                        </Suspense>
                      </m.div>
                    </div>

                    <LocationTag
                      city="Zaragoza"
                      country="Spain"
                      timezone="CET"
                      className="w-full justify-between px-3 py-1.5 text-sm"
                      onHoverChange={setIsLocationHovered}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
              <SectionHeading titleKey="experience.title" />
              <div className="flex justify-center">
                <ExperienceTimeline />
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
              <SectionHeading titleKey="projects.title" />
              <ProjectsSection />
            </section>

            {/* GitHub */}
            <GitHubSection />

            {/* Certifications */}
            <section id="certifications" className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
              <SectionHeading titleKey="certifications.title" />
              <CertificationsSection />
            </section>

            {/* Contact */}
            <section id="contact" className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
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
