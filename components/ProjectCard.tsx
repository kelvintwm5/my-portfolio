import Link from "next/link";
import Image from "next/image";
import Tag from "@/components/Tag";
import type { ProjectMeta } from "@/types";

interface ProjectCardProps {
  project: ProjectMeta;
  featured?: boolean;
}

/** Two-letter initials used as thumbnail placeholder text */
function initials(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Deterministic hue from slug so each project has a distinct placeholder tint.
 * Returns a Tailwind gradient class pair.
 */
const PLACEHOLDER_GRADIENTS = [
  "from-indigo-100 to-violet-100",
  "from-sky-100 to-cyan-100",
  "from-emerald-100 to-teal-100",
  "from-amber-100 to-orange-100",
  "from-rose-100 to-pink-100",
];

function placeholderGradient(slug: string) {
  const hash = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PLACEHOLDER_GRADIENTS[hash % PLACEHOLDER_GRADIENTS.length];
}

export default function ProjectCard({
  project,
  featured = false,
  priority = false,
}: ProjectCardProps & { priority?: boolean }) {
  const gradient = placeholderGradient(project.slug);
  const quarter = project.timeline.split("—")[0].trim();

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={[
        "group flex bg-surface rounded-2xl border border-border overflow-hidden",
        "hover:border-accent/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)]",
        "transition-all duration-200",
        featured ? "flex-col sm:flex-row" : "flex-col",
      ].join(" ")}
    >
      {/* Thumbnail */}
      <div
        className={[
          "relative shrink-0 overflow-hidden",
          featured
            ? "aspect-[16/9] sm:aspect-auto sm:w-64"
            : "aspect-[16/9]",
        ].join(" ")}
      >
        {/* Placeholder shown behind image */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}
        >
          <span className="text-3xl font-bold text-white/40 select-none tracking-tight">
            {initials(project.title)}
          </span>
        </div>

        <Image
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          fill
          priority={priority}
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          sizes={
            featured
              ? "(max-width: 640px) 100vw, 256px"
              : "(max-width: 640px) 100vw, 50vw"
          }
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1 min-w-0">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <h2
            className={[
              "font-semibold leading-snug group-hover:text-accent transition-colors",
              featured ? "text-lg" : "text-base",
            ].join(" ")}
          >
            {project.title}
          </h2>
          <span className="text-xs text-muted shrink-0 mt-0.5">{quarter}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Footer: tags + arrow */}
        <div className="flex items-end justify-between gap-2 mt-auto pt-1">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <span className="text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-150 shrink-0 text-sm">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
