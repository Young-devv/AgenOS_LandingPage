import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { H1, Paragraph } from '../ui/Typography';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { CircleDollarSign, Headset, Megaphone, Settings, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';

const useCases = [
    {
        id: 'sales',
        label: 'Sales',
        icon: CircleDollarSign,
        title: "Autopilot for Pipeline Generation",
        description: "Agents research leads, personalize outreach, and schedule meetings automatically.",
        stats: ["300% increase in qualified leads", "20h saved per SDR/week"]
    },
    {
        id: 'support',
        label: 'Support',
        icon: Headset,
        title: "Tier 1 Support that Feels Human",
        description: "Resolve 80% of tickets instantly with agents that have full context of user history.",
        stats: ["< 1min response time", "4.8/5 CSAT score"]
    },
    {
        id: 'marketing',
        label: 'Marketing',
        icon: Megaphone,
        title: "Content & Campaign Orchestration",
        description: "Generate SEO-optimized content and manage ad bids across channels 24/7.",
        stats: ["10x content output", "-40% CPA on paid ads"]
    },
    {
        id: 'operations',
        label: 'Operations',
        icon: Settings,
        title: "Self-Healing Workflows",
        description: "Agents monitor processes and autonomously fix bottlenecks before they become issues.",
        stats: ["99.9% uptime", "Zero manual data entry"]
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        title: "Proactive Insights & Reporting",
        description: "Agents analyze data streams to surface anomalies and opportunities automatically.",
        stats: ["Real-time anomaly detection", "Automated executive reporting"]
    },
    {
        id: 'compliance',
        label: 'Compliance',
        icon: ShieldCheck,
        title: "Automated Governance",
        description: "Ensure every action taken by every agent adheres to strict enterprise policies.",
        stats: ["100% audit log coverage", "Zero compliance violations"]
    },
];

export const UseCases = () => {
    const [activeTab, setActiveTab] = useState(useCases[0].id);
    const activeCase = useCases.find(c => c.id === activeTab) || useCases[0];

    return (
        <Section className="bg-white">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <H1>Transforming Every Department</H1>
                    <Paragraph>
                        See how AgenOS empowers teams across the enterprise to achieve more with less.
                    </Paragraph>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Tabs Sidebar */}
                    <div className="lg:col-span-4 flex flex-col space-y-2">
                        {useCases.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`text-left px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-4 backdrop-blur-md ${activeTab === item.id
                                    ? "bg-white/80 border border-primary/30 text-slate-900 shadow-md"
                                    : "bg-white/40 border border-slate-200 hover:bg-white/60 hover:border-slate-300 text-slate-600 hover:text-slate-900"
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-primary" : "text-slate-500"}`} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl p-8 md:p-12 h-full flex flex-col justify-center shadow-md"
                            >
                                <div className="mb-6">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                                        <activeCase.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                                        {activeCase.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                        {activeCase.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                    {activeCase.stats.map((stat, i) => (
                                        <div key={i} className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-slate-200 shadow-sm">
                                            <span className="text-primary font-semibold block">{stat}</span>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <a href="#waitlist">
                                        <Button variant="outline" className="group">
                                            Join the Waitlist
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </Section>
    );
};
