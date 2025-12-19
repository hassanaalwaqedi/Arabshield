"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Shield, Mail, Lock, User, Eye, EyeOff, Check, ArrowRight, Code, Sparkles, AlertCircle } from 'lucide-react';
import { loginWithEmail } from '@/lib/firebase/auth';

// Animated Code Background Component
function AnimatedCodeBackground() {
    const [lines, setLines] = useState<Array<{
        id: number;
        text: string;
        x: number;
        y: number;
        duration: number;
        delay: number;
        opacity: number;
    }>>([]);

    useEffect(() => {
        const codeSnippets = [
            'const authenticate = async () => {',
            '  const token = await generateToken();',
            '  return verifyCredentials(token);',
            '};',
            'class SecurityLayer {',
            '  encrypt(data) {',
            '    return cipher.update(data);',
            '  }',
            '}',
            'if (user.isAuthenticated) {',
            '  grantAccess(user.permissions);',
            '}',
        ];

        const newLines = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 15 + Math.random() * 10,
            delay: Math.random() * 5,
            opacity: 0.1 + Math.random() * 0.2
        }));

        setLines(newLines);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {lines.map((line) => (
                <div
                    key={line.id}
                    className="absolute text-blue-400/20 font-mono text-xs whitespace-nowrap"
                    style={{
                        left: `${line.x}%`,
                        top: `${line.y}%`,
                        opacity: line.opacity,
                        animation: `float ${line.duration}s linear infinite`,
                        animationDelay: `${line.delay}s`,
                    }}
                >
                    {line.text}
                </div>
            ))}
            <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(2deg); }
          50% { transform: translate(-10px, -40px) rotate(-1deg); }
          75% { transform: translate(10px, -60px) rotate(1deg); }
          100% { transform: translate(0, -80px) rotate(0deg); opacity: 0; }
        }
      `}</style>
        </div>
    );
}

// Floating Particles Component
function FloatingParticles() {
    const [particles, setParticles] = useState<Array<{
        id: number;
        left: number;
        top: number;
        duration: number;
        delay: number;
    }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 5 + Math.random() * 10,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        animation: `particle ${particle.duration}s linear infinite`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}
            <style>{`
        @keyframes particle {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(50px, -50px); opacity: 0; }
        }
      `}</style>
        </div>
    );
}

// Input Component with Icon
interface InputProps {
    icon: React.ElementType;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

function Input({ icon: Icon, label, type = "text", placeholder, value, onChange, required = false }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">{label}</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Icon className="w-5 h-5" />
                </div>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full h-12 pl-12 pr-12 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-slate-300 transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
        </div>
    );
}

// Button Component
interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.FormEvent) => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    className?: string;
    isLoading?: boolean;
    loadingText?: string;
}

function Button({ children, onClick, type = "button", variant = "primary", className = "", isLoading = false, loadingText = "Processing..." }: ButtonProps) {
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-foreground shadow-lg shadow-blue-600/30",
        secondary: "bg-slate-700 hover:bg-slate-600 text-foreground"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={`inline-flex items-center justify-center w-full px-8 h-12 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group ${variants[variant]} ${className}`}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {loadingText}
                </>
            ) : (
                <>
                    {children}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </button>
    );
}

// Login Form Component
interface LoginFormProps {
    onSwitchToRegister: () => void;
}

function LoginForm({ onSwitchToRegister }: LoginFormProps) {
    const router = useRouter();
    const t = useTranslations('auth');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await loginWithEmail(formData.email, formData.password);

            if (result.success) {
                if (result.isVerified) {
                    router.push('/dashboard');
                } else {
                    router.push('/verify-email');
                }
            } else {
                setError(result.error || t('errors.loginFailed'));
            }
        } catch (err) {
            setError(t('errors.unexpectedError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-fade-in">
            <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-4 shadow-lg shadow-blue-500/30">
                        <Shield className="w-8 h-8 text-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">{t('welcomeBack')}</h2>
                    <p className="text-muted-foreground">{t('loginSubtitle')}</p>
                </div>

                <div className="space-y-5">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    <Input
                        icon={Mail}
                        label={t('email')}
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-slate-300">{t('password')}</label>
                            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                {t('forgotPassword')}
                            </button>
                        </div>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="w-full h-12 pl-12 pr-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>
                    </div>

                    <Button onClick={handleSubmit} isLoading={isLoading} loadingText={t('processing')}>
                        {t('login')}
                    </Button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>{t('secureLogin')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>{t('encryptedData')}</span>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-muted-foreground text-sm">
                        {t('noAccount')}{' '}
                        <button onClick={onSwitchToRegister} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                            {t('createOne')}
                        </button>
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
        </div>
    );
}

// Register Form Component
interface RegisterFormProps {
    onSwitchToLogin: () => void;
}

function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
    const router = useRouter();
    const t = useTranslations('auth');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError(t('errors.fillAllFields'));
            return;
        }

        if (formData.password.length < 6) {
            setError(t('errors.passwordTooShort'));
            return;
        }

        setIsLoading(true);

        try {
            const { registerWithEmail } = await import('@/lib/firebase/auth');
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            const result = await registerWithEmail(fullName, formData.email, formData.password);

            if (result.success) {
                router.push('/verify-email');
            } else {
                setError(result.error || t('errors.registerFailed'));
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(t('errors.unexpectedError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-fade-in">
            <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 mb-4 shadow-lg shadow-purple-500/30">
                        <Sparkles className="w-8 h-8 text-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">{t('createAccount')}</h2>
                    <p className="text-muted-foreground">{t('registerSubtitle')}</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                )}

                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            icon={User}
                            label={t('firstName')}
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                        />
                        <Input
                            icon={User}
                            label={t('lastName')}
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                        />
                    </div>

                    <Input
                        icon={Mail}
                        label={t('email')}
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <Input
                        icon={Lock}
                        label={t('password')}
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <p className="text-xs text-muted-foreground">
                        {t('passwordMinLength')}
                    </p>

                    <Button onClick={handleSubmit} isLoading={isLoading} loadingText={t('creatingAccount')}>
                        {t('register')}
                    </Button>
                </div>

                <div className="mt-6 space-y-2">
                    {[t('noCreditCard'), t('startFree'), t('cancelAnytime')].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="w-4 h-4 text-green-400" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-muted-foreground text-sm">
                        {t('haveAccount')}{' '}
                        <button onClick={onSwitchToLogin} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                            {t('signIn')}
                        </button>
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
        </div>
    );
}

// Main Auth Page Component
export default function AuthPage() {
    const t = useTranslations('auth');
    const [activeForm, setActiveForm] = useState('login');

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-purple-950/20"></div>
            <AnimatedCodeBackground />
            <FloatingParticles />

            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 w-full max-w-md">
                {activeForm === 'login' ? (
                    <LoginForm onSwitchToRegister={() => setActiveForm('register')} />
                ) : (
                    <RegisterForm onSwitchToLogin={() => setActiveForm('login')} />
                )}
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border text-muted-foreground text-xs">
                    <Code className="w-4 h-4 text-blue-400" />
                    <span>{t('enterpriseEncryption')}</span>
                </div>
            </div>
        </div>
    );
}
