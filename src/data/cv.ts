import { KPIItem, EvidenceItem, SkillItem, ArchitectureNode, SignalItem, ExperienceItem } from "../types";

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
    organizationKey: "experience.items.unizar.organization",
    roleKey: "experience.items.unizar.role",
    periodKey: "experience.items.unizar.period",
    tags: ["universidad"],
    sortDate: 20230901,
  },
  {
    id: "fiverr",
    icon: "🎨",
    organizationKey: "experience.items.fiverr.organization",
    roleKey: "experience.items.fiverr.role",
    periodKey: "experience.items.fiverr.period",
    locationKey: "experience.items.fiverr.location",
    descriptionKey: "experience.items.fiverr.description",
    tags: [],
    sortDate: 20200601,
  },
];
