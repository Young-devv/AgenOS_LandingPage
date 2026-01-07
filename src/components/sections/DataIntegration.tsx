import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H1, Paragraph } from '../ui/Typography';
import { Section } from '../ui/Section';

const integrations = [
    { name: "Snowflake", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg" },
    { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
    { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
    { name: "Postgres", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
    { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { name: "Zendesk", logo: "https://static.cdnlogo.com/logos/z/34/zendesk.svg" },
    { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" },
    { name: "Linear", logo: "https://static.cdnlogo.com/logos/l/73/linear.svg" },
    { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" },
    { name: "Gmail", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
    { name: "Outlook", logo: "https://static.cdnlogo.com/logos/m/83/microsoft-outlook.svg" },
    { name: "Zoom", logo: "https://static.cdnlogo.com/logos/z/19/zoom.svg" },
    { name: "Jira", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Jira_Logo.svg" },
];

const LogoMarquee = ({ direction = "left", speed = 25 }) => {
    return (
        <div className="flex overflow-hidden py-8 mask-linear-fade">
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{ duration: speed, ease: "linear", repeat: Infinity }}
                className="flex gap-12 flex-shrink-0 min-w-full px-6"
            >
                {[...integrations, ...integrations, ...integrations].map((item, i) => (
                    <div key={`${item.name}-${i}`} className="flex items-center gap-3 text-slate-600 font-semibold text-lg flex-shrink-0 transition-transform hover:scale-105 duration-300">
                        <div className="h-10 w-10 p-2 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                            <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="hidden md:inline">{item.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export const DataIntegration = () => {
    return (
        <Section className="bg-gradient-to-b from-white to-slate-50 border-y border-slate-200 relative">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <H1>Connects with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">everything</span> you use</H1>
                    <Paragraph>
                        AgenOS comes with 100+ pre-built native integrations. No glue code required.
                    </Paragraph>
                </div>

                <div className="relative -mx-4 md:-mx-8 lg:-mx-16 mask-gradient">
                    <LogoMarquee direction="left" speed={40} />
                    <LogoMarquee direction="right" speed={50} />

                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
                </div>

                {/* <div className="mt-16 text-center">
                    <button className="text-slate-600 hover:text-primary underline underline-offset-4 decoration-slate-300 hover:decoration-primary transition-all">
                        View all 100+ integrations
                    </button>
                </div> */}
            </Container>
        </Section>
    );
};
