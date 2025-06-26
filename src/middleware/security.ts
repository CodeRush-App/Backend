import { RequestHandler } from 'express';
import helmet from 'helmet';

const securityMiddleware: RequestHandler[] = [
  // Basic security headers
  helmet(),

  // Additional security headers
  (_req, res, next) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    // Enable XSS filter
    res.setHeader('X-XSS-Protection', '1; mode=block');
    // Prevent MIME-type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // Referrer Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Permissions Policy
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  },
];

export default securityMiddleware;
