// Helper utilities for generated route helpers.
// Centralizes building query strings and shared TypeScript types used by route definitions.

export interface RouteQueryOptions {
  // Supply a full query object (replaces)
  query?: Record<string, unknown>;
  // Merge into existing query (generators sometimes pass mergeQuery instead of query)
  mergeQuery?: Record<string, unknown>;
}

// RouteDefinition supports two shapes:
// 1) Concrete invocation objects: { url, method }
// 2) Static "definition" objects: { url, methods: ['get','head'] }
export type RouteDefinition<M extends string | string[] = string> = {
  url: string;
} & (M extends any[] ? { methods: M } : { method: M });

export interface RouteFormDefinition<M extends string = string> {
  action: string;
  method: M;
}

// Build a query string from RouteQueryOptions.
export function queryParams(options?: RouteQueryOptions): string {
  if (!options) return '';
  // If both provided, mergeQuery has precedence for overlapping keys
  const params: Record<string, unknown> = {
    ...(options.query || {}),
    ...(options.mergeQuery || {}),
  };
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
  if (!entries.length) return '';
  const qs = entries
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return qs ? `?${qs}` : '';
}

// Some generated files import this – provide a minimal passthrough for now.
export function applyUrlDefaults(url: string, defaults?: Record<string, string | number | boolean | null | undefined>): string {
  if (!defaults || Object.keys(defaults).length === 0) return url;
  // Append defaults only if not already present in the URL.
  const [base, existingQs] = url.split('?');
  const existing = new URLSearchParams(existingQs || '');
  for (const [k, v] of Object.entries(defaults)) {
    if (v === undefined || v === null) continue;
    if (!existing.has(k)) existing.set(k, String(v));
  }
  const combined = existing.toString();
  return combined ? `${base}?${combined}` : base;
}
