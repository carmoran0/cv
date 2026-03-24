import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import BorderGlow from "../ui/BorderGlow";

const NOTICE_SESSION_KEY = "cv-mobile-notice-dismissed";

const MobileNotice: React.FC = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateMobileState = (matches: boolean) => {
      setIsMobile(matches);
      if (!matches) {
        setDismissed(false);
      }
    };

    updateMobileState(mediaQuery.matches);

    const storedValue = window.sessionStorage.getItem(NOTICE_SESSION_KEY);
    if (storedValue === "true") {
      setDismissed(true);
    }

    const handler = (event: MediaQueryListEvent) => {
      updateMobileState(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    window.sessionStorage.setItem(NOTICE_SESSION_KEY, "true");
  };

  const shouldShow = isMobile && !dismissed;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="md:hidden px-3 py-2 pt-[64px]"
          role="status"
          aria-live="polite"
        >
          <BorderGlow
            edgeSensitivity={30}
            glowColor="155 100 45"
            backgroundColor="#111118"
            borderRadius={10}
            glowRadius={18}
            glowIntensity={0.55}
            coneSpread={24}
            animated={false}
            colors={["#00e5a0", "#14c98f", "#6ee7c8"]}
            className="rounded-[10px] border-accent/40"
          >
            <div className="rounded-[10px] bg-gradient-to-r from-accent/30 via-accent-green/15 to-transparent px-4 py-2.5">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent-green animate-pulse" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-text-primary">
                    {t("mobile_notice.title")}
                  </p>
                  <p className="text-xs leading-snug text-text-secondary/95 mt-0.5">
                    {t("mobile_notice.text")}
                  </p>
                </div>
                <BorderGlow
                  edgeSensitivity={34}
                  glowColor="155 100 45"
                  backgroundColor="#0a0a0f"
                  borderRadius={6}
                  glowRadius={12}
                  glowIntensity={0.35}
                  coneSpread={24}
                  animated={false}
                  colors={["#00e5a0", "#14c98f", "#6ee7c8"]}
                  className="rounded-md border-border/90"
                >
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="shrink-0 rounded-md border border-transparent bg-bg/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors"
                    aria-label={t("mobile_notice.close_aria")}
                  >
                    {t("mobile_notice.close")}
                  </button>
                </BorderGlow>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNotice;
