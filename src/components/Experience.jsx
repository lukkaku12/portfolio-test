import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ items, reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from('.exp-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.exp-head',
          start: 'top 78%'
        }
      });

      gsap.from('.exp-card', {
        y: 44,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.exp-grid',
          start: 'top 82%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="experiencia" className="section" ref={sectionRef}>
      <div className="section-head exp-head">
        <p className="section-tag">Experiencia</p>
        <h2>Resultados sólidos con visión estética y técnica.</h2>
      </div>

      <div className="exp-grid">
        {items.map((item) => (
          <article key={item.role} className="exp-card">
            <p className="exp-period">{item.period}</p>
            <h3>{item.role}</h3>
            <p className="exp-company">{item.company}</p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
