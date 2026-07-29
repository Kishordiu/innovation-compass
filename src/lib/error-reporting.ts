/**
 * error-reporting.ts
 * Generic error reporting utility for Innovation DNA.
 * Logs to console in all environments.
 * Replace body with your preferred monitoring SDK (Sentry, etc.) when ready.
 */

type ErrorContext = Record<string, unknown>;

export function reportError(error: unknown, context: ErrorContext = {}): void {
  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);

  console.error("[Innovation DNA]", message, { ...context, error });
}
