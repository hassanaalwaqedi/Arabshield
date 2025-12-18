# Custom Email Verification Deployment Guide

## Overview
This guide will help you deploy the custom email verification system with HTML emails using Firebase Cloud Functions.

## Prerequisites

- Firebase Project (Blaze Plan required for Cloud Functions)
- Firebase CLI installed (`npm install -g firebase-tools`)
- SendGrid OR Resend API account
- Node.js 18+ installed

---

## Step 1: Initialize Firebase Functions

```bash
# Navigate to your project directory
cd c:\Users\hsana\Downloads\Arabshield

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Select:
# - Functions
# - Use existing project (select your novaarab project)
# - JavaScript
# - No to ESLint (optional)
# - Yes to install dependencies
```

**NOTE:** If you already have a `functions` folder, you can skip init and just navigate to it.

---

## Step 2: Install Dependencies

```bash
cd functions
npm install firebase-admin firebase-functions @sendgrid/mail resend
```

---

## Step 3: Choose Email Service

### Option A: SendGrid (Recommended)

1. **Create SendGrid Account**: https://signup.sendgrid.com/
2. **Create API Key**:
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the API key (you won't see it again!)
3. **Verify Sender Email**:
   - Go to Settings → Sender Authentication
   - Verify your sender email (e.g., noreply@novaarab.com)

### Option B: Resend

1. **Create Resend Account**: https://resend.com/signup
2. **Get API Key**:
   - Go to API Keys
   - Create new API key
   - Copy the API key
3. **Add Domain**:
   - Go to Domains
   - Add your domain (novaarab.com)
   - Verify DNS records

---

## Step 4: Configure Environment Variables

```bash
# Set email service (sendgrid or resend)
firebase functions:config:set email.service="sendgrid"

# Set sender email
firebase functions:config:set email.from="noreply@novaarab.com"

# Set app URL for verification redirects
firebase functions:config:set app.url="https://novaarab.com"

# For SendGrid:
firebase functions:config:set sendgrid.api_key="YOUR_SENDGRID_API_KEY_HERE"

# OR for Resend:
firebase functions:config:set resend.api_key="YOUR_RESEND_API_KEY_HERE"
```

**Verify configuration:**
```bash
firebase functions:config:get
```

---

## Step 5: Update Email Template (Optional)

Edit `email/templates/verify-email.html`:
- Update logo placeholder (🛡️) with actual logo URL
- Customize colors to match your brand
- Update footer links and company info

---

## Step 6: Deploy Cloud Functions

```bash
# From project root directory
firebase deploy --only functions

# Or deploy specific function:
firebase deploy --only functions:sendCustomVerificationEmail
```

**Deployment takes 2-5 minutes.**

---

## Step 7: Set Firestore Security Rules

Update your Firestore rules to require email verification:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isVerified() {
      return request.auth != null && 
             request.auth.token.email_verified == true;
    }
    
    match /{document=**} {
      allow read, write: if isVerified();
    }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

---

## Step 8: Test the System

1. **Register a new user** at `/register`
2. **Check your email** - you should receive the custom HTML email
3. **Click the verification link** - should redirect to `/verify-success`
4. **Try accessing dashboard** - should work after verification

---

## Step 9: Monitor and Debug

### View Logs:
```bash
# Real-time logs
firebase functions:log --only sendCustomVerificationEmail

# Or view in Firebase Console
# https://console.firebase.google.com → Functions → Logs
```

### Common Issues:

**1. "Permission denied" error:**
- Ensure you're on Firebase Blaze Plan
- Check IAM permissions in Google Cloud Console

**2. "API key not configured":**
```bash
firebase functions:config:get
# Verify your API key is set correctly
```

**3. Emails not sending:**
- Verify SendGrid/Resend API key is valid
- Check sender email is verified
- Review function logs for errors

**4. Functions not deploying:**
- Check Node.js version (must be 18+)
- Verify `package.json` has correct dependencies
- Try: `cd functions && npm install && cd ..`

---

## Step 10: Production Checklist

Before going live:

- [ ] Test email delivery with multiple email providers (Gmail, Outlook, etc.)
- [ ] Verify links work correctly
- [ ] Check email doesn't land in spam
- [ ] Test mobile email rendering
- [ ] Set up email sending limits/quotas
- [ ] Add monitoring/alerting for failed emails
- [ ] Test fallback to default Firebase email
- [ ] Update Firebase Security Rules
- [ ] Test verification flow end-to-end
- [ ] Add custom domain for emails (optional but recommended)

---

## Architecture Diagram

```
User Registration
       ↓
Create Firebase User
       ↓
Update Display Name
       ↓
Call Cloud Function
       ↓
Generate Verification Link (Admin SDK)
       ↓
Load HTML Template
       ↓
Replace Placeholders
       ↓
Send via SendGrid/Resend
       ↓
User Receives Custom Email
       ↓
User Clicks Verification Link
       ↓
Firebase Verifies Email
       ↓
Redirect to /verify-success
       ↓
Auto-redirect to Dashboard
```

---

## Cost Estimation

### Firebase Cloud Functions (Blaze Plan):
- 2 million invocations/month FREE
- $0.40 per million after that
- Expected cost: **$0-2/month** for small to medium traffic

### SendGrid:
- Free tier: 100 emails/day
- Essentials: $19.95/month (50,000 emails)

### Resend:
- Free tier: 100 emails/day
- Pro: $20/month (50,000 emails)

**Total estimated monthly cost: $0-40** depending on volume

---

## Support

If you encounter issues:

1. Check Firebase Console → Functions → Logs
2. Review this guide's troubleshooting section
3. Check Firebase documentation: https://firebase.google.com/docs/functions
4. SendGrid docs: https://docs.sendgrid.com
5. Resend docs: https://resend.com/docs

---

## Next Steps

After successful deployment:

1. Customize email template further
2. Add email analytics tracking
3. Set up automated unverified user cleanup (see `functions/index.js` commented code)
4. Implement password reset emails with same system
5. Add welcome email after verification

---

**Deployment Complete! 🎉**

Your custom email verification system is now live.
