import {
  KPIItem,
  EvidenceItem,
  SkillItem,
  ArchitectureNode,
  SignalItem,
  ExperienceItem,
  CertificationItem,
  ProjectItem,
} from "../types";

import unitaLogo from "../universitasmontium_logo.jpg";
import unizarLogo from "../universidad_de_zaragoza_logo.jpg";
import fiverrLogo from "../fiverr_com_logo.jpg";

import imgOverviewDataAnalysis from "../images/overview-data-analysis-power-bi.svg";
import imgDataPreparation from "../images/data-preparation-in-power-bi.svg";
import imgModelData from "../images/model-data-power-bi.svg";
import imgPowerBiEffective from "../images/power-bi-effective.svg";
import imgUseDax from "../images/Use DAX in Power BI Desktop_use-dax-in-power-bi-desktop.svg";
import imgTransactSql from "../images/get-started-querying-with-transact-sql.svg";
import imgMongoRelational from "../images/from-relational-model-sql-to-mongodb-s-document-mod-96.webp";
import imgGenericTrophy from "../images/generic-trophy.svg";
import imgAwsAcademy from "../images/aws-academy-graduate-cloud-foundations-training-bad.png";
import imgAwsSolutionsArchitect from "../images/saa-badge-resized.15f666ec150fa01aed6d1aa00cce4860a862759b.png";
import imgMongoCertification from "../images/MONGOcertification.svg";
import imgClaude from "../images/claude.svg";

export const kpiItems: KPIItem[] = [];

export const architectureNodes: ArchitectureNode[] = [];

export const signalItems: SignalItem[] = [];

export const evidenceItems: EvidenceItem[] = [];

export const skillItems: SkillItem[] = [];

export const contactData = {
  emailUser: "contacto",
  emailDomain: "carmoran.dev",
  linkedin: "https://linkedin.com/in/carlos-moreno-data",
  linkedinLabel: "linkedin.com/in/carlos-moreno-data",
  github: "https://github.com/carmoran0",
  githubLabel: "github.com/carmoran0",
};

export const experienceItems: ExperienceItem[] = [
  {
    id: "unita_comision",
    icon: "⚖️",
    logoUrl: unitaLogo,
    organizationKey: "experience.items.unita_comision.organization",
    roleKey: "experience.items.unita_comision.role",
    periodKey: "experience.items.unita_comision.period",
    descriptionKey: "experience.items.unita_comision.description",
    tags: ["politica"],
    sortDate: 20260101,
  },
  {
    id: "unita_cabeza",
    icon: "🗳️",
    logoUrl: unitaLogo,
    organizationKey: "experience.items.unita_cabeza.organization",
    roleKey: "experience.items.unita_cabeza.role",
    periodKey: "experience.items.unita_cabeza.period",
    descriptionKey: "experience.items.unita_cabeza.description",
    tags: ["politica"],
    sortDate: 20250301,
  },
  {
    id: "unizar",
    icon: "🎓",
    logoUrl: unizarLogo,
    organizationKey: "experience.items.unizar.organization",
    roleKey: "experience.items.unizar.role",
    periodKey: "experience.items.unizar.period",
    tags: ["universidad"],
    sortDate: 20230901,
  },
  {
    id: "fiverr",
    icon: "🎨",
    logoUrl: fiverrLogo,
    organizationKey: "experience.items.fiverr.organization",
    roleKey: "experience.items.fiverr.role",
    periodKey: "experience.items.fiverr.period",
    locationKey: "experience.items.fiverr.location",
    descriptionKey: "experience.items.fiverr.description",
    tags: [],
    sortDate: 20200601,
  },
];

export const projectItems: ProjectItem[] = [
  {
    id: "the_wave_hackathon_2026",
    titleKey: "projects.items.the_wave_hackathon_2026.title",
    descriptionKey: "projects.items.the_wave_hackathon_2026.description",
    tags: ["UNIVERSIDAD"],
    skills: ["Hackathon", "Teamwork", "Rapid Prototyping"],
    repoUrl: "https://github.com/dlopez-uni/the_wave",
  },
  {
    id: "microsystems_programming",
    titleKey: "projects.items.microsystems_programming.title",
    descriptionKey: "projects.items.microsystems_programming.description",
    tags: ["UNIVERSIDAD"],
    skills: ["ESP32", "Arduino", "C/C++"],
  },
  {
    id: "sensor_cloud_discord",
    titleKey: "projects.items.sensor_cloud_discord.title",
    descriptionKey: "projects.items.sensor_cloud_discord.description",
    tags: ["UNIVERSIDAD"],
    skills: ["Node-RED","APIs", "Cloud"],
  },
  {
    id: "power_bi_visuals",
    titleKey: "projects.items.power_bi_visuals.title",
    descriptionKey: "projects.items.power_bi_visuals.description",
    tags: ["UNIVERSIDAD"],
    skills: ["Power BI", "DAX", "Data Visualization"],
  },
  {
    id: "home_media_server",
    titleKey: "projects.items.home_media_server.title",
    descriptionKey: "projects.items.home_media_server.description",
    tags: ["PERSONAL"],
    skills: ["Docker", "Linux", "Networking", "Self-hosting"],
  },
  {
    id: "cv_website",
    titleKey: "projects.items.cv_website.title",
    descriptionKey: "projects.items.cv_website.description",
    tags: ["PERSONAL"],
    skills: ["React", "TypeScript", "Tailwind CSS", "i18n"],
  },
  {
    id: "personal_website",
    titleKey: "projects.items.personal_website.title",
    descriptionKey: "projects.items.personal_website.description",
    tags: ["PERSONAL"],
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "firefox_extension",
    titleKey: "projects.items.firefox_extension.title",
    descriptionKey: "projects.items.firefox_extension.description",
    tags: ["PERSONAL"],
    skills: ["JavaScript", "WebExtensions API", "CI/CD"],
  },
];

