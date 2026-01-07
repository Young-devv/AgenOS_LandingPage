import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled ? "bg-white/80 backdrop-blur-xl border-slate-200 shadow-sm" : "bg-transparent border-transparent"
            )}
        >
            <Container>
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <img src="/logo.png" alt="AgenOS" className="h-10 w-10" />
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AgenOS</span>
                    </div>

                    {/* Desktop Navigation */}
                    {/* <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav> */}

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <a href="#waitlist">
                                <Button size="sm">Join the Waitlist</Button>
                            </a>
                        </div>

                        <button
                            className="md:hidden text-slate-600 hover:text-slate-900 p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu */}
            {/* {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 absolute w-full left-0 shadow-lg">
                    <Container className="py-4 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block text-base font-medium text-slate-600 hover:text-slate-900 py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3">
                            <Button variant="ghost" className="w-full justify-start">Log in</Button>
                            <a href="#waitlist" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full">Join the Waitlist</Button>
                            </a>
                        </div>
                    </Container>
                </div>
            )} */}
        </header>
    );
};

