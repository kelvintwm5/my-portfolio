import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Kelvin Tan — Product Manager",
  description:
    "Product manager based in Singapore building consumer subscription products and exploring AI.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Kelvin Tan — Product Manager",
    description:
      "Product manager based in Singapore building consumer subscription products and exploring AI.",
  },
  twitter: {
    title: "Kelvin Tan — Product Manager",
    description:
      "Product manager based in Singapore building consumer subscription products and exploring AI.",
  },
};

export default function HomePage() {
  const [featured, ...rest] = getAllProjects();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="mb-14">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-balance">
          Exploring AI as a Product Manager
        </h1>
        <p className="text-base text-muted max-w-xl leading-relaxed">
          I&apos;m Kelvin — a product manager based in Singapore. I work on
          consumer subscription products and I&apos;m using this space to
          document what I&apos;m learning as I explore and build with AI tools.
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
