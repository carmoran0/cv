import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { contactData } from "../../data/cv";
import BorderGlow from "../ui/BorderGlow";

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ContactSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const emailAddress = `${contactData.emailUser}@${contactData.emailDomain}`;

  const links = [
    {
      id: "email",
      label: t("contact.email"),
      value: emailAddress,
      href: `mailto:${emailAddress}`,
      icon: <EmailIcon />,
    },
    {
      id: "linkedin",
      label: t("contact.linkedin"),
      value: contactData.linkedinLabel,
      href: contactData.linkedin,
      icon: <LinkedInIcon />,
    },
    {
      id: "github",
      label: t("contact.github"),
      value: contactData.githubLabel,
      href: contactData.github,
      icon: <GitHubIcon />,
    },
  ];

  return (
    <div id="contact" className="max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <BorderGlow
          edgeSensitivity={28}
          glowColor="155 100 45"
          backgroundColor="#111118"
          borderRadius={12}
          glowRadius={22}
          glowIntensity={0.6}
          coneSpread={24}
          animated={false}
          colors={["#00e5a0", "#14c98f", "#6ee7c8"]}
          className="rounded-xl border-accent/35"
        >
          <div className="rounded-xl bg-gradient-to-r from-accent/20 via-accent-green/10 to-transparent p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              {t("contact.cta_title")}
            </p>
            <p className="mt-1 text-xs text-text-secondary leading-relaxed">
              {t("contact.cta_text")}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center rounded-full border border-border/80 bg-surface/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-primary">
                {t("contact.availability")}
              </span>
              <span className="inline-flex items-center rounded-full border border-border/80 bg-surface/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-primary">
                {t("contact.response_time")}
              </span>
            </div>
          </div>
        </BorderGlow>
      </motion.div>

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
            <div className="flex min-w-0 flex-col">
              <span className="text-[10px] font-sans font-semibold tracking-wide text-text-secondary uppercase">
                {link.label}
              </span>
              <span className="truncate text-sm text-text-primary group-hover:text-accent transition-colors">
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

      <a
        href={`mailto:${emailAddress}`}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-bg hover:opacity-90 transition-opacity"
      >
        {t("contact.cta_action")}
      </a>

    </div>
  );
};

export default ContactSection;
