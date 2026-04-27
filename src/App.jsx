import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceItems = [
  {
    year: '2024 — Actual',
    role: 'Senior Frontend Engineer · Studio X',
    summary:
      'Lideré rediseño del sitio principal, mejorando engagement y performance con animaciones fluidas y arquitectura modular.'
  },
  {
    year: '2022 — 2024',
    role: 'Frontend Developer · Product Lab',
    summary:
      'Implementé design systems y flujos interactivos para plataformas B2B, reduciendo tiempos de desarrollo y aumentando consistencia visual.'
  },
  {
    year: '2020 — 2022',
    role: 'UI Developer · Creative Agency',
    summary:
      'Desarrollé experiencias de marca con storytelling visual y motion design para campañas globales.'
  }
];

const projects = [
  {
    tag: 'Web Experience',
    name: 'Neon Commerce',
    summary: 'E-commerce inmersivo con storytelling por scroll y foco en conversión premium.'
  },
  {
    tag: 'SaaS Platform',
    name: 'Pulse Analytics',
    summary: 'Dashboard interactivo para visualización de KPIs con diseño claro y altamente usable.'
  },
  {
    tag: 'Brand Site',
    name: 'Atelier Nøir',
    summary: 'Sitio editorial para marca de lujo, con transiciones cinemáticas y tipografía protagonista.'
  }
];

export default function App() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const revealNodes = gsap.utils.toArray('.reveal');

      revealNodes.forEach((node, index) => {
        gsap.from(node, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: index < 4 ? index * 0.07 : 0,
          scrollTrigger: {
            trigger: node,
            start: 'top 86%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      gsap.to('.noise', {
        opacity: 0.12,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      gsap.to('.hero', {
        backgroundPositionY: '24%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          scrub: true,
          start: 'top top',
          end: 'bottom top'
        }
      });

      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow: '0 18px 45px rgba(44, 255, 143, 0.13)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            boxShadow: '0 0 0 rgba(44, 255, 143, 0)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className="noise" />
      <header className="top-nav glass">
        <span className="brand">TU NOMBRE</span>
        <nav>
          <a href="#about">Sobre mí</a>
          <a href="#experience">Experiencia</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="hero">
          <p className="eyebrow reveal">Portfolio 2026 · React + Node</p>
          <h1 className="title reveal">
            Diseño experiencias digitales
            <span>claras, inmersivas y memorables.</span>
          </h1>
          <p className="subtitle reveal">
            Soy desarrollador/a con enfoque en productos modernos, animación y rendimiento.
            Este espacio resume quién soy, cómo trabajo y qué he construido.
          </p>
          <div className="cta reveal">
            <a href="#projects" className="btn btn-primary">
              Ver proyectos
            </a>
            <a href="#contact" className="btn btn-ghost">
              Hablemos
            </a>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="section-head reveal">
            <p className="eyebrow">Sobre mí</p>
            <h2>Minimalismo visual + impacto real en negocio.</h2>
          </div>
          <div className="about-grid">
            <article className="glass reveal">
              <h3>Enfoque</h3>
              <p>
                Creo interfaces limpias con microinteracciones que elevan la experiencia sin
                sacrificar usabilidad.
              </p>
            </article>
            <article className="glass reveal">
              <h3>Especialidad</h3>
              <p>
                Frontend avanzado, arquitectura UI escalable, animación con GSAP y diseño
                orientado a conversión.
              </p>
            </article>
            <article className="glass reveal">
              <h3>Objetivo</h3>
              <p>
                Construir productos que comuniquen valor desde el primer scroll y se sientan
                premium en cada detalle.
              </p>
            </article>
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="section-head reveal">
            <p className="eyebrow">Experiencia</p>
            <h2>Trayectoria enfocada en productos digitales de alto estándar.</h2>
          </div>
          <div className="timeline">
            {experienceItems.map((item) => (
              <article key={item.role} className="timeline-item reveal">
                <span className="year">{item.year}</span>
                <h3>{item.role}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="section-head reveal">
            <p className="eyebrow">Proyectos</p>
            <h2>Casos donde diseño, código y estrategia convergen.</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card reveal">
                <p className="tag">{project.tag}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-card glass reveal">
            <p className="eyebrow">Contacto</p>
            <h2>¿Construimos algo memorable juntos?</h2>
            <p>
              Disponible para proyectos freelance, colaboraciones de producto o roles full-time.
            </p>
            <a className="btn btn-primary" href="mailto:tuemail@correo.com">
              tuemail@correo.com
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
