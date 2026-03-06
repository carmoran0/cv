import { KPIItem, EvidenceItem, SkillItem, ArchitectureNode, SignalItem, ExperienceItem, CertificationItem } from "../types";

import unitaLogo from "../universitasmontium_logo.jpg";
import unizarLogo from "../universidad_de_zaragoza_logo.jpg";
import fiverrLogo from "../fiverr_com_logo.jpg";

import imgOverviewDataAnalysis from "../images/overview-data-analysis-power-bi.svg";
import imgDataPreparation from "../images/data-preparation-in-power-bi.svg";
import imgModelData from "../images/model-data-power-bi.svg";
import imgPowerBiEffective from "../images/power-bi-effective.svg";
import imgUseDax from "../images/Use DAX in Power BI Desktop_use-dax-in-power-bi-desktop.svg";
import imgTransactSql from "../images/get-started-querying-with-transact-sql.svg";
import imgMongoRelational from "../images/from-relational-model-sql-to-mongodb-s-document-mod.png";

export const kpiItems: KPIItem[] = [];

export const architectureNodes: ArchitectureNode[] = [];

export const signalItems: SignalItem[] = [];

export const evidenceItems: EvidenceItem[] = [];

export const skillItems: SkillItem[] = [];

export const contactData = {
  email: "carmoran05@proton.me",
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
    id: "mongodb_python_path",
    titleKey: "certifications.items.mongodb_python_path.title",
    issuerKey: "certifications.items.mongodb_python_path.issuer",
    dateKey: "certifications.items.mongodb_python_path.date",
    comingSoon: true,
    credentialUrl: "",
  },
  {
    id: "ms_overview_data_analysis",
    titleKey: "certifications.items.ms_overview_data_analysis.title",
    issuerKey: "certifications.items.ms_overview_data_analysis.issuer",
    dateKey: "certifications.items.ms_overview_data_analysis.date",
    imageSrc: imgOverviewDataAnalysis,
    credentialUrl: "",
  },
  {
    id: "ms_data_preparation",
    titleKey: "certifications.items.ms_data_preparation.title",
    issuerKey: "certifications.items.ms_data_preparation.issuer",
    dateKey: "certifications.items.ms_data_preparation.date",
    imageSrc: imgDataPreparation,
    credentialUrl: "",
  },
  {
    id: "ms_model_data",
    titleKey: "certifications.items.ms_model_data.title",
    issuerKey: "certifications.items.ms_model_data.issuer",
    dateKey: "certifications.items.ms_model_data.date",
    imageSrc: imgModelData,
    credentialUrl: "",
  },
  {
    id: "ms_power_bi_effective",
    titleKey: "certifications.items.ms_power_bi_effective.title",
    issuerKey: "certifications.items.ms_power_bi_effective.issuer",
    dateKey: "certifications.items.ms_power_bi_effective.date",
    imageSrc: imgPowerBiEffective,
    credentialUrl: "",
  },
  {
    id: "ms_use_dax",
    titleKey: "certifications.items.ms_use_dax.title",
    issuerKey: "certifications.items.ms_use_dax.issuer",
    dateKey: "certifications.items.ms_use_dax.date",
    imageSrc: imgUseDax,
    credentialUrl: "",
  },
  {
    id: "ms_transact_sql",
    titleKey: "certifications.items.ms_transact_sql.title",
    issuerKey: "certifications.items.ms_transact_sql.issuer",
    dateKey: "certifications.items.ms_transact_sql.date",
    imageSrc: imgTransactSql,
    credentialUrl: "",
  },
  {
    id: "aws_cloud_foundations",
    titleKey: "certifications.items.aws_cloud_foundations.title",
    issuerKey: "certifications.items.aws_cloud_foundations.issuer",
    dateKey: "certifications.items.aws_cloud_foundations.date",
    comingSoon: true,
    credentialUrl: "",
  },
];
