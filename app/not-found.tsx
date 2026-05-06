import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
        404
      </p>
      <h1 className="text-2xl font-bold mb-4">Page not found</h1>
      <p className="text-muted mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
