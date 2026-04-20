import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { projectItems } from "../../data/cv";
import { ProjectItem, ProjectTag } from "../../types";
import {
  ChartBarIcon,
  ChipIcon,
  CodeBracketIcon,
  PuzzlePieceIcon,
  ServerIcon,
  WifiIcon,
  WindowIcon,
} from "../icons/Icons";

const tagClasses: Record<ProjectTag, string> = {
  UNIVERSIDAD: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "PERSONAL": "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const projectIcons: Record<string, React.ReactNode> = {
  microsystems_programming: <ChipIcon />,
  sensor_cloud_discord: <WifiIcon />,
  power_bi_visuals: <ChartBarIcon />,
  home_media_server: <ServerIcon />,
  cv_website: <CodeBracketIcon />,
  personal_website: <WindowIcon />,
  firefox_extension: <PuzzlePieceIcon />,
};

type ProjectStatus = "production" | "demo" | "learning";

const featuredProjects: Record<string, { status: ProjectStatus; score: number }> = {
  the_wave_hackathon_2026: { status: "demo", score: 4 },
  firefox_extension: { status: "production", score: 3 },
  cv_website: { status: "demo", score: 2 },
  sensor_cloud_discord: { status: "demo", score: 1 },
};

const projectStatusClasses: Record<ProjectStatus, string> = {
  production: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
  demo: "border-sky-400/40 bg-sky-400/15 text-sky-300",
  learning: "border-amber-400/40 bg-amber-400/15 text-amber-300",
};

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();
  const sortedProjects = [...projectItems].sort((a, b) => {
    const scoreA = featuredProjects[a.id]?.score ?? 0;
    const scoreB = featuredProjects[b.id]?.score ?? 0;
    return scoreB - scoreA;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {sortedProjects.map((project, idx) => (
        <ProjectCard key={project.id} project={project} index={idx} t={t} />
      ))}
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  t: (key: string) => string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, t }) => {
  const projectMeta = featuredProjects[project.id];
  const projectStatus = projectMeta?.status ?? "learning";

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="rounded-xl border border-border bg-surface/70 p-4 hover:border-accent/30 transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="text-accent/80 mt-0.5 shrink-0" aria-hidden="true">
          {projectIcons[project.id]}
        </span>
        <div className="flex-1">
          {projectMeta && (
            <div className="mb-2">
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${projectStatusClasses[projectStatus]}`}
              >
                {t("projects.top_badge")}: {t(`projects.status.${projectStatus}`)}
              </span>
            </div>
          )}
          <h3 className="text-sm md:text-base font-semibold text-text-primary leading-snug">
            {t(project.titleKey)}
          </h3>
          <p className="mt-1.5 text-xs md:text-sm text-text-secondary leading-relaxed">
            {t(project.descriptionKey)}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={`${project.id}-${tag}`}
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tagClasses[tag]}`}
              >
                {t(`projects.tags.${tag}`)}
              </span>
            ))}
          </div>
          {project.skills && project.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {project.skills.map((skill) => (
                <span
                  key={`${project.id}-skill-${skill}`}
                  className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
          {project.repoUrl && (
            <div className="mt-3">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-accent/35 bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent hover:bg-accent/20 transition-colors"
              >
                {t("projects.view_repo")}
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectsSection;
