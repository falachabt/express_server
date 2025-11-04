/**
 * CORS configuration utility
 * Handles both exact domain matching and wildcard subdomain patterns
 */

/**
 * Check if an origin matches the allowed patterns
 * Supports:
 * - Exact matches: http://localhost:3000
 * - Wildcard subdomains: *.example.com (matches any.subdomain.example.com)
 * - Root domains: example.com (matches example.com and www.example.com)
 */
export function isOriginAllowed(
  origin: string,
  allowedOrigins: string[]
): boolean {
  // Extract the domain from the origin URL
  let originDomain: string;
  try {
    const url = new URL(origin);
    originDomain = url.hostname;
  } catch {
    // If URL parsing fails, treat the origin as a plain domain
    originDomain = origin.replace(/^https?:\/\//, "").split("/")[0];
  }

  for (const pattern of allowedOrigins) {
    // Remove protocol for comparison
    const cleanPattern = pattern.replace(/^https?:\/\//, "").split("/")[0];

    // Case 1: Exact match (including port)
    if (origin === pattern || originDomain === cleanPattern) {
      return true;
    }

    // Case 2: Wildcard subdomain pattern (*.example.com)
    if (cleanPattern.startsWith("*.")) {
      const baseDomain = cleanPattern.slice(2); // Remove "*."
      // Check if origin ends with the base domain
      if (originDomain.endsWith(baseDomain)) {
        // Ensure it's actually a subdomain match (not just a partial string match)
        const beforeBaseDomain = originDomain.slice(0, -baseDomain.length);
        if (beforeBaseDomain === "" || beforeBaseDomain.endsWith(".")) {
          return true;
        }
      }
    }

    // Case 3: Root domain pattern (example.com matches example.com and www.example.com)
    if (!cleanPattern.includes("*") && !cleanPattern.includes(":")) {
      // Root domain without protocol or port
      if (
        originDomain === cleanPattern ||
        originDomain === `www.${cleanPattern}`
      ) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Parse CORS_ORIGIN environment variable
 * Supports comma-separated list of origins with optional wildcards
 */
export function parseCorsOrigins(corsOriginEnv: string): string[] {
  return corsOriginEnv
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}
