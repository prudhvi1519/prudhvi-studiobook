
import './globals.css';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { MotionProvider } from '../components/core/MotionProvider';
import MotionToggle from '../components/core/MotionToggle';
import CursorController from '../components/core/CursorController';
import { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
    title: {
        default: 'Prudhvi StudioBook — Cinematic Portfolio',
        template: '%s | Prudhvi StudioBook',
    },
    description: 'Senior Full-Stack Engineer specializing in cinematic web interactions, scrollytelling, and scalable architecture. Built with Next.js, GSAP, and Tailwind.',
    keywords: ['portfolio', 'fullstack engineer', 'react', 'next.js', 'gsap', 'scrollytelling', 'web developer'],
    authors: [{ name: 'Prudhvi' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        title: 'Prudhvi StudioBook — Cinematic Portfolio',
        description: 'Senior Full-Stack Engineer specializing in cinematic web interactions and scalable architecture.',
        siteName: 'Prudhvi StudioBook',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Prudhvi StudioBook — Cinematic Portfolio',
        description: 'Cinematic scrollytelling portfolio built with Next.js, GSAP, and Tailwind v4.',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
            <body suppressHydrationWarning className="antialiased min-h-screen bg-background text-foreground font-sans noise-bg selection:bg-accent selection:text-background">
                <a href="#main-content" className="skip-link">
                    Skip to content
                </a>
                <MotionProvider>
                    <CursorController>
                        <MotionToggle />
                        <main id="main-content">
                            {children}
                        </main>
                    </CursorController>
                </MotionProvider>
            </body>
        </html>
    );
}

