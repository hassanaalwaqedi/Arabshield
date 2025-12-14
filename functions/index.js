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

// ================================
// DASHBOARD AGGREGATION FUNCTIONS
// ================================

const db = admin.firestore();

/**
 * Aggregate dashboard stats when projects change
 */
exports.onProjectChange = functions.firestore
  .document('projects/{projectId}')
  .onWrite(async (change, context) => {
    const projectId = context.params.projectId;
    const beforeData = change.before.exists ? change.before.data() : null;
    const afterData = change.after.exists ? change.after.data() : null;

    // Get ownerId from before or after
    const ownerId = afterData?.ownerId || beforeData?.ownerId;
    if (!ownerId) return;

    // Create activity
    await createActivity({
      type: !beforeData ? 'project_created' : !afterData ? 'project_deleted' : 'project_updated',
      userId: ownerId,
      entityId: projectId,
      description: !beforeData
        ? `تم إنشاء مشروع: ${afterData.title}`
        : !afterData
          ? `تم حذف مشروع: ${beforeData.title}`
          : `تم تحديث مشروع: ${afterData.title}`,
      metadata: { projectTitle: afterData?.title || beforeData?.title }
    });

    // Recalculate user stats
    await recalculateUserStats(ownerId);
  });

/**
 * Aggregate dashboard stats when tickets change
 */
exports.onTicketChange = functions.firestore
  .document('tickets/{ticketId}')
  .onWrite(async (change, context) => {
    const ticketId = context.params.ticketId;
    const beforeData = change.before.exists ? change.before.data() : null;
    const afterData = change.after.exists ? change.after.data() : null;

    const authorId = afterData?.authorId || beforeData?.authorId;
    if (!authorId) return;

    // Create activity
    const activityType = !beforeData ? 'ticket_created' :
      afterData?.status === 'resolved' ? 'ticket_resolved' : 'ticket_updated';

    await createActivity({
      type: activityType,
      userId: authorId,
      entityId: ticketId,
      description: !beforeData
        ? `تم إنشاء تذكرة دعم: ${afterData.title}`
        : afterData?.status === 'resolved'
          ? `تم حل التذكرة: ${afterData.title}`
          : `تم تحديث التذكرة: ${afterData.title}`,
      metadata: { ticketTitle: afterData?.title || beforeData?.title, status: afterData?.status }
    });

    // Create notification if ticket status changed
    if (beforeData && afterData && beforeData.status !== afterData.status) {
      await createNotification(authorId, {
        type: 'ticket_status_change',
        title: 'تحديث حالة التذكرة',
        message: `تم تحديث حالة تذكرتك "${afterData.title}" إلى: ${getStatusLabel(afterData.status)}`,
        entityId: ticketId,
        entityType: 'ticket'
      });
    }

    await recalculateUserStats(authorId);
  });

/**
 * Aggregate dashboard stats when invoices change
 */
exports.onInvoiceChange = functions.firestore
  .document('invoices/{invoiceId}')
  .onWrite(async (change, context) => {
    const invoiceId = context.params.invoiceId;
    const beforeData = change.before.exists ? change.before.data() : null;
    const afterData = change.after.exists ? change.after.data() : null;

    const userId = afterData?.userId || beforeData?.userId;
    if (!userId) return;

    // Create activity for payment
    if (beforeData?.status !== 'paid' && afterData?.status === 'paid') {
      await createActivity({
        type: 'payment_received',
        userId,
        entityId: invoiceId,
        description: `تم استلام دفعة بقيمة $${afterData.amount}`,
        metadata: { amount: afterData.amount, invoiceId }
      });
    }

    // Create notification for overdue invoices
    if (afterData?.status === 'overdue' && beforeData?.status !== 'overdue') {
      await createNotification(userId, {
        type: 'invoice_overdue',
        title: 'فاتورة متأخرة',
        message: `لديك فاتورة متأخرة بقيمة $${afterData.amount}`,
        entityId: invoiceId,
        entityType: 'invoice'
      });
    }

    await recalculateUserStats(userId);
  });

/**
 * Aggregate dashboard stats when tasks change
 */
