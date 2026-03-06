import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { architectureNodes } from "../../data/cv";

const ArchitectureDiagram: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="p-4 md:p-6 rounded-xl bg-surface border border-border">
      <AnimatePresence mode="wait">
        <motion.h3
          key={`arch-title-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-sans font-semibold tracking-widest text-text-secondary uppercase mb-6"
        >
          {t("architecture.title")}
        </motion.h3>
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
        {architectureNodes.map((node, idx) => (
          <React.Fragment key={node.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="group relative flex flex-col items-center gap-2 px-4 py-3 rounded-lg bg-bg border border-border hover:border-accent/50 transition-all cursor-default min-w-[100px]"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`node-${node.id}-${i18n.language}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs font-semibold text-text-primary"
                >
                  {t(node.labelKey)}
                </motion.span>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.span
                  key={`tools-${node.id}-${i18n.language}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[10px] font-sans text-text-secondary text-center"
                >
                  {t(node.toolsKey)}
                </motion.span>
              </AnimatePresence>

              {/* Tooltip on hover */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="px-2 py-1 rounded bg-accent text-bg text-[10px] font-sans whitespace-nowrap">
                  {t(node.toolsKey)}
                </div>
              </div>
            </motion.div>

            {/* Arrow between nodes */}
            {idx < architectureNodes.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.15 }}
                className="hidden md:block text-accent/50 text-lg mx-1"
              >
                →
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
