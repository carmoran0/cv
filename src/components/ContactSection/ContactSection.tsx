import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { contactData } from "../../data/cv";
import BorderGlow from "../ui/BorderGlow";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "../icons/Icons";

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
