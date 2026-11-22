import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const INITIAL_DATA = {
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
      businessId: 'biz_pg_01',
      name: 'Royal Comfort - Boys Block A',
      code: 'RC-BLKA',
      address: 'Plot 42, Knowledge Park III, Greater Noida',
      totalFloors: 3,
      totalRooms: 16,
      totalBeds: 32,
      manager: 'Ramesh Singh (Warden)'
    },
    {
      id: 'prop_02',
      businessId: 'biz_pg_01',
      name: 'Royal Comfort - Girls Wing B',
      code: 'RC-BLKB',
      address: 'Plot 44, Knowledge Park III, Greater Noida',
      totalFloors: 2,
      totalRooms: 8,
      totalBeds: 16,
      manager: 'Sunita Sharma (Warden)'
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
      businessId: 'biz_pg_01',
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
      businessId: 'biz_pg_01',
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
    },
    {
      id: 'res_03',
      businessId: 'biz_pg_01',
      name: 'Vikram Joshi',
      phone: '+91 98444 11229',
      email: 'vikram.j@gmail.com',
      status: 'ACTIVE',
      roomNumber: '102',
      bedNumber: '102-B',
      property: 'Royal Comfort - Boys Block A',
      joiningDate: '2026-08-10',
      monthlyRent: 8500,
      emergencyContact: 'Dinesh Joshi (Father): +91 98444 88771',
      college: 'Bennett University - B.Tech AI (2nd Yr)',
      residentCode: 'RC-102B'
    },
    {
      id: 'res_04',
      businessId: 'biz_pg_01',
      name: 'Kabir Mehta',
      phone: '+91 98777 44332',
      email: 'kabir.m@consulting.com',
      status: 'ACTIVE',
      roomNumber: '103',
      bedNumber: '103-A',
      property: 'Royal Comfort - Boys Block A',
      joiningDate: '2026-06-01',
      monthlyRent: 14000,
      emergencyContact: 'Anil Mehta (Father): +91 98777 00991',
      college: 'KPMG India - Analyst',
      residentCode: 'RC-103A'
    }
  ],

  // 4. PENDING REGISTRATION APPLICATIONS
  applications: [
    {
      id: 'APP-10021',
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
      id: 'APP-10022',
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
      id: 'APP-20031',
      businessId: 'biz_mess_01',
      type: 'MESS_CUSTOMER',
      applicantName: 'Kunal Deshmukh',
      phone: '+91 98555 12340',
      email: 'kunal.d@gmail.com',
      status: 'PENDING',
      appliedAt: '2026-11-22T01:45:00Z',
      dietaryPreference: 'VEGETARIAN',
      foodAllergies: 'None',
      selectedPlan: 'Standard Full Board',
      startDate: '2026-12-01',
      collegeOrCompany: 'NIET Greater Noida',
      rulesAcknowledged: true
    }
  ],

  // 5. PG INVOICES & PAYMENTS
  pgInvoices: [
    { id: 'INV-2026-081', businessId: 'biz_pg_01', residentId: 'res_01', residentName: 'Aarav Sharma', room: '101-A', month: 'November 2026', amount: 8500, dueDate: '2026-11-05', status: 'PAID', paidDate: '2026-11-03' },
    { id: 'INV-2026-082', businessId: 'biz_pg_01', residentId: 'res_02', residentName: 'Rohan Verma', room: '102-A', month: 'November 2026', amount: 8500, dueDate: '2026-11-05', status: 'PAID', paidDate: '2026-11-04' },
    { id: 'INV-2026-083', businessId: 'biz_pg_01', residentId: 'res_03', residentName: 'Vikram Joshi', room: '102-B', month: 'November 2026', amount: 8500, dueDate: '2026-11-05', status: 'PAID', paidDate: '2026-11-05' },
    { id: 'INV-2026-084', businessId: 'biz_pg_01', residentId: 'res_04', residentName: 'Kabir Mehta', room: '103-A', month: 'November 2026', amount: 14000, dueDate: '2026-11-05', status: 'PAID', paidDate: '2026-11-02' },
    { id: 'INV-2026-095', businessId: 'biz_pg_01', residentId: 'res_01', residentName: 'Aarav Sharma', room: '101-A', month: 'December 2026', amount: 8500, dueDate: '2026-12-05', status: 'UNPAID', paidDate: null },
    { id: 'INV-2026-096', businessId: 'biz_pg_01', residentId: 'res_02', residentName: 'Rohan Verma', room: '102-A', month: 'December 2026', amount: 8500, dueDate: '2026-12-05', status: 'UNPAID', paidDate: null }
  ],

  // 6. PG COMPLAINTS
  pgComplaints: [
    { id: 'CMP-101', businessId: 'biz_pg_01', residentName: 'Aarav Sharma', room: '101', category: 'PLUMBING', title: 'Bathroom tap slow dripping', status: 'IN_PROGRESS', priority: 'LOW', createdAt: '2026-11-20' },
    { id: 'CMP-102', businessId: 'biz_pg_01', residentName: 'Rohan Verma', room: '102', category: 'WIFI', title: 'Wi-Fi disconnects intermittently on 2nd floor', status: 'OPEN', priority: 'HIGH', createdAt: '2026-11-21' },
    { id: 'CMP-103', businessId: 'biz_pg_01', residentName: 'Kabir Mehta', room: '103', category: 'ELECTRICAL', title: 'Study lamp socket loose', status: 'RESOLVED', priority: 'MEDIUM', createdAt: '2026-11-18' }
  ],

  // 7. PG LEAVE REQUESTS
  pgLeaveRequests: [
    { id: 'LEV-01', businessId: 'biz_pg_01', residentName: 'Aarav Sharma', room: '101-A', fromDate: '2026-11-28', toDate: '2026-11-30', reason: 'Family wedding in Kanpur', status: 'APPROVED', parentContacted: true },
    { id: 'LEV-02', businessId: 'biz_pg_01', residentName: 'Vikram Joshi', room: '102-B', fromDate: '2026-12-02', toDate: '2026-12-05', reason: 'Attending college symposium in Delhi', status: 'PENDING', parentContacted: false }
  ],

  // 8. MESS MEAL PLANS
  messMealPlans: [
    { id: 'mp_01', businessId: 'biz_mess_01', name: 'Standard Full Board', type: 'MONTHLY', meals: 'Breakfast + Lunch + Dinner', price: 4200, activeSubscribers: 84 },
    { id: 'mp_02', businessId: 'biz_mess_01', name: 'Lunch & Dinner Only', type: 'MONTHLY', meals: 'Lunch + Dinner', price: 3400, activeSubscribers: 36 },
    { id: 'mp_03', businessId: 'biz_mess_01', name: '15-Day Flexi Pass', type: 'FLEXI_15', meals: 'Any 30 Meals', price: 2100, activeSubscribers: 15 }
  ],

  // 9. MESS CUSTOMERS
  messCustomers: [
    { id: 'cust_01', businessId: 'biz_mess_01', name: 'Priya Iyer', phone: '+91 98222 33445', planName: 'Standard Full Board', dietary: 'VEG', status: 'ACTIVE', validUntil: '2026-12-15', mealsRemaining: 68, customerCode: 'AGM-P-402' },
    { id: 'cust_02', businessId: 'biz_mess_01', name: 'Aditya Sen', phone: '+91 98666 77889', planName: 'Lunch & Dinner Only', dietary: 'NON_VEG', status: 'ACTIVE', validUntil: '2026-12-10', mealsRemaining: 34, customerCode: 'AGM-P-403' },
    { id: 'cust_03', businessId: 'biz_mess_01', name: 'Megha Trivedi', phone: '+91 98444 88990', planName: '15-Day Flexi Pass', dietary: 'JAIN', status: 'ACTIVE', validUntil: '2026-12-05', mealsRemaining: 14, customerCode: 'AGM-P-404' }
  ],

  // 10. MESS WEEKLY MENU
  messMenu: {
    Monday: {
      breakfast: 'Poha with Sev, Boiled Eggs / Banana, Masala Tea',
      lunch: 'Rajma Masala, Steamed Basmati Rice, Tawa Roti, Mix Veg Raita, Salad',
      dinner: 'Shahi Paneer / Chicken Curry, Dal Tadka, Phulka, Rice, Gulab Jamun'
    },
    Tuesday: {
      breakfast: 'Aloo Paratha with Curd & Pickle, Fresh Tea',
      lunch: 'Kadhi Pakora, Jeera Rice, Phulka, Aloo Bhindi, Fresh Kachumber Salad',
      dinner: 'Mix Veg Korma, Dal Makhani, Jeera Rice, Tandoori Roti, Rice Kheer'
    },
    Wednesday: {
      breakfast: 'Idli Sambar with Coconut Chutney, Filter Coffee / Tea',
      lunch: 'Chole Masala, Amritsari Bhature / Rice, Green Salad, Chaas',
      dinner: 'Matar Paneer / Egg Curry, Yellow Moong Dal, Chapati, Steamed Rice'
    },
    Thursday: {
      breakfast: 'Methi Thepla with Chutney, Boiled Sprouts, Tea',
      lunch: 'Dal Fry, Baingan Bharta, Tawa Roti, Steamed Rice, Roasted Papad',
      dinner: 'Paneer Butter Masala, Veg Pulao, Dal Fry, Roti, Vanilla Ice Cream'
    },
    Friday: {
      breakfast: 'Veg Grilled Sandwich / Masala Omelette, Tea / Coffee',
      lunch: 'Dum Aloo, Dal Tadka, Steamed Rice, Chapati, Boondi Raita',
      dinner: 'Veg Dum Biryani / Chicken Biryani, Mirchi ka Salan, Onion Raita'
    },
    Saturday: {
      breakfast: 'Uttapam with Sambar & Coconut Chutney, Tea',
      lunch: 'Kashmiri Pulao, Dal Makhani, Tawa Roti, Cucumber Salad',
      dinner: 'Sev Tamatar, Yellow Dal Fry, Phulka, Rice, Suji Halwa'
    },
    Sunday: {
      breakfast: 'Poori Bhaji with Sweet Lassi',
      lunch: 'Sunday Feast: Paneer Lababdar / Butter Chicken, Butter Naan, Jeera Rice',
      dinner: 'Comfort Dinner: Moong Dal Khichdi, Fresh Dahi, Achar & Papad'
    }
  },

  // 11. MESS INVENTORY
  messInventory: [
    { id: 'inv_01', businessId: 'biz_mess_01', item: 'Basmati Rice', category: 'GRAINS', currentQty: 180, unit: 'kg', reorderLevel: 50, status: 'SUFFICIENT' },
    { id: 'inv_02', businessId: 'biz_mess_01', item: 'Atta (Whole Wheat Flour)', category: 'GRAINS', currentQty: 240, unit: 'kg', reorderLevel: 80, status: 'SUFFICIENT' },
    { id: 'inv_03', businessId: 'biz_mess_01', item: 'Toor Dal', category: 'PULSES', currentQty: 45, unit: 'kg', reorderLevel: 40, status: 'LOW_STOCK' },
    { id: 'inv_04', businessId: 'biz_mess_01', item: 'Cooking Oil (Mustard & Sunflower)', category: 'OILS', currentQty: 60, unit: 'Liters', reorderLevel: 30, status: 'SUFFICIENT' },
    { id: 'inv_05', businessId: 'biz_mess_01', item: 'Fresh Paneer', category: 'DAIRY', currentQty: 8, unit: 'kg', reorderLevel: 10, status: 'LOW_STOCK' },
    { id: 'inv_06', businessId: 'biz_mess_01', item: 'Potatoes & Onions', category: 'VEGETABLES', currentQty: 110, unit: 'kg', reorderLevel: 40, status: 'SUFFICIENT' }
  ],

  // 12. MESS FOOD WASTAGE LOGS
  messWastage: [
    { id: 'WST-2026-11-21', businessId: 'biz_mess_01', date: '2026-11-21', meal: 'Dinner', wastedKg: 3.8, reason: 'Weekend resident outings', auditedBy: 'Chef Naresh' },
    { id: 'WST-2026-11-20', businessId: 'biz_mess_01', date: '2026-11-20', meal: 'Lunch', wastedKg: 1.9, reason: 'Optimal batch preparation', auditedBy: 'Chef Naresh' },
    { id: 'WST-2026-11-19', businessId: 'biz_mess_01', date: '2026-11-19', meal: 'Dinner', wastedKg: 2.4, reason: 'Extra gravy prepared', auditedBy: 'Chef Naresh' }
  ],

  // 13. MESS MEAL ATTENDANCE PUNCHES
  messAttendancePunches: [
    { id: 'PCH-01', businessId: 'biz_mess_01', customerId: 'cust_01', customerName: 'Priya Iyer', mealType: 'BREAKFAST', punchedAt: '08:15 AM' },
    { id: 'PCH-02', businessId: 'biz_mess_01', customerId: 'cust_02', customerName: 'Aditya Sen', mealType: 'BREAKFAST', punchedAt: '08:45 AM' },
    { id: 'PCH-03', businessId: 'biz_mess_01', customerId: 'cust_01', customerName: 'Priya Iyer', mealType: 'LUNCH', punchedAt: '01:10 PM' }
  ]
};

