/**
 * PRAN — In-memory token bucket / sliding window rate limiter.
 *
 * Used by Next.js middleware and API route handlers to guard sensitive endpoints
 * against brute force attacks and credential stuffing.
 *
 * Configurable via env variables:
 * - RATE_LIMIT_AUTH_RPM (default: 10)
 * - RATE_LIMIT_API_RPM (default: 30)
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// Global store across hot reloads in dev / worker scope
const tracker = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    tracker.forEach((record, key) => {
      if (record.resetAt <= now) {
        tracker.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Checks and increments rate limit for a given key (e.g. IP + route bucket).
 *
 * @param key Unique identifier, e.g. "auth:192.168.1.1"
 * @param limit Max allowed requests within window
 * @param windowSeconds Window length in seconds (default 60s)
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds = 60
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const existing = tracker.get(key);

  if (!existing || existing.resetAt <= now) {
    tracker.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetInSeconds: windowSeconds,
    };
  }

  const resetInSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  if (existing.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetInSeconds,
    };
  }

  existing.count += 1;
  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - existing.count),
    resetInSeconds,
  };
}
