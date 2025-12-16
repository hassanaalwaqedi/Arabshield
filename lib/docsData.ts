/**
 * Documentation Data
 * Contains all documentation articles, video tutorials, and common issues
 */

// Documentation Categories
export const docCategories = [
    {
        id: 'getting-started',
        title: 'البداية',
        titleEn: 'Getting Started',
        description: 'ابدأ رحلتك مع ArabShield',
        icon: 'Rocket',
        articleCount: 25,
    },
    {
        id: 'core-concepts',
        title: 'المفاهيم الأساسية',
        titleEn: 'Core Concepts',
        description: 'تعرف على المفاهيم والمبادئ الأساسية',
        icon: 'BookOpen',
        articleCount: 40,
    },
    {
        id: 'api-reference',
        title: 'مرجع API',
        titleEn: 'API Reference',
        description: 'توثيق كامل لواجهات البرمجة',
        icon: 'Code',
        articleCount: 50,
    },
    {
        id: 'advanced-topics',
        title: 'مواضيع متقدمة',
        titleEn: 'Advanced Topics',
        description: 'استراتيجيات وتقنيات متقدمة',
        icon: 'Sparkles',
        articleCount: 35,
    },
];

// Documentation Articles (150 total)
export const docArticles: DocArticle[] = [
    // Getting Started (25 articles)
    { id: 'gs-1', slug: 'introduction', category: 'getting-started', title: 'مقدمة عن ArabShield', titleEn: 'Introduction to ArabShield', description: 'تعرف على منصة ArabShield وإمكانياتها', readTime: 5 },
    { id: 'gs-2', slug: 'quick-start', category: 'getting-started', title: 'البدء السريع', titleEn: 'Quick Start Guide', description: 'ابدأ في دقائق معدودة', readTime: 10 },
    { id: 'gs-3', slug: 'installation', category: 'getting-started', title: 'التثبيت', titleEn: 'Installation', description: 'طرق التثبيت المختلفة', readTime: 8 },
    { id: 'gs-4', slug: 'first-project', category: 'getting-started', title: 'مشروعك الأول', titleEn: 'Your First Project', description: 'أنشئ مشروعك الأول خطوة بخطوة', readTime: 15 },
    { id: 'gs-5', slug: 'account-setup', category: 'getting-started', title: 'إعداد الحساب', titleEn: 'Account Setup', description: 'إعداد وتهيئة حسابك', readTime: 5 },
    { id: 'gs-6', slug: 'dashboard-overview', category: 'getting-started', title: 'نظرة على لوحة التحكم', titleEn: 'Dashboard Overview', description: 'تعرف على لوحة التحكم', readTime: 7 },
    { id: 'gs-7', slug: 'navigation', category: 'getting-started', title: 'التنقل في المنصة', titleEn: 'Platform Navigation', description: 'كيفية التنقل بسهولة', readTime: 5 },
    { id: 'gs-8', slug: 'basic-concepts', category: 'getting-started', title: 'المفاهيم الأساسية', titleEn: 'Basic Concepts', description: 'مفاهيم يجب معرفتها', readTime: 10 },
    { id: 'gs-9', slug: 'terminology', category: 'getting-started', title: 'المصطلحات', titleEn: 'Terminology', description: 'قاموس المصطلحات المستخدمة', readTime: 8 },
    { id: 'gs-10', slug: 'best-practices', category: 'getting-started', title: 'أفضل الممارسات', titleEn: 'Best Practices', description: 'نصائح للبداية الصحيحة', readTime: 12 },
    { id: 'gs-11', slug: 'project-structure', category: 'getting-started', title: 'هيكل المشروع', titleEn: 'Project Structure', description: 'فهم بنية المشروع', readTime: 10 },
    { id: 'gs-12', slug: 'configuration', category: 'getting-started', title: 'التهيئة', titleEn: 'Configuration', description: 'ملفات التهيئة والإعدادات', readTime: 8 },
    { id: 'gs-13', slug: 'environment', category: 'getting-started', title: 'بيئة التطوير', titleEn: 'Development Environment', description: 'إعداد بيئة التطوير', readTime: 15 },
    { id: 'gs-14', slug: 'tools', category: 'getting-started', title: 'الأدوات المطلوبة', titleEn: 'Required Tools', description: 'الأدوات التي ستحتاجها', readTime: 7 },
    { id: 'gs-15', slug: 'ide-setup', category: 'getting-started', title: 'إعداد محرر الأكواد', titleEn: 'IDE Setup', description: 'تهيئة محرر الأكواد', readTime: 10 },
    { id: 'gs-16', slug: 'debugging', category: 'getting-started', title: 'تصحيح الأخطاء', titleEn: 'Debugging', description: 'أساسيات تصحيح الأخطاء', readTime: 12 },
    { id: 'gs-17', slug: 'testing-intro', category: 'getting-started', title: 'مقدمة للاختبار', titleEn: 'Testing Introduction', description: 'أساسيات الاختبار', readTime: 10 },
    { id: 'gs-18', slug: 'deployment-basics', category: 'getting-started', title: 'أساسيات النشر', titleEn: 'Deployment Basics', description: 'نشر تطبيقك لأول مرة', readTime: 15 },
    { id: 'gs-19', slug: 'security-basics', category: 'getting-started', title: 'أساسيات الأمان', titleEn: 'Security Basics', description: 'مفاهيم الأمان الأساسية', readTime: 10 },
    { id: 'gs-20', slug: 'performance-intro', category: 'getting-started', title: 'مقدمة للأداء', titleEn: 'Performance Introduction', description: 'تحسين الأداء الأساسي', readTime: 8 },
    { id: 'gs-21', slug: 'version-control', category: 'getting-started', title: 'التحكم بالإصدارات', titleEn: 'Version Control', description: 'استخدام Git مع المشروع', readTime: 12 },
    { id: 'gs-22', slug: 'collaboration', category: 'getting-started', title: 'العمل الجماعي', titleEn: 'Collaboration', description: 'العمل مع فريقك', readTime: 10 },
    { id: 'gs-23', slug: 'resources', category: 'getting-started', title: 'الموارد والمراجع', titleEn: 'Resources', description: 'مصادر تعليمية إضافية', readTime: 5 },
    { id: 'gs-24', slug: 'community', category: 'getting-started', title: 'المجتمع', titleEn: 'Community', description: 'انضم لمجتمع ArabShield', readTime: 5 },
    { id: 'gs-25', slug: 'support-channels', category: 'getting-started', title: 'قنوات الدعم', titleEn: 'Support Channels', description: 'كيفية الحصول على المساعدة', readTime: 5 },

    // Core Concepts (40 articles)
    { id: 'cc-1', slug: 'architecture', category: 'core-concepts', title: 'البنية المعمارية', titleEn: 'Architecture', description: 'فهم بنية النظام', readTime: 15 },
    { id: 'cc-2', slug: 'components', category: 'core-concepts', title: 'المكونات', titleEn: 'Components', description: 'نظام المكونات', readTime: 12 },
    { id: 'cc-3', slug: 'state-management', category: 'core-concepts', title: 'إدارة الحالة', titleEn: 'State Management', description: 'إدارة حالة التطبيق', readTime: 20 },
    { id: 'cc-4', slug: 'routing', category: 'core-concepts', title: 'التوجيه', titleEn: 'Routing', description: 'نظام التوجيه والصفحات', readTime: 15 },
    { id: 'cc-5', slug: 'data-fetching', category: 'core-concepts', title: 'جلب البيانات', titleEn: 'Data Fetching', description: 'استراتيجيات جلب البيانات', readTime: 18 },
    { id: 'cc-6', slug: 'authentication', category: 'core-concepts', title: 'المصادقة', titleEn: 'Authentication', description: 'نظام تسجيل الدخول', readTime: 20 },
    { id: 'cc-7', slug: 'authorization', category: 'core-concepts', title: 'التفويض', titleEn: 'Authorization', description: 'صلاحيات المستخدمين', readTime: 15 },
    { id: 'cc-8', slug: 'database', category: 'core-concepts', title: 'قاعدة البيانات', titleEn: 'Database', description: 'التعامل مع قاعدة البيانات', readTime: 25 },
    { id: 'cc-9', slug: 'caching', category: 'core-concepts', title: 'التخزين المؤقت', titleEn: 'Caching', description: 'استراتيجيات الكاش', readTime: 12 },
    { id: 'cc-10', slug: 'error-handling', category: 'core-concepts', title: 'معالجة الأخطاء', titleEn: 'Error Handling', description: 'التعامل مع الأخطاء', readTime: 15 },
    // ... More core concepts (30 more placeholders)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `cc-${i + 11}`,
        slug: `core-concept-${i + 11}`,
        category: 'core-concepts',
        title: `مفهوم أساسي ${i + 11}`,
        titleEn: `Core Concept ${i + 11}`,
        description: 'محتوى تعليمي قادم قريباً',
        readTime: 10,
    })),

    // API Reference (50 articles)
    { id: 'api-1', slug: 'api-overview', category: 'api-reference', title: 'نظرة عامة على API', titleEn: 'API Overview', description: 'مقدمة لواجهات البرمجة', readTime: 10 },
    { id: 'api-2', slug: 'authentication-api', category: 'api-reference', title: 'API المصادقة', titleEn: 'Authentication API', description: 'واجهات برمجة المصادقة', readTime: 15 },
    { id: 'api-3', slug: 'users-api', category: 'api-reference', title: 'API المستخدمين', titleEn: 'Users API', description: 'إدارة المستخدمين برمجياً', readTime: 20 },
    { id: 'api-4', slug: 'projects-api', category: 'api-reference', title: 'API المشاريع', titleEn: 'Projects API', description: 'واجهات برمجة المشاريع', readTime: 18 },
    { id: 'api-5', slug: 'webhooks', category: 'api-reference', title: 'Webhooks', titleEn: 'Webhooks', description: 'إشعارات الأحداث', readTime: 15 },
    // ... More API references (45 more placeholders)
    ...Array.from({ length: 45 }, (_, i) => ({
        id: `api-${i + 6}`,
        slug: `api-endpoint-${i + 6}`,
        category: 'api-reference',
        title: `API Endpoint ${i + 6}`,
        titleEn: `API Endpoint ${i + 6}`,
        description: 'توثيق واجهة برمجة',
        readTime: 8,
    })),

    // Advanced Topics (35 articles)
    { id: 'adv-1', slug: 'scaling', category: 'advanced-topics', title: 'التوسع', titleEn: 'Scaling', description: 'توسيع التطبيق', readTime: 20 },
    { id: 'adv-2', slug: 'microservices', category: 'advanced-topics', title: 'الخدمات المصغرة', titleEn: 'Microservices', description: 'بنية الخدمات المصغرة', readTime: 25 },
    { id: 'adv-3', slug: 'ci-cd', category: 'advanced-topics', title: 'CI/CD', titleEn: 'CI/CD', description: 'التكامل والنشر المستمر', readTime: 20 },
    { id: 'adv-4', slug: 'monitoring', category: 'advanced-topics', title: 'المراقبة', titleEn: 'Monitoring', description: 'مراقبة الأداء والأخطاء', readTime: 18 },
    { id: 'adv-5', slug: 'security-advanced', category: 'advanced-topics', title: 'الأمان المتقدم', titleEn: 'Advanced Security', description: 'تقنيات أمان متقدمة', readTime: 25 },
    // ... More advanced topics (30 more placeholders)
    ...Array.from({ length: 30 }, (_, i) => ({
        id: `adv-${i + 6}`,
        slug: `advanced-topic-${i + 6}`,
        category: 'advanced-topics',
        title: `موضوع متقدم ${i + 6}`,
        titleEn: `Advanced Topic ${i + 6}`,
        description: 'محتوى متقدم قادم قريباً',
        readTime: 15,
    })),
];

