import { generateSecureToken, hashToken } from '../utils/crypto.js';

// In-Memory store fallback when external PostgreSQL is not yet wired
const tokenStore = new Map([
  ['tk_pg_rc_8923a4f89d021c7e', {
    businessId: 'biz_pg_01',
    businessName: 'Royal Comfort PG & Hostels',
    businessType: 'PG',
    address: 'Plot 42, Knowledge Park III, Greater Noida, UP',
    isActive: true,
    createdAt: new Date().toISOString()
  }],
  ['tk_mess_ap_44f12d8a9e011b62', {
    businessId: 'biz_mess_01',
    businessName: 'Annapurna Gourmet Mess & Tiffin',
    businessType: 'MESS',
    address: 'Shop 12-14, Student Plaza, University Road, Greater Noida, UP',
    isActive: true,
    createdAt: new Date().toISOString()
  }]
]);

export const qrController = {
  // Generate or rotate business QR token
  generateQr: (req, res) => {
    const { businessId, businessType, businessName, address } = req.body;
    if (!businessId) {
      return res.status(400).json({ success: false, error: { message: 'Business ID is required' } });
    }

    const token = generateSecureToken(businessType === 'PG' ? 'tk_pg' : 'tk_mess');
    tokenStore.set(token, {
      businessId,
      businessName: businessName || 'Verified Business',
      businessType: businessType || 'PG',
      address: address || 'Campus Address',
      isActive: true,
      createdAt: new Date().toISOString()
    });

    res.json({
      success: true,
      data: {
        token,
        registrationUrl: `${req.protocol}://${req.get('host')}/register?token=${token}`,
        createdAt: new Date().toISOString()
      }
    });
  },

  // Resolve scanned QR token to business profile
  resolveToken: (req, res) => {
    const { token } = req.params;
    const match = tokenStore.get(token);

    if (!match || !match.isActive) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TOKEN_INVALID_OR_REVOKED',
          message: 'The scanned registration QR code is invalid or has been revoked by management.'
        }
      });
    }

    res.json({
      success: true,
      data: {
        businessId: match.businessId,
        businessName: match.businessName,
        businessType: match.businessType,
        address: match.address,
        isVerified: true
      }
    });
  },

  // Revoke active QR token
  revokeToken: (req, res) => {
    const { token } = req.body;
    const match = tokenStore.get(token);
    if (match) {
      match.isActive = false;
      return res.json({ success: true, message: 'QR Code revoked successfully' });
    }
    res.status(404).json({ success: false, error: { message: 'Token not found' } });
  }
};

export default qrController;
