# Firestore Collections Schema

## Overview
This document describes the Firestore database structure for the ArabShield dashboard.

---

## Collections

### 1. `statistics/dashboard_stats`
Main dashboard statistics document.

**Fields:**
```typescript
{
  totalProjects: number;        // Total number of projects
  activeProjects: number;       // Currently active projects
  completedProjects: number;    // Completed projects
  totalRevenue: number;         // Total revenue in USD
  pendingInvoices: number;      // Number of pending invoices
  openTickets: number;          // Open support tickets
  resolvedTickets: number;      // Resolved support tickets  
  systemHealth: number;         // System health percentage (0-100)
  updatedAt: timestamp;         // Last update timestamp
}
```

**Example:**
```json
{
  "totalProjects": 24,
  "activeProjects": 12,
  "completedProjects": 10,
  "totalRevenue": 45000,
  "pendingInvoices": 3,
  "openTickets": 5,
  "resolvedTickets": 28,
  "systemHealth": 98,
  "updatedAt": "2024-12-10T10:00:00Z"
}
```

---

### 2. `statistics/monthly_stats`
Monthly statistics document.

**Fields:**
```typescript
{
  newOrders: number;           // New orders this month
  completedOrders: number;     // Completed orders this month
  meetings: number;            // Meetings scheduled
  updatedAt: timestamp;
}
```

---

### 3. `projects` Collection
Individual project documents.

**Document ID:** Auto-generated

**Fields:**
```typescript
{
  title: string;               // Project title (Arabic)
  ownerId: string;             // User ID of project owner
  status: 'active' | 'completed' | 'on-hold';
  progress: number;            // Progress percentage (0-100)
  description?: string;        // Project description (Arabic)
  tags?: string[];             // Project tags
  createdAt: string;           // ISO timestamp
  updatedAt?: string;          // ISO timestamp
}
```

**Example:**
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

---

### 4. `invoices` Collection
Invoice documents.

**Document ID:** Auto-generated

**Fields:**
```typescript
{
  projectId: string;           // Associated project ID
  amount: number;              // Invoice amount in USD
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;             // ISO timestamp
  createdAt: string;           // ISO timestamp
  paidAt?: string;             // ISO timestamp (optional)
}
```

**Example:**
```json
{
  "projectId": "project123",
  "amount": 5000,
  "status": "pending",
  "dueDate": "2024-12-20T00:00:00Z",
  "createdAt": "2024-12-01T10:00:00Z"
}
```

---

### 5. `tickets` Collection
Support ticket documents.

**Document ID:** Auto-generated

**Fields:**
```typescript
{
  title: string;               // Ticket title (Arabic)
  message: string;             // Ticket message (Arabic)
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  authorId: string;            // User ID of ticket creator
  createdAt: string;           // ISO timestamp
  updatedAt?: string;          // ISO timestamp (optional)
  responses?: Array<{          // Optional responses array
    message: string;
    authorId: string;
    timestamp: string;
  }>;
}
```

**Example:**
```json
{
  "title": "مشكلة في الدفع",
  "message": "لا أستطيع إتمام عملية الدفع عبر بطاقة الائتمان",
  "status": "open",
  "priority": "high",
  "authorId": "user123",
  "createdAt": "2024-12-10T14:00:00Z"
}
```

---

### 6. `activities` Collection
Activity feed documents.

**Document ID:** Auto-generated

**Fields:**
```typescript
{
  type: string;                // Activity type (order_created, payment_received, etc.)
  description: string;         // Activity description (Arabic)
  timestamp: string;           // ISO timestamp
  userId?: string;             // Associated user ID (optional)
  orderId?: string;            // Associated order ID (optional)
  meta?: object;               // Additional metadata (optional)
}
```

**Activity Types:**
- `order_created` - New order created
- `order_updated` - Order updated
- `order_completed` - Order completed
- `payment_received` - Payment received
- `ticket_opened` - Support ticket opened
- `ticket_resolved` - Support ticket resolved

**Example:**
```json
{
  "type": "order_created",
  "description": "تم إنشاء طلب جديد",
  "timestamp": "2024-12-10T14:00:00Z",
  "userId": "user123",
  "orderId": "order456",
  "meta": {
    "orderAmount": 5000
  }
}
```

---

## Indexes

### Recommended Firestore Indexes

1. **projects** collection:
   - `status` (Ascending) + `createdAt` (Descending)
   - `ownerId` (Ascending) + `createdAt` (Descending)

2. **invoices** collection:
   - `status` (Ascending) + `createdAt` (Descending)
   - `projectId` (Ascending) + `createdAt` (Descending)

3. **tickets** collection:
   - `status` (Ascending) + `createdAt` (Descending)
   - `authorId` (Ascending) + `createdAt` (Descending)
   - `priority` (Ascending) + `createdAt` (Descending)

4. **activities** collection:
   - `timestamp` (Descending)
   - `type` (Ascending) + `timestamp` (Descending)

---

## Security Rules

See `FIREBASE_SECURITY_RULES.md` for complete security rules configuration.

**Basic Rule Example:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Require authentication for all reads/writes
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Data Migration

To populate initial data, use the seed script in `lib/seed.js` or manually create documents in the Firebase Console.

**Note:** All timestamps should be in ISO 8601 format (e.g., `2024-12-10T14:00:00Z`).