// Video Tutorial Categories
export const tutorialCategories = [
    { id: 'beginner', title: 'مبتدئ', titleEn: 'Beginner', color: 'green' },
    { id: 'intermediate', title: 'متوسط', titleEn: 'Intermediate', color: 'yellow' },
    { id: 'advanced', title: 'متقدم', titleEn: 'Advanced', color: 'red' },
];

// Video Tutorials (45 total)
export const videoTutorials: VideoTutorial[] = [
    {
        id: 'vt-1',
        slug: 'getting-started-tutorial',
        title: 'البداية مع ArabShield',
        titleEn: 'Getting Started with ArabShield',
        description: 'تعلم أساسيات المنصة في 15 دقيقة',
        level: 'beginner',
        duration: '15:00',
        objectives: ['فهم المنصة', 'إنشاء حساب', 'استكشاف لوحة التحكم'],
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: '/thumbnails/getting-started.jpg',
    },
    {
        id: 'vt-2',
        slug: 'first-web-project',
        title: 'إنشاء موقع ويب كامل',
        titleEn: 'Building a Complete Website',
        description: 'من الصفر إلى موقع احترافي',
        level: 'beginner',
        duration: '45:00',
        objectives: ['تصميم الصفحات', 'إضافة المحتوى', 'النشر على الإنترنت'],
        videoUrl: 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
        thumbnail: '/thumbnails/web-project.jpg',
    },
    {
        id: 'vt-3',
        slug: 'react-fundamentals',
        title: 'أساسيات React',
        titleEn: 'React Fundamentals',
        description: 'تعلم React من الصفر',
        level: 'beginner',
        duration: '60:00',
        objectives: ['المكونات', 'الحالة', 'الخصائص'],
        videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
        thumbnail: '/thumbnails/react.jpg',
    },
    {
        id: 'vt-4',
        slug: 'nextjs-intro',
        title: 'مقدمة إلى Next.js',
        titleEn: 'Introduction to Next.js',
        description: 'إطار عمل React للإنتاج',
        level: 'intermediate',
        duration: '50:00',
        objectives: ['SSR و SSG', 'التوجيه', 'API Routes'],
        videoUrl: 'https://www.youtube.com/watch?v=Sklc_fQBmcs',
        thumbnail: '/thumbnails/nextjs.jpg',
    },
    {
        id: 'vt-5',
        slug: 'firebase-auth',
        title: 'المصادقة مع Firebase',
        titleEn: 'Firebase Authentication',
        description: 'تسجيل الدخول والتسجيل',
        level: 'intermediate',
        duration: '35:00',
        objectives: ['إعداد Firebase', 'تسجيل المستخدمين', 'حماية الصفحات'],
        videoUrl: 'https://www.youtube.com/watch?v=PKwu15ldZ7k',
        thumbnail: '/thumbnails/firebase-auth.jpg',
    },
    {
        id: 'vt-6',
        slug: 'tailwind-css',
        title: 'Tailwind CSS للمحترفين',
        titleEn: 'Tailwind CSS Pro',
        description: 'تصميم واجهات حديثة',
        level: 'beginner',
        duration: '40:00',
        objectives: ['الفئات الأساسية', 'التخصيص', 'المكونات'],
        videoUrl: 'https://www.youtube.com/watch?v=dFgzHOX84xQ',
        thumbnail: '/thumbnails/tailwind.jpg',
    },
    {
        id: 'vt-7',
        slug: 'api-development',
        title: 'تطوير API احترافي',
        titleEn: 'Professional API Development',
        description: 'بناء واجهات برمجة قوية',
        level: 'intermediate',
        duration: '55:00',
        objectives: ['REST API', 'التوثيق', 'الأمان'],
        videoUrl: 'https://www.youtube.com/watch?v=fgTGADljAeg',
        thumbnail: '/thumbnails/api.jpg',
    },
    {
        id: 'vt-8',
        slug: 'database-design',
        title: 'تصميم قواعد البيانات',
        titleEn: 'Database Design',
        description: 'تصميم قواعد بيانات فعالة',
        level: 'intermediate',
        duration: '45:00',
        objectives: ['النمذجة', 'العلاقات', 'الفهارس'],
        videoUrl: 'https://www.youtube.com/watch?v=ztHopE5Wnpc',
        thumbnail: '/thumbnails/database.jpg',
    },
    {
        id: 'vt-9',
        slug: 'deployment-vercel',
        title: 'النشر على Vercel',
        titleEn: 'Deploying to Vercel',
        description: 'نشر تطبيقك للعالم',
        level: 'beginner',
        duration: '20:00',
        objectives: ['ربط GitHub', 'إعداد النطاق', 'المتغيرات البيئية'],
        videoUrl: 'https://www.youtube.com/watch?v=JLPjLrGh5gg',
        thumbnail: '/thumbnails/vercel.jpg',
    },
    {
        id: 'vt-10',
        slug: 'security-best-practices',
        title: 'أفضل ممارسات الأمان',
        titleEn: 'Security Best Practices',
        description: 'حماية تطبيقك من الاختراق',
        level: 'advanced',
        duration: '65:00',
        objectives: ['OWASP Top 10', 'التشفير', 'فحص الثغرات'],
        videoUrl: 'https://www.youtube.com/watch?v=F5i-cJEhKfA',
        thumbnail: '/thumbnails/security.jpg',
    },
    // More video tutorials (35 more)
    ...Array.from({ length: 35 }, (_, i) => ({
        id: `vt-${i + 11}`,
        slug: `tutorial-${i + 11}`,
        title: `درس تعليمي ${i + 11}`,
        titleEn: `Tutorial ${i + 11}`,
        description: 'محتوى فيديو قادم قريباً',
        level: ['beginner', 'intermediate', 'advanced'][i % 3] as 'beginner' | 'intermediate' | 'advanced',
        duration: `${20 + (i % 40)}:00`,
        objectives: ['هدف 1', 'هدف 2', 'هدف 3'],
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: '/thumbnails/placeholder.jpg',
    })),
];

