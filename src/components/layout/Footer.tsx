import { Twitter, Linkedin } from 'lucide-react';
import { Container } from '../ui/Container';

export const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="max-w-xs">
                        <div className="flex items-center space-x-3 mb-4">
                            <img src="/logo.png" alt="AgenOS" className="h-8 w-8" />
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AgenOS</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Orchestrating the future of enterprise AI workforces.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://x.com/AyombaRudi" className="text-slate-500 hover:text-primary transition-colors"><Twitter size={20} /></a>
                            <a href="https://www.linkedin.com/in/rudi-ayomba-778465391/" className="text-slate-500 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-sm text-slate-500">
                        <p>© {new Date().getFullYear()} AgenOS. All rights reserved.</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
