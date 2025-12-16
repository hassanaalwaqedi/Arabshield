'use client';

/**
 * Invoice PDF Generation Utility
 * Generates professional PDF invoices using jsPDF
 */

import { jsPDF } from 'jspdf';
import { Invoice, formatCurrency } from './invoiceService';

/**
 * Generate PDF for a single invoice
 * Returns a Blob that can be downloaded
 */
export function generateInvoicePDF(invoice: Invoice): Blob {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = margin;

    // Header - Company Logo/Name
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 45, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('ArabShield', pageWidth - margin, 25, { align: 'right' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Digital Solutions & Cybersecurity', pageWidth - margin, 32, { align: 'right' });

    // Invoice Title
    doc.setFontSize(14);
    doc.text('INVOICE', margin, 28);
    doc.setFontSize(10);
    doc.text(invoice.invoiceNumber || 'N/A', margin, 35);

    yPos = 60;

    // Invoice Details Section
    doc.setTextColor(51, 65, 85); // slate-600
    doc.setFontSize(10);

    // Left side - Bill To
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO', margin, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 6;
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.clientName || 'N/A', margin, yPos);
    yPos += 5;
    doc.text(invoice.clientEmail || 'N/A', margin, yPos);

    // Right side - Invoice Info
    const rightCol = pageWidth - margin - 60;
    let rightY = 60;

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Date:', rightCol, rightY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    const createdDate = invoice.createdAt ?
        (typeof invoice.createdAt === 'string' ? new Date(invoice.createdAt) : invoice.createdAt.toDate())
        : new Date();
    doc.text(createdDate.toLocaleDateString('en-US'), rightCol + 30, rightY);
    rightY += 6;

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'bold');
    doc.text('Due Date:', rightCol, rightY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-US') : 'N/A', rightCol + 30, rightY);
    rightY += 6;

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'bold');
    doc.text('Status:', rightCol, rightY);
    doc.setFont('helvetica', 'normal');
    const statusColors: Record<string, [number, number, number]> = {
        paid: [34, 197, 94],    // green
        pending: [234, 179, 8], // yellow
        overdue: [239, 68, 68]  // red
    };
    const statusColor = statusColors[invoice.status] || [107, 114, 128];
    doc.setTextColor(...statusColor);
    doc.text(invoice.status?.toUpperCase() || 'PENDING', rightCol + 30, rightY);

    yPos = 100;

    // Project (if any)
    if (invoice.projectTitle) {
        doc.setTextColor(51, 65, 85);
        doc.setFont('helvetica', 'bold');
        doc.text('Project:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        doc.text(invoice.projectTitle, margin + 20, yPos);
        yPos += 10;
    }

    yPos += 5;

    // Table Header
    doc.setFillColor(241, 245, 249); // slate-100
    doc.rect(margin, yPos, pageWidth - (margin * 2), 10, 'F');

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Description', margin + 5, yPos + 7);
    doc.text('Amount', pageWidth - margin - 5, yPos + 7, { align: 'right' });

    yPos += 15;

    // Table Row - Invoice Amount
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    doc.text('Professional Services', margin + 5, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text(`${invoice.amount?.toLocaleString() || '0'} ${invoice.currency || 'SAR'}`, pageWidth - margin - 5, yPos, { align: 'right' });

    yPos += 10;

    // Line
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(margin, yPos, pageWidth - margin, yPos);

    yPos += 10;

    // Total
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(pageWidth - margin - 70, yPos - 5, 70, 15, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('TOTAL:', pageWidth - margin - 65, yPos + 4);
    doc.text(`${invoice.amount?.toLocaleString() || '0'} ${invoice.currency || 'SAR'}`, pageWidth - margin - 5, yPos + 4, { align: 'right' });

    yPos += 30;

    // Notes
    if (invoice.notes) {
        doc.setTextColor(51, 65, 85);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('Notes:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        yPos += 6;
        doc.setTextColor(107, 114, 128);

        // Word wrap for notes
        const noteLines = doc.splitTextToSize(invoice.notes, pageWidth - (margin * 2));
        doc.text(noteLines, margin, yPos);
    }

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);

    doc.setTextColor(107, 114, 128);
    doc.setFontSize(8);
    doc.text('ArabShield - Digital Solutions & Cybersecurity', pageWidth / 2, footerY, { align: 'center' });
    doc.text('www.arabshield.sa | contact@arabshield.sa', pageWidth / 2, footerY + 5, { align: 'center' });

    return doc.output('blob');
}

/**
 * Download invoice as PDF
 */
export function downloadInvoicePDF(invoice: Invoice): void {
    const blob = generateInvoicePDF(invoice);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoice.invoiceNumber || invoice.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Open invoice PDF in new tab for printing
 */
export function printInvoicePDF(invoice: Invoice): void {
    const blob = generateInvoicePDF(invoice);
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}
