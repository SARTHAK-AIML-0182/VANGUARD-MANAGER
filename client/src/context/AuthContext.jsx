import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEMO_USERS = {
  PG_OWNER: {
    id: 'usr_pg_owner_01',
    name: 'Rajesh Kumar',
    email: 'rajesh@vanguardpg.com',
    phone: '+91 98765 43210',
    role: 'PG_OWNER',
    businessId: 'biz_pg_01',
    businessName: 'Royal Comfort PG & Hostels',
    businessType: 'PG',
    avatar: 'RK'
  },
  MESS_OWNER: {
    id: 'usr_mess_owner_01',
    name: 'Suresh Patel',
    email: 'suresh@annapurnamess.com',
    phone: '+91 98765 88990',
    role: 'MESS_OWNER',
    businessId: 'biz_mess_01',
    businessName: 'Annapurna Gourmet Mess & Tiffin',
    businessType: 'MESS',
    avatar: 'SP'
  },
  RESIDENT_PG: {
    id: 'usr_res_01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@collegemail.edu',
    phone: '+91 98111 22334',
    role: 'PG_STUDENT',
    businessId: 'biz_pg_01',
    businessName: 'Royal Comfort PG & Hostels',
    businessType: 'PG',
    residentCode: 'RC-B102-A',
    avatar: 'AS'
  },
  CUSTOMER_MESS: {
    id: 'usr_cust_01',
    name: 'Priya Iyer',
    email: 'priya.iyer@techcorp.in',
    phone: '+91 98222 33445',
    role: 'MESS_CUSTOMER',
    businessId: 'biz_mess_01',
    businessName: 'Annapurna Gourmet Mess & Tiffin',
    businessType: 'MESS',
    customerCode: 'AGM-P-402',
    avatar: 'PI'
  }
};

export function AuthProvider({ children }) {
  // Restore current user or default to PG_OWNER
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('vanguard_auth_user_live');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_USERS.PG_OWNER;
      }
    }
    return DEMO_USERS.PG_OWNER;
  });

  const [otpState, setOtpState] = useState({
    sent: false,
    phone: '',
    code: '',
    isVerified: false
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vanguard_auth_user_live', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vanguard_auth_user_live');
    }
  }, [currentUser]);

  // 1-Click Demo Persona Switcher
  const switchRole = (roleKey) => {
    if (DEMO_USERS[roleKey]) {
      setCurrentUser(DEMO_USERS[roleKey]);
    }
  };

  // Register New PG Owner & Business
  const registerPGOwner = (formData, createBusinessCallback) => {
    const businessId = `biz_pg_${Date.now()}`;
    const token = `tk_pg_${Math.random().toString(36).substring(2, 10)}`;

    const newBusiness = {
      id: businessId,
      name: formData.businessName,
      type: 'PG',
      address: `${formData.address}, ${formData.city}`,
      phone: formData.phone,
      email: formData.email,
      totalBeds: parseInt(formData.totalBeds || '20', 10),
      occupiedBeds: 0,
      activeQrToken: token,
      qrCreatedAt: new Date().toISOString(),
      qrIsActive: true
    };

    const newUser = {
      id: `usr_${Date.now()}`,
      name: formData.ownerName,
      email: formData.email,
      phone: formData.phone,
      role: 'PG_OWNER',
      businessId: businessId,
      businessName: formData.businessName,
      businessType: 'PG',
      avatar: formData.ownerName.split(' ').map(n => n[0]).join('').toUpperCase() || 'PG'
    };

    if (createBusinessCallback) {
      createBusinessCallback(newBusiness);
    }

    setCurrentUser(newUser);
    return { user: newUser, business: newBusiness, token };
  };

  // Register New Mess Owner & Business
  const registerMessOwner = (formData, createBusinessCallback) => {
    const businessId = `biz_mess_${Date.now()}`;
    const token = `tk_mess_${Math.random().toString(36).substring(2, 10)}`;

    const newBusiness = {
      id: businessId,
      name: formData.businessName,
      type: 'MESS',
      address: `${formData.address}, ${formData.city}`,
      phone: formData.phone,
      email: formData.email,
      activeSubscribers: 0,
      activeQrToken: token,
      qrCreatedAt: new Date().toISOString(),
      qrIsActive: true
    };

    const newUser = {
      id: `usr_${Date.now()}`,
      name: formData.ownerName,
      email: formData.email,
      phone: formData.phone,
      role: 'MESS_OWNER',
      businessId: businessId,
      businessName: formData.businessName,
      businessType: 'MESS',
      avatar: formData.ownerName.split(' ').map(n => n[0]).join('').toUpperCase() || 'MO'
    };

    if (createBusinessCallback) {
      createBusinessCallback(newBusiness);
    }

    setCurrentUser(newUser);
    return { user: newUser, business: newBusiness, token };
  };

  // Direct Login
  const login = (emailOrPhone, password, role) => {
    // If demo matches
    if (role === 'PG_OWNER') {
      setCurrentUser(DEMO_USERS.PG_OWNER);
      return { success: true };
    }
    if (role === 'MESS_OWNER') {
      setCurrentUser(DEMO_USERS.MESS_OWNER);
      return { success: true };
    }
    if (role === 'PG_STUDENT') {
      setCurrentUser(DEMO_USERS.RESIDENT_PG);
      return { success: true };
    }
    if (role === 'MESS_CUSTOMER') {
      setCurrentUser(DEMO_USERS.CUSTOMER_MESS);
      return { success: true };
    }

    // Generic fallback login
    const customUser = {
      id: `usr_custom_${Date.now()}`,
      name: emailOrPhone.split('@')[0] || 'Business Operator',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'operator@vanguard.com',
      phone: !emailOrPhone.includes('@') ? emailOrPhone : '+91 98000 00000',
      role: role || 'PG_OWNER',
      businessId: role === 'MESS_OWNER' ? 'biz_mess_01' : 'biz_pg_01',
      businessName: role === 'MESS_OWNER' ? 'Annapurna Gourmet Mess' : 'Royal Comfort PG',
      businessType: role === 'MESS_OWNER' ? 'MESS' : 'PG',
      avatar: 'BO'
    };
    setCurrentUser(customUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Safe Mock OTP Abstraction
  const sendOtp = (phone) => {
    const mockCode = '123456';
    setOtpState({
      sent: true,
      phone,
      code: mockCode,
      isVerified: false
    });
    return { success: true, message: 'OTP sent successfully (Development Mock: Use 123456)' };
  };

  const verifyOtp = (enteredCode) => {
    if (enteredCode === '123456' || enteredCode === otpState.code) {
      setOtpState(prev => ({ ...prev, isVerified: true }));
      return { success: true };
    }
    return { success: false, error: 'Invalid verification code. Please enter 123456.' };
  };

  const resetOtp = () => {
    setOtpState({ sent: false, phone: '', code: '', isVerified: false });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        switchRole,
        registerPGOwner,
        registerMessOwner,
        otpState,
        sendOtp,
        verifyOtp,
        resetOtp,
        isAuthenticated: Boolean(currentUser)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
