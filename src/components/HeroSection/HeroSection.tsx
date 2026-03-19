import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BubbleText } from "../ui/bubble-text";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[50vh] md:min-h-[70vh] px-4 md:px-6 py-10 md:py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Name */}
        <BubbleText text="Carlos Moreno" />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl font-light"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-gradient-to-r from-accent/25 via-accent-green/10 to-transparent px-4 py-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-text-primary">
            {t("hero.availability_badge")}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
