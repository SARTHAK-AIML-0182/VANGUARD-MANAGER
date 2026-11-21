# Vanguard Manager — Security Architecture & Threat Mitigation

## 1. Security Baseline & Philosophy
Vanguard Manager handles tenant business data, financial transactions, resident accommodation records, and emergency contact details. Security is a non-negotiable architectural pillar built on **Defense in Depth** and compliance with **OWASP Top 10**.

---

## 2. Threat Modeling & Controls Matrix

| Threat Category | Potential Vector | Vanguard Manager Control |
| :--- | :--- | :--- |
| **Broken Access Control (OWASP #1)** | Tenant cross-access (PG accessing another PG or Mess accessing PG) | Mandatory `businessId` tenancy scope verification in every query. Role-based access control (RBAC) enforced in backend middleware, never relying on UI visibility alone. |
| **Cryptographic Failures (OWASP #2)** | Insecure password storage, QR token prediction | Passwords hashed using Argon2id / bcrypt. QR codes use 256-bit entropy tokens (`crypto.randomBytes(32)`), stored as SHA-256 hashes in DB. |
| **Injection (OWASP #3)** | SQL Injection, XSS | Parameterized queries guaranteed via Prisma ORM. No raw string interpolation in SQL. React JSX automatic context-aware escaping. |
| **Insecure Design (OWASP #4)** | Auto-activating registrations or unverified residents | Two-phase onboarding: QR scan -> Mobile OTP verification -> Application Submission (`PENDING`) -> Manual Owner Review -> Activation. |
| **Security Misconfiguration (OWASP #5)** | Stack traces leaked to users, lax CORS | Express error handler strips stack traces in non-dev environments. Helmet headers configured (CSP, HSTS, X-Content-Type-Options, X-Frame-Options). |
| **Vulnerable Components (OWASP #6)** | Outdated dependencies | Regular `npm audit` scans; zero-tolerance for known critical CVEs. |
| **Identification & Auth Failures (OWASP #7)** | Brute force login / OTP flooding | Express rate limiting on auth endpoints (5 attempts per minute per IP/phone). Constant-time OTP comparison. Max 3 OTP retry attempts. |
| **Software & Data Integrity (OWASP #8)** | Malicious file upload / executable execution | Strict file MIME validation, randomized storage paths outside web root, file size quotas (e.g. max 5MB), never executing uploaded files. |
| **Logging & Monitoring Failures (OWASP #9)**| Missing accountability for sensitive changes | Audit logging for all critical operations: bed allocations, payment recording, approvals, QR regeneration. Never logging passwords, OTPs, or PII. |
| **Server-Side Request Forgery (OWASP #10)** | Unsafe URL fetching | Vanguard Manager does not trigger arbitrary outgoing HTTP requests from user-supplied URLs. |

---

## 3. QR Code Cryptographic Security

```
[Business Owner Dashboard]
         |
         |--> Click "Generate Registration QR"
         |--> Backend generates: token = crypto.randomBytes(32).toString('hex')
         |--> Backend computes: hash = sha256(token)
         |--> Saves hash, businessId, createdAt, isActive=true
         |--> Sends token in QR payload: https://vanguard.app/register?token=<token>
         |
[Applicant Scans QR]
         |
         |--> Resolves token to business via hash lookup
         |--> Validates isActive === true and not expired
         |--> Form binds to verified businessId on server
         |--> Frontend CANNOT tamper with or forge businessId
```

### Revocation & Regeneration
- An owner can click "Revoke & Regenerate QR" at any moment (e.g., if a QR code poster was photographed and shared inappropriately).
- Revocation marks old token records `isActive = false`, immediately terminating any in-flight unverified registrations using that token.

---

## 4. Document Upload Security
- Document types permitted: `image/jpeg`, `image/png`, `application/pdf`.
- Magic byte validation checks file header signatures against declared MIME type.
- Files stored with UUID filenames (e.g., `doc_38f3c71a-25f0-4660-84cf-8d99824f92be.pdf`).
- Documents are served exclusively through authenticated, authorization-checked API streaming routes, never directly via static public folders.
