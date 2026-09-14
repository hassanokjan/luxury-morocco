"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {


  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-heading">Error</h1>
      <p className="mt-4 text-text-secondary">An error occurred while loading the page.</p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
      >
        Try Again
      </button>
    </div>
  );
}