export const CLEAN_LIVE_DATA = {
  businesses: {},
  pgProperties: [],
  pgRooms: [],
  pgBeds: [],
  pgResidents: [],
  applications: [],
  pgInvoices: [],
  pgComplaints: [],
  pgLeaveRequests: [],
  messMealPlans: [],
  messCustomers: [],
  messMenu: {
    Monday: { breakfast: 'Poha, Boiled Eggs / Banana, Tea', lunch: 'Rajma Masala, Steamed Rice, Roti, Salad', dinner: 'Mix Veg, Dal Tadka, Roti, Kheer', special: 'Kheer' },
    Tuesday: { breakfast: 'Aloo Paratha, Curd, Pickle, Tea', lunch: 'Kadhi Pakora, Jeera Rice, Phulka', dinner: 'Paneer Butter Masala, Roti, Dal Fry', special: 'Paneer Butter Masala' },
    Wednesday: { breakfast: 'Idli Sambar, Coconut Chutney, Coffee', lunch: 'Chole Bhature / Rice, Green Salad', dinner: 'Aloo Gobi, Yellow Dal, Roti, Gulab Jamun', special: 'Gulab Jamun' },
    Thursday: { breakfast: 'Vegetable Upma, Boiled Chana, Tea', lunch: 'Dal Makhani, Jeera Rice, Tandoori Roti', dinner: 'Kofta Curry, Roti, Steamed Rice', special: 'Dal Makhani' },
    Friday: { breakfast: 'Masala Dosa, Sambar, Chutney, Tea', lunch: 'Egg Curry / Paneer Do Pyaza, Rice, Roti', dinner: 'Veg Biryani, Boondi Raita, Roasted Papad', special: 'Veg Dum Biryani' },
    Saturday: { breakfast: 'Puri Bhaji, Halwa, Masala Chai', lunch: 'Black Chana Curry, Steamed Rice, Roti', dinner: 'Mushroom Matar, Dal Tadka, Roti', special: 'Suji Halwa' },
    Sunday: { breakfast: 'Bread Omelette / Veg Cutlet, Tea', lunch: 'Special Sunday Thali, Gulab Jamun', dinner: 'Light Khichdi / Roti Sabzi, Curd', special: 'Sunday Feast' }
  },
  messInventory: [],
  messWastage: [],
  messAttendancePunches: []
};

