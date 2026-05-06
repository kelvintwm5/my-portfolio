import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Kelvin Tan — AI Engineer",
  description:
    "AI engineer building language model systems that ship to production — RAG pipelines, evaluation frameworks, and developer tooling.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Kelvin Tan — AI Engineer",
    description:
      "AI engineer building language model systems that ship to production.",
  },
  twitter: {
    title: "Kelvin Tan — AI Engineer",
    description:
      "AI engineer building language model systems that ship to production.",
  },
};

export default function HomePage() {
  const [featured, ...rest] = getAllProjects();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="mb-14">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-balance">
          Building with AI
        </h1>
        <p className="text-base text-muted max-w-xl leading-relaxed">
          I&apos;m Kelvin — an AI engineer focused on turning language models
          into reliable, useful products. Below is a selection of projects spanning
          RAG systems, developer tooling, and evaluation infrastructure.
        </p>
      </section>

      {/* Project grid */}
      <section aria-label="Selected work">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
          Selected Work
        </h2>
        <div className="flex flex-col gap-5">
          {featured && <ProjectCard project={featured} featured priority />}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
