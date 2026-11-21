import { Router } from 'express';
import qrController from '../controllers/qr.controller.js';
import registrationController from '../controllers/registration.controller.js';
import { enforceTenant } from '../middleware/tenant.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'Vanguard Manager API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// QR Engine
router.post('/qr/generate', authenticate(['PG_OWNER', 'MESS_OWNER']), qrController.generateQr);
router.get('/qr/resolve/:token', qrController.resolveToken);
router.post('/qr/revoke', authenticate(['PG_OWNER', 'MESS_OWNER']), qrController.revokeToken);

// Registration & Owner Approvals
router.post('/registrations/submit', registrationController.submitRegistration);
router.get('/registrations', authenticate(), registrationController.getApplications);
router.post('/registrations/:id/approve', authenticate(['PG_OWNER', 'MESS_OWNER']), registrationController.approveApplication);
router.post('/registrations/:id/reject', authenticate(['PG_OWNER', 'MESS_OWNER']), registrationController.rejectApplication);

// Mock Auth endpoint
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({
    success: true,
    data: {
      token: 'jwt_mock_token_vanguard',
      user: {
        email,
        name: 'Rajesh Kumar',
        role: 'PG_OWNER',
        businessId: 'biz_pg_01'
      }
    }
  });
});

export default router;
