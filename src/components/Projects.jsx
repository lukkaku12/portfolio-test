import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Projects({ items, reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (reducedMotion) return;
      const q = self.selector;
      const rows = q('.project-row');

      rows.forEach((row, index) => {
        gsap.from(row, {
          x: index % 2 === 0 ? -70 : 70,
          opacity: 0,
          clipPath: index % 2 === 0
            ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
            : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 1
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="proyectos" className="section" ref={sectionRef}>
      <div className="section-head">
        <p className="section-tag">Proyectos</p>
        <h2>Selección de trabajos destacados.</h2>
      </div>

      <div className="projects-list">
        {items.map((project) => (
          <article key={project.id} className="project-row">
            <span className="project-id">{project.id}</span>
            <h3>{project.name}</h3>
            <p className="project-meta">{project.category}</p>
            <p className="project-meta">{project.year}</p>
            <p className="project-description">{project.description}</p>
            <div className="project-preview" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
