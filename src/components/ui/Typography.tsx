import React from 'react';
import { cn } from '../../lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export const H1: React.FC<TypographyProps> = ({ className, children, ...props }) => (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-7xl", className)} {...props}>
        {children}
    </h1>
);

export const H2: React.FC<TypographyProps> = ({ className, children, ...props }) => (
    <h2 className={cn("scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors text-slate-900", className)} {...props}>
        {children}
    </h2>
);

export const H3: React.FC<TypographyProps> = ({ className, children, ...props }) => (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props}>
        {children}
    </h3>
);

export const Paragraph: React.FC<TypographyProps> = ({ className, children, ...props }) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6 text-slate-600 font-light", className)} {...props}>
        {children}
    </p>
);

export const Lead: React.FC<TypographyProps> = ({ className, children, ...props }) => (
    <p className={cn("text-xl text-slate-600 md:text-2xl font-light", className)} {...props}>
        {children}
    </p>
);
