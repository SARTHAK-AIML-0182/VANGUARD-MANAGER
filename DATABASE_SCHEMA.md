# Vanguard Manager — Database Schema & Relational Design

## 1. Database Principles
1. **Engine**: PostgreSQL with Prisma ORM.
2. **Multi-Tenancy**: Every business-specific table carries a `businessId` foreign key with an index.
3. **Immutability & Audit**: Financial transactions (invoices, payments, refunds) and critical status approvals (resident approval/rejection) maintain audit log records.
4. **Data Integrity**: Hard constraints at the database level:
   - A single bed can have only one active `ALLOCATED` resident at any time (`unique(bedId, status)` where status = 'ACTIVE').
   - A customer cannot have duplicate meal attendance records for the exact same date and meal window (`unique(customerId, attendanceDate, mealType)`).
5. **Security & Privacy**:
   - No plaintext passwords (Argon2id / bcrypt hashes).
   - No full Aadhaar numbers stored.
   - Document paths store opaque reference IDs; files are stored securely outside the web root.

---

## 2. Entity-Relationship Overview

```
                      +-------------------+
                      |       User        |
                      +-------------------+
                                |
                     +----------+----------+
                     |                     |
                     v                     v
          +--------------------+  +--------------------+
          | BusinessMembership |  | RegistrationToken  |
          +--------------------+  +--------------------+
                     |                     |
                     v                     v
          +--------------------+  +-------------------------+
          |      Business      |  | RegistrationApplication |
          +--------------------+  +-------------------------+
          /                    \
         /                      \
        v                        v
+------------------+     +-------------------+
|   PG Entities    |     |   Mess Entities   |
+------------------+     +-------------------+
| PGProperty       |     | MessMealPlan      |
| PGFloor          |     | MessSubscription  |
| PGRoom           |     | MessMenu          |
| PGBed            |     | MessMenuItem      |
| PGResident       |     | MessMealAttendance|
| PGRoomAllocation |     | MessInventoryItem |
| PGInvoice        |     | MessStockTrans    |
| PGPayment        |     | MessPurchase      |
| PGAttendance     |     | MessCustomer      |
| PGLeaveRequest   |     | MessVendor        |
| PGComplaint      |     | MessFeedback      |
| PGMaintenanceTask|     | MessExpense       |
| PGExpense        |     | MessStaff         |
| PGStaff          |     +-------------------+
+------------------+
```

---

## 3. Shared Core Entities

### `User`
- `id` (UUID, PK)
- `email` (VarChar(255), Unique, Indexed)
- `phoneNumber` (VarChar(20), Unique, Indexed)
- `passwordHash` (VarChar(255))
- `fullName` (VarChar(255))
- `systemRole` (Enum: `SUPERADMIN`, `USER`)
- `status` (Enum: `ACTIVE`, `SUSPENDED`, `PENDING_VERIFICATION`)
- `createdAt`, `updatedAt`

### `Business`
- `id` (UUID, PK)
- `name` (VarChar(255))
- `businessType` (Enum: `PG`, `MESS`)
- `ownerId` (UUID, FK -> User.id)
- `registrationNumber` (VarChar(100), Optional)
- `contactPhone` (VarChar(20))
- `contactEmail` (VarChar(255))
- `addressLine1` (VarChar(255))
- `city`, `state`, `postalCode`
- `isVerified` (Boolean, Default: false)
- `status` (Enum: `ACTIVE`, `SUSPENDED`, `INACTIVE`)
- `createdAt`, `updatedAt`

### `RegistrationToken` (QR System)
- `id` (UUID, PK)
- `businessId` (UUID, FK -> Business.id, Indexed)
- `tokenHash` (VarChar(255), Unique, Indexed) — SHA-256 of unguessable random token
- `purpose` (Enum: `BUSINESS_REGISTRATION`, `ATTENDANCE_CHECKIN`, `MEAL_PUNCH`)
- `isActive` (Boolean, Default: true)
- `expiresAt` (Timestamp, Optional)
- `createdAt`, `revokedAt`

### `RegistrationApplication`
- `id` (UUID, PK)
- `businessId` (UUID, FK -> Business.id, Indexed)
- `tokenUsedId` (UUID, FK -> RegistrationToken.id)
- `applicantName` (VarChar(255))
- `applicantPhone` (VarChar(20), Indexed)
- `isPhoneVerified` (Boolean, Default: false)
- `applicationType` (Enum: `PG_STUDENT`, `MESS_CUSTOMER`)
- `formData` (JSONB) — Encrypted/Structured validated fields
- `status` (Enum: `PENDING`, `APPROVED`, `REJECTED`, `CHANGES_REQUESTED`)
- `reviewerId` (UUID, FK -> User.id, Optional)
- `reviewNotes` (Text, Optional)
- `reviewedAt` (Timestamp, Optional)
- `createdAt`, `updatedAt`

