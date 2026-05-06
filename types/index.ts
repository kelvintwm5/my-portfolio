/** Structured frontmatter — used for cards and page metadata */
export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  role: string;
  timeline: string;
  impact: string;
  draft?: boolean;
}

export interface NarrativeSubsection {
  heading: string;
  html: string;
}

export interface NarrativeSection {
  heading: string;
  /** HTML for content before any ### sub-sections */
  html: string;
  subsections: NarrativeSubsection[];
}

/** Full project — meta + parsed narrative sections */
export interface Project extends ProjectMeta {
  sections: NarrativeSection[];
}