// Common Issues (80 total)
export const commonIssues: CommonIssue[] = [
    {
        id: 'issue-1',
        slug: 'login-failed',
        title: 'فشل تسجيل الدخول',
        titleEn: 'Login Failed',
        description: 'لا أستطيع تسجيل الدخول إلى حسابي',
        category: 'authentication',
        causes: ['كلمة مرور خاطئة', 'حساب غير مفعل', 'مشكلة في الشبكة'],
        solution: '1. تأكد من صحة البريد الإلكتروني وكلمة المرور\n2. تحقق من تفعيل حسابك عبر البريد\n3. جرب إعادة تعيين كلمة المرور\n4. تأكد من اتصالك بالإنترنت',
        relatedDocs: ['gs-5', 'cc-6'],
        relatedVideos: ['vt-5'],
    },
    {
        id: 'issue-2',
        slug: 'payment-declined',
        title: 'رفض الدفع',
        titleEn: 'Payment Declined',
        description: 'تم رفض عملية الدفع',
        category: 'billing',
        causes: ['بطاقة منتهية الصلاحية', 'رصيد غير كافٍ', 'بنك يحظر المعاملات الدولية'],
        solution: '1. تحقق من صلاحية البطاقة\n2. تأكد من وجود رصيد كافٍ\n3. اتصل بالبنك لتفعيل المعاملات الدولية\n4. جرب بطاقة أخرى',
        relatedDocs: [],
        relatedVideos: [],
    },
    {
        id: 'issue-3',
        slug: 'slow-loading',
        title: 'بطء تحميل الصفحات',
        titleEn: 'Slow Page Loading',
        description: 'الموقع يعمل ببطء شديد',
        category: 'performance',
        causes: ['اتصال إنترنت بطيء', 'كاش متراكم', 'إضافات المتصفح'],
        solution: '1. تحقق من سرعة الإنترنت\n2. امسح ذاكرة التخزين المؤقت للمتصفح\n3. جرب تعطيل إضافات المتصفح\n4. جرب متصفح آخر',
        relatedDocs: ['cc-9'],
        relatedVideos: [],
    },
    {
        id: 'issue-4',
        slug: 'file-upload-error',
        title: 'خطأ في رفع الملفات',
        titleEn: 'File Upload Error',
        description: 'لا أستطيع رفع الملفات',
        category: 'files',
        causes: ['حجم الملف كبير جداً', 'نوع ملف غير مدعوم', 'مشكلة في الشبكة'],
        solution: '1. تأكد من أن حجم الملف أقل من 10MB\n2. استخدم أنواع الملفات المدعومة (JPG, PNG, PDF)\n3. جرب ضغط الملف\n4. تأكد من اتصالك بالإنترنت',
        relatedDocs: [],
        relatedVideos: [],
    },
    {
        id: 'issue-5',
        slug: 'email-not-received',
        title: 'لم أستلم البريد الإلكتروني',
        titleEn: 'Email Not Received',
        description: 'لم تصلني رسالة التأكيد',
        category: 'email',
        causes: ['البريد في مجلد السبام', 'عنوان بريد خاطئ', 'تأخر في الإرسال'],
        solution: '1. تحقق من مجلد الرسائل غير المرغوب فيها\n2. تأكد من صحة عنوان البريد الإلكتروني\n3. انتظر بضع دقائق\n4. اطلب إعادة إرسال البريد',
        relatedDocs: ['gs-5'],
        relatedVideos: [],
    },
    // More common issues (75 more)
    ...Array.from({ length: 75 }, (_, i) => ({
        id: `issue-${i + 6}`,
        slug: `common-issue-${i + 6}`,
        title: `مشكلة شائعة ${i + 6}`,
        titleEn: `Common Issue ${i + 6}`,
        description: 'وصف المشكلة قادم قريباً',
        category: ['authentication', 'billing', 'performance', 'files', 'email', 'api', 'deployment'][i % 7],
        causes: ['سبب 1', 'سبب 2', 'سبب 3'],
        solution: '1. خطوة 1\n2. خطوة 2\n3. خطوة 3',
        relatedDocs: [],
        relatedVideos: [],
    })),
];