### `AuditLog`
- `id` (UUID, PK)
- `businessId` (UUID, FK -> Business.id, Indexed)
- `actorId` (UUID, FK -> User.id)
- `action` (VarChar(100)) — e.g., `APPROVE_REGISTRATION`, `REGENERATE_QR`, `ALLOCATE_BED`
- `entityType` (VarChar(100))
- `entityId` (UUID)
- `metadata` (JSONB)
- `ipAddress` (VarChar(45))
- `userAgent` (Text)
- `createdAt`

---

## 4. PG Management Entities

1. **`PGProperty`**: Properties owned by the PG business (`name`, `code`, `address`, `amenities`, `managerId`).
2. **`PGFloor`**: Building floors (`propertyId`, `floorNumber`, `label`).
3. **`PGRoom`**: Rooms per floor (`floorId`, `roomNumber`, `roomType` [SINGLE, DOUBLE, TRIPLE, DORM], `hasAttachedBath`).
4. **`PGBed`**: Beds in room (`roomId`, `bedNumber`, `status` [VACANT, OCCUPIED, MAINTENANCE, RESERVED], `monthlyRent`).
5. **`PGResident`**: Resident records tied to approved user (`userId`, `propertyId`, `residentCode`, `emergencyContactName`, `emergencyContactPhone`, `status` [ACTIVE, CHECKED_OUT, SUSPENDED]).
6. **`PGRoomAllocation`**: Temporal occupancy tracking (`residentId`, `bedId`, `startDate`, `endDate`, `depositPaid`, `status` [ACTIVE, TERMINATED]). Constraint: One active allocation per bed.
7. **`PGInvoice`**: Monthly rent/utility bills (`businessId`, `residentId`, `invoiceNumber`, `amount`, `dueDate`, `status` [UNPAID, PAID, PARTIAL, OVERDUE]).
8. **`PGPayment`**: Receipts (`invoiceId`, `amount`, `paymentMethod` [UPI, NETBANKING, CASH], `referenceNo`, `paidAt`).
9. **`PGAttendance`**: Nightly or daily check-ins (`residentId`, `date`, `status` [PRESENT, ABSENT, ON_LEAVE]).
10. **`PGLeaveRequest`**: Leave applications (`residentId`, `from`, `to`, `reason`, `parentConsentVerified`, `status` [PENDING, APPROVED, REJECTED]).
11. **`PGComplaint`**: Issue resolution ticketing (`residentId`, `category` [PLUMBING, ELECTRICAL, CLEANING, WIFI], `title`, `description`, `priority`, `status`).

---

## 5. Mess Management Entities

1. **`MessCustomer`**: Dining subscribers (`userId`, `businessId`, `customerCode`, `dietaryType` [VEG, NON_VEG, JAIN], `allergiesNotes`).
2. **`MessMealPlan`**: Plan offerings (`businessId`, `title`, `type` [MONTHLY, WEEKLY, 15_DAYS], `mealsIncluded` [BREAKFAST, LUNCH, DINNER], `price`).
3. **`MessSubscription`**: Active dining passes (`customerId`, `mealPlanId`, `startDate`, `endDate`, `mealsRemaining`, `status` [ACTIVE, EXPIRED, PAUSED]).
4. **`MessMenu`**: Daily & weekly scheduled menus (`businessId`, `dayOfWeek`, `mealType`, `itemsList`).
5. **`MessMealAttendance`**: Attendance verification / meal punches (`customerId`, `subscriptionId`, `attendanceDate`, `mealType` [BREAKFAST, LUNCH, SNACKS, DINNER], `punchedAt`).
   - Unique constraint: `(customerId, attendanceDate, mealType)`.
6. **`MessInventoryItem`**: Pantry stock tracker (`businessId`, `itemName`, `category` [GRAINS, VEGETABLES, DAIRY, SPICES], `unit` [KG, LITER, PACK], `currentQuantity`, `reorderLevel`).
7. **`MessStockTransaction`**: Stock in/out logs (`inventoryItemId`, `changeType` [PURCHASE, KITCHEN_USAGE, SPOILAGE], `quantity`, `reason`).
8. **`MessWastageLog`**: Food wastage tracking (`businessId`, `date`, `mealType`, `estimatedKgWasted`, `reason`).
9. **`MessFeedback`**: Food ratings & comments (`customerId`, `date`, `mealType`, `tasteRating`, `hygieneRating`, `comments`).
