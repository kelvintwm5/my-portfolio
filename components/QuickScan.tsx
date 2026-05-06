import Tag from "@/components/Tag";
import type { ProjectMeta } from "@/types";

interface QuickScanProps {
  project: ProjectMeta;
}

export default function QuickScan({ project }: QuickScanProps) {
  return (
    <aside className="bg-surface border border-border rounded-2xl overflow-hidden mb-16">
      {/* Label */}
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted">
          Quick Scan
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div>
          <p className="text-[15px] leading-relaxed text-foreground">
            {project.description}
          </p>
        </div>

        {/* Meta grid: Role · Timeline · Impact */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
          <MetaCell label="Role" value={project.role} />
          <MetaCell label="Timeline" value={project.timeline} />
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-1.5">
              Impact
            </dt>
            <dd className="text-sm font-medium text-accent leading-snug">
              {project.impact}
            </dd>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </aside>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-1.5">
        {label}
      </dt>
      <dd className="text-sm text-foreground leading-snug">{value}</dd>
    </div>
  );
}
