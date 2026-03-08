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
      </motion.div>
    </section>
  );
};

export default HeroSection;
