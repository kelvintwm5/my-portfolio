import { getTagCategory, TAG_STYLES } from "@/lib/tags";

interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  const category = getTagCategory(label);
  const styles = TAG_STYLES[category];
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles}`}
    >
      {label}
    </span>
  );
}
