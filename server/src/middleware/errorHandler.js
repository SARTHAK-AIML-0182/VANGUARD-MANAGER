import { config } from '../config/index.js';

/**
 * Global Error Handler: Never exposes internal stack traces or database errors in production
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  const isDev = config.nodeEnv === 'development';

  const response = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred while processing the operational request.'
    },
    meta: {
      timestamp: new Date().toISOString()
    }
  };

  if (isDev && err.stack) {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

export default errorHandler;
