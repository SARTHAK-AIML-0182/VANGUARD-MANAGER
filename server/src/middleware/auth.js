import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

/**
 * Authentication and Role-Based Access Control Middleware
 */
export function authenticate(requiredRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.vanguard_session;

    // Development sandbox mode support
    if (!token && config.nodeEnv === 'development') {
      req.user = {
        id: 'usr_dev_01',
        name: 'Dev Rajesh Kumar',
        role: 'PG_OWNER',
        businessId: req.headers['x-business-id'] || 'biz_pg_01'
      };
      return next();
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHENTICATED',
          message: 'Authentication credentials are required to access this resource.'
        }
      });
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded;

      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'You do not have administrative permission for this business vertical.'
          }
        });
      }

      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Your session has expired or is invalid. Please log in again.'
        }
      });
    }
  };
}

export default authenticate;
