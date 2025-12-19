"use client";

import { Shield, Lock, Eye, FileCheck, Users, Database, Bell, Mail, Scale, Globe, CheckCircle, AlertCircle } from 'lucide-react';

// Section Component
interface SectionProps {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
    id?: string;
}

function Section({ icon: Icon, title, children, id }: SectionProps) {
    return (
        <div className="mb-12 scroll-mt-24" id={title.toLowerCase().replace(/\s+/g, '-')}>
            <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
                </div>
            </div>
            <div className="pl-16 space-y-4 text-muted-foreground leading-relaxed">
                {children}
            </div>
        </div>
    );
}

// Subsection Component
interface SubsectionProps {
    title: string;
    children: React.ReactNode;
}

function Subsection({ title, children }: SubsectionProps) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
            <div className="space-y-3 text-muted-foreground">
                {children}
            </div>
        </div>
    );
}

// List Item Component
interface ListItemProps {
    children: React.ReactNode;
}

function ListItem({ children }: ListItemProps) {
    return (
        <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <span>{children}</span>
        </li>
    );
}

// Table of Contents Component
interface TOCSection {
    id: string;
    title: string;
}

interface TableOfContentsProps {
    sections: TOCSection[];
    activeSection: string | null;
    onSectionClick: (id: string) => void;
}

function TableOfContents({ sections, activeSection, onSectionClick }: TableOfContentsProps) {
    return (
        <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">جدول المحتويات</h3>
            <nav className="space-y-2">
                {sections.map((section, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSectionClick(section.id)}
                        className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-all ${activeSection === section.id
                            ? 'bg-blue-500/10 text-blue-400 font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                    >
                        {idx + 1}. {section.title}
                    </button>
                ))}
            </nav>
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
        <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl">
            <Icon className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
    );
}

