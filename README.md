# Vanguard Manager

**"Smart Management. Simplified Operations."**

Vanguard Manager is a production-grade multi-tenant SaaS platform engineered specifically for two distinct business verticals:
1. **PG (Paying Guest) Management**
2. **Mess (Dining / Tiffin) Management**

It also delivers a dedicated, responsive **Student / Customer Self-Registration & Resident Portal** powered by secure, business-specific QR codes.

---

## ⚠️ Important Product Distinction

> **Vanguard Manager is strictly an operational SaaS management platform.**
> It is **NOT** a PG discovery marketplace, property-booking directory, or accommodation-finding platform.
> Students and customers register with a PG or Mess they have already joined or been instructed to join via the business's unique, cryptographically generated QR code.
> The PG and Mess management workflows are completely isolated from each other.

---

## 🏛️ System Architecture Overview

The system is structured as three independent portals sharing a unified design language and rock-solid security foundation:

```
+-------------------------------------------------------------------------+
|                        Vanguard Manager Platform                        |
+-------------------------------------------------------------------------+
         |                                |                       |
         v                                v                       v
+------------------+            +-------------------+   +--------------------+
|   PG Portal      |            |    Mess Portal    |   |  Resident/Customer |
|  (Blue Accent)   |            |   (Green Accent)  |   | (Purple Accent/QR) |
+------------------+            +-------------------+   +--------------------+
| - Properties     |            | - Meal Plans      |   | - Self-Registration|
| - Floors & Rooms |            | - Menu Planning   |   | - Mobile OTP Verif |
| - Beds & Allocs  |            | - Subscriptions   |   | - Room/Meal Status |
| - Rent & Bills   |            | - Meal Attendance |   | - Leave Requests   |
| - Attendance     |            | - Inventory & Wast|   | - Invoices & Pay   |
| - Complaints     |            | - Kitchen & Staff |   | - Complaints       |
| - Registration QR|            | - Registration QR |   | - Approval Tracking|
+------------------+            +-------------------+   +--------------------+
         \                                |                      /
          \                               |                     /
           +------------------------------+--------------------+
                                          |
                                          v
                         +----------------------------------+
                         |     Node.js + Express API        |
                         |  (Tenant Isolation & Auth RBAC)  |
                         +----------------------------------+
                                          |
                                          v
                         +----------------------------------+
                         |      PostgreSQL + Prisma         |
                         +----------------------------------+
```

---

## 🚀 Quick Start (Development)

### Prerequisites
- **Node.js**: v18+ (tested on v24.13.1)
- **npm**: v9+ (tested on v11.8.0)
- **Git**

### 1. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The application will launch at `http://localhost:5173`.

### 2. Frontend Production Build
```bash
cd client
npm run build
```

---

## 📂 Project Structure

```
Vanguard Manager/
├── client/                     # Frontend (React, Vite, Tailwind CSS, React Router)
│   ├── public/                 # Static assets, branding icons
│   ├── src/
│   │   ├── components/         # Shared UI & design system components
│   │   │   ├── common/         # Buttons, Cards, Badges, Modals, Inputs
│   │   │   └── layout/         # Navigation, Header, Footer, Sidebar layouts
│   │   ├── pages/              # Portal views & landing page
│   │   │   ├── public/         # Landing, About, Features, Contact, Portal Gateway
│   │   │   ├── pg/             # PG Management Portal pages
│   │   │   ├── mess/           # Mess Management Portal pages
│   │   │   └── resident/       # Student/Customer QR registration & resident dashboard
│   │   ├── routes/             # React Router route definitions
│   │   ├── styles/             # Tailwind & CSS custom utilities
│   │   ├── App.jsx             # Main application component & providers
│   │   └── main.jsx            # Entry point
│   ├── index.html              # HTML shell with meta tags & fonts
│   ├── tailwind.config.js      # Color tokens (PG Blue, Mess Green, Resident Purple)
│   └── vite.config.js          # Vite configuration
├── server/                     # Backend API (Node.js, Express, Prisma) - Phase 4+
├── docs/                       # Architecture and technical design documentation
│   ├── PROJECT_ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   ├── SECURITY.md
│   ├── PRIVACY.md
│   ├── DEVELOPMENT_PROGRESS.md
│   └── DEPLOYMENT.md
└── README.md
```

---

## 🛡️ Security Highlights
- Strict Multi-Tenant Isolation enforced server-side via `businessId`.
- Unguessable, cryptographic QR tokens with expiration and instant revocation.
- Zero-exposure identity policy: no public document URLs, no full Aadhaar collection.
- OWASP Top 10 baseline security standards.

---

## 📄 License
Proprietary & Confidential - Vanguard Manager SaaS Platform.
