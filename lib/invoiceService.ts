'use client';

/**
 * Invoice Service
 * Handles invoice CRUD operations with Firestore
 * Deletion is blocked at Firestore rules level for compliance
 */

import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDocs,
    query,
    orderBy,
    where,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';

// Invoice item interface
export interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

// Invoice interface
export interface Invoice {
    id: string;
    invoiceNumber: string;
    userId: string;
    clientEmail: string;
    clientName: string;
    projectId?: string;
    projectTitle?: string;
    amount: number;
    currency: string;
    status: 'pending' | 'paid' | 'overdue';
    dueDate: string;
    createdAt: Timestamp | string;
    paidAt?: string;
    sentAt?: string;
    items?: InvoiceItem[];
    notes?: string;
}

// Create invoice params
export interface CreateInvoiceParams {
    userId: string;
    clientEmail: string;
    clientName: string;
    projectId?: string;
    projectTitle?: string;
    amount: number;
    currency?: string;
    dueDate: string;
    items?: InvoiceItem[];
    notes?: string;
}

/**
 * Generate invoice number in format INV-YYYY-XXXX
 */
export function generateInvoiceNumber(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-${year}-${random}`;
}

/**
 * Create a new invoice
 */
export async function createInvoice(params: CreateInvoiceParams): Promise<string> {
    try {
        const invoiceNumber = generateInvoiceNumber();

        const invoiceData = {
            invoiceNumber,
            userId: params.userId,
            clientEmail: params.clientEmail,
            clientName: params.clientName,
            projectId: params.projectId || null,
            projectTitle: params.projectTitle || null,
            amount: params.amount,
            currency: params.currency || 'SAR',
            status: 'pending',
            dueDate: params.dueDate,
            createdAt: serverTimestamp(),
            items: params.items || [],
            notes: params.notes || ''
        };

        const docRef = await addDoc(collection(db, 'invoices'), invoiceData);
        return docRef.id;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw new Error('فشل في إنشاء الفاتورة');
    }
}

/**
 * Update invoice status
 */
export async function updateInvoiceStatus(
    invoiceId: string,
    status: 'pending' | 'paid' | 'overdue'
): Promise<void> {
    try {
        const updates: Record<string, any> = { status };

        if (status === 'paid') {
            updates.paidAt = new Date().toISOString();
        }

        await updateDoc(doc(db, 'invoices', invoiceId), updates);
    } catch (error) {
        console.error('Error updating invoice status:', error);
        throw new Error('فشل في تحديث حالة الفاتورة');
    }
}

/**
 * Mark invoice as sent (email notification sent)
 */
export async function markInvoiceSent(invoiceId: string): Promise<void> {
    try {
        await updateDoc(doc(db, 'invoices', invoiceId), {
            sentAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error marking invoice as sent:', error);
        throw new Error('فشل في تحديث حالة الإرسال');
    }
}

/**
 * Get all invoices (Admin only)
 */
export async function getAllInvoices(): Promise<Invoice[]> {
    try {
        const q = query(
            collection(db, 'invoices'),
            orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Invoice[];
    } catch (error) {
        console.error('Error fetching invoices:', error);
        throw new Error('فشل في تحميل الفواتير');
    }
}

/**
 * Get invoices for a specific client
 */
export async function getClientInvoices(userId: string): Promise<Invoice[]> {
    try {
        const q = query(
            collection(db, 'invoices'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Invoice[];
    } catch (error) {
        console.error('Error fetching client invoices:', error);
        throw new Error('فشل في تحميل الفواتير');
    }
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: string = 'SAR'): string {
    return `${amount.toLocaleString('ar-SA')} ${currency}`;
}

/**
 * Calculate invoice totals from items
 */
export function calculateInvoiceTotal(items: InvoiceItem[]): number {
    return items.reduce((sum, item) => sum + item.total, 0);
}

/**
 * Generate email body for invoice notification
 */
export function generateInvoiceEmailBody(invoice: Invoice): string {
    const status = invoice.status === 'paid' ? 'مدفوعة' :
        invoice.status === 'overdue' ? 'متأخرة' : 'قيد الانتظار';

    return `
مرحباً ${invoice.clientName}،

تم إصدار فاتورة جديدة لكم من NovaArab.

رقم الفاتورة: ${invoice.invoiceNumber}
المبلغ: ${formatCurrency(invoice.amount, invoice.currency)}
تاريخ الاستحقاق: ${new Date(invoice.dueDate).toLocaleDateString('ar-SA')}
الحالة: ${status}

${invoice.notes ? `ملاحظات: ${invoice.notes}` : ''}

يمكنكم عرض الفاتورة كاملة من خلال لوحة التحكم.

مع أطيب التحيات،
فريق NovaArab
    `.trim();
}

/**
 * Open email client with invoice details
 */
export function openInvoiceEmail(invoice: Invoice): void {
    const subject = encodeURIComponent(`فاتورة ${invoice.invoiceNumber} من NovaArab`);
    const body = encodeURIComponent(generateInvoiceEmailBody(invoice));

    window.open(`mailto:${invoice.clientEmail}?subject=${subject}&body=${body}`, '_blank');
}
