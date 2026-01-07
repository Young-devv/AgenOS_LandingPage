import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H1, Paragraph } from '../ui/Typography';
import { Section } from '../ui/Section';
import { Bot, Database, MessageSquare, Zap, Cpu, Share2 } from 'lucide-react';

// Fixed container dimensions for consistent positioning
const CONTAINER_WIDTH = 600;
const CONTAINER_HEIGHT = 500;
const CENTER_X = CONTAINER_WIDTH / 2;
const CENTER_Y = CONTAINER_HEIGHT / 2;

const NODES = [
    { id: 'sales', icon: Bot, label: "Sales Agent", angle: -90, radius: 180, delay: 0.2 },
    { id: 'automation', icon: Zap, label: "Automation", angle: -30, radius: 200, delay: 0.3 },
    { id: 'postgres', icon: Database, label: "Postgres", angle: 30, radius: 200, delay: 0.4 },
    { id: 'support', icon: MessageSquare, label: "Support", angle: 90, radius: 180, delay: 0.5 },
    { id: 'analyst', icon: Bot, label: "Analyst", angle: 150, radius: 200, delay: 0.6 },
    { id: 'snowflake', icon: Share2, label: "Integrations", angle: 210, radius: 200, delay: 0.7 },
];

const getNodePosition = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
        x: CENTER_X + radius * Math.cos(rad),
        y: CENTER_Y + radius * Math.sin(rad),
    };
};

const GlassNode = ({ icon: Icon, label, angle, radius, delay }: { icon: any, label: string, angle: number, radius: number, delay: number }) => {
    const pos = getNodePosition(angle, radius);

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: delay + 0.5 }}
            style={{
                position: 'absolute',
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: 'translate(-50%, -50%)',
            }}
            className="flex flex-col items-center gap-3 z-20"
        >
            <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-14 w-14 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200 flex items-center justify-center shadow-md group-hover:border-primary/50 group-hover:bg-white/90 transition-all duration-300">
                    <Icon className="h-6 w-6 text-slate-700 group-hover:text-primary transition-colors" />
                </div>
            </div>
            <span className="text-xs font-semibold text-slate-700 bg-white/60 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-sm whitespace-nowrap">
                {label}
            </span>
        </motion.div>
    );
};

export const OrchestrationFlow = () => {
    return (
        <Section className="bg-gradient-to-b from-white to-slate-50 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-30 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <H1>Orchestrate Complexity with Ease</H1>
                    <Paragraph>
                        Visualize and manage the intricate dance of data and decisions across your entire AI workforce.
                    </Paragraph>
                </div>

                {/* Fixed-size container for perfect alignment */}
                <div
                    className="relative mx-auto flex justify-center align-center"
                    style={{
                        width: `700px`,
                        height: `500px`,
                        maxWidth: '100%'
                    }}
                >
                    {/* SVG Layer for connecting lines */}
                    <svg
                        className="absolute inset-0 z-10"
                        width={CONTAINER_WIDTH}
                        height={CONTAINER_HEIGHT}
                        viewBox={`0 0 ${CONTAINER_WIDTH} ${CONTAINER_HEIGHT}`}
                        style={{ pointerEvents: 'none' }}
                    >
                        {NODES.map((node) => {
                            const pos = getNodePosition(node.angle, node.radius);
                            return (
                                <motion.line
                                    key={node.id}
                                    x1={CENTER_X}
                                    y1={CENTER_Y}
                                    x2={pos.x}
                                    y2={pos.y}
                                    stroke="url(#gradient-line)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: node.delay, ease: "easeOut" }}
                                    style={{
                                        strokeDasharray: 1,
                                        strokeDashoffset: 1,
                                    }}
                                />
                            );
                        })}
                        <defs>
                            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Central Core */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            left: `${CENTER_X}px`,
                            top: `${CENTER_Y}px`,
                            transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                        className="z-30"
                    >
                        <div className="relative">
                            {/* Pulse Effects */}
                            <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[ping_3s_linear_infinite]" />
                            <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-[ping_3s_linear_infinite_1.5s]" />

                            {/* Glass Core */}
                            <div className="h-28 w-28 rounded-full bg-white/70 backdrop-blur-2xl border border-slate-200 flex items-center justify-center shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent" />
                                <div className="flex flex-col items-center relative z-10">
                                    <Cpu className="h-10 w-10 text-primary drop-shadow-md" />
                                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] mt-2">Core</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Satellite Nodes */}
                    {NODES.map((node) => (
                        <GlassNode
                            key={node.id}
                            icon={node.icon}
                            label={node.label}
                            angle={node.angle}
                            radius={node.radius}
                            delay={node.delay}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    );
};
