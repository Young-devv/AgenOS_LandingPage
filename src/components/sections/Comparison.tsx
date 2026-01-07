import { Check, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { H1, Paragraph } from '../ui/Typography';
import { Section } from '../ui/Section';

const features = [
    { name: "Orchestration Engine", agenos: true, rpa: true, code: false },
    { name: "Autonomous Decision Making", agenos: true, rpa: false, code: true },
    { name: "Native LLM Integration", agenos: true, rpa: false, code: true },
    { name: "Self-Healing Workflows", agenos: true, rpa: false, code: false },
    { name: "Visual Builder", agenos: true, rpa: true, code: false },
    { name: "Real-time Collaboration", agenos: true, rpa: false, code: true },
    { name: "Enterprise Security (SOC2)", agenos: true, rpa: true, code: "Varies" },
];

export const Comparison = () => {
    return (
        <Section className="bg-white">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <H1>Why AgenOS?</H1>
                    <Paragraph>
                        Stop stitching together disparate tools. AgenOS provides a unified platform for the AI era.
                    </Paragraph>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 md:p-6 border-b border-slate-200 text-slate-600 font-medium">Feature</th>
                                <th className="p-4 md:p-6 border-b border-slate-200 bg-gradient-to-br from-primary/5 to-secondary/5 text-slate-900 font-bold text-center text-lg w-1/4 rounded-t-xl border-t border-x border-slate-200 relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand rounded-t-xl" />
                                    AgenOS
                                </th>
                                <th className="p-4 md:p-6 border-b border-slate-200 text-slate-600 font-medium text-center w-1/4">Traditional RPA</th>
                                <th className="p-4 md:p-6 border-b border-slate-200 text-slate-600 font-medium text-center w-1/4">Custom Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature) => (
                                <tr key={feature.name} className="group hover:bg-slate-50 transition-colors">
                                    <td className="p-4 md:p-6 border-b border-slate-200 text-slate-700 font-medium">{feature.name}</td>
                                    <td className="p-4 md:p-6 border-b border-x border-slate-200 bg-slate-50/50 text-center">
                                        <div className="flex justify-center">
                                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                <Check className="h-5 w-5 text-primary" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 border-b border-slate-200 text-center">
                                        <div className="flex justify-center">
                                            {feature.rpa === true ? (
                                                <Check className="h-5 w-5 text-slate-500" />
                                            ) : feature.rpa === false ? (
                                                <X className="h-5 w-5 text-slate-600" />
                                            ) : (
                                                <span className="text-slate-500 text-sm">{feature.rpa}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 border-b border-slate-200 text-center">
                                        <div className="flex justify-center">
                                            {feature.code === true ? (
                                                <Check className="h-5 w-5 text-slate-500" />
                                            ) : feature.code === false ? (
                                                <X className="h-5 w-5 text-slate-600" />
                                            ) : (
                                                <span className="text-slate-500 text-sm">{feature.code}</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </Section>
    );
};
