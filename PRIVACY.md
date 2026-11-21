# Vanguard Manager — Privacy & Data Governance Guidelines

## 1. Principles of Data Minimization & Privacy by Design
Vanguard Manager handles personal information of students, working professionals, and dining patrons. We adhere to strict data minimization principles under modern data privacy frameworks (including India's Digital Personal Data Protection Act - DPDPA).

---

## 2. PII Collection Standards

### 2.1 What We Collect & Why

| Entity | Field | Purpose | Mandatory? | Storage Classification |
| :--- | :--- | :--- | :--- | :--- |
| **All Users** | Full Name | Account identification and resident agreements | Yes | Standard PII |
| **All Users** | Mobile Number | Authentication, OTP verification, emergency reach | Yes | Confidential PII |
| **PG Resident** | Date of Birth | Age verification (ensuring legal majority) | Yes | Confidential PII |
| **PG Resident** | Emergency Contact | Critical alerts, safety, medical emergency | Yes | Confidential PII |
| **PG Resident** | College / Company | Institutional verification for stay duration | Optional/Conditional | Standard PII |
| **PG Resident** | ID Proof (College ID/Govt ID) | Verification by PG owner for security | Yes | Private Secure Object |
| **Mess Customer** | Dietary Type / Allergies | Food safety & meal preparation | Voluntary | Sensitive Health-adjacent |

---

## 3. Strict Rules on Government Identifiers & Aadhaar

1. **NO Full Aadhaar Numbers**:
   - The platform **strictly forbids** storing or requesting 12-digit plaintext Aadhaar numbers by default.
   - We do not run automated Aadhaar e-KYC unless legally sanctioned under UIDAI regulations.
   - For identity verification, users can provide alternative institutional identification (College Student ID, Company Employee ID, Driving License, or Masked Aadhaar where the first 8 digits are redacted).
2. **No Public URLs for Proof Documents**:
   - All uploaded identity documents are stored in private storage outside the web root.
   - Direct link sharing is impossible. Only the authorized business owner and authorized staff with verified session credentials can preview applicant documents.
3. **No PII in Application Logs**:
   - Winston / Pino logging pipelines are explicitly scrubbed: passwords, auth tokens, OTP codes, and phone numbers are redacted (`***`).

---

## 4. Minor Protection & Consent
- If an applicant is below 18 years of age (minor), a dedicated parent/guardian consent declaration step is enforced during registration.
- Account activation requires verified guardian contact confirmation prior to final PG bed allocation.

---

## 5. Data Retention & Erasure
- Residents who checkout or terminate their tenancy can request archival or account deletion subject to legal tax/invoicing retention requirements (e.g. rent receipts retained for statutory compliance).
- Unapproved or rejected registration applications are permanently purged after 30 days of inactivity.
