'use client';

import Preloader from '../components/scenes/Preloader';
import Hero from '../components/scenes/Hero';
import Proof from '../components/scenes/Proof';
import Projects from '../components/scenes/Projects';
import Capabilities from '../components/scenes/Capabilities';
import Credentials from '../components/scenes/Credentials';
import Contact from '../components/scenes/Contact';
import { SceneEngineProvider } from '../components/core/SceneEngine';
import ProgressHUD from '../components/core/ProgressHUD';

export default function Home() {
    return (
        <SceneEngineProvider>
            <Preloader />
            <ProgressHUD />

            {/* Sections rendered in PRD order */}
            <Hero />
            <Projects />
            <Proof />
            <Capabilities />
            <Credentials />
            <Contact />

            {/* Footer / Copyright */}
            <footer className="py-8 text-center text-xs font-mono text-muted/30 relative z-10">
                © {new Date().getFullYear()} Prudhvi StudioBook. All rights reserved.
            </footer>
        </SceneEngineProvider>
    );
}
