import Preloader from '@/components/scenes/Preloader';
import Hero from '@/components/scenes/Hero';
import Proof from '@/components/scenes/Proof';
import Projects from '@/components/scenes/Projects';
import Capabilities from '@/components/scenes/Capabilities';
import Credentials from '@/components/scenes/Credentials';
import Contact from '@/components/scenes/Contact';

export default function Home() {
  return (
    <>
      <Preloader />

      {/* Sections rendered in PRD order */}
      <Hero />
      <Projects />
      <Proof />
      <Capabilities />
      <Credentials />
      <Contact />

      {/* Footer / Copyright */}
      <footer className="py-8 text-center text-xs font-mono text-muted/30">
        © {new Date().getFullYear()} Prudhvi StudioBook. All rights reserved.
      </footer>
    </>
  );
}
