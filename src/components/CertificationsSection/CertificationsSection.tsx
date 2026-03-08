import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { certificationItems } from "../../data/cv";

const CertificationsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {certificationItems.map((cert, idx) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.06 }}
          className="w-36 sm:w-40 md:w-44 shrink-0"
        >
          <a
            href={cert.credentialUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center text-center h-full bg-transparent border-0 p-0 transition-all ${
              cert.comingSoon
                ? "opacity-60 pointer-events-none"
                : cert.credentialUrl
                ? "cursor-pointer"
                : "pointer-events-none"
            }`}
          >
            {/* Badge image: same size for all badges */}
            {cert.imageSrc ? (
              <img
                src={cert.imageSrc}
                alt=""
                className="block h-12 w-12 mb-2 object-contain"
              />
            ) : cert.badgeUrl ? (
              <img
                src={cert.badgeUrl}
                alt=""
                className="block h-12 w-12 mb-2 object-contain"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="block h-12 w-12 mb-2 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
              </svg>
            )}

            {/* Title / issuer / date */}
            <h3 className="text-xs font-semibold text-text-primary leading-snug line-clamp-2 min-h-[2rem]">
              {t(cert.titleKey)}
            </h3>
            <p className="text-[10px] text-text-secondary mt-1">
              {t(cert.issuerKey)}
            </p>
            <p className="text-[10px] text-text-secondary font-mono mt-1">
              {t(cert.dateKey)}
            </p>

            {/* Coming soon badge */}
            {cert.comingSoon && (
              <span className="mt-2 inline-block text-[9px] font-semibold uppercase tracking-wider text-accent/70 bg-accent/10 px-2 py-0.5 rounded-full">
                {t("certifications.comingSoon")}
              </span>
            )}

            {/* Credential link hint */}
            {cert.credentialUrl && !cert.comingSoon && (
              <div className="mt-2 text-[10px] text-accent/70 font-medium uppercase tracking-wider">
                {t("certifications.viewCredential")} →
              </div>
            )}
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default CertificationsSection;
