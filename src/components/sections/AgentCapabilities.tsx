import { motion } from 'framer-motion';
import { Bot, Network, Database, BrainCircuit, Zap } from 'lucide-react';
import { Container } from '../ui/Container';
import { H1, Paragraph } from '../ui/Typography';
import { Section } from '../ui/Section';

const capabilities = [
    {
        icon: <Bot className="h-6 w-6 text-primary" />,
        title: "Instant Build",
        description: "Deploy custom AI agents in minutes using our low-code builder.",
        colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    },
    {
        icon: <Network className="h-6 w-6 text-purple-400" />,
        title: "Unified Orchestration",
        description: "Manage complex multi-agent workflows with a drag-and-drop visual interface.",
        colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    },
    {
        icon: <Database className="h-6 w-6 text-emerald-400" />,
        title: "Data Integration",
        description: "Connect to 100+ data sources to give your agents the context they need.",
        colSpan: "col-span-1 md:col-span-3 lg:col-span-1",
    },
    {
        icon: <BrainCircuit className="h-6 w-6 text-rose-400" />,
        title: "Predictive Intelligence",
        description: "Agents self-optimize based on historical performance and real-time analytics.",
        colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
    },
    {
        icon: <Zap className="h-6 w-6 text-amber-400" />,
        title: "Autonomous Automation",
        description: "Set goals and let agents autonomously execute tasks 24/7.",
        colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    },
];

export const AgentCapabilities = () => {
    return (
        <Section className="bg-gradient-to-b from-white to-slate-50">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <H1>Powering the Autonomous Enterprise</H1>
                    <Paragraph>
                        AgenOS provides the essential infrastructure to build, deploy, and manage your AI workforce at scale.
                    </Paragraph>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {capabilities.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200 hover:border-primary/30 hover:bg-white/90 hover:shadow-xl transition-all duration-300 shadow-md ${item.colSpan}`}
                        >
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-md flex items-center justify-center mb-6 border border-slate-200">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
