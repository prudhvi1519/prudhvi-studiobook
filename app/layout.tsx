import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { MotionProvider } from '@/components/core/MotionProvider';
import NoiseOverlay from '@/components/core/NoiseOverlay';
import MotionToggle from '@/components/core/MotionToggle';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-accent/30 selection:text-accent">
        <MotionProvider>
          <NoiseOverlay />
          <MotionToggle />
          <main className="relative z-10 w-full overflow-x-hidden min-h-screen">
            {children}
          </main>
        </MotionProvider>
      </body>
    </html>
  );
}
