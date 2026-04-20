export type Mode = "recruiter" | "technical";

export type Section = "overview" | "evidence" | "skills" | "about" | "contact";

export interface KPIItem {
  id: string;
  labelKey: string;
  valueKey: string;
  type: "status" | "info";
}

export interface EvidenceItem {
  id: string;
  icon: string;
  titleKey: string;
  goalKey: string;
  learnedKey: string;
  stackKey: string;
  skills: string[];
  link?: string;
  isUniversity?: boolean;
}

export interface SkillItem {
  id: string;
  labelKey: string;
  noteKey: string;
  relatedEvidence: string[];
}

export interface ArchitectureNode {
  id: string;
  labelKey: string;
  toolsKey: string;
}

export interface SignalItem {
  id: string;
  textKey: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  icon: string;
  logoUrl?: string;
  organizationKey: string;
  roleKey: string;
  periodKey: string;
  locationKey?: string;
  descriptionKey?: string;
  tags: string[];
  /** Sort order: higher = more recent (used for timeline ordering) */
  sortDate: number;
}

export interface CertificationItem {
  id: string;
  titleKey: string;
  issuerKey: string;
  dateKey: string;
  badgeUrl?: string;
  credentialUrl?: string;
  imageSrc?: string;
  comingSoon?: boolean;
}

export type ProjectTag = "UNIVERSIDAD" | "PERSONAL";

export interface ProjectItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tags: ProjectTag[];
  skills?: string[];
  repoUrl?: string;
}
