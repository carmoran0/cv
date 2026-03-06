import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { contactData } from "../../data/cv";

const ContactSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  const links = [
    {
      id: "email",
      label: t("contact.email"),
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      icon: "✉️",
    },
    {
      id: "linkedin",
      label: t("contact.linkedin"),
      value: contactData.linkedinLabel,
      href: contactData.linkedin,
      icon: "in",
    },
    {
      id: "github",
      label: t("contact.github"),
      value: contactData.githubLabel,
      href: contactData.github,
      icon: "🐙",
    },
  ];

  return (
    <div id="contact" className="max-w-lg">
      <AnimatePresence mode="wait">
        <motion.h2
          key={`contact-title-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-sans font-semibold tracking-widest text-text-secondary uppercase mb-4"
        >
          {t("contact.title")}
        </motion.h2>
      </AnimatePresence>

      <div className="flex flex-col gap-3">
        {links.map((link, idx) => (
          <motion.a
            key={link.id}
            href={link.href}
            target={link.id !== "email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent text-xs font-sans font-bold group-hover:bg-accent/20 transition-colors">
              {link.icon}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-sans font-semibold tracking-wide text-text-secondary uppercase">
                {link.label}
              </span>
              <span className="text-sm text-text-primary group-hover:text-accent transition-colors">
                {link.value}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={`preferred-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="mt-4 text-xs text-text-secondary font-sans italic"
        >
          {t("contact.preferred")}
        </motion.p>
      </AnimatePresence>

    </div>
  );
};

export default ContactSection;
