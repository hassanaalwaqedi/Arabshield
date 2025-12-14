# Firebase Security Rules for Email Verification

## Firestore Security Rules

Add these rules to your Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated and email verified
    function isVerified() {
      return request.auth != null && request.auth.token.email_verified == true;
    }
    
    // Users collection - only verified users can read/write
    match /users/{userId} {
      allow read: if isVerified();
      allow write: if isVerified() && request.auth.uid == userId;
    }
    
    // Orders collection - only verified users can access
    match /orders/{orderId} {
      allow read: if isVerified();
      allow create: if isVerified();
      allow update, delete: if isVerified() && resource.data.userId == request.auth.uid;
    }
    
    // Activities collection - only verified users can read
    match /activities/{activityId} {
      allow read: if isVerified();
      allow write: if isVerified();
    }
    
    // Statistics collection - verified users can read, admin can write
    match /statistics/{statId} {
      allow read: if isVerified();
      allow write: if isVerified() && request.auth.token.admin == true;
    }
  }
}
```

## How It Works

1. **Authentication Check**: `request.auth != null` ensures user is logged in
2. **Email Verification Check**: `request.auth.token.email_verified == true` ensures email is verified
3. **Combined Protection**: Both conditions must be true to access protected data

## Testing

To test the rules:
1. Register a new user
2. Try accessing Firestore before verifying email (should fail)
3. Verify email through the link sent
4. Reload the page and try again (should succeed)

## Important Notes

- Users with unverified emails can still log in but cannot access protected data
- The verification check happens on the server side (Firebase)
- No way to bypass this from the client
- Admins need a custom claim `admin: true` for write access to statistics

## Setting Admin Custom Claims

Use Firebase Admin SDK in your backend:

```javascript
admin.auth().setCustomUserClaims(uid, { admin: true });
```

Or use Firebase CLI:

```bash
firebase auth:import users.json --hash-algo=scrypt
```
