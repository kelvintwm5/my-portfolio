import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kelvin Tan — product manager based in Singapore, building consumer subscription products and exploring AI.",
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
    label: "Product",
    color: "border-emerald-200 bg-emerald-50/50",
    labelColor: "text-emerald-600",
    heading: "Subscription Products",
    body: "Building consumer subscription products at scale across APAC and EU. My focus is on the full lifecycle — from launching core features to driving sustainable growth.",
  },
  {
    label: "AI",
    color: "border-indigo-200 bg-indigo-50/50",
    labelColor: "text-indigo-600",
    heading: "Exploring AI",
    body: "Learning by doing — experimenting with AI tools, building small projects, and figuring out how product thinking applies when the technology is this new.",
  },
  {
    label: "Systems",
    color: "border-sky-200 bg-sky-50/50",
    labelColor: "text-sky-600",
    heading: "Systems Thinking",
    body: "How product decisions ripple through a business. Growth, retention, pricing, and the feedback loops that determine whether a product scales or stalls.",
  },
] as const;

const PHILOSOPHY = [
  {
    principle: "Embrace a growth mindset.",
    detail:
      "I stay curious about new technologies and actively explore how they can simplify workflows and solve complex problems. If something looks promising, I'd rather try it and learn than wait on the sidelines.",
  },
  {
    principle: "Everyone goes further together.",
    detail:
      "I believe the best outcomes come from collaboration — sharing learnings openly, building on each other's ideas, and creating an environment where the team's collective knowledge grows.",
  },
  {
    principle: "Zoom in on the details, zoom out on the strategy.",
    detail:
      "Good decisions require both. I pay close attention to the specifics while keeping the bigger picture in view — knowing when to go deep and when to step back is what separates good work from great work.",
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
            I&apos;m a product manager based in Singapore, building a consumer
            subscription product used by millions of users across APAC and EU.
            I&apos;ve been with the product from the ground up — launching the
            core features that got it off the ground and now focused on taking
            it to its next phase of growth.
          </p>
          <p>
            Outside of work, I&apos;m exploring AI tools and building with them
            hands-on. This site is where I document that journey — what I&apos;m
            learning, what I&apos;m building, and what I&apos;m figuring out
            along the way.
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
          href="https://www.linkedin.com/in/kelvin-tan-b6ab42a6/"
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
