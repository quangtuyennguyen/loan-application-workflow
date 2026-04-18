'use client';

import { useEffect } from 'react';
import { Button } from '@tuyennq/ui/src/components/button/Button';

interface ErrorViewProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export function ErrorView({ error, unstable_retry }: ErrorViewProps) {
  useEffect(() => {
    // TODO: send to a logging service for observability e.g. Sentry
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-red-100 p-4">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
        <p className="text-sm text-gray-500">An unexpected error occurred. Please try again.</p>
        <Button variant="secondary" size="sm" onClick={unstable_retry}>
          Try again
        </Button>
      </div>
    </main>
  );
}
