import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  QrCode,
  Building2,
  UtensilsCrossed,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Lock,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  Upload
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function QRRegistrationResolver() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { otpState, sendOtp, verifyOtp, resetOtp } = useAuth();
  const { data, submitApplication } = useData();

  // Resolved Business State
  const [resolvedBusiness, setResolvedBusiness] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isResolving, setIsResolving] = useState(true);

  // Flow State
  const [currentStep, setCurrentStep] = useState(1); // 1: Mobile OTP, 2: Form Sections, 3: Success Confirmation
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [submittedAppId, setSubmittedAppId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Personal
    applicantName: '',
    email: '',
    dob: '',
    gender: 'Male',
    permanentAddress: '',
    city: '',
    state: '',
    pincode: '',
    nativePlace: '',
    // Emergency
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    relationship: 'Father',
    // Education / Employment
    occupationType: 'STUDENT',
    collegeOrCompany: '',
    courseOrDesignation: '',
    idProofType: 'College Student ID',
    // Accommodation (PG)
    requestedJoiningDate: '',
    preferredRoomType: 'DOUBLE_SHARING',
    // Dining (Mess)
    selectedPlan: 'Standard Full Board',
    dietaryPreference: 'VEGETARIAN',
    foodAllergies: '',
    // Declarations
    rulesAcknowledged: false
  });

  // 1. Resolve Token on Mount
  useEffect(() => {
    setIsResolving(true);
    // Find business matching token
    const matchingBiz = Object.values(data.businesses).find(
      b => b.activeQrToken === token && b.qrIsActive
    );

    if (matchingBiz) {
      setResolvedBusiness(matchingBiz);
      setIsValidToken(true);
    } else {
      setResolvedBusiness(null);
      setIsValidToken(false);
    }
    setIsResolving(false);
  }, [token, data.businesses]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!enteredPhone || enteredPhone.length < 10) {
      setOtpError('Please enter a valid 10-digit mobile phone number');
      return;
    }
    setOtpError('');
    sendOtp(enteredPhone);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const result = verifyOtp(enteredOtp);
    if (result.success) {
      setOtpError('');
      setCurrentStep(2); // Move to registration form
    } else {
      setOtpError(result.error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.rulesAcknowledged) {
      alert('Please acknowledge and agree to the rules before submitting.');
      return;
    }

    const newAppId = submitApplication({
      businessId: resolvedBusiness.id,
      type: resolvedBusiness.type === 'PG' ? 'PG_STUDENT' : 'MESS_CUSTOMER',
      applicantName: formData.applicantName,
      phone: enteredPhone,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      permanentAddress: `${formData.permanentAddress}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      occupationType: formData.occupationType,
      collegeOrCompany: `${formData.collegeOrCompany} (${formData.courseOrDesignation})`,
      requestedJoiningDate: formData.requestedJoiningDate || new Date().toISOString().split('T')[0],
      preferredRoomType: formData.preferredRoomType,
      emergencyContactName: formData.emergencyContactName || formData.fatherName,
      emergencyContactPhone: formData.emergencyContactPhone || formData.fatherPhone,
      idProofType: formData.idProofType,
      idProofRef: 'verified_upload_proof.pdf',
      selectedPlan: formData.selectedPlan,
      dietaryPreference: formData.dietaryPreference,
      foodAllergies: formData.foodAllergies || 'None',
      startDate: formData.requestedJoiningDate || new Date().toISOString().split('T')[0],
      rulesAcknowledged: true
    });

    setSubmittedAppId(newAppId);
    setCurrentStep(3); // Confirmation
  };

  if (isResolving) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-semibold text-slate-600">Resolving Registration Token...</p>
        </div>
      </div>
    );
  }

  // INVALID OR REVOKED TOKEN
  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card padding="lg" className="max-w-md w-full text-center border-slate-200">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Invalid or Expired QR Code</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            This business registration token is either invalid, revoked by the owner, or expired.
          </p>
          <div className="mt-4 p-3 rounded-lg bg-slate-100 text-slate-500 font-mono text-[11px] break-all">
            Token: {token || 'No token specified in URL'}
          </div>

          {/* Active Businesses Selector */}
          {Object.keys(data.businesses).length > 0 && (
            <div className="mt-5 text-left space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Choose an active business to register with:</span>
              <div className="space-y-1.5">
                {Object.values(data.businesses).map((biz) => (
                  <button
                    key={biz.id}
                    type="button"
                    onClick={() => navigate(`/register?token=${biz.activeQrToken}`)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-left flex items-center justify-between text-xs font-semibold text-slate-900 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${biz.type === 'PG' ? 'bg-blue-600' : 'bg-emerald-600'}`}></span>
                      <span>{biz.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase">{biz.type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link to="/">
              <Button variant="primary" size="md" className="w-full justify-center">
                Return to Vanguard Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Verified Business Banner Header */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shadow-sm ${
              resolvedBusiness.type === 'PG' ? 'bg-blue-600' : 'bg-emerald-600'
            }`}>
              {resolvedBusiness.type === 'PG' ? <Building2 className="w-6 h-6" /> : <UtensilsCrossed className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base text-slate-900">{resolvedBusiness.name}</h1>
                <Badge variant={resolvedBusiness.type === 'PG' ? 'pg' : 'mess'} size="sm">
                  {resolvedBusiness.type}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{resolvedBusiness.address}</p>
            </div>
          </div>
          <Badge variant="success" size="sm" dot>
            Verified Business
          </Badge>
        </div>

        {/* STEP 1: MOBILE OTP AUTHENTICATION */}
        {currentStep === 1 && (
          <Card padding="lg" className="border-slate-200 shadow-sm">
            <div className="text-center max-w-sm mx-auto mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Verify Mobile Number</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your mobile number to receive a one-time verification passcode.
              </p>
            </div>

            {!otpState.sent ? (
              <form onSubmit={handleSendOtp} className="space-y-4 max-w-sm mx-auto">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={enteredPhone}
                    onChange={(e) => setEnteredPhone(e.target.value)}
                    required
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                  {otpError && <p className="text-xs text-rose-600 mt-1 font-medium">{otpError}</p>}
                </div>

                <Button variant="resident" size="lg" type="submit" className="w-full justify-center">
                  Send OTP Code
                </Button>

                <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-200 text-[11px] text-purple-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Development Mock: OTP is simulated as <strong>123456</strong></span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4 max-w-sm mx-auto">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Enter 6-Digit Passcode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    required
                    className="w-full text-center text-lg font-mono tracking-widest px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                  {otpError && <p className="text-xs text-rose-600 mt-1 font-medium">{otpError}</p>}
                  <p className="text-[11px] text-slate-500 mt-1 text-center">
                    Sent to {enteredPhone} • Development Code: <strong>123456</strong>
                  </p>
                </div>

                <Button variant="resident" size="lg" type="submit" className="w-full justify-center">
                  Verify & Proceed to Form
                </Button>

                <button
                  type="button"
                  onClick={resetOtp}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
                >
                  Change Phone Number
                </button>
              </form>
            )}
          </Card>
        )}

        {/* STEP 2: MULTI-STEP REGISTRATION FORM */}
        {currentStep === 2 && (
          <Card padding="lg" className="border-slate-200 shadow-sm">
            <div className="pb-4 mb-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {resolvedBusiness.type === 'PG' ? 'PG Student / Resident Registration' : 'Mess Dining Subscription'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified Phone: <strong className="text-slate-800">{enteredPhone}</strong>
                </p>
              </div>
              <Badge variant={resolvedBusiness.type === 'PG' ? 'pg' : 'mess'} size="sm">
                Step 2 of 2
              </Badge>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-6 text-xs">
              {/* SECTION 1: PERSONAL DETAILS */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-blue-700">
                  Section 1: Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Full Name"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. Aarav Sharma"
                  />
                  <Input
                    label="Email Address (Optional)"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="aarav@collegemail.edu"
                  />
                  {resolvedBusiness.type === 'PG' && (
                    <>
                      <Input
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleFormChange}
                        required
                      />
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleFormChange}
                          className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* SECTION 2: ADDRESS (IF PG) */}
              {resolvedBusiness.type === 'PG' && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-blue-700">
                    Section 2: Permanent Address
                  </h3>
                  <div className="space-y-3">
                    <Input
                      label="Permanent Address Line"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleFormChange}
                      required
                      placeholder="House / Flat No, Street, Landmark"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        required
                        placeholder="Kanpur"
                      />
                      <Input
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleFormChange}
                        required
                        placeholder="Uttar Pradesh"
                      />
                      <Input
                        label="PIN Code"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleFormChange}
                        required
                        placeholder="208001"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: FAMILY & EMERGENCY CONTACTS (IF PG) */}
              {resolvedBusiness.type === 'PG' && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-blue-700">
                    Section 3: Family & Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Father's / Guardian's Name"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleFormChange}
                      required
                      placeholder="e.g. Mohan Sharma"
                    />
                    <Input
                      label="Father's Contact Number"
                      name="fatherPhone"
                      type="tel"
                      value={formData.fatherPhone}
                      onChange={handleFormChange}
                      required
                      placeholder="+91 98111 99887"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 4: EDUCATION / OCCUPATION (CONDITIONAL) */}
              {resolvedBusiness.type === 'PG' && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-blue-700">
                    Section 4: Occupation Details
                  </h3>
                  <div className="flex items-center gap-4 mb-2">
                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="occupationType"
                        value="STUDENT"
                        checked={formData.occupationType === 'STUDENT'}
                        onChange={handleFormChange}
                      />
                      <span>College / University Student</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="occupationType"
                        value="WORKING_PROFESSIONAL"
                        checked={formData.occupationType === 'WORKING_PROFESSIONAL'}
                        onChange={handleFormChange}
                      />
                      <span>Working Professional</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label={formData.occupationType === 'STUDENT' ? 'College / University Name' : 'Company / Employer Name'}
                      name="collegeOrCompany"
                      value={formData.collegeOrCompany}
                      onChange={handleFormChange}
                      required
                      placeholder={formData.occupationType === 'STUDENT' ? 'e.g. Bennett University' : 'e.g. Deloitte India'}
                    />
                    <Input
                      label={formData.occupationType === 'STUDENT' ? 'Course & Year' : 'Designation'}
                      name="courseOrDesignation"
                      value={formData.courseOrDesignation}
                      onChange={handleFormChange}
                      required
                      placeholder={formData.occupationType === 'STUDENT' ? 'B.Tech CSE - 2nd Year' : 'Software Engineer'}
                    />
                  </div>
                </div>
              )}

              {/* SECTION 5: ACCOMMODATION / MEAL PLAN PREFERENCE */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-blue-700">
                  {resolvedBusiness.type === 'PG' ? 'Section 5: Stay Preferences' : 'Section 2: Meal Plan & Preferences'}
                </h3>

                {resolvedBusiness.type === 'PG' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Expected Joining Date"
                      name="requestedJoiningDate"
                      type="date"
                      value={formData.requestedJoiningDate}
                      onChange={handleFormChange}
                      required
                    />
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Preferred Room Type
                      </label>
                      <select
                        name="preferredRoomType"
                        value={formData.preferredRoomType}
                        onChange={handleFormChange}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      >
                        <option value="DOUBLE_SHARING">Double Sharing (Attached Bath)</option>
                        <option value="SINGLE">Single Room (Private)</option>
                        <option value="TRIPLE_SHARING">Triple Sharing</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Select Meal Plan
                      </label>
                      <select
                        name="selectedPlan"
                        value={formData.selectedPlan}
                        onChange={handleFormChange}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      >
                        <option value="Standard Full Board">Standard Full Board (₹4,200/mo)</option>
                        <option value="Lunch & Dinner Only">Lunch & Dinner Only (₹3,400/mo)</option>
                        <option value="15-Day Flexi Pass">15-Day Flexi Pass (₹2,100)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Dietary Preference
                      </label>
                      <select
                        name="dietaryPreference"
                        value={formData.dietaryPreference}
                        onChange={handleFormChange}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      >
                        <option value="VEGETARIAN">Pure Vegetarian</option>
                        <option value="NON_VEG">Non-Vegetarian</option>
                        <option value="JAIN">Jain (No Onion / Garlic)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 6: DOCUMENT PROOF (IF PG) - STRICT DATA MINIMIZATION */}
              {resolvedBusiness.type === 'PG' && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-blue-700">
                    Section 6: Identity Document Verification
                  </h3>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Verification Proof Document</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                        Privacy Compliant
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Please upload a College Student ID or Corporate Employee Badge. <strong>Do NOT upload unmasked Aadhaar cards.</strong>
                    </p>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer hover:bg-slate-100 transition-colors">
                      <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                      <span className="text-[11px] font-semibold text-blue-600">Click to attach photo or PDF proof</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">PNG, JPG, PDF up to 5MB</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 7: DECLARATIONS */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rulesAcknowledged"
                    checked={formData.rulesAcknowledged}
                    onChange={handleFormChange}
                    required
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I declare that all submitted personal details are accurate. I acknowledge the house rules and terms of <strong>{resolvedBusiness.name}</strong>, and understand that account activation requires management approval.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  variant={resolvedBusiness.type === 'PG' ? 'pg' : 'mess'}
                  size="xl"
                  type="submit"
                  className="w-full justify-center"
                >
                  Submit Registration Application
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* STEP 3: SUBMISSION SUCCESS CONFIRMATION */}
        {currentStep === 3 && (
          <Card padding="lg" className="border-slate-200 text-center py-10 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl font-black text-slate-900">Application Submitted!</h2>
            <p className="text-xs font-mono text-slate-500 mt-1">
              Reference ID: <strong className="text-slate-900">{submittedAppId}</strong>
            </p>

            <div className="mt-6 max-w-md mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2">
              <p className="font-bold text-slate-900">Next Steps & Owner Approval Process:</p>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span>Your application is currently marked as <strong className="text-amber-800">PENDING</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                <span>The management of <strong>{resolvedBusiness.name}</strong> will review your details and room/meal availability.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <span>Upon owner approval, your resident profile and portal login credentials will activate.</span>
              </div>
            </div>

            <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/">
                <Button variant="secondary" size="md">
                  Back to Homepage
                </Button>
              </Link>
              <Link to="/resident">
                <Button variant="resident" size="md" icon={ArrowRight} iconPosition="right">
                  Preview Resident Hub
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default QRRegistrationResolver;
