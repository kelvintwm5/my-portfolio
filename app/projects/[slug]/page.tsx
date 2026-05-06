import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import QuickScan from "@/components/QuickScan";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import type { NarrativeSection } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const ogImage = {
    url: project.thumbnail,
    width: 1200,
    height: 630,
    alt: project.title,
  };

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      url: `/projects/${slug}`,
      title: project.title,
      description: project.description,
      type: "article",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogImage.url],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-10"
      >
        ← All projects
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight mb-10 text-balance">
        {project.title}
      </h1>

      {/* Quick Scan */}
      <QuickScan project={project} />

      {/* Narrative */}
      <div className="space-y-14">
        {project.sections.map((section, i) =>
          section.heading.toLowerCase() === "systems thinking" ? (
            <SystemsThinkingSection key={section.heading} section={section} index={i} />
          ) : (
            <NarrativeSectionBlock key={section.heading} section={section} index={i} />
          )
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-16 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
        >
          ← Back to all projects
        </Link>
      </div>
    </div>
  );
}

/* ─── Standard narrative section ───────────────────────────────────── */

function NarrativeSectionBlock({
  section,
  index,
}: {
  section: NarrativeSection;
  index: number;
}) {
  return (
    <section>
      <SectionHeading heading={section.heading} index={index} />
      <div
        className="prose prose-sm mt-5"
        dangerouslySetInnerHTML={{ __html: section.html }}
      />
    </section>
  );
}

/* ─── Systems Thinking — special card with subsection grid ─────────── */

function SystemsThinkingSection({
  section,
  index,
}: {
  section: NarrativeSection;
  index: number;
}) {
  return (
    <section>
      <SectionHeading heading={section.heading} index={index} />

      <div className="mt-5 bg-surface border border-border rounded-2xl overflow-hidden">
        {section.html.trim() && (
          <div
            className="px-6 pt-5 prose prose-sm border-b border-border"
            dangerouslySetInnerHTML={{ __html: section.html }}
          />
        )}

        <div
          className={`grid grid-cols-1 divide-y divide-border ${
            section.subsections.length >= 3 ? "md:grid-cols-3 md:divide-y-0 md:divide-x" : ""
          }`}
        >
          {section.subsections.map((sub) => (
            <div key={sub.heading} className="p-5">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3">
                {sub.heading}
              </h3>
              <div
                className="prose prose-sm"
                dangerouslySetInnerHTML={{ __html: sub.html }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section heading with number ──────────────────────────────────── */

function SectionHeading({ heading, index }: { heading: string; index: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold tabular-nums text-muted select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-muted select-none">—</span>
      <h2 className="text-base font-semibold tracking-tight">{heading}</h2>
    </div>
  );
}
