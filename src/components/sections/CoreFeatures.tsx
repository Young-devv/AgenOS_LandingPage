import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { H1, H3, Paragraph } from '../ui/Typography';
import { Section } from '../ui/Section';
import { Check, Settings, Share2, Workflow } from 'lucide-react';

const features = [
    {
        title: "Visual Agent Builder",
        description: "Design sophisticated agent behaviors with our intuitive low-code editor. Define triggers, actions, and decision trees without writing boilerplate.",
        highlights: ["Drag-and-drop workflow editor", "Pre-built ability templates", "Real-time testing playground"],
        icon: <Settings className="h-6 w-6 text-primary" />,
        gradient: "from-blue-600/20 to-cyan-600/20",
    },
    {
        title: "Orchestration Hub",
        description: "The central nervous system for your digital workforce. Monitor, debug, and optimize agent interactions in real-time.",
        highlights: ["Live execution tracing", "Resource usage analytics", "Inter-agent conflict resolution"],
        icon: <Workflow className="h-6 w-6 text-purple-400" />,
        gradient: "from-purple-600/20 to-pink-600/20",
    },
    {
        title: "Enterprise Integration",
        description: "Seamlessly connect agents to your existing tech stack. AgenOS speaks the language of your diverse ecosystem.",
        highlights: ["100+ integrations", "Custom API integration", "Enterprise-grade security (SOC2)"],
        icon: <Share2 className="h-6 w-6 text-emerald-400" />,
        gradient: "from-emerald-600/20 to-teal-600/20",
    },
];

export const CoreFeatures = () => {
    return (
        <Section className="bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <H1>Everything you need to orchestrate intelligence</H1>
                </div>

                <div className="space-y-24 md:space-y-32">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
                        >
                            {/* Text Side */}
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-slate-200">
                                    {feature.icon}
                                </div>
                                <div>
                                    <H3 className="mb-4">{feature.title}</H3>
                                    <Paragraph className="text-lg">{feature.description}</Paragraph>
                                </div>
                                <ul className="space-y-4">
                                    {feature.highlights.map((highlight) => (
                                        <li key={highlight} className="flex items-center text-slate-700">
                                            <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                                <a href="#waitlist">
                                    <Button variant="outline" className="mt-4">Join the Waitlist</Button>
                                </a>
                            </div>

                            {/* Visual Side */}
                            <div className="flex-1 w-full">
                                <div className={`relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-50 to-white`}>
                                    {/* Decorative Gradients */}
                                    <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[80px] bg-gradient-to-br ${feature.gradient} opacity-50`} />
                                    <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[80px] bg-gradient-to-br ${feature.gradient} opacity-50`} />

                                    {/* Feature Visual */}
                                    {/* @ts-ignore - explicitly handling the image property we just added */}
                                    {feature.image ? (
                                        <div className="absolute inset-4 md:inset-8 rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                                            <img
                                                // src={feature.image}
                                                alt={feature.title}
                                                className="w-100 h-100 justify-center item-center object-cover object-center"
                                            />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-8 rounded-xl bg-white border border-slate-200 p-4 shadow-2xl flex flex-col gap-3">
                                            <div className="w-full h-8 bg-slate-50 rounded-lg flex items-center px-4 gap-2 border border-slate-100">
                                                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                            </div>
                                            <div className="flex-1 flex gap-4">
                                                <div className="w-1/4 h-full bg-slate-50 rounded-lg border border-slate-100" />
                                                <div className="flex-1 h-full bg-slate-50 rounded-lg border border-slate-100 grid grid-cols-2 gap-4 p-4">
                                                    <div className="bg-slate-200/50 rounded h-20 col-span-2 animate-pulse delay-75" />
                                                    <div className="bg-slate-200/50 rounded h-20" />
                                                    <div className="bg-slate-200/50 rounded h-20" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
