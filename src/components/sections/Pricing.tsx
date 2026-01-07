import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { H1, Paragraph } from '../ui/Typography';
import { Section } from '../ui/Section';

const plans = [
    {
        name: "Starter",
        price: "$0",
        description: "Perfect for experimenting and building your first agents.",
        features: ["Up to 3 active agents", "Basic orchestration", "Community support", "7-day log retention"],
        cta: "Join the Waitlist",
        variant: "outline" as const
    },
    {
        name: "Pro",
        price: "$499",
        period: "/month",
        description: "For growing teams scaling their AI workforce.",
        popular: true,
        features: ["Unlimited agents", "Advanced visual builder", "Priority support", "30-day log retention", "SSO integration"],
        cta: "Join the Waitlist",
        variant: "primary" as const
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Full control and security for large organizations.",
        features: ["Private cloud deployment", "Custom SLA", "Dedicated success manager", "Unlimited retention", "Audit logs & compliance"],
        cta: "Join the Waitlist",
        variant: "outline" as const
    }
];

export const Pricing = () => {
    return (
        <Section id="pricing" className="bg-white border-t border-slate-200">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <H1>Simple, Transparent Pricing</H1>
                    <Paragraph>Start small and scale as your AI workforce grows.</Paragraph>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative p-8 rounded-2xl border flex flex-col backdrop-blur-xl shadow-md ${plan.popular ? 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/30 shadow-lg shadow-primary/10' : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white/90 hover:shadow-lg transition-all duration-300'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg shadow-primary/30">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
                                <p className="text-slate-600 text-sm h-10">{plan.description}</p>
                            </div>
                            <div className="mb-8 flex items-baseline">
                                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                                {plan.period && <span className="text-slate-500 ml-2">{plan.period}</span>}
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start text-sm text-slate-700">
                                        <Check className="h-5 w-5 text-primary mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a href="#waitlist" className="w-full">
                                <Button variant={plan.variant} className="w-full">
                                    {plan.cta}
                                </Button>
                            </a>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
