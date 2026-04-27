import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
      'Construcción de design systems, interfaces SaaS y flujos complejos con foco en escalabilidad y UX de alto impacto.'
  },
  {
    role: 'Creative Developer',
    company: 'Motion Lab',
    period: '2020 — 2022',
    description:
      'Desarrollo de sitios de marca experimentales con narrativa por scroll, motion design y microinteracciones avanzadas.'
  }
];

const PROJECTS = [
  {
    id: '01',
    name: 'Aether Commerce',
    category: 'E-commerce Experience',
    year: '2026',
    description: 'Plataforma inmersiva de lujo con transiciones fluidas y experiencia editorial de producto.'
  },
  {
    id: '02',
    name: 'Pulse Intelligence',
    category: 'SaaS Dashboard',
    year: '2025',
    description: 'Sistema de analítica en tiempo real con visualización dinámica y enfoque en decisiones rápidas.'
  },
  {
    id: '03',
    name: 'Atelier Vert',
    category: 'Brand Website',
    year: '2024',
    description: 'Sitio narrativo para estudio creativo con composición tipográfica agresiva y animación cinemática.'
  },
  {
    id: '04',
    name: 'Neon Archive',
    category: 'Portfolio Platform',
    year: '2023',
    description: 'Biblioteca digital de casos con navegación inmersiva, filtros rápidos y visuales de alto contraste.'
  }
];

const SKILLS = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'GSAP', 'Framer Motion'],
  Backend: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'Prisma'],
  Design: ['UI Systems', 'Prototyping', 'Interaction Design', 'Motion Principles'],
  Tools: ['Vite', 'GitHub', 'Figma', 'Notion', 'Vercel/Netlify']
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
          <Experience items={EXPERIENCE} reducedMotion={reducedMotion} />
          <Projects items={PROJECTS} reducedMotion={reducedMotion} />
          <Skills groups={SKILLS} reducedMotion={reducedMotion} />
          <Contact reducedMotion={reducedMotion} />
        </main>
      </div>
    </>
  );
}