export function DataProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('vanguard_data_mode') || 'LIVE';
  });

  const [data, setData] = useState(() => {
    const savedMode = localStorage.getItem('vanguard_data_mode') || 'LIVE';
    const storageKey = savedMode === 'DEMO' ? 'vanguard_demo_data_store' : 'vanguard_live_data_store';
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return savedMode === 'DEMO' ? INITIAL_DATA : CLEAN_LIVE_DATA;
      }
    }
    return savedMode === 'DEMO' ? INITIAL_DATA : CLEAN_LIVE_DATA;
  });

  useEffect(() => {
    const storageKey = mode === 'DEMO' ? 'vanguard_demo_data_store' : 'vanguard_live_data_store';
    localStorage.setItem(storageKey, JSON.stringify(data));
    localStorage.setItem('vanguard_data_mode', mode);
  }, [data, mode]);

  // SWITCH TO DEMO MODE (LOAD REALISTIC PRE-FILLED DATA)
  const loadDemoData = () => {
    setMode('DEMO');
    setData(INITIAL_DATA);
    localStorage.setItem('vanguard_data_mode', 'DEMO');
    localStorage.setItem('vanguard_demo_data_store', JSON.stringify(INITIAL_DATA));
  };

  // SWITCH TO LIVE MODE (CLEAN SLATE WITH NO PRE-SAVED DATA)
  const startCleanLiveMode = () => {
    setMode('LIVE');
    setData(CLEAN_LIVE_DATA);
    localStorage.setItem('vanguard_data_mode', 'LIVE');
    localStorage.setItem('vanguard_live_data_store', JSON.stringify(CLEAN_LIVE_DATA));
  };

  // RESET CURRENT DATA
  const resetDemoData = () => {
    if (mode === 'DEMO') {
      setData(INITIAL_DATA);
    } else {
      setData(CLEAN_LIVE_DATA);
    }
  };

  // DYNAMICALLY CREATE NEW BUSINESS (PG OR MESS)
  const createBusiness = (newBusiness) => {
    setData(prev => {
      const updatedBusinesses = {
        ...prev.businesses,
        [newBusiness.id]: newBusiness
      };

      // In pure LIVE mode, start 100% clean with zero pre-saved properties/rooms/plans
      // The PG/Mess owner sets up their properties, rooms, beds, and plans themselves via the interactive UI!
      if (mode === 'LIVE') {
        return {
          ...prev,
          businesses: updatedBusinesses
        };
      }

      // If PG in DEMO: create starter property and room
      if (newBusiness.type === 'PG') {
        const propId = `prop_${Date.now()}`;
        const newProperty = {
          id: propId,
          businessId: newBusiness.id,
          name: `${newBusiness.name} - Main Building`,
          code: 'MAIN-1',
          address: newBusiness.address,
          totalFloors: 3,
          totalRooms: 6,
          totalBeds: 12,
          manager: 'Operations Desk'
        };
        const rmId1 = `rm_${Date.now()}_1`;
        const rmId2 = `rm_${Date.now()}_2`;
        const initialRooms = [
          { id: rmId1, propertyId: propId, floor: '1st Floor', roomNumber: '101', type: 'DOUBLE_SHARING', rent: 8000, attachedBath: true },
          { id: rmId2, propertyId: propId, floor: '1st Floor', roomNumber: '102', type: 'DOUBLE_SHARING', rent: 8000, attachedBath: true }
        ];
        const initialBeds = [
          { id: `bed_${Date.now()}_1`, roomId: rmId1, bedNumber: '101-A', status: 'VACANT', residentName: null, residentId: null },
          { id: `bed_${Date.now()}_2`, roomId: rmId1, bedNumber: '101-B', status: 'VACANT', residentName: null, residentId: null },
          { id: `bed_${Date.now()}_3`, roomId: rmId2, bedNumber: '102-A', status: 'VACANT', residentName: null, residentId: null },
          { id: `bed_${Date.now()}_4`, roomId: rmId2, bedNumber: '102-B', status: 'VACANT', residentName: null, residentId: null }
        ];

        return {
          ...prev,
          businesses: updatedBusinesses,
          pgProperties: [newProperty, ...prev.pgProperties],
          pgRooms: [...initialRooms, ...prev.pgRooms],
          pgBeds: [...initialBeds, ...prev.pgBeds]
        };
      }

      // If Mess: create initial starter meal plans
      if (newBusiness.type === 'MESS') {
        const starterPlans = [
          { id: `mp_${Date.now()}_1`, businessId: newBusiness.id, name: 'Full Board (3 Meals)', type: 'MONTHLY', meals: 'Breakfast + Lunch + Dinner', price: 4000, activeSubscribers: 0 },
          { id: `mp_${Date.now()}_2`, businessId: newBusiness.id, name: 'Lunch & Dinner Package', type: 'MONTHLY', meals: 'Lunch + Dinner', price: 3200, activeSubscribers: 0 }
        ];
        return {
          ...prev,
          businesses: updatedBusinesses,
          messMealPlans: [...starterPlans, ...prev.messMealPlans]
        };
      }

      return {
        ...prev,
        businesses: updatedBusinesses
      };
    });
  };

  // QR Revoke and Regenerate
  const regenerateQr = (businessId) => {
    const randomHex = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
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

  // Applications & Approval
  const approveApplication = (applicationId, reviewNotes = '') => {
    setData(prev => {
      const app = prev.applications.find(a => a.id === applicationId);
      if (!app) return prev;

      const updatedApps = prev.applications.map(a =>
        a.id === applicationId ? { ...a, status: 'APPROVED', reviewNotes, reviewedAt: new Date().toISOString() } : a
      );

      // Auto-provision PG Resident
      if (app.type === 'PG_STUDENT') {
        const newResident = {
          id: `res_${Date.now()}`,
          businessId: app.businessId,
          name: app.applicantName,
          phone: app.phone,
          email: app.email,
          status: 'ACTIVE',
          roomNumber: 'Unassigned',
          bedNumber: 'Pending Allocation',
          property: 'Main Building',
          joiningDate: app.requestedJoiningDate || new Date().toISOString().split('T')[0],
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

      // Auto-provision Mess Subscriber
      if (app.type === 'MESS_CUSTOMER') {
        const newCustomer = {
          id: `cust_${Date.now()}`,
          businessId: app.businessId,
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

  const submitApplication = (applicationData) => {
    const newId = `APP-${Date.now().toString().slice(-5)}`;
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

  // PG Inventory Operations
  const addProperty = (newProperty) => {
    const prop = {
      id: `prop_${Date.now()}`,
      ...newProperty
    };
    setData(prev => ({ ...prev, pgProperties: [...prev.pgProperties, prop] }));
  };

  const addRoom = (newRoom) => {
    const rmId = `rm_${Date.now()}`;
    const room = { id: rmId, ...newRoom };
    const bedsToAdd = [];
    const count = newRoom.type === 'SINGLE' ? 1 : newRoom.type === 'DOUBLE_SHARING' ? 2 : 3;
    const suffixes = ['A', 'B', 'C'];
    for (let i = 0; i < count; i++) {
      bedsToAdd.push({
        id: `bed_${newRoom.roomNumber}_${suffixes[i]}_${Date.now()}`,
        roomId: rmId,
        bedNumber: `${newRoom.roomNumber}-${suffixes[i]}`,
        status: 'VACANT',
        residentName: null,
        residentId: null
      });
    }
    setData(prev => ({
      ...prev,
      pgRooms: [...prev.pgRooms, room],
      pgBeds: [...prev.pgBeds, ...bedsToAdd]
    }));
  };

  const allocateBed = (bedId, residentId, residentName) => {
    setData(prev => ({
      ...prev,
      pgBeds: prev.pgBeds.map(b =>
        b.id === bedId ? { ...b, status: 'OCCUPIED', residentId, residentName } : b
      ),
      pgResidents: prev.pgResidents.map(r => {
        if (r.id === residentId) {
          const bed = prev.pgBeds.find(b => b.id === bedId);
          return {
            ...r,
            roomNumber: bed ? bed.bedNumber.split('-')[0] : r.roomNumber,
            bedNumber: bed ? bed.bedNumber : r.bedNumber
          };
        }
        return r;
      })
    }));
  };

  const vacateBed = (bedId) => {
    setData(prev => ({
      ...prev,
      pgBeds: prev.pgBeds.map(b =>
        b.id === bedId ? { ...b, status: 'VACANT', residentId: null, residentName: null } : b
      )
    }));
  };

  // PG Billing & Invoices
  const recordPayment = (invoiceId) => {
    setData(prev => ({
      ...prev,
      pgInvoices: prev.pgInvoices.map(inv =>
        inv.id === invoiceId ? { ...inv, status: 'PAID', paidDate: new Date().toISOString().split('T')[0] } : inv
      )
    }));
  };

  const generateMonthlyInvoices = (monthName = 'December 2026', businessId = 'biz_pg_01') => {
    const occupied = data.pgBeds.filter(b => b.status === 'OCCUPIED');
    const newInvoices = occupied.map((b) => ({
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      businessId,
      residentId: b.residentId,
      residentName: b.residentName,
      room: b.bedNumber,
      month: monthName,
      amount: 8500,
      dueDate: '2026-12-05',
      status: 'UNPAID',
      paidDate: null
    }));
    setData(prev => ({ ...prev, pgInvoices: [...newInvoices, ...prev.pgInvoices] }));
  };

  // PG Complaints & Maintenance
  const addComplaint = (complaint) => {
    const newCmp = {
      ...complaint,
      id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'OPEN'
    };
    setData(prev => ({ ...prev, pgComplaints: [newCmp, ...prev.pgComplaints] }));
  };

  const updateComplaintStatus = (complaintId, newStatus) => {
    setData(prev => ({
      ...prev,
      pgComplaints: prev.pgComplaints.map(c =>
        c.id === complaintId ? { ...c, status: newStatus } : c
      )
    }));
  };

  // PG Leave Approvals
  const approveLeave = (leaveId) => {
    setData(prev => ({
      ...prev,
      pgLeaveRequests: prev.pgLeaveRequests.map(l =>
        l.id === leaveId ? { ...l, status: 'APPROVED', parentContacted: true } : l
      )
    }));
  };

  const rejectLeave = (leaveId) => {
    setData(prev => ({
      ...prev,
      pgLeaveRequests: prev.pgLeaveRequests.map(l =>
        l.id === leaveId ? { ...l, status: 'REJECTED' } : l
      )
    }));
  };

  // Mess Operations
  const addMealPlan = (newPlan) => {
    const plan = {
      id: `mp_${Date.now()}`,
      activeSubscribers: 0,
      ...newPlan
    };
    setData(prev => ({ ...prev, messMealPlans: [...prev.messMealPlans, plan] }));
  };

  const updateMenuDay = (day, mealType, text) => {
    setData(prev => ({
      ...prev,
      messMenu: {
        ...prev.messMenu,
        [day]: {
          ...prev.messMenu[day],
          [mealType]: text
        }
      }
    }));
  };

  const punchMealAttendance = (customerId, customerName, mealType) => {
    const alreadyPunched = data.messAttendancePunches.some(
      p => p.customerId === customerId && p.mealType === mealType
    );
    if (alreadyPunched) {
      return { success: false, error: `Customer has already punched attendance for ${mealType} today!` };
    }
    const newPunch = {
      id: `PCH-${Date.now().toString().slice(-4)}`,
      customerId,
      customerName,
      mealType,
      punchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setData(prev => ({
      ...prev,
      messAttendancePunches: [newPunch, ...prev.messAttendancePunches]
    }));
    return { success: true, message: `Punch recorded for ${mealType}` };
  };

  const updateStock = (itemId, changeQty) => {
    setData(prev => ({
      ...prev,
      messInventory: prev.messInventory.map(item => {
        if (item.id === itemId) {
          const newQty = Math.max(0, item.currentQty + changeQty);
          return {
            ...item,
            currentQty: newQty,
            status: newQty <= item.reorderLevel ? 'LOW_STOCK' : 'SUFFICIENT'
          };
        }
        return item;
      })
    }));
  };

  const addInventoryItem = (newItem) => {
    const item = {
      id: `inv_${Date.now()}`,
      status: newItem.currentQty <= newItem.reorderLevel ? 'LOW_STOCK' : 'SUFFICIENT',
      ...newItem
    };
    setData(prev => ({ ...prev, messInventory: [...prev.messInventory, item] }));
  };

  const logWastage = (meal, wastedKg, reason, auditedBy = 'Chef Naresh') => {
    const entry = {
      id: `WST-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      meal,
      wastedKg: parseFloat(wastedKg),
      reason,
      auditedBy
    };
    setData(prev => ({ ...prev, messWastage: [entry, ...prev.messWastage] }));
  };

  return (
    <DataContext.Provider
      value={{
        data,
        mode,
        setMode,
        loadDemoData,
        startCleanLiveMode,
        createBusiness,
        resetDemoData,
        regenerateQr,
        approveApplication,
        rejectApplication,
        submitApplication,
        addProperty,
        addRoom,
        allocateBed,
        vacateBed,
        recordPayment,
        generateMonthlyInvoices,
        addComplaint,
        updateComplaintStatus,
        approveLeave,
        rejectLeave,
        addMealPlan,
        updateMenuDay,
        punchMealAttendance,
        updateStock,
        addInventoryItem,
        logWastage
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
