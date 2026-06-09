// Shared date-range resolver for all dashboard API endpoints.
// Accepts ?from=YYYY-MM-DD&to=YYYY-MM-DD (arbitrary window)
// or      ?days=N                         (last N days ending now)
export function parseDateRange(url) {
  const from = url.searchParams.get('from');
  const to   = url.searchParams.get('to');
  if (from && to) {
    const since = Math.floor(new Date(from + 'T00:00:00Z').getTime() / 1000);
    const until = Math.floor(new Date(to   + 'T23:59:59Z').getTime() / 1000);
    return { since, until: Math.max(since, until) };
  }
  const days  = Math.max(1, Math.min(365, parseInt(url.searchParams.get('days') || '30', 10) || 30));
  const until = Math.floor(Date.now() / 1000);
  return { since: until - days * 86400, until };
}
