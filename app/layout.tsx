
import './globals.css';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { MotionProvider } from '../components/core/MotionProvider';
import MotionToggle from '../components/core/MotionToggle';
import CursorController from '../components/core/CursorController';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
    title: 'Prudhvi StudioBook',
    description: 'Cinematic Scrollytelling Portfolio',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
            <body className="antialiased min-h-screen bg-background text-foreground font-sans noise-bg selection:bg-accent selection:text-background">
                <MotionProvider>
                    <CursorController>
                        <MotionToggle />
                        {children}
                    </CursorController>
                </MotionProvider>
            </body>
        </html>
    );
}
