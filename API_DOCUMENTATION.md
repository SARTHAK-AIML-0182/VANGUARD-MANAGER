# Vanguard Manager — API Specification & Route Structure

## 1. Global API Standards
- **Base URL**: `/api/v1`
- **Protocol**: HTTPS in production; JSON payloads with `Content-Type: application/json`.
- **Authentication**: Stateful session cookie with `HttpOnly`, `SameSite=Lax/Strict`, and `Secure` attributes, or signed Bearer token.
- **Tenant Context**: Determined automatically from verified session credentials and `X-Business-Id` header (validated against user's verified business memberships).

### Standard Response Envelope
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "meta": {
    "timestamp": "2026-11-22T03:25:31.000Z",
    "requestId": "req_88f7b3a9c"
  }
}
```

### Standard Error Envelope
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested property bed was not found in this business scope."
  },
  "meta": {
    "timestamp": "2026-11-22T03:25:31.000Z",
    "requestId": "req_88f7b3a9c"
  }
}
```

---

## 2. Route Groups

### 2.1 Authentication & Profile (`/api/v1/auth`)
| Method | Route | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Register business owner / staff user | Public |
| `POST` | `/login` | Password-based authentication | Public (Rate-limited) |
| `POST` | `/otp/send` | Dispatch OTP for phone verification | Public (Strict rate limit) |
| `POST` | `/otp/verify` | Verify submitted OTP code | Public |
| `POST` | `/logout` | Invalidate active session & clear cookies | Authenticated |
| `GET` | `/me` | Get authenticated user context & memberships | Authenticated |

### 2.2 QR & Self-Registration Engine (`/api/v1/qr` & `/api/v1/registrations`)
| Method | Route | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/qr/generate` | Generate fresh business QR code token | Business Owner |
| `GET` | `/qr/active` | Retrieve current active business QR token | Business Owner/Staff |
| `POST` | `/qr/revoke` | Revoke & invalidate compromised QR token | Business Owner |
| `GET` | `/qr/resolve/:token` | Validate token and fetch business public card | Public |
| `POST` | `/registrations/submit` | Submit resident/customer registration form | Public (Token validated) |
| `GET` | `/registrations` | List pending applications for owner | Business Owner/Staff |
| `GET` | `/registrations/:id` | View full application & attached proofs | Business Owner/Staff |
| `POST` | `/registrations/:id/approve` | Approve application & provision account | Business Owner |
| `POST` | `/registrations/:id/reject` | Reject application with reason | Business Owner |

### 2.3 PG Management Modules (`/api/v1/pg`)
| Route Subtree | Key Endpoints | Responsibilities |
| :--- | :--- | :--- |
| `/properties` | `GET, POST /`, `GET, PUT, DELETE /:id` | Building properties & facilities |
| `/floors` | `GET, POST /`, `PUT, DELETE /:id` | Floor configurations per property |
| `/rooms` | `GET, POST /`, `PUT, DELETE /:id` | Room capacities and bathroom types |
| `/beds` | `GET, POST /`, `PUT /:id/status` | Bed inventory, occupancy status |
| `/residents` | `GET /`, `GET /:id`, `PUT /:id/checkout`| Resident directory & emergency info |
| `/allocations` | `POST /assign`, `POST /vacate` | Bed assignment lifecycle |
| `/invoices` | `GET, POST /`, `GET /:id` | Rental bills and utility generation |
| `/payments` | `POST /record`, `GET /history` | Payment reconciliations |
| `/attendance` | `GET /today`, `POST /mark` | Resident presence check |
| `/leaves` | `GET /`, `PUT /:id/approve` | Resident leave approvals |
| `/complaints` | `GET /`, `PUT /:id/status` | Maintenance ticket resolution |

### 2.4 Mess Management Modules (`/api/v1/mess`)
| Route Subtree | Key Endpoints | Responsibilities |
| :--- | :--- | :--- |
| `/plans` | `GET, POST /`, `PUT, DELETE /:id` | Meal plan configuration & pricing |
| `/subscriptions`| `GET /`, `POST /activate`, `PUT /:id/pause`| Customer dining passes |
| `/menus` | `GET /weekly`, `PUT /update` | Daily menu schedules & meals |
| `/attendance` | `POST /punch`, `GET /daily-summary`| Meal punch recording (Unique check) |
| `/inventory` | `GET /`, `POST /items`, `POST /transact`| Stock items and ingredient levels |
| `/wastage` | `POST /log`, `GET /trends` | Food wastage tracking |
| `/feedback` | `GET /recent`, `GET /analytics` | Customer food ratings |
| `/expenses` | `GET, POST /` | Kitchen grocery & utility costs |

### 2.5 Resident Portal (`/api/v1/resident`)
| Method | Route | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/profile` | Current resident / customer profile | Resident (Self only) |
| `GET` | `/accommodation` | Assigned room, bed, and property rules | PG Resident |
| `GET` | `/subscription` | Active meal plan and remaining punches | Mess Customer |
| `GET` | `/invoices` | My bills and payment receipts | Resident (Self only) |
| `POST` | `/complaints` | File maintenance or food complaint | Resident (Self only) |
| `POST` | `/leave` | Submit leave application | PG Resident |
| `GET` | `/attendance` | Personal attendance history | Resident (Self only) |
