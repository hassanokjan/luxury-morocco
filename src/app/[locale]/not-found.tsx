import { Link } from "@/i18n/routing";

export default function NotFound() {

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-heading">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-heading">Page Not Found</h2>
      <p className="mt-2 text-text-secondary">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
      >
        home
      </Link>
    </div>
  );
}