// Main Privacy Page Component
export default function PrivacyPage() {
    const sections = [
        { id: 'introduction', title: 'المقدمة' },
        { id: 'information-collection', title: 'المعلومات التي نجمعها' },
        { id: 'use-of-information', title: 'كيف نستخدم المعلومات' },
        { id: 'data-sharing', title: 'مشاركة البيانات والإفصاح عنها' },
        { id: 'data-security', title: 'أمن البيانات' },
        { id: 'data-retention', title: 'الاحتفاظ بالبيانات' },
        { id: 'your-rights', title: 'حقوقك' },
        { id: 'cookies', title: 'ملفات تعريف الارتباط والتتبع' },
        { id: 'international', title: 'النقل الدولي' },
        { id: 'children', title: 'خصوصية الأطفال' },
        { id: 'changes', title: 'التغييرات على هذه السياسة' },
        { id: 'contact', title: 'معلومات الاتصال' }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-slate-950 to-purple-600/5"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Shield className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-300 font-medium">وثيقة قانونية</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            سياسة الخصوصية
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                            تلتزم NovaArab بحماية خصوصيتك وضمان أمن معلوماتك الشخصية. توضح هذه السياسة ممارساتنا فيما يتعلق بجمع البيانات واستخدامها وحمايتها.
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            <ComplianceBadge icon={CheckCircle} title="متوافق مع GDPR" />
                            <ComplianceBadge icon={Shield} title="SOC 2 Type II" />
                            <ComplianceBadge icon={Lock} title="ISO 27001" />
                            <ComplianceBadge icon={Globe} title="جاهز لـ CCPA" />
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <FileCheck className="w-4 h-4" />
                                <span>آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bell className="w-4 h-4" />
                                <span>ساري المفعول: 1 يناير 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar - Table of Contents */}
                    <div className="lg:col-span-1">
                        <TableOfContents
                            sections={sections}
                            activeSection={null}
                            onSectionClick={scrollToSection}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-card/50 border border-border rounded-3xl p-8 md:p-12">

                            {/* Introduction */}
                            <Section icon={FileCheck} title="1. المقدمة" id="introduction">
                                <p>
                                    مرحباً بك في سياسة الخصوصية الخاصة بـ NovaArab. توضح هذه الوثيقة كيفية جمع واستخدام وتخزين وحماية معلوماتك الشخصية عند استخدام خدماتنا أو زيارة موقعنا الإلكتروني أو التفاعل مع منصتنا.
                                </p>
                                <p>
                                    باستخدام خدماتنا، فإنك توافق على جمع واستخدام المعلومات وفقاً لهذه السياسة. إذا كنت لا توافق على سياساتنا وممارساتنا، يرجى عدم استخدام خدماتنا.
                                </p>
                                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mt-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-blue-200 font-semibold mb-1">إشعار مهم</p>
                                            <p className="text-blue-300/80 text-sm">
                                                تنطبق هذه السياسة على جميع خدمات وموا قع وتطبيقات NovaArab. قد نقوم بتحديث هذه السياسة بشكل دوري، وسنخطرك بالتغييرات الهامة.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            {/* Information Collection */}
                            <Section icon={Database} title="2. المعلومات التي نجمعها" id="information-collection">
                                <Subsection title="2.1 المعلومات التي تقدمها">
                                    <p>نجمع المعلومات التي تقدمها طوعاً عند استخدام خدماتنا:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>معلومات الحساب (الاسم، البريد الإلكتروني، رقم الهاتف، تفاصيل الشركة)</ListItem>
                                        <ListItem>معلومات الدفع (تتم معالجتها بشكل آمن من خلال معالجي الدفع الخارجيين)</ListItem>
                                        <ListItem>تفاصيل ومواصفات المشروع التي تقدمها من خلال نماذجنا</ListItem>
                                        <ListItem>الاتصالات مع فريق الدعم وخدمة العملاء لدينا</ListItem>
                                        <ListItem>التعليقات والمراجعات واستجابات الاستبيان</ListItem>
                                    </ul>
                                </Subsection>

                                <Subsection title="2.2 المعلومات المجمعة تلقائياً">
                                    <p>نقوم تلقائياً بجمع معلومات معينة عند استخدام خدماتنا:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>معلومات الجهاز (عنوان IP، نوع المتصفح، نظام التشغيل)</ListItem>
                                        <ListItem>بيانات الاستخدام (الصفحات التي تمت زيارتها، الوقت المستغرق، الميزات المستخدمة)</ListItem>
                                        <ListItem>بيانات الموقع (الموقع التقريبي بناءً على عنوان IP)</ListItem>
                                        <ListItem>ملفات تعريف الارتباط وتقنيات التتبع المماثلة</ListItem>
                                    </ul>
                                </Subsection>

                                <Subsection title="2.3 المعلومات من أطراف ثالثة">
                                    <p>قد نتلقى معلومات من:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>خدمات المصادقة (Google، LinkedIn) إذا اخترت استخدامها</ListItem>
                                        <ListItem>مزودي التحليلات لفهم كيفية تفاعل المستخدمين مع خدماتنا</ListItem>
                                        <ListItem>شركاء الأعمال والشركات التابعة للمشاريع التعاونية</ListItem>
                                    </ul>
                                </Subsection>
                            </Section>

                            {/* Use of Information */}
                            <Section icon={Eye} title="3. How We Use Your Information" id="use-of-information">
                                <p>We use your information for the following purposes:</p>
                                <Subsection title="3.1 Service Provision">
                                    <ul className="space-y-2">
                                        <ListItem>To provide, maintain, and improve our services</ListItem>
                                        <ListItem>To process your transactions and manage your account</ListItem>
                                        <ListItem>To deliver the projects and services you request</ListItem>
                                        <ListItem>To provide customer support and respond to inquiries</ListItem>
                                    </ul>
                                </Subsection>

                                <Subsection title="3.2 Communication">
                                    <ul className="space-y-2">
                                        <ListItem>To send you service updates, technical notices, and security alerts</ListItem>
                                        <ListItem>To provide customer support and respond to your requests</ListItem>
                                        <ListItem>To send marketing communications (with your consent)</ListItem>
                                        <ListItem>To conduct surveys and gather feedback</ListItem>
                                    </ul>
                                </Subsection>

                                <Subsection title="3.3 Analytics and Improvement">
                                    <ul className="space-y-2">
                                        <ListItem>To analyze usage patterns and improve our services</ListItem>
                                        <ListItem>To develop new features and functionality</ListItem>
                                        <ListItem>To personalize your experience</ListItem>
                                        <ListItem>To detect and prevent fraud, security issues, and technical problems</ListItem>
                                    </ul>
                                </Subsection>
                            </Section>

                            {/* Data Sharing */}
                            <Section icon={Users} title="4. Data Sharing and Disclosure" id="data-sharing">
                                <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
                                <Subsection title="4.1 Service Providers">
                                    <p>We may share information with trusted third-party service providers who assist us in:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Payment processing and billing</ListItem>
                                        <ListItem>Cloud hosting and data storage</ListItem>
                                        <ListItem>Email delivery and communication services</ListItem>
                                        <ListItem>Analytics and performance monitoring</ListItem>
                                    </ul>
                                    <p className="mt-3">These providers are contractually obligated to protect your data and use it only for the purposes we specify.</p>
                                </Subsection>

                                <Subsection title="4.2 Legal Requirements">
                                    <p>We may disclose information when required by law or to:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>Comply with legal obligations, court orders, or government requests</ListItem>
                                        <ListItem>Enforce our terms of service and protect our rights</ListItem>
                                        <ListItem>Protect against fraud and ensure platform security</ListItem>
                                        <ListItem>Protect the safety of our users and the public</ListItem>
                                    </ul>
                                </Subsection>

                                <Subsection title="4.3 Business Transfers">
                                    <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity, subject to the same privacy protections.</p>
                                </Subsection>
                            </Section>

                            {/* Data Security */}
                            <Section icon={Lock} title="5. Data Security" id="data-security">
                                <p>We implement industry-standard security measures to protect your personal information:</p>
                                <ul className="space-y-2 mt-4">
                                    <ListItem>
                                        <strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using TLS/SSL protocols. Sensitive data at rest is encrypted using AES-256 encryption.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Access Controls:</strong> We implement strict access controls and authentication mechanisms. Only authorized personnel have access to personal data, and access is logged and monitored.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Regular Audits:</strong> We conduct regular security audits, vulnerability assessments, and penetration testing to identify and address potential security issues.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Incident Response:</strong> We have procedures in place to detect, respond to, and recover from security incidents. We will notify affected users in accordance with applicable laws.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Employee Training:</strong> Our team receives regular training on data protection, privacy, and security best practices.
                                    </ListItem>
                                </ul>
                                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mt-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-amber-200 font-semibold mb-1">Security Notice</p>
                                            <p className="text-amber-300/80 text-sm">
                                                While we implement robust security measures, no method of transmission or storage is 100% secure. We cannot guarantee absolute security, but we continuously work to improve our security practices.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Section>

                            {/* Data Retention */}
                            <Section icon={Database} title="6. Data Retention" id="data-retention">
                                <p>We retain your personal information for as long as necessary to:</p>
                                <ul className="space-y-2 mt-4">
                                    <ListItem>Provide our services and maintain your account</ListItem>
                                    <ListItem>Comply with legal, tax, and accounting obligations</ListItem>
                                    <ListItem>Resolve disputes and enforce our agreements</ListItem>
                                    <ListItem>Improve our services and conduct analytics</ListItem>
                                </ul>
                                <p className="mt-4">
                                    When we no longer need your information, we will securely delete or anonymize it. You may request deletion of your account and associated data at any time, subject to legal retention requirements.
                                </p>
                            </Section>

                            {/* Your Rights */}
                            <Section icon={Scale} title="7. Your Privacy Rights" id="your-rights">
                                <p>You have the following rights regarding your personal information:</p>
                                <ul className="space-y-3 mt-4">
                                    <ListItem>
                                        <strong>Access:</strong> You have the right to access and receive a copy of your personal data.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Rectification:</strong> You can request correction of inaccurate or incomplete data.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Deletion:</strong> You can request deletion of your personal data, subject to legal requirements.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Portability:</strong> You can request your data in a structured, machine-readable format.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Restriction:</strong> You can request restriction of processing under certain circumstances.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Objection:</strong> You can object to processing based on legitimate interests.
                                    </ListItem>
                                    <ListItem>
                                        <strong>Withdraw Consent:</strong> Where processing is based on consent, you can withdraw it at any time.
                                    </ListItem>
                                </ul>
                                <p className="mt-4">
                                    To exercise these rights, please contact our Data Protection Officer at privacy@NovaArab.com. We will respond to your request within 30 days.
                                </p>
                            </Section>

                            {/* Cookies */}
                            <Section icon={Eye} title="8. Cookies and Tracking Technologies" id="cookies">
                                <p>We use cookies and similar technologies to enhance your experience and analyze usage patterns. Types of cookies we use:</p>
                                <Subsection title="8.1 Essential Cookies">
                                    <p>Required for the website to function properly. These cannot be disabled.</p>
                                </Subsection>
                                <Subsection title="8.2 Analytics Cookies">
                                    <p>Help us understand how visitors interact with our website by collecting anonymous information.</p>
                                </Subsection>
                                <Subsection title="8.3 Marketing Cookies">
                                    <p>Used to track visitors across websites to display relevant advertisements.</p>
                                </Subsection>
                                <p className="mt-4">
                                    You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
                                </p>
                            </Section>

                            {/* International Transfers */}
                            <Section icon={Globe} title="9. International Data Transfers" id="international">
                                <p>
                                    Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place, including:
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <ListItem>Standard Contractual Clauses approved by the European Commission</ListItem>
                                    <ListItem>Adequacy decisions recognizing equivalent data protection levels</ListItem>
                                    <ListItem>Binding Corporate Rules for intra-group transfers</ListItem>
                                </ul>
                            </Section>

                            {/* Children's Privacy */}
                            <Section icon={Users} title="10. Children's Privacy" id="children">
                                <p>
                                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will promptly delete it. If you believe we have collected information from a child, please contact us immediately.
                                </p>
                            </Section>

                            {/* Changes to Policy */}
                            <Section icon={Bell} title="11. Changes to This Privacy Policy" id="changes">
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by:
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <ListItem>Posting the updated policy on our website with a new "Last Updated" date</ListItem>
                                    <ListItem>Sending you an email notification if you have an account with us</ListItem>
                                    <ListItem>Displaying a prominent notice on our website</ListItem>
                                </ul>
                                <p className="mt-4">
                                    Your continued use of our services after such changes constitutes acceptance of the updated policy.
                                </p>
                            </Section>

                            {/* Contact Information */}
                            <Section icon={Mail} title="12. Contact Information" id="contact">
                                <p className="mb-6">
                                    If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-muted/50 border border-border rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Mail className="w-5 h-5 text-blue-400" />
                                            <h4 className="font-semibold text-foreground">Email</h4>
                                        </div>
                                        <p className="text-muted-foreground text-sm mb-2">Data Protection Officer</p>
                                        <a href="mailto:privacy@NovaArab.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                                            privacy@NovaArab.com
                                        </a>
                                    </div>

                                    <div className="bg-muted/50 border border-border rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Globe className="w-5 h-5 text-blue-400" />
                                            <h4 className="font-semibold text-foreground">Mailing Address</h4>
                                        </div>
                                        <p className="text-muted-foreground text-sm">
                                            NovaArab Technologies<br />
                                            King Fahd District<br />
                                            Riyadh, Saudi Arabia
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 mt-6">
                                    <p className="text-blue-200">
                                        <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 30 days. For urgent matters, please indicate "URGENT" in your subject line.
                                    </p>
                                </div>
                            </Section>

                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Notice */}
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                        <Shield className="w-4 h-4" />
                        <span>This privacy policy is compliant with GDPR, CCPA, and other applicable data protection regulations</span>
                    </div>
                </div>
            </div>
        </div>
    );
}