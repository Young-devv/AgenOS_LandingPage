import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { H1, Lead } from '../ui/Typography';
import { Section } from '../ui/Section';

export const Hero = () => {
    return (
        <Section className="pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-gradient-light-bg">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <Container className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <a href="#waitlist" className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 backdrop-blur-xl px-4 py-2 text-sm font-medium text-primary mb-8 shadow-md hover:bg-white/80 transition-colors">
                        <span className="mr-2">AgenOS v1.0 is soon coming</span>
                        <span className="ml-2 text-slate-600">Join the waitlist</span>
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl"
                >
                    <H1 className="mb-6 text-slate-900">
                        Meet Your <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">AI Team</span>
                    </H1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl"
                >
                    <Lead className="mb-10 text-slate-600">
                        The first unified orchestration platform that transforms isolated AI agents into a collaborative, high-performance workforce.
                    </Lead>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <a href="#waitlist">
                        <Button size="xl" className="group w-full sm:w-auto">
                            Join the Waitlist
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </a>
                </motion.div>
            </Container>
        </Section>
    );
};
