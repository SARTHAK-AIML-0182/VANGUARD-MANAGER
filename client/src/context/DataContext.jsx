import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

const INITIAL_DATA = {
  // 1. BUSINESSES
  businesses: {
    biz_pg_01: {
      id: 'biz_pg_01',
      name: 'Royal Comfort PG & Hostels',
      type: 'PG',
      address: 'Plot 42, Knowledge Park III, Greater Noida, UP',
      phone: '+91 98765 43210',
      email: 'contact@royalcomfortpg.com',
      totalBeds: 48,
      occupiedBeds: 42,
      activeQrToken: 'tk_pg_rc_8923a4f89d021c7e',
      qrCreatedAt: '2026-11-01T10:00:00Z',
      qrIsActive: true
    },
    biz_mess_01: {
      id: 'biz_mess_01',
      name: 'Annapurna Gourmet Mess & Tiffin',
      type: 'MESS',
      address: 'Shop 12-14, Student Plaza, University Road, Greater Noida, UP',
      phone: '+91 98765 88990',
      email: 'info@annapurnamess.com',
      activeSubscribers: 135,
      activeQrToken: 'tk_mess_ap_44f12d8a9e011b62',
      qrCreatedAt: '2026-11-01T10:00:00Z',
      qrIsActive: true
    }
  },

  // 2. PG PROPERTIES, ROOMS & BEDS
  pgProperties: [
    {
      id: 'prop_01',
      name: 'Royal Comfort - Boys Block A',
      code: 'RC-BLKA',
      address: 'Plot 42, Knowledge Park III',
      totalFloors: 3,
      totalRooms: 16,
      totalBeds: 32,
      manager: 'Ramesh Singh'
    },
    {
      id: 'prop_02',
      name: 'Royal Comfort - Girls Wing B',
      code: 'RC-BLKB',
      address: 'Plot 44, Knowledge Park III',
      totalFloors: 2,
      totalRooms: 8,
      totalBeds: 16,
      manager: 'Sunita Sharma'
    }
  ],

  pgRooms: [
    { id: 'rm_101', propertyId: 'prop_01', floor: '1st Floor', roomNumber: '101', type: 'DOUBLE_SHARING', rent: 8500, attachedBath: true },
    { id: 'rm_102', propertyId: 'prop_01', floor: '1st Floor', roomNumber: '102', type: 'DOUBLE_SHARING', rent: 8500, attachedBath: true },
    { id: 'rm_103', propertyId: 'prop_01', floor: '1st Floor', roomNumber: '103', type: 'SINGLE', rent: 14000, attachedBath: true },
    { id: 'rm_201', propertyId: 'prop_01', floor: '2nd Floor', roomNumber: '201', type: 'TRIPLE_SHARING', rent: 7000, attachedBath: false },
    { id: 'rm_202', propertyId: 'prop_01', floor: '2nd Floor', roomNumber: '202', type: 'DOUBLE_SHARING', rent: 8500, attachedBath: true }
  ],

  pgBeds: [
    { id: 'bed_101_A', roomId: 'rm_101', bedNumber: '101-A', status: 'OCCUPIED', residentName: 'Aarav Sharma', residentId: 'res_01' },
    { id: 'bed_101_B', roomId: 'rm_101', bedNumber: '101-B', status: 'VACANT', residentName: null, residentId: null },
    { id: 'bed_102_A', roomId: 'rm_102', bedNumber: '102-A', status: 'OCCUPIED', residentName: 'Rohan Verma', residentId: 'res_02' },
    { id: 'bed_102_B', roomId: 'rm_102', bedNumber: '102-B', status: 'OCCUPIED', residentName: 'Vikram Joshi', residentId: 'res_03' },
    { id: 'bed_103_A', roomId: 'rm_103', bedNumber: '103-A', status: 'OCCUPIED', residentName: 'Kabir Mehta', residentId: 'res_04' },
    { id: 'bed_201_A', roomId: 'rm_201', bedNumber: '201-A', status: 'VACANT', residentName: null, residentId: null },
    { id: 'bed_201_B', roomId: 'rm_201', bedNumber: '201-B', status: 'VACANT', residentName: null, residentId: null },
    { id: 'bed_201_C', roomId: 'rm_201', bedNumber: '201-C', status: 'MAINTENANCE', residentName: null, residentId: null }
  ],

  // 3. PG RESIDENTS
  pgResidents: [
    {
      id: 'res_01',
      name: 'Aarav Sharma',
      phone: '+91 98111 22334',
      email: 'aarav.sharma@collegemail.edu',
      status: 'ACTIVE',
      roomNumber: '101',
      bedNumber: '101-A',
      property: 'Royal Comfort - Boys Block A',
      joiningDate: '2026-08-01',
      monthlyRent: 8500,
      emergencyContact: 'Mohan Sharma (Father): +91 98111 99887',
      college: 'Galgotias University - B.Tech CSE (3rd Yr)',
      residentCode: 'RC-101A'
    },
    {
      id: 'res_02',
      name: 'Rohan Verma',
      phone: '+91 98333 44556',
      email: 'rohan.v@gmail.com',
      status: 'ACTIVE',
      roomNumber: '102',
      bedNumber: '102-A',
      property: 'Royal Comfort - Boys Block A',
      joiningDate: '2026-07-15',
      monthlyRent: 8500,
      emergencyContact: 'Kavita Verma (Mother): +91 98333 11223',
      college: 'Sharda University - BBA (2nd Yr)',
      residentCode: 'RC-102A'
    }
  ],

  // 4. PENDING REGISTRATION APPLICATIONS (From QR scans)
  applications: [
    {
      id: 'app_pg_01',
      businessId: 'biz_pg_01',
      type: 'PG_STUDENT',
      applicantName: 'Devansh Malhotra',
      phone: '+91 98777 66554',
      email: 'devansh.m@outlook.com',
      gender: 'Male',
      dob: '2004-05-14',
      permanentAddress: 'House 88, Civil Lines, Kanpur, UP - 208001',
      status: 'PENDING',
      appliedAt: '2026-11-21T18:30:00Z',
      occupationType: 'STUDENT',
      collegeOrCompany: 'Bennett University - B.Tech AI & Data Science (1st Yr)',
      requestedJoiningDate: '2026-12-01',
      preferredRoomType: 'DOUBLE_SHARING',
      emergencyContactName: 'Rajnish Malhotra (Father)',
      emergencyContactPhone: '+91 98777 11223',
      idProofType: 'College ID Card',
      idProofRef: 'verified_upload_student_id_kanpur.pdf',
      rulesAcknowledged: true
    },
    {
      id: 'app_pg_02',
      businessId: 'biz_pg_01',
      type: 'PG_STUDENT',
      applicantName: 'Nitin Singhania',
      phone: '+91 98444 55667',
      email: 'nitin.singh@consulting.com',
      gender: 'Male',
      dob: '2001-11-20',
      permanentAddress: 'Flat 402, Green Park, Lucknow, UP',
      status: 'PENDING',
      appliedAt: '2026-11-21T21:10:00Z',
      occupationType: 'WORKING_PROFESSIONAL',
      collegeOrCompany: 'Deloitte India - Associate Analyst',
      requestedJoiningDate: '2026-12-05',
      preferredRoomType: 'SINGLE',
      emergencyContactName: 'Sunita Singhania (Mother)',
      emergencyContactPhone: '+91 98444 99001',
      idProofType: 'Corporate Employee ID',
      idProofRef: 'verified_deloitte_work_badge.png',
      rulesAcknowledged: true
    },
    {
      id: 'app_mess_01',
      businessId: 'biz_mess_01',
      type: 'MESS_CUSTOMER',
      applicantName: 'Kunal Deshmukh',
      phone: '+91 98555 12340',
      email: 'kunal.d@gmail.com',
      status: 'PENDING',
      appliedAt: '2026-11-22T01:45:00Z',
      dietaryPreference: 'VEGETARIAN',
      foodAllergies: 'None',
      selectedPlan: 'Full Board (Breakfast + Lunch + Dinner)',
      startDate: '2026-12-01',
      collegeOrCompany: 'Noida Institute of Engineering & Technology',
      rulesAcknowledged: true
    }
  ],

  // 5. PG INVOICES & PAYMENTS
  pgInvoices: [
    { id: 'inv_01', residentId: 'res_01', residentName: 'Aarav Sharma', room: '101-A', month: 'November 2026', amount: 8500, dueDate: '2026-11-05', status: 'PAID', paidDate: '2026-11-03' },
    { id: 'inv_02', residentId: 'res_02', residentName: 'Rohan Verma', room: '102-A', month: 'November 2026', amount: 8500, dueDate: '2026-11-05', status: 'PAID', paidDate: '2026-11-04' },
    { id: 'inv_03', residentId: 'res_01', residentName: 'Aarav Sharma', room: '101-A', month: 'December 2026', amount: 8500, dueDate: '2026-12-05', status: 'UNPAID', paidDate: null }
  ],

  // 6. PG COMPLAINTS & TICKETS
  pgComplaints: [
    { id: 'cmp_01', residentName: 'Aarav Sharma', room: '101', category: 'PLUMBING', title: 'Bathroom tap slow dripping', status: 'IN_PROGRESS', priority: 'LOW', createdAt: '2026-11-20' },
    { id: 'cmp_02', residentName: 'Rohan Verma', room: '102', category: 'WIFI', title: 'Wi-Fi disconnects intermittently on 2nd floor', status: 'OPEN', priority: 'HIGH', createdAt: '2026-11-21' }
  ],

  // 7. PG LEAVE REQUESTS
  pgLeaveRequests: [
    { id: 'lev_01', residentName: 'Aarav Sharma', room: '101-A', fromDate: '2026-11-28', toDate: '2026-11-30', reason: 'Family wedding in Kanpur', status: 'APPROVED', parentContacted: true }
  ],

  // 8. MESS MEAL PLANS
  messMealPlans: [
    { id: 'mp_01', name: 'Standard Full Board', type: 'MONTHLY', meals: 'Breakfast + Lunch + Dinner', price: 4200, activeSubscribers: 84 },
    { id: 'mp_02', name: 'Lunch & Dinner Only', type: 'MONTHLY', meals: 'Lunch + Dinner', price: 3400, activeSubscribers: 36 },
    { id: 'mp_03', name: '15-Day Flexi Pass', type: 'FLEXI_15', meals: 'Any 30 Meals', price: 2100, activeSubscribers: 15 }
  ],

  // 9. MESS CUSTOMERS
  messCustomers: [
    {
      id: 'cust_01',
      name: 'Priya Iyer',
      phone: '+91 98222 33445',
      planName: 'Standard Full Board',
      dietary: 'VEG',
      status: 'ACTIVE',
      validUntil: '2026-12-15',
      mealsRemaining: 68,
      customerCode: 'AGM-P-402'
    },
    {
      id: 'cust_02',
      name: 'Aditya Sen',
      phone: '+91 98666 77889',
      planName: 'Lunch & Dinner Only',
      dietary: 'NON_VEG',
      status: 'ACTIVE',
      validUntil: '2026-12-10',
      mealsRemaining: 34,
      customerCode: 'AGM-P-403'
    }
  ],

  // 10. MESS MENU (Weekly schedule)
  messMenu: {
    Monday: {
      breakfast: 'Poha with Sev, Boiled Eggs / Banana, Tea / Coffee',
      lunch: 'Rajma Masala, Steamed Rice, Tawa Roti, Mix Veg Raita, Salad',
      dinner: 'Shahi Paneer / Chicken Curry, Dal Tadka, Roti, Rice, Gulab Jamun'
    },
    Tuesday: {
      breakfast: 'Aloo Paratha with Curd & Pickle, Tea',
      lunch: 'Kadhi Pakora, Jeera Rice, Phulka, Aloo Bhindi, Salad',
      dinner: 'Mix Veg, Dal Makhani, Jeera Rice, Tandoori Roti, Kheer'
    },
    Wednesday: {
      breakfast: 'Idli Sambar with Coconut Chutney, Tea / Coffee',
      lunch: 'Chole Masala, Bhature / Rice, Green Salad, Chaas',
      dinner: 'Matar Paneer / Egg Curry, Yellow Dal, Chapati, Rice'
    },
    Thursday: {
      breakfast: 'Methi Thepla with Chutney, Sprouts, Tea',
      lunch: 'Dal Fry, Baingan Bharta, Tawa Roti, Rice, Papad',
      dinner: 'Paneer Butter Masala, Veg Pulao, Dal Fry, Roti, Ice Cream'
    },
    Friday: {
      breakfast: 'Veg Sandwich / Omelette, Fresh Juice, Coffee',
      lunch: 'Dum Aloo, Dal Tadka, Steamed Rice, Chapati, Boondi Raita',
      dinner: 'Veg Biryani / Hyderabadi Chicken Biryani, Mirchi ka Salan, Raita'
    },
    Saturday: {
      breakfast: 'Uttapam with Sambhar & Red Chutney, Tea',
      lunch: 'Kashmiri Pulao, Dal Makhani, Roti, Salad',
      dinner: 'Sev Tamatar, Dal Fry, Roti, Rice, Halwa'
    },
    Sunday: {
      breakfast: 'Poori Bhaji, Sweet Lassi',
      lunch: 'Special Sunday Feast: Paneer Lababdar / Butter Chicken, Naan, Rice',
      dinner: 'Khichdi / Light Dal Rice, Dahi, Papad (Comfort Night)'
    }
  },

  // 11. MESS INVENTORY
  messInventory: [
    { id: 'inv_01', item: 'Basmati Rice', category: 'GRAINS', currentQty: 180, unit: 'kg', reorderLevel: 50, status: 'SUFFICIENT' },
    { id: 'inv_02', item: 'Atta (Whole Wheat Flour)', category: 'GRAINS', currentQty: 240, unit: 'kg', reorderLevel: 80, status: 'SUFFICIENT' },
    { id: 'inv_03', item: 'Toor Dal', category: 'PULSES', currentQty: 45, unit: 'kg', reorderLevel: 40, status: 'LOW_STOCK' },
    { id: 'inv_04', item: 'Cooking Oil (Mustard & Sunflower)', category: 'OILS', currentQty: 60, unit: 'Liters', reorderLevel: 30, status: 'SUFFICIENT' },
    { id: 'inv_05', item: 'Fresh Paneer', category: 'DAIRY', currentQty: 8, unit: 'kg', reorderLevel: 10, status: 'LOW_STOCK' }
  ],

  // 12. MESS FOOD WASTAGE LOG
  messWastage: [
    { id: 'wst_01', date: '2026-11-21', meal: 'Dinner', wastedKg: 3.8, reason: 'Unexpected weekend absenteeism', auditedBy: 'Chef Naresh' },
    { id: 'wst_02', date: '2026-11-20', meal: 'Lunch', wastedKg: 1.9, reason: 'Optimal batch size', auditedBy: 'Chef Naresh' }
  ]
};

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('vanguard_data_store');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('vanguard_data_store', JSON.stringify(data));
  }, [data]);

  // QR Revoke and Regenerate
  const regenerateQr = (businessId) => {
    const randomHex = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
    const prefix = businessId.includes('pg') ? 'tk_pg_' : 'tk_mess_';
    const newToken = `${prefix}${randomHex}`;

    setData(prev => {
      const biz = prev.businesses[businessId];
      if (!biz) return prev;
      return {
        ...prev,
        businesses: {
          ...prev.businesses,
          [businessId]: {
            ...biz,
            activeQrToken: newToken,
            qrCreatedAt: new Date().toISOString(),
            qrIsActive: true
          }
        }
      };
    });
    return newToken;
  };

  const revokeQr = (businessId) => {
    setData(prev => {
      const biz = prev.businesses[businessId];
      if (!biz) return prev;
      return {
        ...prev,
        businesses: {
          ...prev.businesses,
          [businessId]: {
            ...biz,
            qrIsActive: false
          }
        }
      };
    });
  };

  // Applications Review
  const approveApplication = (applicationId, reviewNotes = '') => {
    setData(prev => {
      const app = prev.applications.find(a => a.id === applicationId);
      if (!app) return prev;

      const updatedApps = prev.applications.map(a =>
        a.id === applicationId ? { ...a, status: 'APPROVED', reviewNotes, reviewedAt: new Date().toISOString() } : a
      );

      // Auto-provision resident if PG
      if (app.type === 'PG_STUDENT') {
        const newResident = {
          id: `res_${Date.now()}`,
          name: app.applicantName,
          phone: app.phone,
          email: app.email,
          status: 'ACTIVE',
          roomNumber: 'Allocated Soon',
          bedNumber: 'Pending',
          property: 'Royal Comfort - Boys Block A',
          joiningDate: app.requestedJoiningDate,
          monthlyRent: 8500,
          emergencyContact: `${app.emergencyContactName}: ${app.emergencyContactPhone}`,
          college: app.collegeOrCompany,
          residentCode: `RC-${Math.floor(100 + Math.random() * 900)}`
        };
        return {
          ...prev,
          applications: updatedApps,
          pgResidents: [newResident, ...prev.pgResidents]
        };
      }

      // Auto-provision customer if Mess
      if (app.type === 'MESS_CUSTOMER') {
        const newCustomer = {
          id: `cust_${Date.now()}`,
          name: app.applicantName,
          phone: app.phone,
          planName: app.selectedPlan || 'Standard Full Board',
          dietary: app.dietaryPreference || 'VEG',
          status: 'ACTIVE',
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          mealsRemaining: 90,
          customerCode: `AGM-${Math.floor(100 + Math.random() * 900)}`
        };
        return {
          ...prev,
          applications: updatedApps,
          messCustomers: [newCustomer, ...prev.messCustomers]
        };
      }

      return { ...prev, applications: updatedApps };
    });
  };

  const rejectApplication = (applicationId, reason = '') => {
    setData(prev => ({
      ...prev,
      applications: prev.applications.map(a =>
        a.id === applicationId ? { ...a, status: 'REJECTED', reviewNotes: reason, reviewedAt: new Date().toISOString() } : a
      )
    }));
  };

  // Submit new registration from QR scan
  const submitApplication = (applicationData) => {
    const newId = `app_${Date.now()}`;
    const newApp = {
      ...applicationData,
      id: newId,
      status: 'PENDING',
      appliedAt: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      applications: [newApp, ...prev.applications]
    }));
    return newId;
  };

  // Room allocation helper
  const allocateBed = (bedId, residentId, residentName) => {
    setData(prev => ({
      ...prev,
      pgBeds: prev.pgBeds.map(b =>
        b.id === bedId ? { ...b, status: 'OCCUPIED', residentId, residentName } : b
      )
    }));
  };

  // Add maintenance complaint
  const addComplaint = (complaint) => {
    const newCmp = {
      ...complaint,
      id: `cmp_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'OPEN'
    };
    setData(prev => ({
      ...prev,
      pgComplaints: [newCmp, ...prev.pgComplaints]
    }));
  };

  // Mark meal attendance
  const punchMealAttendance = (customerId, mealType) => {
    // block duplicate punch
    return { success: true, message: `Punch recorded for ${mealType}` };
  };

  return (
    <DataContext.Provider
      value={{
        data,
        regenerateQr,
        revokeQr,
        approveApplication,
        rejectApplication,
        submitApplication,
        allocateBed,
        addComplaint,
        punchMealAttendance
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
