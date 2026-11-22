import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicNavbar from '../components/layout/PublicNavbar';
import PublicFooter from '../components/layout/PublicFooter';
import PGLayout from '../components/layout/PGLayout';
import MessLayout from '../components/layout/MessLayout';
import ResidentLayout from '../components/layout/ResidentLayout';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import QRRegistrationResolver from '../pages/resident/QRRegistrationResolver';

// PG Pages
import PGDashboard from '../pages/pg/PGDashboard';
import PGRegistrations from '../pages/pg/PGRegistrations';
import PGProperties from '../pages/pg/PGProperties';
import PGStudents from '../pages/pg/PGStudents';
import PGInvoices from '../pages/pg/PGInvoices';
import PGAttendance from '../pages/pg/PGAttendance';
import PGComplaints from '../pages/pg/PGComplaints';
import PGQrCode from '../pages/pg/PGQrCode';
import PGStaff from '../pages/pg/PGStaff';
import PGExpenses from '../pages/pg/PGExpenses';
import PGReports from '../pages/pg/PGReports';
import PGGenericModule from '../pages/pg/PGGenericModule';

// Mess Pages
import MessDashboard from '../pages/mess/MessDashboard';
import MessRegistrations from '../pages/mess/MessRegistrations';
import MessMealPlans from '../pages/mess/MessMealPlans';
import MessMenu from '../pages/mess/MessMenu';
import MessInventory from '../pages/mess/MessInventory';
import MessWastage from '../pages/mess/MessWastage';
import MessQrCode from '../pages/mess/MessQrCode';
import MessStaff from '../pages/mess/MessStaff';
import MessExpenses from '../pages/mess/MessExpenses';
import MessReports from '../pages/mess/MessReports';
import MessFeedback from '../pages/mess/MessFeedback';
import MessGenericModule from '../pages/mess/MessGenericModule';

// Resident Pages
import ResidentDashboard from '../pages/resident/ResidentDashboard';
import ResidentStay from '../pages/resident/ResidentStay';
import ResidentPayments from '../pages/resident/ResidentPayments';
import ResidentAttendance from '../pages/resident/ResidentAttendance';
import ResidentLeave from '../pages/resident/ResidentLeave';
import ResidentComplaints from '../pages/resident/ResidentComplaints';
import ResidentProfile from '../pages/resident/ResidentProfile';

export function AppRoutes() {
  return (
    <Routes>
      {/* 1. PUBLIC WEBSITE */}
      <Route
        path="/"
        element={
          <div className="flex flex-col min-h-screen">
            <PublicNavbar />
            <main className="flex-grow">
              <LandingPage />
            </main>
            <PublicFooter />
          </div>
        }
      />

      {/* 2. QR REGISTRATION FLOW (BUSINESS-SPECIFIC RESOLVER) */}
      <Route path="/register" element={<QRRegistrationResolver />} />

      {/* 3. PG MANAGEMENT PORTAL (21 MODULES) */}
      <Route path="/pg" element={<PGLayout />}>
        <Route index element={<PGDashboard />} />
        <Route path="profile" element={<PGGenericModule title="Business Profile" subtitle="Manage business registration and tax details" />} />
        <Route path="properties" element={<PGProperties />} />
        <Route path="floors" element={<PGGenericModule title="Floor Configurations" subtitle="Manage building floor layouts and wings" />} />
        <Route path="rooms" element={<PGProperties />} />
        <Route path="beds" element={<PGProperties />} />
        <Route path="registrations" element={<PGRegistrations />} />
        <Route path="students" element={<PGStudents />} />
        <Route path="allocations" element={<PGProperties />} />
        <Route path="attendance" element={<PGAttendance />} />
        <Route path="leaves" element={<PGAttendance />} />
        <Route path="invoices" element={<PGInvoices />} />
        <Route path="payments" element={<PGInvoices />} />
        <Route path="complaints" element={<PGComplaints />} />
        <Route path="maintenance" element={<PGComplaints />} />
        <Route path="staff" element={<PGStaff />} />
        <Route path="expenses" element={<PGExpenses />} />
        <Route path="vendors" element={<PGGenericModule title="Vendors & Supplies" subtitle="Manage maintenance contractors and suppliers" />} />
        <Route path="reports" element={<PGReports />} />
        <Route path="qr-code" element={<PGQrCode />} />
        <Route path="settings" element={<PGGenericModule title="PG Platform Settings" subtitle="Configure notification preferences and curfew rules" />} />
      </Route>

      {/* 4. MESS MANAGEMENT PORTAL (19 MODULES) */}
      <Route path="/mess" element={<MessLayout />}>
        <Route index element={<MessDashboard />} />
        <Route path="profile" element={<MessGenericModule title="Mess Business Profile" subtitle="Manage commercial dining license and location" />} />
        <Route path="registrations" element={<MessRegistrations />} />
        <Route path="customers" element={<MessGenericModule title="Customer Directory" subtitle="Active dining customer records and dietary notes" />} />
        <Route path="plans" element={<MessMealPlans />} />
        <Route path="subscriptions" element={<MessMealPlans />} />
        <Route path="menus" element={<MessMenu />} />
        <Route path="attendance" element={<MessGenericModule title="Meal Attendance Punches" subtitle="Live dining punch logger and duplicate punch preventer" />} />
        <Route path="inventory" element={<MessInventory />} />
        <Route path="stock" element={<MessInventory />} />
        <Route path="purchases" element={<MessGenericModule title="Grocery Purchases" subtitle="Invoices from vegetable and grain wholesale vendors" />} />
        <Route path="vendors" element={<MessGenericModule title="Kitchen Vendors" subtitle="Dairy, grocery, and gas supplier contacts" />} />
        <Route path="kitchen" element={<MessGenericModule title="Kitchen Management" subtitle="Cook shifts, gas usage, and hygiene audits" />} />
        <Route path="wastage" element={<MessWastage />} />
        <Route path="staff" element={<MessStaff />} />
        <Route path="expenses" element={<MessExpenses />} />
        <Route path="reports" element={<MessReports />} />
        <Route path="feedback" element={<MessFeedback />} />
        <Route path="qr-code" element={<MessQrCode />} />
        <Route path="settings" element={<MessGenericModule title="Mess Settings" subtitle="Meal window timings and subscription rules" />} />
      </Route>

      {/* 5. STUDENT & CUSTOMER RESIDENT PORTAL */}
      <Route path="/resident" element={<ResidentLayout />}>
        <Route index element={<ResidentDashboard />} />
        <Route path="stay" element={<ResidentStay />} />
        <Route path="payments" element={<ResidentPayments />} />
        <Route path="attendance" element={<ResidentAttendance />} />
        <Route path="leave" element={<ResidentLeave />} />
        <Route path="complaints" element={<ResidentComplaints />} />
        <Route path="profile" element={<ResidentProfile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
