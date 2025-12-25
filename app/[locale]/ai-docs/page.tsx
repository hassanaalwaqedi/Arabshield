"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
    Book,
    Code,
    Terminal,
    Settings,
    Bug,
    ChevronRight,
    Copy,
    Check
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Mock Code Component
const CodeBlock = ({ language, code }: { language: string, code: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative rounded-lg overflow-hidden bg-card border border-border my-4 group">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                <span className="text-xs text-muted-foreground font-mono">{language}</span>
                <button
                    onClick={handleCopy}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default function AIDocsPage() {
    const t = useTranslations('aiDocs');
    const [activeSection, setActiveSection] = useState('intro');

    // Navigation Items with translations
    const sections = [
        { id: 'intro', title: t('sections.intro'), icon: Book },
        { id: 'api', title: t('sections.api'), icon: Code },
        { id: 'examples', title: t('sections.examples'), icon: Terminal },
        { id: 'setup', title: t('sections.setup'), icon: Settings },
        { id: 'debug', title: t('sections.debug'), icon: Bug },
    ];

    // Scroll Spy Effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-background text-slate-200">
            <div className="container mx-auto px-4 py-24 md:flex gap-12">

                {/* Sidebar Navigation */}
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <Book className="w-5 h-5 text-blue-500" />
                            {t('documentation')}
                        </h3>
                        <nav className="space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSection === section.id
                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        : 'text-muted-foreground hover:bg-card hover:text-foreground'
                                        }`}
                                >
                                    <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-blue-500' : 'text-muted-foreground'}`} />
                                    {section.title}
                                    {activeSection === section.id && <ChevronRight className="w-4 h-4 mr-auto" />}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900 border border-border">
                            <p className="text-xs text-muted-foreground mb-3">{t('needHelp')}</p>
                            <Button variant="outline" size="sm" className="w-full text-xs">
                                {t('contactSupport')}
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 max-w-4xl">

                    {/* Introduction */}
                    <section id="intro" className="mb-20 scroll-mt-24">
                        <div className="mb-6">
                            <Badge variant="electric" className="mb-4">v2.0.0</Badge>
                            <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="p-6 rounded-2xl bg-card/50 border border-border">
                                <h3 className="text-lg font-semibold text-foreground mb-2">{t('intro.speed')}</h3>
                                <p className="text-muted-foreground text-sm">{t('intro.speedDesc')}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card/50 border border-border">
                                <h3 className="text-lg font-semibold text-foreground mb-2">{t('intro.security')}</h3>
                                <p className="text-muted-foreground text-sm">{t('intro.securityDesc')}</p>
                            </div>
                        </div>
                    </section>

                    {/* API Usage */}
                    <section id="api" className="mb-20 scroll-mt-24 pt-10 border-t border-border">
                        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <Code className="w-6 h-6 text-purple-500" />
                            {t('sections.api')}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            {t('api.description')}
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                                <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-mono font-bold">GET</span>
                                <code className="text-sm font-mono text-slate-300">https://api.NovaArab.com/v1/models</code>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                                <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-mono font-bold">POST</span>
                                <code className="text-sm font-mono text-slate-300">https://api.NovaArab.com/v1/chat/completions</code>
                            </div>
                        </div>
                    </section>

                    {/* Examples */}
                    <section id="examples" className="mb-20 scroll-mt-24 pt-10 border-t border-border">
                        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <Terminal className="w-6 h-6 text-green-500" />
                            {t('sections.examples')}
                        </h2>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-foreground mb-4">cURL Request</h3>
                            <CodeBlock language="bash" code={`curl https://api.NovaArab.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "as-gpt-4",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello, how can you help me today?"} 
    ]
  }'`} />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-4">Node.js Example</h3>
                            <CodeBlock language="javascript" code={`import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['AS_API_KEY'], // This is the default and can be omitted
  baseURL: 'https://api.NovaArab.com/v1',
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'as-gpt-3.5-turbo',
  });
}

main();`} />
                        </div>
                    </section>

                    {/* Model Setup */}
                    <section id="setup" className="mb-20 scroll-mt-24 pt-10 border-t border-border">
                        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <Settings className="w-6 h-6 text-orange-500" />
                            {t('sections.setup')}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            {t('setup.description')}
                        </p>

                        <div className="overflow-hidden rounded-xl border border-border">
                            <table className="w-full text-right">
                                <thead className="bg-card text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-sm">{t('setup.parameter')}</th>
                                        <th className="px-6 py-4 font-semibold text-sm">{t('setup.paramDescription')}</th>
                                        <th className="px-6 py-4 font-semibold text-sm">{t('setup.defaultValue')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 bg-card/30">
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-mono text-blue-400">temperature</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{t('setup.temperature')}</td>
                                        <td className="px-6 py-4 text-sm font-mono text-muted-foreground">0.7</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-mono text-blue-400">max_tokens</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{t('setup.maxTokens')}</td>
                                        <td className="px-6 py-4 text-sm font-mono text-muted-foreground">inf</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-mono text-blue-400">top_p</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{t('setup.topP')}</td>
                                        <td className="px-6 py-4 text-sm font-mono text-muted-foreground">1.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Debugging */}
                    <section id="debug" className="mb-20 scroll-mt-24 pt-10 border-t border-border">
                        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <Bug className="w-6 h-6 text-red-500" />
                            {t('sections.debug')}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            {t('debug.description')}
                        </p>

                        <CodeBlock language="json" code={`{
  "error": {
    "message": "Invalid API Key provided",
    "type": "invalid_request_error",
    "param": null,
    "code": "invalid_api_key"
  }
}`} />

                        <div className="mt-8 p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                            <h4 className="flex items-center gap-2 text-yellow-400 font-bold mb-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                {t('debug.importantNote')}
                            </h4>
                            <p className="text-sm text-yellow-500/80">
                                {t('debug.securityWarning')}
                            </p>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}
