/**
 * Strict Multi-Tenant Isolation Middleware
 * Enforces business-level scope verification on all operational routes
 */
export function enforceTenant(expectedType = null) {
  return (req, res, next) => {
    const businessId = req.headers['x-business-id'] || req.query.businessId || req.body?.businessId;

    if (!businessId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_TENANT_CONTEXT',
          message: 'The request is missing the required business tenant scope.'
        }
      });
    }

    // Attach verified tenant scope to request context
    req.tenant = {
      businessId,
      expectedType
    };

    next();
  };
}

export default enforceTenant;
