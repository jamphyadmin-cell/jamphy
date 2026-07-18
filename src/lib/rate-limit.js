/**
 * Simple in-memory sliding-window rate limiter.
 * Stores timestamps of requests in memory.
 */

const rateLimitMap = new Map();

// Periodic cleanup of expired entries to prevent memory leak
if (typeof global !== 'undefined') {
  if (!global.rateLimitCleanupInterval) {
    global.rateLimitCleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, timestamps] of rateLimitMap.entries()) {
        // Remove timestamps older than 10 minutes (maximum window size)
        const valid = timestamps.filter(time => now - time < 600000);
        if (valid.length === 0) {
          rateLimitMap.delete(key);
        } else {
          rateLimitMap.set(key, valid);
        }
      }
    }, 60000); // Clean up every minute
  }
}

/**
 * Checks if a request should be rate-limited.
 * 
 * @param {string} key Unique identifier (e.g., user ID or IP)
 * @param {number} limit Maximum allowed requests in the window
 * @param {number} windowMs Time window in milliseconds
 * @returns {{ allowed: boolean, retryAfter: number }}
 */
export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, []);
  }

  const timestamps = rateLimitMap.get(key);
  
  // Filter out timestamps outside the active window
  const validTimestamps = timestamps.filter(time => now - time < windowMs);
  
  if (validTimestamps.length >= limit) {
    // Exceeded limit. Retry-After is based on when the oldest request exits the window
    const oldestTimestamp = validTimestamps[0];
    const retryAfterSeconds = Math.ceil((windowMs - (now - oldestTimestamp)) / 1000);
    
    rateLimitMap.set(key, validTimestamps);
    return {
      allowed: false,
      retryAfter: retryAfterSeconds > 0 ? retryAfterSeconds : 1
    };
  }

  // Add current request timestamp
  validTimestamps.push(now);
  rateLimitMap.set(key, validTimestamps);

  return {
    allowed: true,
    retryAfter: 0
  };
}
