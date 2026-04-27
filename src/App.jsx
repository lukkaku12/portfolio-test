import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

const EXPERIENCE = [
  {
    role: 'Lead Frontend Developer',
    company: 'Nova Studio',
    period: '2024 — Actual',
    description:
      'Arquitectura de experiencias inmersivas para e-commerce premium, optimizando performance y storytelling visual.'
  },
  {
    role: 'Senior Product Engineer',
    company: 'Pulse Systems',
    period: '2022 — 2024',
    description:
      'Construcción de design systems y flujos SaaS complejos con foco en escalabilidad y claridad visual.'
  },
  {
    role: 'Creative Developer',
    company: 'Motion Lab',
    period: '2020 — 2022',
    description:
      'Desarrollo de experiencias de marca con narrativa por scroll y motion design funcional.'
  }
];

const PROJECTS = [
  {
    id: '01',
    name: 'Aether Commerce',
    category: 'E-commerce Experience',
    year: '2026',
    description: 'Plataforma inmersiva de lujo con transiciones fluidas y narrativa editorial de producto.'
  },
  {
    id: '02',
    name: 'Pulse Intelligence',
    category: 'SaaS Dashboard',
    year: '2025',
    description: 'Sistema analítico en tiempo real con visualización limpia y foco en decisiones rápidas.'
  },
  {
    id: '03',
    name: 'Atelier Vert',
    category: 'Brand Website',
    year: '2024',
    description: 'Sitio de marca con composición tipográfica fuerte y microinteracciones sutiles.'
  }
];

const SKILLS = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'GSAP', 'Framer Motion'],
  Backend: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL'],
  Design: ['UI Systems', 'Interaction Design', 'Prototyping', 'Motion Principles'],
  Tools: ['Vite', 'GitHub', 'Figma', 'Notion', 'Netlify']
};

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false
    });

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!isLoading) ScrollTrigger.refresh();
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader reducedMotion={reducedMotion} onComplete={() => setIsLoading(false)} />}

      <div className={`app-shell ${isLoading ? 'is-locked' : ''}`}>
        <div className="bg-orb orb-a" aria-hidden="true" />
        <div className="bg-orb orb-b" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />

        <Navbar reducedMotion={reducedMotion} />

        <main>
          <Hero reducedMotion={reducedMotion} />
          <Intro reducedMotion={reducedMotion} />
          <Experience items={EXPERIENCE} reducedMotion={reducedMotion} />
          <Projects items={PROJECTS} reducedMotion={reducedMotion} />
          <Skills groups={SKILLS} reducedMotion={reducedMotion} />
          <Contact reducedMotion={reducedMotion} />
        </main>
      </div>
    </>
  );
}
