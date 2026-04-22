import React from "react";
import { useTranslation } from "react-i18next";
import { m, AnimatePresence } from "framer-motion";
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
      <m.div
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
          <div className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-accent/20 via-accent-green/10 to-transparent p-4 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] md:p-5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
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
      </m.div>

      <AnimatePresence mode="wait">
        <m.h2
          key={`contact-title-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-sans font-semibold tracking-widest text-text-secondary uppercase mb-4"
        >
          {t("contact.title")}
        </m.h2>
      </AnimatePresence>

      <div className="relative flex flex-col gap-3 md:gap-4 md:pl-10">
        <div className="pointer-events-none absolute left-4 top-2 hidden h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-transparent via-accent/35 to-transparent md:block" />
        {links.map((link, idx) => (
          <div
            key={link.id}
            className={`flex ${idx % 2 === 0 ? "justify-start md:pr-8" : "justify-end md:pl-8"}`}
          >
            <m.a
              href={link.href}
              target={link.id !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -18 : 18, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + idx * 0.11, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex w-full max-w-[calc(100%-1rem)] items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-[0_16px_34px_-26px_rgba(0,0,0,0.9)] transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_22px_46px_-28px_rgba(0,0,0,0.95)] md:max-w-[88%] ${idx % 2 === 0 ? "md:-translate-x-1 md:rounded-l-2xl md:border-l-accent/25" : "md:translate-x-1 md:rounded-r-2xl md:border-r-accent/25"}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent transition-colors group-hover:bg-accent/20">
                {link.icon}
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-[10px] font-sans font-semibold tracking-wide text-text-secondary uppercase">
                  {link.label}
                </span>
                <span className="truncate text-sm text-text-primary transition-colors group-hover:text-accent">
                  {link.value}
                </span>
              </div>
            </m.a>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <m.p
          key={`preferred-${i18n.language}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="mt-4 text-xs text-text-secondary font-sans italic"
        >
          {t("contact.preferred")}
        </m.p>
      </AnimatePresence>

      <a
        href={`mailto:${emailAddress}`}
        className="mt-4 inline-flex items-center justify-center self-start rounded-lg bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-bg shadow-[0_16px_32px_-22px_rgba(0,0,0,0.95)] transition-all hover:-translate-y-0.5 hover:opacity-90 md:ml-10"
      >
        {t("contact.cta_action")}
      </a>

    </div>
  );
};

export default ContactSection;
