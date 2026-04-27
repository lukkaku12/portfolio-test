import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Experience({ items, reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (reducedMotion) return;
      const q = self.selector;

      gsap.from(q('.experience-item'), {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.16,
        scrollTrigger: {
          trigger: q('.experience-list')[0],
          start: 'top 80%',
          end: 'top 40%',
          scrub: 0.8
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="experiencia" className="section" ref={sectionRef}>
      <div className="section-head">
        <p className="section-tag">Experiencia</p>
        <h2>Timeline de producto, diseño y desarrollo.</h2>
      </div>

      <div className="experience-list">
        {items.map((item) => (
          <article key={item.role} className="experience-item">
            <span className="timeline-dot" aria-hidden="true" />
            <div>
              <p className="exp-period">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="exp-company">{item.company}</p>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
