'use client';

import Link from 'next/link';

export function NotFoundView() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-6xl font-semibold text-gray-200">404</p>
        <h2 className="text-xl font-semibold text-gray-900">Page not found</h2>
        <p className="text-sm text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="mt-2 text-sm text-gray-900 underline hover:text-gray-700">
          Go home
        </Link>
      </div>
    </main>
  );
}
