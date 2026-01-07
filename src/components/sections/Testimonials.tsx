import { Container } from '../ui/Container';
import { H2 } from '../ui/Typography';
import { Section } from '../ui/Section';
import { Star } from 'lucide-react';

const testimonials = [
    {
        quote: "AgenOS allowed us to deploy a fleet of 50 support agents in under a week. The orchestration capabilities are unmatched.",
        author: "Sarah Chen",
        role: "CTO, FinTech Global",
        image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        quote: "Finally, a platform that doesn't treat AI agents as toys. This is enterprise-grade infrastructure.",
        author: "Marcus Rodriguez",
        role: "VP Engineering, HealthCorp",
        image: "https://i.pravatar.cc/150?u=marcus"
    },
    {
        quote: "The ability to visually debug agent interactions saved us hundreds of hours of development time.",
        author: "Elena Kowalski",
        role: "Director of AI, LogiTech",
        image: "https://i.pravatar.cc/150?u=elena"
    }
];

export const Testimonials = () => {
    return (
        <Section className="bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
            <Container>
                <div className="text-center mb-16">
                    <H2>Trusted by Industry Leaders</H2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <div key={i} className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-200 flex flex-col relative group hover:border-primary/30 hover:bg-white/90 hover:shadow-lg transition-all duration-300 shadow-md">
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-slate-700 text-lg leading-relaxed mb-8 flex-1">
                                "{item.quote}"
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="h-10 w-10 rounded-full bg-slate-800 overflow-hidden">
                                    {/* Placeholder for legal/privacy reasons if external images are blocked, but using pravatar for demo */}
                                    <img src={item.image} alt={item.author} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900">{item.author}</div>
                                    <div className="text-sm text-slate-600">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
