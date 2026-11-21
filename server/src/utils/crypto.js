import crypto from 'crypto';

/**
 * Generates an unguessable 256-bit cryptographic registration token
 */
export function generateSecureToken(prefix = 'tk') {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  return `${prefix}_${randomBytes}`;
}

/**
 * Computes SHA-256 hash for database token storage and lookup
 */
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Constant-time string comparison preventing timing attacks
 */
export function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export default {
  generateSecureToken,
  hashToken,
  safeCompare
};
