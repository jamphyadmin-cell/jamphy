/**
 * @file src/lib/validation.js
 * Server-side input validation and sanitisation helpers for all API routes.
 */

// ─── Length limits ────────────────────────────────────────────────────────────
export const LIMITS = {
  TITLE:   200,
  CONTENT: 50_000,
  COMMENT: 1_000,
  SEARCH:  100,
  EXCERPT: 500,
  MESSAGE: 5_000,
  NAME:    100,
  SHORT:   50,    // usernames, college, year, course etc.
};

// ─── HTML stripping ───────────────────────────────────────────────────────────
/**
 * Strip all HTML tags from a string.
 * Uses a regex-based approach that is safe for server-side use (no DOM needed).
 */
export function stripHtml(str) {
  if (typeof str !== 'string') return str;
  // Remove HTML tags
  return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Sanitise and enforce a max-length on a string field.
 * Returns the cleaned value, or null if the input was not a string.
 */
export function sanitizeString(value, maxLength) {
  if (value === null || value === undefined) return value;
  if (typeof value !== 'string') return null; // wrong type
  const stripped = stripHtml(value);
  return maxLength ? stripped.slice(0, maxLength) : stripped;
}

// ─── Validation helpers ───────────────────────────────────────────────────────

/**
 * Validate that a value is a non-empty string, optionally within a max length.
 * Returns an error message string if invalid, otherwise null.
 */
export function validateString(value, fieldName, { required = true, maxLength } = {}) {
  if (required && (value === null || value === undefined || value === '')) {
    return `${fieldName} is required`;
  }
  if (value !== null && value !== undefined && typeof value !== 'string') {
    return `${fieldName} must be a string`;
  }
  if (maxLength && typeof value === 'string' && value.length > maxLength) {
    return `${fieldName} must be at most ${maxLength} characters`;
  }
  return null;
}

/**
 * Validate that a value is a number.
 */
export function validateNumber(value, fieldName, { required = true, min, max } = {}) {
  if (required && (value === null || value === undefined)) {
    return `${fieldName} is required`;
  }
  if (value !== null && value !== undefined && typeof value !== 'number') {
    return `${fieldName} must be a number`;
  }
  if (min !== undefined && typeof value === 'number' && value < min) {
    return `${fieldName} must be at least ${min}`;
  }
  if (max !== undefined && typeof value === 'number' && value > max) {
    return `${fieldName} must be at most ${max}`;
  }
  return null;
}

/**
 * Validate that a value is a boolean.
 */
export function validateBoolean(value, fieldName, { required = true } = {}) {
  if (required && (value === null || value === undefined)) {
    return `${fieldName} is required`;
  }
  if (value !== null && value !== undefined && typeof value !== 'boolean') {
    return `${fieldName} must be a boolean`;
  }
  return null;
}

/**
 * Collect all errors from a list of validation results.
 * Returns null if no errors, otherwise returns the first error string.
 */
export function collectErrors(...results) {
  const first = results.find(r => r !== null);
  return first || null;
}
