'use client';

import { ErrorView } from '@/components/exceptions/ErrorView';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return <ErrorView error={error} unstable_retry={unstable_retry} />;
}
