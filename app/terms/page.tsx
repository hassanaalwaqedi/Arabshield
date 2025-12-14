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
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">فهرس المحتويات</h3>
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
        'قبول الشروط',
        'التعريفات',
        'الخدمات المقدمة',
        'تسجيل الحساب',
        'شروط الدفع',
        'حقوق الملكية الفكرية',
        'مسؤوليات العميل',
        'الضمانات وإخلاء المسؤولية',
        'حدود المسؤولية',
        'التعويض',
        'السرية',
        'المدة والإنهاء',
        'حل النزاعات',
        'تعديلات على الشروط',
        'القانون الحاكم',
        'معلومات الاتصال'
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
                            <span className="text-sm text-blue-300 font-medium">اتفاقية قانونية</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            شروط الخدمة
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed mb-8">
                            تشكل شروط الخدمة هذه ("الشروط") اتفاقية ملزمة قانونياً بينك وبين ArabShield Technologies (فيما يلي "ArabShield" أو "نحن"). يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا.
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            <ComplianceBadge icon={Scale} title="ملزم قانونياً" />
                            <ComplianceBadge icon={Shield} title="سياسة الاستخدام العادل" />
                            <ComplianceBadge icon={Award} title="معيار الصناعة" />
                        </div>

                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span>آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RefreshCw className="w-4 h-4" />
                                <span>ساري من: 1 يناير 2024</span>
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
                            <Section icon={FileText} number="1" title="قبول الشروط">
                                <p>من خلال الوصول إلى موقع ArabShield أو تطبيقات الجوال أو تصفحها أو استخدامها، أو أي من خدماتنا (يشار إليها مجتمعة بـ "الخدمات")، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بشروط الخدمة هذه وسياسة الخصوصية الخاصة بنا.</p>
                                <p>إذا كنت لا توافق على هذه الشروط، يجب عليك عدم الوصول إلى خدماتنا أو استخدامها. استمرارك في استخدام الخدمات بعد نشر أي تغييرات على هذه الشروط يشكل قبولاً لتلك التغييرات.</p>
                                <NoticeBox type="warning" title="إشعار قانوني مهم">
                                    <p>تحتوي هذه الشروط على أحكام تحد من مسؤوليتنا تجاهك وتتطلب منك حل النزاعات معنا من خلال التحكيم الملزم على أساس فردي، وليس كجزء من أي دعوى جماعية أو تمثيلية.</p>
                                </NoticeBox>
                            </Section>

                            <Section icon={FileText} number="2" title="التعريفات">
                                <p>لأغراض هذه الشروط، تطبق التعريفات التالية:</p>
                                <ul className="space-y-3 mt-4">
                                    <ListItem><strong>"العميل"</strong> أو <strong>"أنت"</strong> يشير إلى الفرد أو الكيان الذي يستخدم خدماتنا.</ListItem>
                                    <ListItem><strong>"الخدمات"</strong> تعني جميع المنتجات والخدمات والمخرجات التي تقدمها ArabShield.</ListItem>
                                    <ListItem><strong>"المشروع"</strong> يشير إلى أي مشاركة محددة أو مهمة عمل مشمولة ببيان عمل منفصل أو اتفاقية مشروع.</ListItem>
                                    <ListItem><strong>"المخرجات"</strong> تعني جميع المواد أو الأكواد أو التصاميم أو منتجات العمل التي أنشأتها ArabShield للعميل.</ListItem>
                                    <ListItem><strong>"الاتفاقية"</strong> تعني هذه الشروط مع أي اتفاقيات مشروع أو بيانات عمل معمول بها.</ListItem>
                                </ul>
                            </Section>

                            <Section icon={Code} number="3" title="الخدمات المقدمة">
                                <Subsection number="3.1" title="نطاق الخدمات">
                                    <p>تقدم ArabShield خدمات تقنية شاملة تشمل، على سبيل المثال لا الحصر:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>تطوير وتصميم تطبيقات الويب</ListItem>
                                        <ListItem>تطوير تطبيقات الجوال (iOS و Android)</ListItem>
                                        <ListItem>تطوير البرمجيات المخصصة والتكامل</ListItem>
                                        <ListItem>إعداد وإدارة البنية التحتية السحابية</ListItem>
                                        <ListItem>استشارات وتنفيذ الأمن السيبراني</ListItem>
                                        <ListItem>حلول الذكاء الاصطناعي والتعلم الآلي</ListItem>
                                        <ListItem>خدمات الاستشارات الفنية والدعم</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="3.2" title="اتفاقيات المشروع">
                                    <p>سيتم تحديد المخرجات المحددة والجداول الزمنية ونطاق المشروع في اتفاقيات المشروع الفردية أو بيانات العمل أو المقترحات. في حالة حدوث أي تعارض بين هذه الشروط واتفاقية المشروع، تسود اتفاقية المشروع فيما يتعلق بذلك المشروع المحدد.</p>
                                </Subsection>
                                <Subsection number="3.3" title="تعديلات الخدمة">
                                    <p>نحتفظ بالحق في تعديل أو تعليق أو إيقاف أي جانب من جوانب خدماتنا في أي وقت. سنقدم إشعاراً معقولاً بالتغييرات الجوهرية التي تؤثر على المشاريع الحالية.</p>
                                </Subsection>
                            </Section>

                            <Section icon={Users} number="4" title="تسجيل الحساب والأمان">
                                <Subsection number="4.1" title="إنشاء الحساب">
                                    <p>للوصول إلى خدمات معينة، قد يُطلب منك إنشاء حساب. أنت توافق على تقديم معلومات دقيقة وحديثة وكاملة أثناء التسجيل وتحديث هذه المعلومات للحفاظ على دقتها وحداثتها واكتمالها.</p>
                                </Subsection>
                                <Subsection number="4.2" title="أمان الحساب">
                                    <p>أنت مسؤول عن:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>الحفاظ على سرية بيانات اعتماد حسابك</ListItem>
                                        <ListItem>جميع الأنشطة التي تحدث تحت حسابك</ListItem>
                                        <ListItem>إخطارنا فوراً بأي استخدام غير مصرح به</ListItem>
                                        <ListItem>التأكد من أن معلومات حسابك دقيقة ومحدثة</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="4.3" title="إنهاء الحساب">
                                    <p>نحتفظ بالحق في تعليق أو إنهاء حسابك إذا اعتقدنا أنك انتهكت هذه الشروط، أو انخرطت في نشاط احتيالي، أو لأي سبب آخر وفقاً لتقديرنا الوحيد.</p>
                                </Subsection>
                            </Section>

                            <Section icon={DollarSign} number="5" title="شروط الدفع">
                                <Subsection number="5.1" title="الرسوم والتسعير">
                                    <p>يتم تحديد رسوم خدماتنا في مقترحات المشروع أو الاتفاقيات. جميع الرسوم بالدولار الأمريكي (USD) ما لم يُذكر خلاف ذلك. الأسعار قابلة للتغيير مع إشعار للمشاريع المستقبلية.</p>
                                </Subsection>
                                <Subsection number="5.2" title="جدول الدفع">
                                    <p>عادة ما يتم هيكلة شروط الدفع على النحو التالي ما لم يُتفق على خلاف ذلك:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>الدفعة الأولية: 30-50% عند بدء المشروع</ListItem>
                                        <ListItem>مدفوعات المعالم: كما هو موضح في اتفاقية المشروع</ListItem>
                                        <ListItem>الدفعة النهائية: عند اكتمال المشروع وتسليمه</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="5.3" title="التأخر في الدفع">
                                    <p>الفواتير مستحقة الدفع في غضون 15 يوماً من تاريخ الإصدار ما لم يُذكر خلاف ذلك. قد تتحمل المدفوعات المتأخرة رسوماً بنسبة 1.5% شهرياً (18% سنوياً) أو الحد الأقصى المسموح به بموجب القانون. نحتفظ بالحق في تعليق العمل على المشاريع ذات المدفوعات المستحقة.</p>
                                </Subsection>
                                <Subsection number="5.4" title="سياسة الاسترداد">
                                    <p>نظراً لطبيعة خدماتنا المخصصة، فإن الودائع والمدفوعات للعمل المكتمل غير قابلة للاسترداد بشكل عام. قد يتم النظر في استرداد الأموال للعمل غير المكتمل على أساس كل حالة على حدة وفقاً لتقديرنا.</p>
                                </Subsection>
                            </Section>

                            <Section icon={Lock} number="6" title="حقوق الملكية الفكرية">
                                <Subsection number="6.1" title="ملكية العميل">
                                    <p>عند استلام الدفع الكامل، ستمتلك الأكواد والتصاميم المخصصة التي أنشأناها خصيصاً لمشروعك. ويشمل ذلك:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>كود التطبيق المخصص والوظائف</ListItem>
                                        <ListItem>ملفات التصميم الأصلية والأصول</ListItem>
                                        <ListItem>الوثائق الخاصة بالمشروع</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="6.2" title="الحقوق المحتفظ بها لـ ArabShield">
                                    <p>تحتفظ ArabShield بالملكية وجميع الحقوق في:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>مكتبات الأكواد الموجودة مسبقاً والأطر والأدوات</ListItem>
                                        <ListItem>المكونات العامة والوحدات القابلة لإعادة الاستخدام</ListItem>
                                        <ListItem>منهجيات وعمليات التطوير</ListItem>
                                        <ListItem>المعرفة العامة والخبرة المكتسبة أثناء المشروع</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="6.3" title="حقوق المحفظة">
                                    <p>ما لم يُتفق على خلاف ذلك كتابياً، نحتفظ بالحق في:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>عرض المشاريع المكتملة في محفظتنا</ListItem>
                                        <ListItem>استخدام لقطات شاشة ووصفات للمشروع للتسويق</ListItem>
                                        <ListItem>الإشارة إليك كعميل في المقترحات ودراسات الحالة</ListItem>
                                    </ul>
                                    <p className="mt-3">إذا كنت تطلب السرية، يُرجى إخطارنا كتابياً قبل بدء المشروع.</p>
                                </Subsection>
                                <Subsection number="6.4" title="مكونات الطرف الثالث">
                                    <p>قد تتضمن المشاريع مكتبات أو أطر أو خدمات من طرف ثالث. أنت مسؤول عن الامتثال لتراخيص وشروط مكونات الطرف الثالث هذه.</p>
                                </Subsection>
                            </Section>

                            <Section icon={Users} number="7" title="مسؤوليات العميل">
                                <p>لضمان تسليم المشروع بنجاح، أنت توافق على:</p>
                                <ul className="space-y-3 mt-4">
                                    <ListItem>تقديم الملاحظات والموافقات في الوقت المناسب كما هو مطلوب</ListItem>
                                    <ListItem>توفير المواد والمحتوى والمعلومات الضرورية</ListItem>
                                    <ListItem>تعيين ممثلين مفوضين لاتخاذ القرارات</ListItem>
                                    <ListItem>توفير الوصول إلى الأنظمة والبيئات المطلوبة</ListItem>
                                    <ListItem>مراجعة المخرجات وتقديم الملاحظات ضمن الجداول الزمنية المتفق عليها</ListItem>
                                    <ListItem>سداد المدفوعات في الوقت المحدد وفقاً للجدول المتفق عليه</ListItem>
                                    <ListItem>استخدام الخدمات بما يتوافق مع القوانين المعمول بها</ListItem>
                                </ul>
                                <NoticeBox type="info" title="تأثير الجدول الزمني للمشروع">
                                    <p>قد تؤثر التأخيرات في تقديم المواد المطلوبة أو الملاحظات أو الموافقات على الجداول الزمنية للمشروع. سنعمل معك لتعديل الجداول، لكن التأخيرات الممتدة قد تتطلب مراجعة الجداول الزمنية والميزانية.</p>
                                </NoticeBox>
                            </Section>

                            <Section icon={Shield} number="8" title="الضمانات وإخلاء المسؤولية">
                                <Subsection number="8.1" title="ضمان محدود">
                                    <p>نضمن أن:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>سيتم تنفيذ الخدمات بطريقة احترافية ومهنية</ListItem>
                                        <ListItem>ستتوافق المخرجات بشكل كبير مع المواصفات المتفق عليها</ListItem>
                                        <ListItem>لدينا الحق في تقديم الخدمات</ListItem>
                                    </ul>
                                    <p className="mt-3">لمدة 30 يوماً بعد التسليم، سنقوم بتصحيح أي عيوب أو عدم توافق في المخرجات دون أي رسوم إضافية.</p>
                                </Subsection>
                                <Subsection number="8.2" title="إخلاء المسؤولية عن الضمانات">
                                    <p>باستثناء ما هو منصوص عليه صراحة أعلاه، يتم تقديم خدماتنا "كما هي" و"كما هي متاحة" دون ضمانات من أي نوع، صريحة أو ضمنية، بما في ذلك على سبيل المثال لا الحصر:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem type="x">الضمانات الضمنية للتسويق أو الملاءمة لغرض معين</ListItem>
                                        <ListItem type="x">الضمانات المتعلقة بالتشغيل دون انقطاع أو خالي من الأخطاء</ListItem>
                                        <ListItem type="x">الضمانات بأن الخدمات ستلبي جميع متطلباتك</ListItem>
                                        <ListItem type="x">الضمانات المتعلقة بالأمان أو الخلو من الفيروسات</ListItem>
                                    </ul>
                                </Subsection>
                            </Section>

                            <Section icon={AlertCircle} number="9" title="تحديد المسؤولية">
                                <p className="font-semibold text-white mb-4">إلى أقصى حد يسمح به القانون المعمول به:</p>
                                <Subsection number="9.1" title="استبعاد الأضرار">
                                    <p>لن تكون ArabShield مسؤولة بأي حال عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك على سبيل المثال لا الحصر:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem type="x">الأرباح أو الإيرادات المفقودة</ListItem>
                                        <ListItem type="x">فقدان البيانات أو انقطاع الأعمال</ListItem>
                                        <ListItem type="x">تكلفة الخدمات البديلة</ListItem>
                                        <ListItem type="x">فقدان فرص العمل أو السمعة التجارية</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="9.2" title="حد المسؤولية">
                                    <p>لن تتجاوز مسؤوليتنا الإجمالية عن أي مطالبات ناشئة عن أو متعلقة بهذه الشروط أو الخدمات المبلغ الإجمالي المدفوع من قبلك إلى ArabShield في الـ 12 شهراً السابقة للمطالبة، أو 1,000 دولار أمريكي، أيهما أكبر.</p>
                                </Subsection>
                                <Subsection number="9.3" title="الاستثناءات">
                                    <p>هذه القيود لا تنطبق على المسؤولية عن:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>الوفاة أو الإصابة الشخصية الناجمة عن إهمالنا</ListItem>
                                        <ListItem>الاحتيال أو التحريف الاحتيالي</ListItem>
                                        <ListItem>الإهمال الجسيم أو سوء السلوك المتعمد</ListItem>
                                        <ListItem>انتهاكات القانون التي لا يمكن تحديدها بموجب العقد</ListItem>
                                    </ul>
                                </Subsection>
                                <NoticeBox type="warning" title="قيد مهم">
                                    <p>بعض الولايات القضائية لا تسمح باستبعاد أو تحديد المسؤولية عن الأضرار التبعية أو العرضية. في مثل هذه الولايات، تكون مسؤوليتنا محدودة إلى أقصى حد يسمح به القانون.</p>
                                </NoticeBox>
                            </Section>

                            <Section icon={Shield} number="10" title="التعويض">
                                <p>توافق على تعويض ودافع وعدم تحميل ArabShield ومسؤوليها ومديريها وموظفيها ووكلائها والشركات التابعة لها من وضد أي وجميع المطالبات والالتزامات والأضرار والخسائر والتكاليف والنفقات أو الرسوم (بما في ذلك أتعاب المحاماة المعقولة) الناشئة عن:</p>
                                <ul className="space-y-3 mt-4">
                                    <ListItem>استخدامك أو إساءة استخدامك للخدمات</ListItem>
                                    <ListItem>انتهاكك لهذه الشروط</ListItem>
                                    <ListItem>انتهاكك لأي حقوق لطرف آخر</ListItem>
                                    <ListItem>المحتوى أو المواد التي تقدمها لنا</ListItem>
                                    <ListItem>انتهاكك للقوانين أو اللوائح المعمول بها</ListItem>
                                </ul>
                                <p className="mt-4">نحتفظ بالحق في تولي الدفاع الحصري والسيطرة على أي مسألة تخضع للتعويض من قبلك، وتوافق على التعاون مع دفاعنا عن هذه المطالبات.</p>
                            </Section>

                            <Section icon={Lock} number="11" title="السرية">
                                <Subsection number="11.1" title="الالتزامات المتبادلة">
                                    <p>يوافق كلا الطرفين على الحفاظ على سرية المعلومات الخاصة المشتركة خلال التعامل. تشمل المعلومات السرية خطط الأعمال والبيانات التقنية ومعلومات العملاء وغيرها من المعلومات غير العامة.</p>
                                </Subsection>
                                <Subsection number="11.2" title="الاستثناءات">
                                    <p>لا تنطبق التزامات السرية على المعلومات التي:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>هي أو تصبح متاحة للجمهور دون خرق لهذه الاتفاقية</ListItem>
                                        <ListItem>كانت معروفة بحق قبل الإفصاح</ListItem>
                                        <ListItem>تم تطويرها بشكل مستقل دون استخدام المعلومات السرية</ListItem>
                                        <ListItem>يجب الإفصاح عنها بموجب القانون أو أمر من المحكمة</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="11.3" title="المدة">
                                    <p>تستمر التزامات السرية لمدة ثلاث (3) سنوات بعد إنهاء التعامل أو هذه الشروط، ما لم ينص على خلاف ذلك في اتفاقية سرية منفصلة.</p>
                                </Subsection>
                            </Section>

                            <Section icon={XCircle} number="12" title="المدة والإنهاء">
                                <Subsection number="12.1" title="الإنهاء للراحة">
                                    <p>يجوز لأي من الطرفين إنهاء التعامل بإشعار كتابي مدته 30 يوماً. عند الإنهاء، يتعين عليك دفع ثمن جميع الأعمال المنجزة والنفقات المتكبدة حتى تاريخ الإنهاء.</p>
                                </Subsection>
                                <Subsection number="12.2" title="الإنهاء لسبب">
                                    <p>يجوز لأي من الطرفين الإنهاء فوراً بإشعار كتابي إذا كان الطرف الآخر:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>ينتهك هذه الشروط بشكل جوهري ويفشل في المعالجة خلال 15 يوماً</ListItem>
                                        <ListItem>يصبح معسراً أو يقدم طلب إفلاس</ListItem>
                                        <ListItem>ينخرط في أنشطة غير قانونية أو احتيالية</ListItem>
                                    </ul>
                                </Subsection>
                                <Subsection number="12.3" title="آثار الإنهاء">
                                    <p>عند الإنهاء:</p>
                                    <ul className="space-y-2 mt-3">
                                        <ListItem>تصبح جميع المدفوعات المستحقة مستحقة الدفع فوراً</ListItem>
                                        <ListItem>سنقوم بتسليم جميع الأعمال المنجزة حتى تاريخه</ListItem>
                                        <ListItem>ستتوقف الحقوق في استخدام خدماتنا</ListItem>
                                        <ListItem>ستظل الأحكام التي يجب أن تبقى سارية بطبيعتها</ListItem>
                                    </ul>
                                </Subsection>
                            </Section>

                            <Section icon={Gavel} number="13" title="حل النزاعات">
                                <Subsection number="13.1" title="التفاوض">
                                    <p>في حالة أي نزاع، يوافق الطرفان على محاولة حل المسألة أولاً من خلال مفاوضات حسنة النية لمدة 30 يوماً.</p>
                                </Subsection>
                                <Subsection number="13.2" title="الوساطة">
                                    <p>إذا فشل التفاوض، يوافق الطرفان على تقديم النزاع إلى وساطة غير ملزمة قبل متابعة التقاضي أو التحكيم.</p>
                                </Subsection>
                                <Subsection number="13.3" title="التحكيم">
                                    <p>سيتم حل أي نزاعات لم يتم حلها من خلال التفاوض أو الوساطة من خلال تحكيم ملزم وفقاً لقواعد جمعية التحكيم الأمريكية. سيتم التحكيم في الرياض، المملكة العربية السعودية، أو موقع آخر متفق عليه بشكل متبادل.</p>
                                </Subsection>
                                <Subsection number="13.4" title="تنازل عن الدعوى الجماعية">
                                    <p>توافق على أن النزاعات ستُحل على أساس فردي. تتنازل عن أي حق في رفع دعاوى بصفتك مدعياً أو عضواً في فئة في أي إجراء جماعي أو موحد أو تمثيلي.</p>
                                </Subsection>
                            </Section>

                            <Section icon={RefreshCw} number="14" title="التعديلات على الشروط">
                                <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقدم إشعاراً بالتغييرات الجوهرية من خلال:</p>
                                <ul className="space-y-2 mt-4">
                                    <ListItem>نشر الشروط المحدثة على موقعنا</ListItem>
                                    <ListItem>إرسال إشعار عبر البريد الإلكتروني إلى المستخدمين المسجلين</ListItem>
                                    <ListItem>عرض إشعار بارز على منصتنا</ListItem>
                                </ul>
                                <p className="mt-4">يُعتبر استمرارك في استخدام الخدمات بعد هذه التعديلات قبولاً للشروط المحدثة. إذا كنت لا توافق على التعديلات، يجب عليك التوقف عن استخدام الخدمات.</p>
                            </Section>

                            <Section icon={Globe} number="15" title="القانون الحاكم والاختصاص القضائي">
                                <p>تخضع هذه الشروط وتُفسر وفقاً لقوانين المملكة العربية السعودية، دون النظر إلى أحكام تعارض القوانين.</p>
                                <p className="mt-4">رهناً بأحكام التحكيم أعلاه، توافق على الخضوع للاختصاص الحصري للمحاكم الموجودة في الرياض، المملكة العربية السعودية، لحل أي نزاعات.</p>
                            </Section>

                            <Section icon={Mail} number="16" title="معلومات الاتصال">
                                <p className="mb-6">للأسئلة أو المخاوف أو الإشعارات المتعلقة بهذه الشروط، يرجى الاتصال بنا:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Mail className="w-5 h-5 text-blue-400" />
                                            <h4 className="font-semibold text-white">البريد الإلكتروني</h4>
                                        </div>
                                        <p className="text-slate-400 text-sm mb-2">القسم القانوني</p>
                                        <a href="mailto:legal@arabshield.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                                            legal@arabshield.com
                                        </a>
                                    </div>
                                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Globe className="w-5 h-5 text-blue-400" />
                                            <h4 className="font-semibold text-white">العنوان البريدي</h4>
                                        </div>
                                        <p className="text-slate-400 text-sm">
                                            ArabShield Technologies<br />
                                            حي الملك فهد<br />
                                            الرياض، المملكة العربية السعودية
                                        </p>
                                    </div>
                                </div>
                                <NoticeBox type="info" title="الإشعارات القانونية">
                                    <p>يجب إرسال جميع الإشعارات القانونية كتابةً عبر البريد الإلكتروني أو البريد المعتمد إلى العناوين المذكورة أعلاه. ستُعتبر الإشعارات مستلمة عند تأكيد التسليم.</p>
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
                        <p className="mb-2">© {new Date().getFullYear()} ArabShield Technologies. جميع الحقوق محفوظة.</p>
                        <p>هذه وثيقة ملزمة قانونياً. يرجى المراجعة بعناية واستشارة مستشار قانوني إذا لزم الأمر.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}