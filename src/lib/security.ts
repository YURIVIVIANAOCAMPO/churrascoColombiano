/**
 * Security & Anti-Injection Layer for Churrasco Colômbia
 * Protects against:
 * - Cross-Site Scripting (XSS)
 * - HTML Injection
 * - Prototype Pollution
 * - Script / SQL / Command Injection vectors
 * - Input spoofing / price tampering
 */

// Strip HTML tags and potential script injections
export function sanitizeString(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return '';
  
  return value
    .slice(0, maxLength)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '') // strip all HTML tags
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '') // strip event handlers like onclick=, onerror=
    .trim();
}

// Sanitize numbers to ensure they are safe finite positive numbers
export function sanitizeNumber(value: unknown, min = 0, max = 100000000, fallback = 0): number {
  const num = Number(value);
  if (isNaN(num) || !isFinite(num)) return fallback;
  return Math.min(Math.max(num, min), max);
}

// Sanitize boolean
export function sanitizeBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (value === 'true' || value === 1 || value === '1') return true;
  if (value === 'false' || value === 0 || value === '0') return false;
  return fallback;
}

// Deep clean object against prototype pollution and sanitize all strings
export function sanitizeObject<T>(input: T): T {
  if (input === null || typeof input !== 'object') {
    if (typeof input === 'string') {
      return sanitizeString(input) as unknown as T;
    }
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(item => sanitizeObject(item)) as unknown as T;
  }

  const cleanObj: Record<string, unknown> = {};
  for (const key of Object.keys(input as Record<string, unknown>)) {
    // Prevent Prototype Pollution
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    const val = (input as Record<string, unknown>)[key];
    cleanObj[key] = sanitizeObject(val);
  }

  return cleanObj as T;
}

// In-Memory Rate Limiter to prevent DoS and injection brute-forcing
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(identifier: string, limit = 60, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}

// Clean up stale rate limits every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    rateLimitMap.forEach((val, key) => {
      if (now > val.resetAt) rateLimitMap.delete(key);
    });
  }, 300000);
}
