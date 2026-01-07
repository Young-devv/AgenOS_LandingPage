import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const trimmedPassword = password.trim();
            const response = await fetch('http://localhost:3001/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secret: trimmedPassword }),
            });

            if (response.ok) {
                localStorage.setItem('adminSecret', trimmedPassword);
                navigate('/admin');
            } else if (response.status === 401) {
                setError('Invalid admin password. Please check your credentials.');
            } else {
                setError(`Server error: ${response.status}. Please try again later.`);
            }
        } catch (err) {
            setError('Connection failed. Is the backend server running on port 3001?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f041e] text-white flex items-center justify-center p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />

                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                            <ShieldAlert className="h-8 w-8 text-cyan-400" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Restricted Access</h1>
                        <p className="text-purple-200/50 text-sm">Please enter the administrator password to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-200/30 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Admin Password"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-purple-200/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-xs font-medium bg-red-400/10 border border-red-400/20 p-3 rounded-lg text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            disabled={loading}
                            className="w-full h-12 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/40 active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Verify Identity
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-purple-200/20 text-xs">
                    Protected by AgenOS Security Layer &copy; 2026
                </p>
            </motion.div>
        </div>
    );
};
