import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter as XIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export const Waitlist = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/waitlist/count');
                const data = await response.json();
                if (data.count !== undefined) {
                    setCount(data.count);
                }
            } catch (err) {
                console.error('Failed to fetch count');
            }
        };
        fetchCount();
        // Refresh count every 30 seconds
        const interval = setInterval(fetchCount, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const response = await fetch('http://localhost:3001/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message);
                setEmail('');
                // Optimized: update count locally or refetch
                setCount(prev => (prev !== null ? prev + 1 : 1));
            } else {
                setStatus('error');
                setMessage(data.message || data.error || 'Something went wrong');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to connect to server');
        }
    };

    return (
        <Section id="waitlist" className="py-24 md:py-32 bg-gradient-to-b from-[#0f041e] via-[#1a083d] to-[#0f041e] overflow-hidden relative border-t border-purple-900/40">
            {/* Background Grain Effect */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none"></div>

            <Container className="relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Get notified when we're launching
                        </h2>
                        <p className="text-lg md:text-xl text-purple-200/80 mb-6 font-light">
                            Be Part of the Excitement! Up to 10% discount for the first 100 registered companies
                        </p>

                        {count !== null && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-200/60 text-sm mb-8"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                Join <span className="text-white font-semibold">{count}</span> other companies already on the list
                            </motion.div>
                        )}
                    </motion.div>

                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 max-w-lg mx-auto mb-16"
                        >
                            <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                            <p className="text-purple-200/70">{message}</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-6 text-sm text-purple-300 underline hover:text-white transition-colors"
                            >
                                Add another email
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto mb-16"
                        >
                            <div className="relative flex-1 w-full flex flex-col items-start">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address..."
                                    required
                                    className="w-full h-12 px-6 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-md transition-all"
                                />
                                {status === 'error' && (
                                    <span className="text-red-400 text-xs mt-2 ml-4 font-medium">{message}</span>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="h-12 px-8 bg-white text-[#1a083d] font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg active:scale-95 w-full sm:w-auto flex items-center justify-center disabled:opacity-70"
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : 'Notify me'}
                            </button>
                        </motion.form>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="flex justify-center items-center gap-8"
                    >
                        <a href="https://x.com/AyombaRudi" className="text-white/40 hover:text-white transition-colors">
                            <XIcon size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/rudi-ayomba-778465391/" className="text-white/40 hover:text-white transition-colors">
                            <Linkedin size={18} />
                        </a>
                    </motion.div>
                </div>
            </Container>

            {/* Glowing Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
        </Section>
    );
};
