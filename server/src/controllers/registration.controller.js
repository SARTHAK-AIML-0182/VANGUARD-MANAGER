// In-Memory store for registrations fallback
const applicationsStore = [
  {
    id: 'app_pg_01',
    businessId: 'biz_pg_01',
    type: 'PG_STUDENT',
    applicantName: 'Devansh Malhotra',
    phone: '+91 98777 66554',
    email: 'devansh.m@outlook.com',
    status: 'PENDING',
    appliedAt: new Date().toISOString()
  }
];

export const registrationController = {
  // Submit new registration from QR scan
  submitRegistration: (req, res) => {
    const { businessId, type, applicantName, phone } = req.body;

    if (!businessId || !applicantName || !phone) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required applicant fields' }
      });
    }

    const newApp = {
      id: `app_${Date.now()}`,
      businessId,
      type: type || 'PG_STUDENT',
      applicantName,
      phone,
      formData: req.body,
      status: 'PENDING',
      appliedAt: new Date().toISOString()
    };

    applicationsStore.unshift(newApp);

    res.status(201).json({
      success: true,
      data: {
        applicationId: newApp.id,
        status: 'PENDING',
        message: 'Application submitted successfully. Awaiting owner review.'
      }
    });
  },

  // Owner list applications
  getApplications: (req, res) => {
    const businessId = req.tenant?.businessId || req.query.businessId;
    const apps = applicationsStore.filter(a => !businessId || a.businessId === businessId);
    res.json({ success: true, data: apps });
  },

  // Owner approve
  approveApplication: (req, res) => {
    const { id } = req.params;
    const { reviewNotes } = req.body;
    const app = applicationsStore.find(a => a.id === id);

    if (!app) {
      return res.status(404).json({ success: false, error: { message: 'Application not found' } });
    }

    app.status = 'APPROVED';
    app.reviewNotes = reviewNotes || 'Approved by owner';
    app.reviewedAt = new Date().toISOString();

    res.json({
      success: true,
      data: {
        applicationId: app.id,
        status: 'APPROVED',
        message: 'Applicant approved and account provisioned.'
      }
    });
  },

  // Owner reject
  rejectApplication: (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    const app = applicationsStore.find(a => a.id === id);

    if (!app) {
      return res.status(404).json({ success: false, error: { message: 'Application not found' } });
    }

    app.status = 'REJECTED';
    app.reviewNotes = reason || 'Rejected by owner';
    app.reviewedAt = new Date().toISOString();

    res.json({
      success: true,
      data: {
        applicationId: app.id,
        status: 'REJECTED',
        message: 'Application rejected.'
      }
    });
  }
};

export default registrationController;
