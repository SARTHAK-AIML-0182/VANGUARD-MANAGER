import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';
import PublicFooter from '../components/layout/PublicFooter';
import LandingPage from '../pages/public/LandingPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
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

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
