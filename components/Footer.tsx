export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 sm:mt-24">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>© {new Date().getFullYear()} Kelvin Tan</span>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/kelvintwm5"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kelvin-tan-b6ab42a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
