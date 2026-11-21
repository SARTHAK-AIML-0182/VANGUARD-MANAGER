# Vanguard Manager — Deployment & Infrastructure Guide

## 1. Production Architecture Overview

```
                      [ Internet / HTTPS Client ]
                                   |
                                   v
                      [ Cloudflare / Nginx Reverse Proxy ]
                       - TLS Termination (Strict HTTPS)
                       - Rate Limiting / DDoS Shield
                       - Security Headers & Compression
                                   |
                                   v
             +---------------------+---------------------+
             |                                           |
             v                                           v
    [ Static Frontend ]                         [ Node.js Express API ]
   Vite Production Build                         Node Cluster / PM2
    (SPA / Nginx / CDN)                           Internal Port :5000
                                                         |
                                                         v
                                                [ Managed PostgreSQL ]
                                                  Prisma Connection Pool
```

---

## 2. Environment Variables Specification

### Frontend (`client/.env.example`)
```env
VITE_API_BASE_URL=https://api.vanguardmanager.com/api/v1
VITE_APP_ENV=production
```

### Backend (`server/.env.example`)
```env
# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://vanguardmanager.com

# Database
DATABASE_URL="postgresql://vanguard_user:STRONG_SECURE_PASSWORD@postgres.internal:5432/vanguard_db?schema=public&connection_limit=20"

# Authentication & Session
SESSION_SECRET="CHANGE_ME_TO_MIN_64_CHAR_CRYPTOGRAPHICALLY_SECURE_RANDOM_STRING"
JWT_SECRET="CHANGE_ME_TO_MIN_64_CHAR_CRYPTOGRAPHICALLY_SECURE_RANDOM_STRING"
COOKIE_DOMAIN=".vanguardmanager.com"
COOKIE_SECURE=true
COOKIE_SAME_SITE=lax

# Storage (Object Storage / Local Secure Dir)
STORAGE_DRIVER=local
STORAGE_DIR="/var/vanguard/secure_uploads"

# SMS OTP Gateway (Twilio / Fast2SMS / MSG91)
SMS_PROVIDER=mock
SMS_API_KEY=""
SMS_SENDER_ID=""

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000 # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 3. Production Build & Deployment Steps

### Step 1: Frontend Build
```bash
cd client
npm ci
npm run build
# Generates optimized static assets in client/dist/
```

### Step 2: Database Migration
```bash
cd server
npm ci
npx prisma migrate deploy
```

### Step 3: Process Management (PM2)
```bash
cd server
pm2 start src/server.js --name "vanguard-api" -i max
pm2 save
```

### Step 4: Health Check Endpoint
Validate API health at `https://api.vanguardmanager.com/api/v1/health`.
