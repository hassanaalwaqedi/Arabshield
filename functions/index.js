const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
admin.initializeApp();

/**
 * Send Custom Verification Email Function
 * 
 * This function sends a custom HTML email for email verification
 * using either SendGrid or Resend API
 * 
 * Required Environment Variables:
 * - EMAIL_SERVICE: 'sendgrid' or 'resend'
 * - SENDGRID_API_KEY: Your SendGrid API key (if using SendGrid)
 * - RESEND_API_KEY: Your Resend API key (if using Resend)
 * - FROM_EMAIL: Sender email address (e.g., noreply@arabshield.com)
 */
exports.sendCustomVerificationEmail = functions.https.onCall(async (data, context) => {
  try {
    // Validate input data
    const { email, displayName, verificationLink } = data;

    if (!email || !verificationLink) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Email and verification link are required'
      );
    }

    // Load HTML template
    const templatePath = path.join(__dirname, '../email/templates/verify-email.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders
    htmlTemplate = htmlTemplate
      .replace(/\{\{displayName\}\}/g, displayName || 'عزيزي المستخدم')
      .replace(/\{\{verificationLink\}\}/g, verificationLink);

    // Get environment variables
    const emailService = functions.config().email?.service || 'sendgrid';
    const fromEmail = functions.config().email?.from || 'noreply@arabshield.com';

    // Send email based on configured service
    if (emailService === 'sendgrid') {
      await sendWithSendGrid(email, displayName, htmlTemplate, fromEmail);
    } else if (emailService === 'resend') {
      await sendWithResend(email, displayName, htmlTemplate, fromEmail);
    } else {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Invalid email service configured'
      );
    }

    console.log(`Verification email sent successfully to ${email}`);

    return {
      success: true,
      message: 'Verification email sent successfully'
    };

  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new functions.https.HttpsError(
      'internal',
      `Failed to send verification email: ${error.message}`
    );
  }
});

/**
 * Send email using SendGrid
 */
async function sendWithSendGrid(to, displayName, htmlContent, from) {
  const sgMail = require('@sendgrid/mail');
  
  const apiKey = functions.config().sendgrid?.api_key;
  if (!apiKey) {
    throw new Error('SendGrid API key not configured');
  }

  sgMail.setApiKey(apiKey);

  const msg = {
    to,
    from: {
      email: from,
      name: 'ArabShield'
    },
    subject: 'تفعيل حسابك | Verify Your Email - ArabShield',
    html: htmlContent,
    text: `مرحباً ${displayName}! شكراً لتسجيلك في ArabShield. لتفعيل حسابك، يرجى زيارة الرابط الموجود في البريد الإلكتروني.`
  };

  await sgMail.send(msg);
}

/**
 * Send email using Resend
 */
async function sendWithResend(to, displayName, htmlContent, from) {
  const { Resend } = require('resend');
  
  const apiKey = functions.config().resend?.api_key;
  if (!apiKey) {
    throw new Error('Resend API key not configured');
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: `ArabShield <${from}>`,
    to: [to],
    subject: 'تفعيل حسابك | Verify Your Email - ArabShield',
    html: htmlContent
  });
}

/**
 * Helper function to generate custom verification link
 * This is called from the client-side but could also be server-side
 */
exports.generateVerificationLink = functions.https.onCall(async (data, context) => {
  try {
    // Verify user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const { email } = data;
    
    if (!email) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Email is required'
      );
    }

    // Generate email verification link using Firebase Admin SDK
    const link = await admin.auth().generateEmailVerificationLink(email, {
      url: `${functions.config().app?.url || 'https://arabshield.com'}/verify-success`,
      handleCodeInApp: false
    });

    return {
      success: true,
      verificationLink: link
    };

  } catch (error) {
    console.error('Error generating verification link:', error);
    throw new functions.https.HttpsError(
      'internal',
      `Failed to generate verification link: ${error.message}`
    );
  }
});

/**
 * Optional: Cleanup function to delete unverified users after 7 days
 * Uncomment if you want to enable this feature
 */
// exports.cleanupUnverifiedUsers = functions.pubsub
//   .schedule('every 24 hours')
//   .onRun(async (context) => {
//     const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
//     const listUsersResult = await admin.auth().listUsers();
//     const usersToDelete = listUsersResult.users.filter(user => {
//       return !user.emailVerified && 
//              new Date(user.metadata.creationTime).getTime() < sevenDaysAgo;
//     });

//     const deletePromises = usersToDelete.map(user => admin.auth().deleteUser(user.uid));
//     await Promise.all(deletePromises);

//     console.log(`Deleted ${usersToDelete.length} unverified users`);
//     return null;
//   });