exports.onTaskChange = functions.firestore
  .document('tasks/{taskId}')
  .onWrite(async (change, context) => {
    const taskId = context.params.taskId;
    const beforeData = change.before.exists ? change.before.data() : null;
    const afterData = change.after.exists ? change.after.data() : null;

    const assignedTo = afterData?.assignedTo || beforeData?.assignedTo;
    const ownerId = afterData?.ownerId || beforeData?.ownerId;

    // Create activity for task completion
    if (beforeData?.status !== 'completed' && afterData?.status === 'completed') {
      const userId = assignedTo || ownerId;
      if (userId) {
        await createActivity({
          type: 'task_completed',
          userId,
          entityId: taskId,
          description: `تم إكمال مهمة: ${afterData.title}`,
          metadata: { taskTitle: afterData.title, projectId: afterData.projectId }
        });
      }
    }

    // Notify assignee when task is assigned
    if (assignedTo && (!beforeData || beforeData.assignedTo !== assignedTo)) {
      await createNotification(assignedTo, {
        type: 'task_assigned',
        title: 'تم تعيين مهمة جديدة',
        message: `تم تعيينك للمهمة: ${afterData.title}`,
        entityId: taskId,
        entityType: 'task'
      });
    }
  });

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Create an activity document
 */
async function createActivity({ type, userId, entityId, description, metadata = {} }) {
  try {
    await db.collection('activities').add({
      type,
      userId,
      entityId,
      description,
      metadata,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating activity:', error);
  }
}

/**
 * Create a notification for a user
 */
async function createNotification(userId, { type, title, message, entityId, entityType }) {
  try {
    await db.collection('notifications').doc(userId).collection('items').add({
      type,
      title,
      message,
      entityId,
      entityType,
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

/**
 * Recalculate and store user dashboard stats
 */
async function recalculateUserStats(userId) {
  try {
    // Get all user's projects
    const projectsSnap = await db.collection('projects').where('ownerId', '==', userId).get();
    let activeProjects = 0;
    let completedProjects = 0;
    projectsSnap.forEach(doc => {
      const status = doc.data().status;
      if (status === 'active' || status === 'in-progress') activeProjects++;
      if (status === 'completed') completedProjects++;
    });

    // Get all user's tickets
    const ticketsSnap = await db.collection('tickets').where('authorId', '==', userId).get();
    let openTickets = 0;
    let resolvedTickets = 0;
    ticketsSnap.forEach(doc => {
      const status = doc.data().status;
      if (status === 'open' || status === 'in-progress') openTickets++;
      if (status === 'resolved' || status === 'closed') resolvedTickets++;
    });

    // Get all user's invoices
    const invoicesSnap = await db.collection('invoices').where('userId', '==', userId).get();
    let pendingAmount = 0;
    let paidAmount = 0;
    invoicesSnap.forEach(doc => {
      const data = doc.data();
      if (data.status === 'pending' || data.status === 'overdue') pendingAmount += data.amount || 0;
      if (data.status === 'paid') paidAmount += data.amount || 0;
    });

    // Store aggregated stats
    await db.collection('statistics').doc(`user_${userId}`).set({
      activeProjects,
      completedProjects,
      totalProjects: projectsSnap.size,
      openTickets,
      resolvedTickets,
      pendingInvoices: pendingAmount,
      totalRevenue: paidAmount,
      ticketResolutionRate: ticketsSnap.size > 0 ? (resolvedTickets / ticketsSnap.size) * 100 : 0,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

  } catch (error) {
    console.error('Error recalculating user stats:', error);
  }
}

/**
 * Get Arabic status label
 */
function getStatusLabel(status) {
  const labels = {
    'open': 'مفتوحة',
    'in-progress': 'قيد المعالجة',
    'resolved': 'محلولة',
    'closed': 'مغلقة',
    'pending': 'معلق',
    'paid': 'مدفوع',
    'overdue': 'متأخر'
  };
  return labels[status] || status;
}

/**
 * Calculate and update global system health
 * Scheduled to run every 5 minutes
 */
exports.calculateSystemHealth = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    try {
      // Simple health check - can be expanded with real metrics
      const now = Date.now();

      // Check Firestore availability by doing a simple read
      const healthStart = Date.now();
      await db.collection('system').doc('health_check').get();
      const latency = Date.now() - healthStart;

      // Calculate health score based on latency (lower is better)
      const healthScore = latency < 100 ? 99.9 :
        latency < 500 ? 98 :
          latency < 1000 ? 95 :
            latency < 2000 ? 90 : 85;

      // Store system health
      await db.collection('statistics').doc('system').set({
        systemHealth: healthScore,
        lastCheck: admin.firestore.FieldValue.serverTimestamp(),
        latencyMs: latency
      }, { merge: true });

      console.log(`System health check: ${healthScore}% (latency: ${latency}ms)`);
    } catch (error) {
      console.error('System health check failed:', error);
      await db.collection('statistics').doc('system').set({
        systemHealth: 0,
        lastCheck: admin.firestore.FieldValue.serverTimestamp(),
        error: error.message
      }, { merge: true });
    }
    return null;
  });

/**
 * Get user notifications (callable function)
 */
exports.getUserNotifications = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const userId = context.auth.uid;
  const limit = data.limit || 20;

  const notificationsSnap = await db
    .collection('notifications')
    .doc(userId)
    .collection('items')
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  const notifications = [];
  notificationsSnap.forEach(doc => {
    notifications.push({ id: doc.id, ...doc.data() });
  });

  return { notifications };
});

/**
 * Mark notification as read
 */
exports.markNotificationRead = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const userId = context.auth.uid;
  const { notificationId } = data;

  if (!notificationId) {
    throw new functions.https.HttpsError('invalid-argument', 'Notification ID required');
  }

  await db
    .collection('notifications')
    .doc(userId)
    .collection('items')
    .doc(notificationId)
    .update({ read: true });

  return { success: true };
});

// ============================================
// SCHEDULED: Auto-Close Inactive Tickets
// ============================================

/**
 * Auto-close tickets that have been inactive for ticketAutoCloseDays
 * Runs daily at midnight
 */
exports.autoCloseInactiveTickets = functions.pubsub
  .schedule('0 0 * * *') // Every day at midnight
  .timeZone('Asia/Riyadh')
  .onRun(async (context) => {
    try {
      // Get system settings
      const settingsDoc = await db.doc('system/settings').get();
      const settings = settingsDoc.data() || {};

      // Default to 7 days if not set
      const autoCloseDays = settings.ticketAutoCloseDays || 7;

      if (autoCloseDays <= 0) {
        console.log('Ticket auto-close is disabled (days <= 0)');
        return null;
      }

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - autoCloseDays);

      // Find inactive open tickets
      const ticketsSnapshot = await db
        .collection('tickets')
        .where('status', 'in', ['open', 'in_progress'])
        .where('updatedAt', '<', cutoffDate)
        .limit(100) // Process in batches
        .get();

      if (ticketsSnapshot.empty) {
        console.log('No inactive tickets to close');
        return null;
      }

      const batch = db.batch();
      const closedTicketIds = [];

      ticketsSnapshot.docs.forEach((doc) => {
        const ticketData = doc.data();
        batch.update(doc.ref, {
          status: 'closed',
          closedAt: admin.firestore.FieldValue.serverTimestamp(),
          closedReason: 'تم الإغلاق تلقائياً بسبب عدم النشاط',
          autoClosedAfterDays: autoCloseDays
        });
        closedTicketIds.push(doc.id);

        // Create notification for ticket owner
        if (ticketData.userId) {
          const notifRef = db
            .collection('notifications')
            .doc(ticketData.userId)
            .collection('items')
            .doc();

          batch.set(notifRef, {
            type: 'ticket_auto_closed',
            title: 'تم إغلاق التذكرة تلقائياً',
            message: `تم إغلاق التذكرة "${ticketData.subject || 'بدون عنوان'}" بسبب عدم النشاط لمدة ${autoCloseDays} أيام`,
            entityType: 'ticket',
            entityId: doc.id,
            read: false,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      });

      await batch.commit();
      console.log(`Auto-closed ${closedTicketIds.length} inactive tickets:`, closedTicketIds);

      // Log to audit
      await db.collection('audit_logs').add({
        action: 'tickets_auto_closed',
        system: true,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        details: {
          ticketIds: closedTicketIds,
          autoCloseDays,
          count: closedTicketIds.length
        }
      });

      return { closed: closedTicketIds.length };
    } catch (error) {
      console.error('Error auto-closing tickets:', error);
      return null;
    }
  });

// ============================================
// SCHEDULED: Invoice Overdue Reminders
// ============================================

/**
 * Send reminders for overdue invoices
 * Runs daily at 9 AM
 */
exports.sendInvoiceReminders = functions.pubsub
  .schedule('0 9 * * *') // Every day at 9 AM
  .timeZone('Asia/Riyadh')
  .onRun(async (context) => {
    try {
      // Get system settings
      const settingsDoc = await db.doc('system/settings').get();
      const settings = settingsDoc.data() || {};

      // Check if reminders are enabled
      if (!settings.invoiceAutoReminder) {
        console.log('Invoice auto-reminders are disabled');
        return null;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find overdue unpaid invoices
      const invoicesSnapshot = await db
        .collection('invoices')
        .where('status', '==', 'pending')
        .where('dueDate', '<', today)
        .limit(100) // Process in batches
        .get();

      if (invoicesSnapshot.empty) {
        console.log('No overdue invoices to remind');
        return null;
      }

      const batch = db.batch();
      const remindedInvoiceIds = [];

      invoicesSnapshot.docs.forEach((doc) => {
        const invoiceData = doc.data();

        // Calculate days overdue
        const dueDate = invoiceData.dueDate?.toDate?.() || new Date(invoiceData.dueDate);
        const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

        // Update invoice with reminder sent flag
        batch.update(doc.ref, {
          lastReminderSent: admin.firestore.FieldValue.serverTimestamp(),
          reminderCount: admin.firestore.FieldValue.increment(1),
          daysOverdue
        });

        remindedInvoiceIds.push(doc.id);

        // Create notification for invoice owner
        if (invoiceData.userId) {
          const notifRef = db
            .collection('notifications')
            .doc(invoiceData.userId)
            .collection('items')
            .doc();

          batch.set(notifRef, {
            type: 'invoice_overdue',
            title: 'تذكير بفاتورة متأخرة',
            message: `الفاتورة #${invoiceData.invoiceNumber || doc.id.slice(-6)} متأخرة منذ ${daysOverdue} يوم بمبلغ ${invoiceData.amount || 0} ر.س`,
            entityType: 'invoice',
            entityId: doc.id,
            read: false,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            priority: 'high'
          });
        }
      });

      await batch.commit();
      console.log(`Sent reminders for ${remindedInvoiceIds.length} overdue invoices:`, remindedInvoiceIds);

      // Log to audit
      await db.collection('audit_logs').add({
        action: 'invoice_reminders_sent',
        system: true,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        details: {
          invoiceIds: remindedInvoiceIds,
          count: remindedInvoiceIds.length
        }
      });

      return { reminded: remindedInvoiceIds.length };
    } catch (error) {
      console.error('Error sending invoice reminders:', error);
      return null;
    }
  });

// ============================================
// SCHEDULED: Weekly Report Emails
// ============================================

/**
 * Send weekly report emails to users who opted in
 * Runs every Sunday at 9 AM
 */
exports.sendWeeklyReports = functions.pubsub
  .schedule('0 9 * * 0') // Every Sunday at 9 AM
  .timeZone('Asia/Riyadh')
  .onRun(async (context) => {
    try {
      console.log('Starting weekly report generation...');

      // Get all users who have opted in for weekly reports
      const usersSnapshot = await db.collection('users').get();

      let sentCount = 0;

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const userData = userDoc.data();

        // Check user preferences
        const prefsDoc = await db.doc(`users/${userId}/settings/preferences`).get();
        const prefs = prefsDoc.data() || {};

        // Skip if weekly report is disabled
        if (!prefs.weeklyReport) {
          continue;
        }

        // Skip if email notifications are disabled
        if (prefs.emailNotifications === false) {
          continue;
        }

        // Get user's projects from last week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const projectsSnapshot = await db
          .collection('projects')
          .where('ownerId', '==', userId)
          .get();

        const tasksSnapshot = await db
          .collection('tasks')
          .where('assignedTo', '==', userId)
          .where('updatedAt', '>=', oneWeekAgo)
          .get();

        // Build report data
        const reportData = {
          userName: userData.name || 'مستخدم',
          email: userData.email,
          projectCount: projectsSnapshot.size,
          taskCount: tasksSnapshot.size,
          completedTasks: tasksSnapshot.docs.filter(d => d.data().status === 'completed').length,
          weekEnding: new Date().toLocaleDateString('ar-SA')
        };

        // Create notification for user
        await db
          .collection('notifications')
          .doc(userId)
          .collection('items')
          .add({
            type: 'weekly_report',
            title: 'التقرير الأسبوعي',
            message: `تقريرك الأسبوعي جاهز: ${reportData.completedTasks} مهمة مكتملة من ${reportData.taskCount} مهمة`,
            read: false,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });

        sentCount++;

        // TODO: Actually send email via SendGrid/Resend
        // This would use the same email infrastructure as verification emails
        console.log(`Weekly report generated for user ${userId}`);
      }

      console.log(`Weekly reports sent to ${sentCount} users`);

      // Log to audit
      await db.collection('audit_logs').add({
        action: 'weekly_reports_sent',
        system: true,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        details: {
          count: sentCount
        }
      });

      return { sent: sentCount };
    } catch (error) {
      console.error('Error sending weekly reports:', error);
      return null;
    }
  });

// ============================================
// HELPER: Check User Notification Preference
// ============================================

/**
 * Check if user wants to receive a specific type of notification
 * Used by other functions before sending emails
 */
exports.checkUserNotificationPreference = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { userId, notificationType } = data;
  const targetUserId = userId || context.auth.uid;

  const prefsDoc = await db.doc(`users/${targetUserId}/settings/preferences`).get();
  const prefs = prefsDoc.data() || {};

  // Map notification types to preference keys
  const preferenceMap = {
    'email': prefs.emailNotifications !== false, // Default true
    'push': prefs.pushNotifications === true, // Default false
    'weekly_report': prefs.weeklyReport === true, // Default false
    'marketing': prefs.marketingEmails === true // Default false (GDPR)
  };

  return {
    allowed: preferenceMap[notificationType] ?? false
  };
});
