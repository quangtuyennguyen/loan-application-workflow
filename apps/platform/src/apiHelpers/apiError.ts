export interface ApiError {
  type: string;
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiReturnType<T> = T | ApiError;

export function isApiError(error: any): error is ApiError {
  return (
    error?.status !== undefined &&
    String(error.status).match(/^(4|5)\d\d$/) !== null &&
    "type" in error
  );
}

/**
 * Maps a raw BE response body + HTTP status into a well-typed ApiError.
 * Use in every server action's error branch so callers can rely on isApiError()
 * and access errors or message consistently.
 */
export function toApiError(body: unknown, status: number): ApiError {
  const raw = body as { message?: string; errors?: Record<string, string[]> };
  return {
    type: 'about:blank',
    status,
    message: raw.message ?? 'An unexpected error occurred.',
    ...(raw.errors && { errors: raw.errors }),
  };
}