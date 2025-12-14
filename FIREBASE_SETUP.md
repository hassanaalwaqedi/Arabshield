# Firebase Setup Guide for ArabShield Dashboard

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCWpp2YPWQBJ6ZlTcgvkrebCIPpQSdzEwM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=arabshield.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=arabshield
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=arabshield.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=513366082754
NEXT_PUBLIC_FIREBASE_APP_ID=1:513366082754:web:19b6a20be5c8fe5bcaa75b
```

## Firestore Collections Setup

### 1. Statistics Collection

Create a document at `statistics/dashboard_stats`:

```json
{
  "totalProjects": 24,
  "activeProjects": 12,
  "completedProjects": 10,
  "totalRevenue": 45000,
  "pendingInvoices": 3,
  "openTickets": 5,
  "resolvedTickets": 28,
  "systemHealth": 98
}
```

### 2. Projects Collection

Create documents in the `projects` collection:

```json
{
  "title": "موقع التجارة الإلكترونية",
  "ownerId": "user123",
  "status": "active",
  "progress": 75,
  "description": "تطوير منصة تجارة إلكترونية متكاملة",
  "tags": ["web", "ecommerce", "react"],
  "createdAt": "2024-12-01T10:00:00Z",
  "updatedAt": "2024-12-10T15:30:00Z"
}
```

### 3. Invoices Collection

Create documents in the `invoices` collection:

```json
{
  "projectId": "project123",
  "amount": 5000,
  "status": "pending",
  "dueDate": "2024-12-20T00:00:00Z",
  "createdAt": "2024-12-01T10:00:00Z"
}
```

### 4. Support Tickets Collection

Create documents in the `tickets` collection:

```json
{
  "title": "مشكلة في الدفع",
  "message": "لا أستطيع إتمام عملية الدفع",
  "status": "open",
  "priority": "high",
  "authorId": "user123",
  "createdAt": "2024-12-10T14:00:00Z"
}
```

### 5. Activities Collection

Create documents in the `activities` collection:

```json
{
  "type": "order_created",
  "description": "تم إنشاء طلب جديد",
  "timestamp": "2024-12-10T14:00:00Z",
  "userId": "user123",
  "orderId": "order456"
}
```

## Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Environment Variables:**
   - Copy `.env.local.example` to `.env.local` (or create `.env.local`)
   - Add your Firebase credentials

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Visit Dashboard:**
   - Overview: http://localhost:3000/dashboard
   - Projects: http://localhost:3000/dashboard/projects
   - Invoices: http://localhost:3000/dashboard/invoices
   - Support: http://localhost:3000/dashboard/support (coming in Phase 3)
   - Settings: http://localhost:3000/dashboard/settings (coming in Phase 3)

## Phase 2 Complete ✅

**Files Created (9 files):**
1. `lib/firebase.ts` - TypeScript Firebase config
2. `lib/useDashboardData.ts` - Enhanced with 3 new hooks
3. `components/dashboard/DashboardLayout.tsx` - Main layout
4. `components/dashboard/StatsCard.tsx` - Stat card component
5. `components/dashboard/ProjectCard.tsx` - Project card
6. `components/dashboard/InvoiceCard.tsx` - Invoice card
7. `app/dashboard/layout.tsx` - Dashboard wrapper
8. `app/dashboard/projects/page.tsx` - Projects page
9. `app/dashboard/invoices/page.tsx` - Invoices page

## Phase 3 (Coming Next)

- QuickActions component
- ActivitiesList component
- TicketList component
- Support tickets page
- Settings page
- API routes
- Tests

## Troubleshooting

**Build Error?**
- The current build error is due to Firebase not finding the config from environment variables during build time
- Solution: Restart dev server after adding `.env.local`
- Or run: `npm run dev` instead of `npm run build` for development

**No Data Showing?**
- Make sure you've created the Firestore collections and documents
- Check browser console for errors
- Verify Firebase credentials in `.env.local`

**Import Errors?**
- Make sure `lib/firebase.ts` exists (not `.js`)
- Clear `.next` cache: `rm -rf .next` or `rmdir /s .next` on Windows
- Restart development server
