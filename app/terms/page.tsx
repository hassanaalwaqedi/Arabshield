"use client";

import { Scale, FileText, AlertCircle, CheckCircle, XCircle, DollarSign, Code, Shield, Users, Gavel, RefreshCw, Mail, Globe, Lock, Award } from 'lucide-react';

// Section Component
interface SectionProps {
    icon: React.ElementType;
    number: string;
    title: string;
    children: React.ReactNode;
}

function Section({ icon: Icon, number, title, children }: SectionProps) {
    return (
        <div className="mb-12 scroll-mt-24" id={`section-${number}`}>
            <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{number}. {title}</h2>
                </div>
            </div>
            <div className="pl-16 space-y-4 text-slate-400 leading-relaxed">
                {children}
            </div>
        </div>
    );
}

// Subsection Component
interface SubsectionProps {
    number: string;
    title: string;
    children: React.ReactNode;
}

function Subsection({ number, title, children }: SubsectionProps) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">{number} {title}</h3>
            <div className="space-y-3 text-slate-400">
                {children}
            </div>
        </div>
    );
}

// List Item Component
interface ListItemProps {
    children: React.ReactNode;
    type?: "check" | "x" | "alert";
}

function ListItem({ children, type = "check" }: ListItemProps) {
    const Icon = type === "check" ? CheckCircle : type === "x" ? XCircle : AlertCircle;
    const color = type === "check" ? "text-blue-400" : type === "x" ? "text-red-400" : "text-amber-400";

    return (
        <li className="flex items-start gap-3">
            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${color}`} />
            <span>{children}</span>
        </li>
    );
}

// Table of Contents Component
interface TableOfContentsProps {
    sections: string[];
    onSectionClick: (id: string) => void;
}

function TableOfContents({ sections, onSectionClick }: TableOfContentsProps) {
    return (
        <div className="sticky top-24 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Table of Contents</h3>
            <nav className="space-y-2">
                {sections.map((section, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSectionClick(`section-${idx + 1}`)}
                        className="w-full text-left text-sm py-2 px-3 rounded-lg transition-all text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                        {idx + 1}. {section}
                    </button>
                ))}
            </nav>
        </div>
    );
}

// Notice Box Component
interface NoticeBoxProps {
    type?: "info" | "warning" | "success";
    title: string;
    children: React.ReactNode;
}

function NoticeBox({ type = "info", title, children }: NoticeBoxProps) {
    const config = {
        info: {
            icon: AlertCircle,
            bgColor: "bg-blue-500/5",
            borderColor: "border-blue-500/20",
            iconColor: "text-blue-400",
            titleColor: "text-blue-200"
        },
        warning: {
            icon: AlertCircle,
            bgColor: "bg-amber-500/5",
            borderColor: "border-amber-500/20",
            iconColor: "text-amber-400",
            titleColor: "text-amber-200"
        },
        success: {
            icon: CheckCircle,
            bgColor: "bg-green-500/5",
            borderColor: "border-green-500/20",
            iconColor: "text-green-400",
            titleColor: "text-green-200"
        }
    };

    const { icon: Icon, bgColor, borderColor, iconColor, titleColor } = config[type];

    return (
        <div className={`${bgColor} border ${borderColor} rounded-xl p-4 my-6`}>
            <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
                <div>
                    <p className={`${titleColor} font-semibold mb-1`}>{title}</p>
                    <div className="text-sm opacity-90">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Compliance Badge Component
interface ComplianceBadgeProps {
    icon: React.ElementType;
    title: string;
}

function ComplianceBadge({ icon: Icon, title }: ComplianceBadgeProps) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl">
            <Icon className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-white">{title}</span>
        </div>
    );
}

// Main Terms Page Component
export default function TermsPage() {
    const sections = [
        'Acceptance of Terms',
        'Definitions',
        'Services Provided',
        'Account Registration',
        'Payment Terms',
        'Intellectual Property Rights',
        'Client Responsibilities',
        'Warranties and Disclaimers',
        'Limitation of Liability',
        'Indemnification',
        'Confidentiality',
        'Term and Termination',
        'Dispute Resolution',
        'Modifications to Terms',
        'Governing Law',
        'Contact Information'
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-slate-950 to-purple-600/5"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Scale className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-300 font-medium">Legal Agreement</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Terms of Service
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed mb-8">
                            These Terms of Service ("Terms") constitute a legally binding agreement between you and ArabShield Technologies ("ArabShield", "we", "us", or "our"). Please read these terms carefully before using our services.
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            <ComplianceBadge icon={Scale} title="Legally Binding" />
                            <ComplianceBadge icon={Shield} title="Fair Use Policy" />
                            <ComplianceBadge icon={Award} title="Industry Standard" />
                        </div>

                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RefreshCw className="w-4 h-4" />
                                <span>Effective: January 1, 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <TableOfContents sections={sections} onSectionClick={scrollToSection} />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">

                            {/* All 16 sections from the document */}
                            <Section icon={FileText} number="1" title="Acceptance of Terms">
                                <p>By accessing, browsing, or using the ArabShield website, mobile applications, or any of our services (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.</p>
                                <p>If you do not agree to these Terms, you must not access or use our Services. Your continued use of the Services following the posting of any changes to these Terms constitutes acceptance of those changes.</p>
                                <NoticeBox type="warning" title="Important Legal Notice">
                                    <p>These Terms contain provisions that limit our liability to you and require you to resolve disputes with us through binding arbitration on an individual basis, not as part of any class or representative action.</p>
                                </NoticeBox>
                            </Section>

                            <Section icon={FileText} number="2" title="Definitions">
                                <p>For the purposes of these Terms, the following definitions apply:</p>
                                <ul className="space-y-3 mt-4">
                                    <ListItem><strong>"Client"</strong> or <strong>"You"</strong> refers to the individual or entity using our Services.</ListItem>
                                    <ListItem><strong>"Services"</strong> means all products, services, and deliverables provided by ArabShield.</ListItem>
                                    <ListItem><strong>"Project"</strong> refers to any specific engagement or work assignment covered by a separate Statement of Work or project agreement.</ListItem>
                                    <ListItem><strong>"Deliverables"</strong> means all materials, code, designs, or work product created by ArabShield for the Client.</ListItem>
                                    <ListItem><strong>"Agreement"</strong> means these Terms together with any applicable project agreements or statements of work.</ListItem>
                                </ul>
                            </Section>

                            <Section icon={Code} number="3" title="Services Provided">
                                <Subsection number="3.1" title="Scope of Services">
                                    <p>ArabShield provides comprehensive technology services including, but not limited to:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Web application development and design</ListItem>
                                        <ListItem>Mobile application development (iOS and Android)</ListItem>
                                        <ListItem>Custom software development and integration</ListItem>
                                        <ListItem>Cloud infrastructure setup and management</ListItem>
                                        <ListItem>Cybersecurity consulting and implementation</ListItem>
                                        <ListItem>AI and machine learning solutions</ListItem>
                                        <ListItem>Technical consulting and support services</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="3.2" title="Project Agreements">
                                    <p>Specific deliverables, timelines, and project scope will be outlined in individual project agreements, statements of work (SOW), or proposals. In the event of any conflict between these Terms and a project agreement, the project agreement shall prevail with respect to that specific project.</p>
                                </Subsection>
                                <Subsection number="3.3" title="Service Modifications">
                                    <p>We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time. We will provide reasonable notice of material changes that affect existing projects.</p>
                                </Subsection>
                            </Section>

                            <Section icon={Users} number="4" title="Account Registration and Security">
                                <Subsection number="4.1" title="Account Creation">
                                    <p>To access certain Services, you may be required to create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.</p>
                                </Subsection>
                                <Subsection number="4.2" title="Account Security">
                                    <p>You are responsible for:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Maintaining the confidentiality of your account credentials</ListItem>
                                        <ListItem>All activities that occur under your account</ListItem>
                                        <ListItem>Notifying us immediately of any unauthorized use</ListItem>
                                        <ListItem>Ensuring your account information is accurate and up-to-date</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="4.3" title="Account Termination">
                                    <p>We reserve the right to suspend or terminate your account if we believe you have violated these Terms, engaged in fraudulent activity, or for any other reason at our sole discretion.</p>
                                </Subsection>
                            </Section>

                            <Section icon={DollarSign} number="5" title="Payment Terms">
                                <Subsection number="5.1" title="Fees and Pricing">
                                    <p>Fees for our Services are specified in project proposals or agreements. All fees are in US Dollars (USD) unless otherwise specified. Prices are subject to change with notice for future projects.</p>
                                </Subsection>
                                <Subsection number="5.2" title="Payment Schedule">
                                    <p>Payment terms are typically structured as follows unless otherwise agreed:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Initial deposit: 30-50% upon project commencement</ListItem>
                                        <ListItem>Milestone payments: As outlined in the project agreement</ListItem>
                                        <ListItem>Final payment: Upon project completion and delivery</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="5.3" title="Late Payments">
                                    <p>Invoices are due within 15 days of issuance unless otherwise specified. Late payments may incur a fee of 1.5% per month (18% annually) or the maximum allowed by law. We reserve the right to suspend work on projects with outstanding payments.</p>
                                </Subsection>
                                <Subsection number="5.4" title="Refund Policy">
                                    <p>Due to the custom nature of our services, deposits and payments for completed work are generally non-refundable. Refunds for uncompleted work may be considered on a case-by-case basis at our discretion.</p>
                                </Subsection>
                            </Section>

                            <Section icon={Lock} number="6" title="Intellectual Property Rights">
                                <Subsection number="6.1" title="Client Ownership">
                                    <p>Upon receipt of full payment, you will own the custom code and designs we create specifically for your project. This includes:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Custom application code and functionality</ListItem>
                                        <ListItem>Original design files and assets</ListItem>
                                        <ListItem>Project-specific documentation</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="6.2" title="ArabShield Retained Rights">
                                    <p>ArabShield retains ownership and all rights to:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Pre-existing code libraries, frameworks, and tools</ListItem>
                                        <ListItem>Generic components and reusable modules</ListItem>
                                        <ListItem>Development methodologies and processes</ListItem>
                                        <ListItem>General knowledge and expertise gained during the project</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="6.3" title="Portfolio Rights">
                                    <p>Unless otherwise agreed in writing, we reserve the right to:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Display completed projects in our portfolio</ListItem>
                                        <ListItem>Use project screenshots and descriptions for marketing</ListItem>
                                        <ListItem>Reference you as a client in proposals and case studies</ListItem>
                                    </ul>
                                    <p className="mt-3">If you require confidentiality, please notify us in writing before project commencement.</p>
                                </Subsection>
                                <Subsection number="6.4" title="Third-Party Components">
                                    <p>Projects may incorporate third-party libraries, frameworks, or services. You are responsible for complying with the licenses and terms of such third-party components.</p>
                                </Subsection>
                            </Section>

                            <Section icon={Users} number="7" title="Client Responsibilities">
                                <p>To ensure successful project delivery, you agree to:</p>
                                <ul className="space-y-3 mt-4">
                                    <ListItem>Provide timely feedback and approvals as requested</ListItem>
                                    <ListItem>Supply necessary materials, content, and information</ListItem>
                                    <ListItem>Designate authorized representatives for decision-making</ListItem>
                                    <ListItem>Provide access to required systems and environments</ListItem>
                                    <ListItem>Review deliverables and provide feedback within agreed timelines</ListItem>
                                    <ListItem>Make timely payments according to the agreed schedule</ListItem>
                                    <ListItem>Use the Services in compliance with applicable laws</ListItem>
                                </ul>
                                <NoticeBox type="info" title="Project Timeline Impact">
                                    <p>Delays in providing required materials, feedback, or approvals may impact project timelines. We will work with you to adjust schedules, but extended delays may require timeline and budget revisions.</p>
                                </NoticeBox>
                            </Section>

                            <Section icon={Shield} number="8" title="Warranties and Disclaimers">
                                <Subsection number="8.1" title="Limited Warranty">
                                    <p>We warrant that:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Services will be performed in a professional and workmanlike manner</ListItem>
                                        <ListItem>Deliverables will substantially conform to agreed specifications</ListItem>
                                        <ListItem>We have the right to provide the Services</ListItem>
                                    </ul>
                                    <p className="mt-3">For a period of 30 days after delivery, we will correct any defects or non-conformities in the deliverables at no additional charge.</p>
                                </Subsection>
                                <Subsection number="8.2" title="Disclaimer of Warranties">
                                    <p>EXCEPT AS EXPRESSLY PROVIDED ABOVE, OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem type="x">Implied warranties of merchantability or fitness for a particular purpose</ListItem>
                                        <ListItem type="x">Warranties regarding uninterrupted or error-free operation</ListItem>
                                        <ListItem type="x">Warranties that the Services will meet all your requirements</ListItem>
                                        <ListItem type="x">Warranties regarding security or freedom from viruses</ListItem>
                                    </ul>
                                </Subsection>
                            </Section>

                            <Section icon={AlertCircle} number="9" title="Limitation of Liability">
                                <p className="font-semibold text-white mb-4">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</p>
                                <Subsection number="9.1" title="Exclusion of Damages">
                                    <p>IN NO EVENT SHALL ARABSHIELD BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem type="x">Lost profits or revenue</ListItem>
                                        <ListItem type="x">Loss of data or business interruption</ListItem>
                                        <ListItem type="x">Cost of substitute services</ListItem>
                                        <ListItem type="x">Loss of business opportunities or goodwill</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="9.2" title="Cap on Liability">
                                    <p>OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO ARABSHIELD IN THE 12 MONTHS PRECEDING THE CLAIM, OR $1,000 USD, WHICHEVER IS GREATER.</p>
                                </Subsection>
                                <Subsection number="9.3" title="Exceptions">
                                    <p>These limitations do not apply to liability for:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Death or personal injury caused by our negligence</ListItem>
                                        <ListItem>Fraud or fraudulent misrepresentation</ListItem>
                                        <ListItem>Gross negligence or willful misconduct</ListItem>
                                        <ListItem>Violations of law that cannot be limited by contract</ListItem>
                                    </ul>
                                </Subsection>
                                <NoticeBox type="warning" title="Important Limitation">
                                    <p>Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages. In such jurisdictions, our liability is limited to the greatest extent permitted by law.</p>
                                </NoticeBox>
                            </Section>

                            <Section icon={Shield} number="10" title="Indemnification">
                                <p>You agree to indemnify, defend, and hold harmless ArabShield, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:</p>
                                <ul className="space-y-3 mt-4">
                                    <ListItem>Your use or misuse of the Services</ListItem>
                                    <ListItem>Your violation of these Terms</ListItem>
                                    <ListItem>Your violation of any rights of another party</ListItem>
                                    <ListItem>Content or materials you provide to us</ListItem>
                                    <ListItem>Your violation of applicable laws or regulations</ListItem>
                                </ul>
                                <p className="mt-4">We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of such claims.</p>
                            </Section>

                            <Section icon={Lock} number="11" title="Confidentiality">
                                <Subsection number="11.1" title="Mutual Obligations">
                                    <p>Both parties agree to maintain confidentiality of proprietary information shared during the engagement. Confidential information includes business plans, technical data, customer information, and other non-public information.</p>
                                </Subsection>
                                <Subsection number="11.2" title="Exceptions">
                                    <p>Confidentiality obligations do not apply to information that:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Is or becomes publicly available without breach of this agreement</ListItem>
                                        <ListItem>Was rightfully known prior to disclosure</ListItem>
                                        <ListItem>Is independently developed without use of confidential information</ListItem>
                                        <ListItem>Must be disclosed by law or court order</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="11.3" title="Duration">
                                    <p>Confidentiality obligations shall survive for three (3) years after the termination of the engagement or these Terms, unless otherwise specified in a separate confidentiality agreement.</p>
                                </Subsection>
                            </Section>

                            <Section icon={XCircle} number="12" title="Term and Termination">
                                <Subsection number="12.1" title="Termination for Convenience">
                                    <p>Either party may terminate the engagement upon 30 days' written notice. Upon termination, you shall pay for all work completed and expenses incurred up to the termination date.</p>
                                </Subsection>
                                <Subsection number="12.2" title="Termination for Cause">
                                    <p>Either party may terminate immediately upon written notice if the other party:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Materially breaches these Terms and fails to cure within 15 days</ListItem>
                                        <ListItem>Becomes insolvent or files for bankruptcy</ListItem>
                                        <ListItem>Engages in illegal or fraudulent activities</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="12.3" title="Effects of Termination">
                                    <p>Upon termination:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>All outstanding payments become immediately due</ListItem>
                                        <ListItem>We will deliver all completed work to date</ListItem>
                                        <ListItem>Rights to use our Services will cease</ListItem>
                                        <ListItem>Provisions that by their nature should survive will remain in effect</ListItem>
                                    </ul>
                                </Subsection>
                            </Section>

                            <Section icon={Gavel} number="13" title="Dispute Resolution">
                                <Subsection number="13.1" title="Negotiation">
                                    <p>In the event of any dispute, the parties agree to first attempt to resolve the matter through good faith negotiations for a period of 30 days.</p>
                                </Subsection>
                                <Subsection number="13.2" title="Mediation">
                                    <p>If negotiation fails, the parties agree to submit the dispute to non-binding mediation before pursuing litigation or arbitration.</p>
                                </Subsection>
                                <Subsection number="13.3" title="Arbitration">
                                    <p>Any disputes not resolved through negotiation or mediation shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Riyadh, Saudi Arabia, or another mutually agreed location.</p>
                                </Subsection>
                                <Subsection number="13.4" title="Class Action Waiver">
                                    <p>YOU AGREE THAT DISPUTES WILL BE RESOLVED ON AN INDIVIDUAL BASIS. YOU WAIVE ANY RIGHT TO BRING CLAIMS AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.</p>
                                </Subsection>
                            </Section>

                            <Section icon={RefreshCw} number="14" title="Modifications to Terms">
                                <p>We reserve the right to modify these Terms at any time. We will provide notice of material changes by:</p>
                                <ul className="space-y-2 mt-4">
                                    <ListItem>Posting the updated Terms on our website</ListItem>
                                    <ListItem>Sending email notification to registered users</ListItem>
                                    <ListItem>Displaying a prominent notice on our platform</ListItem>
                                </ul>
                                <p className="mt-4">Your continued use of the Services after such modifications constitutes acceptance of the updated Terms. If you do not agree to the modifications, you must stop using the Services.</p>
                            </Section>

                            <Section icon={Globe} number="15" title="Governing Law and Jurisdiction">
                                <p>These Terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, without regard to its conflict of law provisions.</p>
                                <p className="mt-4">Subject to the arbitration provisions above, you agree to submit to the exclusive jurisdiction of the courts located in Riyadh, Saudi Arabia, for resolution of any disputes.</p>
                            </Section>

                            <Section icon={Mail} number="16" title="Contact Information">
                                <p className="mb-6">For questions, concerns, or notices regarding these Terms, please contact us:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Mail className="w-5 h-5 text-blue-400" />
                                            <h4 className="font-semibold text-white">Email</h4>
                                        </div>
                                        <p className="text-slate-400 text-sm mb-2">Legal Department</p>
                                        <a href="mailto:legal@arabshield.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                                            legal@arabshield.com
                                        </a>
                                    </div>
                                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Globe className="w-5 h-5 text-blue-400" />
                                            <h4 className="font-semibold text-white">Mailing Address</h4>
                                        </div>
                                        <p className="text-slate-400 text-sm">
                                            ArabShield Technologies<br />
                                            King Fahd District<br />
                                            Riyadh, Saudi Arabia
                                        </p>
                                    </div>
                                </div>
                                <NoticeBox type="info" title="Legal Notices">
                                    <p>All legal notices must be sent in writing via email or certified mail to the addresses above. Notices will be deemed received upon confirmation of delivery.</p>
                                </NoticeBox>
                            </Section>

                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center text-slate-500 text-sm">
                        <p className="mb-2">© {new Date().getFullYear()} ArabShield Technologies. All rights reserved.</p>
                        <p>This is a legally binding document. Please review carefully and consult legal counsel if needed.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}