// Issue Categories
export const issueCategories = [
    { id: 'authentication', title: 'المصادقة', titleEn: 'Authentication', icon: 'Lock' },
    { id: 'billing', title: 'الفوترة', titleEn: 'Billing', icon: 'CreditCard' },
    { id: 'performance', title: 'الأداء', titleEn: 'Performance', icon: 'Zap' },
    { id: 'files', title: 'الملفات', titleEn: 'Files', icon: 'FileText' },
    { id: 'email', title: 'البريد', titleEn: 'Email', icon: 'Mail' },
    { id: 'api', title: 'API', titleEn: 'API', icon: 'Code' },
    { id: 'deployment', title: 'النشر', titleEn: 'Deployment', icon: 'Rocket' },
];

// Types
export interface DocArticle {
    id: string;
    slug: string;
    category: string;
    title: string;
    titleEn: string;
    description: string;
    readTime: number;
    content?: string;
}

export interface VideoTutorial {
    id: string;
    slug: string;
    title: string;
    titleEn: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    objectives: string[];
    videoUrl: string;
    thumbnail: string;
}

export interface CommonIssue {
    id: string;
    slug: string;
    title: string;
    titleEn: string;
    description: string;
    category: string;
    causes: string[];
    solution: string;
    relatedDocs: string[];
    relatedVideos: string[];
}

