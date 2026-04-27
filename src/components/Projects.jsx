import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ items, reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from('.projects-title', {
        x: 280,
        skewX: 11,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects-title',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      gsap.utils.toArray('.project-row').forEach((row, index) => {
        gsap.from(row, {
          x: index % 2 === 0 ? -220 : 220,
          skewX: index % 2 === 0 ? -9 : 9,
          rotate: index % 2 === 0 ? -2 : 2,
          scale: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            scrub: true,
            start: 'top 80%',
            end: 'top 30%'
          }
        });

        gsap.to(row, {
          x: index % 2 === 0 ? 16 : -16,
          scrollTrigger: {
            trigger: row,
            scrub: true,
            start: 'top 70%',
            end: 'bottom 25%'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="proyectos" className="section" ref={sectionRef}>
      <div className="section-head">
        <p className="section-tag">Proyectos destacados</p>
        <h2 className="projects-title">Selección curada de trabajos con enfoque editorial.</h2>
      </div>

      <div className="projects-list">
        {items.map((project) => (
          <article key={project.id} className="project-row">
            <span className="project-id">{project.id}</span>
            <h3>{project.name}</h3>
            <p className="project-meta">{project.category}</p>
            <p className="project-meta">{project.year}</p>
            <p className="project-description">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
