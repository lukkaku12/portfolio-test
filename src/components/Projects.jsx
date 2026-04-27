import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ items, reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from('.project-row', {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-list',
          start: 'top 82%'
        }
      });

      gsap.utils.toArray('.project-row').forEach((row) => {
        row.addEventListener('mouseenter', () => {
          gsap.to(row, {
            x: 12,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        row.addEventListener('mouseleave', () => {
          gsap.to(row, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="proyectos" className="section" ref={sectionRef}>
      <div className="section-head">
        <p className="section-tag">Proyectos destacados</p>
        <h2>Selección curada de trabajos con enfoque editorial.</h2>
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
