export type TagCategory = "ai" | "systems" | "product";

const AI_TAGS = new Set([
  "llm", "rag", "embeddings", "evals", "llmops", "nlp", "ml",
  "ai", "agents", "fine-tuning", "prompt engineering", "vector db",
  "retrieval", "generative ai", "language model",
]);

const PRODUCT_TAGS = new Set([
  "developer tools", "open source", "ux", "design", "research",
  "product", "devex", "dx", "tooling",
]);

export function getTagCategory(tag: string): TagCategory {
  const lower = tag.toLowerCase();
  if (AI_TAGS.has(lower)) return "ai";
  if (PRODUCT_TAGS.has(lower)) return "product";
  return "systems";
}

export const TAG_STYLES: Record<TagCategory, string> = {
  ai:      "bg-indigo-50 text-indigo-600 border-indigo-100",
  systems: "bg-sky-50 text-sky-600 border-sky-100",
  product: "bg-emerald-50 text-emerald-600 border-emerald-100",
};
