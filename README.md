# NovaArab (ArabShield)

A production-ready B2B technology services client portal built with Next.js 16 and Firebase.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

## Overview

NovaArab is a comprehensive client portal for a technology services company, targeting Arabic-speaking businesses in the Middle East (primarily Saudi Arabia). It provides clients with a dashboard to manage projects, invoices, support tickets, and documents.

## Features

| Feature | Description |
|---------|-------------|
| **Authentication** | Email/password with email verification |
| **Client Dashboard** | Projects, tasks, invoices, documents management |
| **Support Tickets** | Full CRUD with real-time updates |
| **Careers Portal** | Job listings with CV upload |
| **Invoice Management** | PDF generation and download |
| **Ratings System** | Client service ratings |
| **Marketplace** | Service listings and ordering |
| **i18n** | English, Arabic, and Turkish support |
| **Live Chat** | Integrated chat widget |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.0.8 |
| Frontend | React 19.2.1 |
| Styling | Tailwind CSS 3.4.17 |
| Animation | Framer Motion 12.x |
| Backend | Firebase (Firestore, Auth, Storage) |
| Hosting | Vercel |
| i18n | next-intl 4.6.1 |
| State | React Context API |
| PDF | jsPDF |
| Icons | Lucide React |

## Architecture

```
📁 NovaArab
├── 📁 app/[locale]/        # Next.js App Router with i18n
│   ├── dashboard/          # 20 dashboard pages
│   ├── careers/            # Public careers portal
│   └── ...                 # 25+ route groups
├── 📁 components/          # 53 reusable components
│   ├── dashboard/          # Dashboard-specific components
│   └── ui/                 # Base UI components
├── 📁 contexts/            # 6 React Context providers
├── 📁 lib/                 # 23 service/utility files
│   ├── dashboard/          # Hooks + types
│   └── firebase/           # Client/server separation
├── 📁 messages/            # Translation files (en/ar/tr)
└── 📁 firestore.rules      # Security rules (488 lines)
```

## Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase project values in `.env.local`:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Go to Project Settings > General
   - Copy the config values

3. Required environment variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Testing

The project uses Jest with React Testing Library for unit tests:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

Test files are located in `__tests__/` directory.

## Deployment

The application is deployed on Vercel. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## Security

- **Firestore Security Rules**: 488 lines of comprehensive rules
- **Role-based Access Control**: Owner/Member/Client roles
- **Email Verification**: Required for dashboard access
- **Invoice Deletion Protection**: Hard blocked for compliance

See [FIREBASE_SECURITY_RULES.md](./FIREBASE_SECURITY_RULES.md) for details.

## License

Private - All rights reserved.
