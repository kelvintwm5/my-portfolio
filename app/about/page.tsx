import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kelvin Tan — AI engineer focused on RAG systems, developer tooling, and production-grade LLM evaluation.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About — Kelvin Tan",
    description:
      "AI engineer focused on RAG systems, developer tooling, and production-grade LLM evaluation.",
  },
  twitter: {
    title: "About — Kelvin Tan",
    description:
      "AI engineer focused on RAG systems, developer tooling, and production-grade LLM evaluation.",
  },
};

/* ─── Data ──────────────────────────────────────────────────────────── */

const FOCUS_AREAS = [
  {
    label: "AI",
    color: "border-indigo-200 bg-indigo-50/50",
    labelColor: "text-indigo-600",
    heading: "Language Models",
    body: "RAG pipelines, evaluation frameworks, and the production gap between a promising demo and a reliable feature. I care most about the parts that determine whether an AI system can actually be trusted.",
  },
  {
    label: "Product",
    color: "border-emerald-200 bg-emerald-50/50",
    labelColor: "text-emerald-600",
    heading: "Developer Experience",
    body: "Tooling that gets out of the way. I build for engineers first — fast feedback loops, honest error messages, and zero-surprise behavior. Good DX is a product decision, not an afterthought.",
  },
  {
    label: "Systems",
    color: "border-sky-200 bg-sky-50/50",
    labelColor: "text-sky-600",
    heading: "Systems Thinking",
    body: "How pieces fit, break, and recover. Latency budgets, failure modes, dependency graphs. I came to AI from the infrastructure side and still think about correctness before cleverness.",
  },
] as const;

const PHILOSOPHY = [
  {
    principle: "Production is the proof.",
    detail:
      "A model that works in a notebook is a prototype. What matters is what happens under real load, with real inputs, when something goes wrong.",
  },
  {
    principle: "The unsexy parts are usually the important parts.",
    detail:
      "Evals, guardrails, logging, fallbacks — nobody demos these, but they're what separates AI features that ship from ones that get quietly rolled back.",
  },
  {
    principle: "Prefer boring technology where the problem is already solved.",
    detail:
      "Novelty has a cost. I reach for the interesting new thing when it genuinely changes what's possible — not to avoid learning the proven one.",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-10"
      >
        ← Work
      </Link>

      {/* Name + bio */}
      <section className="mb-14">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Kelvin Tan</h1>
        <div className="space-y-4 text-[15px] leading-relaxed text-foreground">
          <p>
            I&apos;m an AI engineer based in Singapore. I build systems that
            make language models useful in practice — with an emphasis on
            reliability, evaluation, and the unsexy parts that determine whether
            an AI feature actually ships.
          </p>
          <p>
            My background spans backend engineering and machine learning. I came
            to LLMs from the infrastructure side, which means I spend as much
            time thinking about failure modes as I do about capabilities. I
            contribute to open-source tooling and occasionally write about
            practical LLM engineering.
          </p>
        </div>
      </section>

      {/* Focus areas */}
      <section className="mb-14">
        <SectionLabel>Focus Areas</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          {FOCUS_AREAS.map((area) => (
            <div
              key={area.label}
              className={`rounded-xl border p-5 ${area.color}`}
            >
              <span
                className={`text-[11px] font-semibold uppercase tracking-widest ${area.labelColor} block mb-2`}
              >
                {area.label}
              </span>
              <h3 className="text-sm font-semibold mb-2">{area.heading}</h3>
              <p className="text-xs leading-relaxed text-muted">{area.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="mb-14">
        <SectionLabel>Philosophy</SectionLabel>
        <div className="mt-5 space-y-6">
          {PHILOSOPHY.map(({ principle, detail }) => (
            <div key={principle} className="flex gap-4">
              <div className="w-0.5 shrink-0 bg-accent/30 rounded-full mt-1" />
              <div>
                <p className="text-[15px] font-semibold mb-1">{principle}</p>
                <p className="text-sm leading-relaxed text-muted">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border mb-10" />

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        <a
          href="https://linkedin.com/in/kelvintan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
        >
          LinkedIn
          <ExternalLinkIcon />
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border text-foreground rounded-lg hover:border-accent/40 hover:text-accent transition-colors"
        >
          Resume PDF
          <DownloadIcon />
        </a>
        <a
          href="mailto:kelvintwm5@gmail.com"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          kelvintwm5@gmail.com
        </a>
      </div>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3.5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V8.5M7 1h4m0 0v4m0-4L5.5 6.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M6 1v7M3.5 5.5 6 8l2.5-2.5M2 10h8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
