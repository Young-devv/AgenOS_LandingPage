import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    ArrowLeft,
    Download,
    TrendingUp,
    Mail,
    Search,
    RefreshCw,
    ShieldCheck
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Signup {
    email: string;
    timestamp: string;
}

export const AdminDashboard = () => {
    const [data, setData] = useState<Signup[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        const secret = localStorage.getItem('adminSecret');
        if (!secret) {
            navigate('/admin/login');
            return;
        }

        setIsRefreshing(true);
        try {
            const response = await fetch('http://localhost:3001/api/waitlist/data', {
                headers: { 'x-admin-secret': secret }
            });

            if (response.status === 401) {
                localStorage.removeItem('adminSecret');
                navigate('/admin/login');
                return;
            }

            const result = await response.json();
            setData(result.reverse()); // Show newest first
        } catch (error) {
            console.error('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        const secret = localStorage.getItem('adminSecret');
        if (!secret) {
            navigate('/admin/login');
        } else {
            fetchData();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminSecret');
        navigate('/admin/login');
    };

    const filteredData = data.filter(item =>
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Timestamp,Email\n"
            + data.map(e => `${e.timestamp},${e.email}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `agenos_waitlist_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Simple analytics
    const totalSignups = data.length;
    const todaySignups = data.filter(item => {
        const date = new Date(item.timestamp);
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }).length;

    // Domain distribution for the chart
    const domainData = data.reduce((acc: any, item) => {
        const domain = item.email.split('@')[1];
        const provider = domain.split('.')[0];
        acc[provider] = (acc[provider] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(domainData).map(key => ({
        name: key,
        value: domainData[key]
    })).sort((a, b) => b.value - a.value).slice(0, 5);

    const COLORS = ['#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

    return (
        <div className="min-h-screen bg-[#0f041e] text-white pt-24 pb-12 selection:bg-cyan-500/30">
            {/* Background effects */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none"></div>
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <Container>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3">
                                Admin Dashboard
                                <ShieldCheck className="h-6 w-6 text-cyan-400" />
                            </h1>
                            <p className="text-purple-200/60 text-sm">Monitor your waitlist activity and growth</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                        >
                            Logout
                        </button>
                        <button
                            onClick={exportToCSV}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
                        >
                            <Download className="h-4 w-4" />
                            Export CSV
                        </button>
                        <button
                            onClick={fetchData}
                            disabled={isRefreshing}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition-colors text-sm font-bold shadow-lg shadow-cyan-900/40 disabled:opacity-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
                                <Users className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-bold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">All Time</span>
                        </div>
                        <div className="text-4xl font-bold text-white mb-1">{totalSignups}</div>
                        <div className="text-sm text-purple-200/60 font-medium">Total registered users</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">24 Hours</span>
                        </div>
                        <div className="text-4xl font-bold text-white mb-1">+{todaySignups}</div>
                        <div className="text-sm text-purple-200/60 font-medium">New signups today</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
                                <Mail className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="text-xl font-bold text-white mb-1">Email Distribution</div>
                        <div className="h-16 w-full mt-2">
                            <div className="flex h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                {chartData.map((entry, index) => (
                                    <div
                                        key={index}
                                        style={{ width: `${(entry.value / totalSignups) * 100}%`, backgroundColor: COLORS[index % COLORS.length] }}
                                        className="h-full"
                                    />
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                                {chartData.slice(0, 3).map((entry, index) => (
                                    <div key={index} className="flex items-center gap-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                        <span className="text-[10px] text-purple-200/40 uppercase font-bold">{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* List */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden"
                    >
                        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h2 className="text-xl font-bold">Registration List</h2>
                            <div className="relative group max-w-sm w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-200/40" />
                                <input
                                    type="text"
                                    placeholder="Search by email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-purple-200/40 uppercase tracking-widest">Email</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-purple-200/40 uppercase tracking-widest">Joined On</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {loading ? (
                                        <tr><td colSpan={2} className="px-6 py-12 text-center text-purple-200/40">Loading waitlist...</td></tr>
                                    ) : filteredData.length === 0 ? (
                                        <tr><td colSpan={2} className="px-6 py-12 text-center text-purple-200/40">No signups found matching your search.</td></tr>
                                    ) : (
                                        filteredData.map((signup, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-purple-200/60 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                                                            <Mail className="h-4 w-4" />
                                                        </div>
                                                        <span className="font-medium">{signup.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm text-purple-200/60 font-mono">
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-white/80">{new Date(signup.timestamp).toLocaleDateString()}</span>
                                                        <span className="text-[10px] opacity-40">{new Date(signup.timestamp).toLocaleTimeString()}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Chart Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 h-fit sticky top-24"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            Provider Insights
                            <TrendingUp className="h-4 w-4 text-cyan-400" />
                        </h3>

                        <div className="h-[300px] w-full">
                            {loading ? (
                                <div className="h-full w-full flex items-center justify-center text-purple-200/40">Loading Chart...</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} layout="vertical" margin={{ left: -20, right: 20 }}>
                                        <XAxis type="number" hide />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#A78BFA', fontSize: 11, fontWeight: 'bold' }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{
                                                backgroundColor: '#1a083d',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px'
                                            }}
                                        />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                            <p className="text-xs text-cyan-200/70 leading-relaxed">
                                <strong>Top Provider:</strong> {chartData[0]?.name || 'N/A'} is currently leading with {chartData[0]?.value || 0} registries.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
};
