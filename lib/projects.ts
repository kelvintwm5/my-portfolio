import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { Project, ProjectMeta, NarrativeSection, NarrativeSubsection } from "@/types";

const contentDir = path.join(process.cwd(), "content/projects");

function slugFrom(filename: string) {
  return filename.replace(/\.md$/, "");
}

async function toHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(markdown.trim());
  return result.toString();
}

async function parseSections(body: string): Promise<NarrativeSection[]> {
  const chunks = body.split(/(?=^## )/m).filter((s) => s.trim() && s.startsWith("## "));

  return Promise.all(
    chunks.map(async (chunk): Promise<NarrativeSection> => {
      const firstNewline = chunk.indexOf("\n");
      const heading = chunk.slice(0, firstNewline).replace(/^## /, "").trim();
      const rest = chunk.slice(firstNewline + 1).trimStart();

      if (/^### /m.test(rest)) {
        const subChunks = rest.split(/(?=^### )/m).filter((s) => s.trim());
        const introText = subChunks[0]?.startsWith("###") ? "" : (subChunks.shift() ?? "");

        const introHtml = await toHtml(introText);
        const subsections: NarrativeSubsection[] = await Promise.all(
          subChunks.map(async (sub) => {
            const subNewline = sub.indexOf("\n");
            const subHeading = sub.slice(0, subNewline).replace(/^### /, "").trim();
            const subContent = sub.slice(subNewline + 1);
            return { heading: subHeading, html: await toHtml(subContent) };
          })
        );

        return { heading, html: introHtml, subsections };
      }

      return { heading, html: await toHtml(rest), subsections: [] };
    })
  );
}

/** Returns all non-draft projects for the listing page. */
export function getAllProjects(): ProjectMeta[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = slugFrom(filename);
      const raw = fs.readFileSync(path.join(contentDir, filename), "utf8");
      const { data } = matter(raw);
      return { slug, ...data } as ProjectMeta;
    })
    .filter((p) => !p.draft);
}

/** Returns all non-draft, non-template slugs for generateStaticParams. */
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => slugFrom(f))
    .filter((slug) => {
      const raw = fs.readFileSync(path.join(contentDir, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return !data.draft;
    });
}

/** Parses a project file into structured sections. Returns null for drafts/missing files. */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (slug.startsWith("_")) return null;
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  if (data.draft) return null;

  const sections = await parseSections(content);

  return {
    slug,
    ...(data as Omit<ProjectMeta, "slug">),
    sections,
  };
}
