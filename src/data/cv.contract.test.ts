import { describe, expect, it } from "vitest";
import {
  certificationItems,
  contactData,
  evidenceItems,
  experienceItems,
  projectItems,
  skillItems,
} from "./cv";
import type {
  CertificationItem,
  EvidenceItem,
  ExperienceItem,
  ProjectItem,
  SkillItem,
} from "../types";
import en from "../i18n/en.json";
import es from "../i18n/es.json";

const cvDataTypeContract = {
  evidenceItems,
  skillItems,
  experienceItems,
  certificationItems,
  projectItems,
} satisfies {
  evidenceItems: EvidenceItem[];
  skillItems: SkillItem[];
  experienceItems: ExperienceItem[];
  certificationItems: CertificationItem[];
  projectItems: ProjectItem[];
};

const requiredTopbarKeys = [
  "switch_to_es",
  "switch_to_en",
  "download_cv",
  "download_cv_aria",
] as const;

void cvDataTypeContract;

describe("cv data contract", () => {
  it("exports expected collection shapes", () => {
    expect(Array.isArray(evidenceItems)).toBe(true);
    expect(Array.isArray(skillItems)).toBe(true);
    expect(Array.isArray(experienceItems)).toBe(true);
    expect(Array.isArray(certificationItems)).toBe(true);
    expect(Array.isArray(projectItems)).toBe(true);

    for (const item of experienceItems) {
      expect(typeof item.sortDate).toBe("number");
      expect(item.id.length).toBeGreaterThan(0);
    }
  });

  it("exports required contact fields", () => {
    expect(contactData.emailUser).toBeTruthy();
    expect(contactData.emailDomain).toBeTruthy();
    expect(contactData.linkedin).toMatch(/^https?:\/\//);
    expect(contactData.github).toMatch(/^https?:\/\//);
  });
});

describe("topbar i18n contract", () => {
  const enTopbar = en.topbar as Record<string, string>;
  const esTopbar = es.topbar as Record<string, string>;

  it("keeps required keys in english and spanish", () => {
    for (const key of requiredTopbarKeys) {
      expect(typeof enTopbar[key]).toBe("string");
      expect(typeof esTopbar[key]).toBe("string");
      expect(enTopbar[key].trim().length).toBeGreaterThan(0);
      expect(esTopbar[key].trim().length).toBeGreaterThan(0);
    }
  });
});
