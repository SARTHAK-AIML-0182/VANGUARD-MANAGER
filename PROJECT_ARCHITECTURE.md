# Vanguard Manager — Project Architecture Document

## 1. Architectural Philosophy
Vanguard Manager is engineered as a robust, scalable, multi-tenant Software-as-a-Service (SaaS) platform. The primary architectural objective is complete business-level isolation between the **PG Management** vertical and the **Mess Management** vertical, while offering a unified, friction-free **Resident/Customer Self-Registration & Portal** via secure QR code handshakes.

---

## 2. Core Architectural Pillars

### 2.1 Complete Business Vertical Separation
- **PG Management** deals with real estate, room inventory, physical bed allocations, rental contracts, maintenance tickets, and check-in/leave tracking.
- **Mess Management** deals with catering operations, meal plans, daily menus, recurring dining subscriptions, kitchen inventory, ingredient transactions, and meal punch attendance.
- **Rule**: Under no circumstances should PG features leak into the Mess console, or Mess features leak into the PG console. Database models, APIs, and UI navigation bars are strictly compartmentalized.

### 2.2 Strict Multi-Tenancy
- Every business registered on Vanguard Manager operates as an isolated tenant.
- All operational database entities (`PGProperty`, `PGBed`, `MessSubscription`, `MessMenuItem`, etc.) are linked with a mandatory foreign key `businessId`.
- Server-side middleware validates the current authenticated user's active membership against the requested tenant context.
- Object-level authorization checks prevent Insecure Direct Object References (IDOR).

### 2.3 QR-Based Cryptographic Onboarding
- Vanguard Manager does not rely on public search discovery to match residents to hostels/messes.
- Onboarding is driven by **Business Registration QR Codes**.
- The QR code contains an unguessable cryptographic token (`crypto.randomBytes(32)`), mapped to a database registration token record.
- Scanning the QR resolves the business metadata (name, business type, address, verified status) and opens the corresponding customized registration workflow.
- Direct account activation is prevented: all submissions enter `PENDING` status requiring explicit owner approval.

---

## 3. Technology Stack

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | React (v18+) with Vite | Lightning-fast HMR, component-driven modularity, small bundle size. |
| **Language** | JavaScript (ESNext) | Clean, rapid development without mixed-dialect tooling overhead, strict linting. |
| **Styling** | Tailwind CSS | Utility-first CSS ensuring strict adherence to the design system tokens without CSS bloat. |
| **Routing** | React Router v6 | Declarative client-side routing with nested layouts for independent portals. |
| **Icons** | Lucide React | Clean, uniform, tree-shakeable SVG icons. |
| **Backend Runtime** | Node.js (v20+ LTS / v24) | High-performance asynchronous non-blocking I/O. |
| **Web Framework** | Express.js | Mature, battle-tested middleware ecosystem with full control over headers, cookies, and streams. |
| **Database** | PostgreSQL | Enterprise ACID compliance, relational integrity, row-level locking, complex indexing. |
| **ORM** | Prisma ORM | Type-safe queries, migration control, relation handling, and schema sanity. |
| **Authentication** | HttpOnly Cookie Sessions / JWT | Defense-in-depth against XSS; credentials never stored in browser localStorage. |

---

## 4. Subsystem Breakdown

### 4.1 Client Architecture (`client/src/`)
```
src/
├── assets/                 # Brand SVG logos and graphics
├── components/
│   ├── common/             # Reusable Design System Primitives
│   │   ├── Button.jsx      # Primary, Secondary, Outline, Ghost, Danger variants
│   │   ├── Card.jsx        # Standardized container card with consistent shadow & border
│   │   ├── Badge.jsx       # Status badges (Pending, Approved, Active, Overdue)
│   │   ├── Input.jsx       # Accessible form inputs with label, helper, error states
│   │   └── Modal.jsx       # Accessible dialog backdrop with focus trapping
│   └── layout/             # Portal Shell Layouts
│       ├── PublicNavbar.jsx   # Main public website navigation
│       ├── PublicFooter.jsx   # Main public website footer
│       ├── PGLayout.jsx       # PG Owner/Staff dashboard wrapper (Blue Accent)
│       ├── MessLayout.jsx     # Mess Owner/Staff dashboard wrapper (Green Accent)
│       └── ResidentLayout.jsx # Resident/Customer portal wrapper (Purple Accent)
├── pages/
│   ├── public/             # Landing, Features, About, Portal Select, Contact
│   ├── pg/                 # 21 PG operational modules
│   ├── mess/               # 19 Mess operational modules
│   └── resident/           # Multi-step QR registration, Resident dashboard
├── routes/
│   └── AppRoutes.jsx       # Route declarations with independent portal trees
├── styles/
│   └── index.css           # Tailwind directives and design system variables
├── App.jsx                 # Global context providers and router container
└── main.jsx                # DOM mounting
```

### 4.2 Backend Architecture (`server/src/`)
```
src/
├── config/                 # Environment variables, CORS, rate limits
├── controllers/            # Request handlers (input sanitization, response formatting)
├── middleware/             # Auth verification, Tenant boundary validator, Error handler
├── routes/                 # Express route definitions grouped by vertical
│   ├── auth.routes.js
│   ├── business.routes.js
│   ├── pg.routes.js
│   ├── mess.routes.js
│   ├── qr.routes.js
│   └── resident.routes.js
├── services/               # Pure business logic layer (transactions, calculations)
├── validators/             # Request schema validation (Zod)
├── utils/                  # Cryptography, token generation, logging
└── prisma/                 # Prisma schema and migration scripts
```

---

## 5. Portal Visual Hierarchy & Theming
To visually reinforce boundary isolation for users operating across multiple roles, each portal features a dedicated semantic accent color:
- **PG Management Portal**: Deep Slate & Royal Indigo/Blue (`#2563EB`) — reflects stability, infrastructure, and property.
- **Mess Management Portal**: Forest & Emerald Green (`#059669`) — reflects freshness, nutrition, and dining.
- **Student / Customer Portal**: Violet & Royal Purple (`#7C3AED`) — reflects modern, friendly, student-first mobility.
- **Platform Base**: Zinc / Slate Neutrals (`#090D16`, `#F8FAFC`, `#E2E8F0`) — clean, minimalist, high legibility.