export const certificationItems: CertificationItem[] = [
  {
    id: "mongodb_relational_model",
    titleKey: "certifications.items.mongodb_relational_model.title",
    issuerKey: "certifications.items.mongodb_relational_model.issuer",
    dateKey: "certifications.items.mongodb_relational_model.date",
    imageSrc: imgMongoRelational,
    badgeUrl: "https://images.credly.com/size/340x340/images/7c1b8170-4545-4853-89ab-2e57cfa5e1f5/image.png",
    credentialUrl: "https://www.credly.com/badges/f6816c0e-8811-4f0e-a0ce-6274d9f900dd",
  },
  {
    id: "ms_overview_data_analysis",
    titleKey: "certifications.items.ms_overview_data_analysis.title",
    issuerKey: "certifications.items.ms_overview_data_analysis.issuer",
    dateKey: "certifications.items.ms_overview_data_analysis.date",
    imageSrc: imgOverviewDataAnalysis,
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/es-es/Carmoran/NMTTSUVF?sharingId=FC7223DAAE79B586",
  },
  {
    id: "ms_data_preparation",
    titleKey: "certifications.items.ms_data_preparation.title",
    issuerKey: "certifications.items.ms_data_preparation.issuer",
    dateKey: "certifications.items.ms_data_preparation.date",
    imageSrc: imgDataPreparation,
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/es-es/Carmoran/37KBXWJH?sharingId=FC7223DAAE79B586",
  },
  {
    id: "ms_model_data",
    titleKey: "certifications.items.ms_model_data.title",
    issuerKey: "certifications.items.ms_model_data.issuer",
    dateKey: "certifications.items.ms_model_data.date",
    imageSrc: imgModelData,
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/es-es/Carmoran/XELB9QNY?sharingId=FC7223DAAE79B586",
  },
  {
    id: "ms_power_bi_effective",
    titleKey: "certifications.items.ms_power_bi_effective.title",
    issuerKey: "certifications.items.ms_power_bi_effective.issuer",
    dateKey: "certifications.items.ms_power_bi_effective.date",
    imageSrc: imgPowerBiEffective,
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/es-es/Carmoran/Q5Y4PS8E?sharingId=FC7223DAAE79B586",
  },
  {
    id: "ms_prepare_visualize",
    titleKey: "certifications.items.ms_prepare_visualize.title",
    issuerKey: "certifications.items.ms_prepare_visualize.issuer",
    dateKey: "certifications.items.ms_prepare_visualize.date",
    imageSrc: imgGenericTrophy,
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/es-es/Carmoran/NMLNXCYF?sharingId=FC7223DAAE79B586",
  },
  {
    id: "ms_m365_copilot_agents",
    titleKey: "certifications.items.ms_m365_copilot_agents.title",
    issuerKey: "certifications.items.ms_m365_copilot_agents.issuer",
    dateKey: "certifications.items.ms_m365_copilot_agents.date",
    imageSrc: imgGenericTrophy,
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/es-es/Carmoran/ZDHNZZJ2?sharingId=FC7223DAAE79B586",
  },
  {
    id: "ms_use_dax",
    titleKey: "certifications.items.ms_use_dax.title",
    issuerKey: "certifications.items.ms_use_dax.issuer",
    dateKey: "certifications.items.ms_use_dax.date",
    imageSrc: imgUseDax,
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/es-es/Carmoran/FQ5QS65X?sharingId=FC7223DAAE79B586",
  },
  {
    id: "ms_transact_sql",
    titleKey: "certifications.items.ms_transact_sql.title",
    issuerKey: "certifications.items.ms_transact_sql.issuer",
    dateKey: "certifications.items.ms_transact_sql.date",
    imageSrc: imgTransactSql,
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/es-es/Carmoran/VTWX86JM?sharingId=FC7223DAAE79B586",
  },
    {
    id: "claude_code_in_action",
    titleKey: "certifications.items.claude_code_in_action.title",
    issuerKey: "certifications.items.claude_code_in_action.issuer",
    dateKey: "certifications.items.claude_code_in_action.date",
    imageSrc: imgClaude,
    credentialUrl: "https://verify.skilljar.com/c/2egzywwxpdnn",
  },
  {
    id: "aws_cloud_foundations",
    titleKey: "certifications.items.aws_cloud_foundations.title",
    issuerKey: "certifications.items.aws_cloud_foundations.issuer",
    dateKey: "certifications.items.aws_cloud_foundations.date",
    imageSrc: imgAwsAcademy,
    credentialUrl: "https://www.credly.com/badges/dd3085af-80e1-4913-a538-3e1bbf00dad7/public_url",
  },
  {
    id: "aws_solutions_architect",
    titleKey: "certifications.items.aws_solutions_architect.title",
    issuerKey: "certifications.items.aws_solutions_architect.issuer",
    dateKey: "certifications.items.aws_solutions_architect.date",
    imageSrc: imgAwsSolutionsArchitect,
    comingSoon: true,
    credentialUrl: "",
  },
    {
    id: "mongodb_python_path",
    titleKey: "certifications.items.mongodb_python_path.title",
    issuerKey: "certifications.items.mongodb_python_path.issuer",
    dateKey: "certifications.items.mongodb_python_path.date",
    imageSrc: imgMongoCertification,
    comingSoon: true,
    credentialUrl: "",
  },

];
