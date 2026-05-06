import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        foreground: "#111111",
        accent: "#4F46E5",
        "accent-hover": "#4338CA",
        muted: "#6B7280",
        border: "#E5E7EB",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#111111",
            maxWidth: "none",
            a: { color: "#4F46E5", textDecoration: "none", "&:hover": { textDecoration: "underline" } },
            "h2, h3, h4": { color: "#111111", fontWeight: "600" },
            h2: { fontSize: "1.125rem", marginTop: "2rem", marginBottom: "0.75rem" },
            h3: { fontSize: "0.9375rem", marginTop: "1.5rem", marginBottom: "0.5rem" },
            p: { marginTop: "0.75rem", marginBottom: "0.75rem", lineHeight: "1.75" },
            ul: { marginTop: "0.5rem", marginBottom: "0.5rem" },
            li: { marginTop: "0.25rem", marginBottom: "0.25rem" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            code: { backgroundColor: "#F3F4F6", padding: "0.125rem 0.375rem", borderRadius: "0.25rem", fontSize: "0.875em" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
