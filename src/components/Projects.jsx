import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function Projects({ items, reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      CustomEase.create('rowSnap', '0.83, 0, 0.17, 1');

      gsap.from('.projects-title', {
        x: 320,
        skewX: 12,
        scale: 1.2,
        letterSpacing: '0.1em',
        clipPath: 'polygon(0 0, 100% 0, 100% 24%, 0 24%)',
        transformOrigin: 'right center',
        ease: 'rowSnap',
        scrollTrigger: {
          trigger: '.projects-title',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      gsap.utils.toArray('.project-row').forEach((row, index) => {
        gsap.from(row, {
          x: index % 2 === 0 ? -240 : 240,
          skewX: index % 2 === 0 ? -10 : 10,
          rotate: index % 2 === 0 ? -2.5 : 2.5,
          scale: 0.9,
          clipPath: index % 2 === 0
            ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
            : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          transformOrigin: index % 2 === 0 ? 'left center' : 'right center',
          ease: 'rowSnap',
          scrollTrigger: {
            trigger: row,
            scrub: true,
            start: 'top 80%',
            end: 'top 30%'
          }
        });

        gsap.to(row, {
          x: index % 2 === 0 ? 22 : -22,
          letterSpacing: '0.01em',
          transformOrigin: index % 2 === 0 ? 'left center' : 'right center',
          ease: 'none',
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