// Helper functions
export function getArticlesByCategory(category: string): DocArticle[] {
    return docArticles.filter(article => article.category === category);
}

export function getArticleBySlug(slug: string): DocArticle | undefined {
    return docArticles.find(article => article.slug === slug);
}

export function getTutorialsByLevel(level: string): VideoTutorial[] {
    return videoTutorials.filter(tutorial => tutorial.level === level);
}

export function getTutorialBySlug(slug: string): VideoTutorial | undefined {
    return videoTutorials.find(tutorial => tutorial.slug === slug);
}

export function getIssuesByCategory(category: string): CommonIssue[] {
    return commonIssues.filter(issue => issue.category === category);
}

export function getIssueBySlug(slug: string): CommonIssue | undefined {
    return commonIssues.find(issue => issue.slug === slug);
}

export function searchContent(query: string): {
    docs: DocArticle[];
    tutorials: VideoTutorial[];
    issues: CommonIssue[];
} {
    const q = query.toLowerCase();
    return {
        docs: docArticles.filter(a =>
            a.title.toLowerCase().includes(q) ||
            a.titleEn.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q)
        ),
        tutorials: videoTutorials.filter(t =>
            t.title.toLowerCase().includes(q) ||
            t.titleEn.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)
        ),
        issues: commonIssues.filter(i =>
            i.title.toLowerCase().includes(q) ||
            i.titleEn.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q)
        ),
    };
}
