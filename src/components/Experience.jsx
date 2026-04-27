import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ items, reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from('.exp-head h2', {
        x: -320,
        skewX: -12,
        scale: 1.2,
        letterSpacing: '0.08em',
        clipPath: 'polygon(0 0, 100% 0, 100% 26%, 0 26%)',
        transformOrigin: 'left center',
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.exp-head',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      gsap.utils.toArray('.exp-card').forEach((card, index) => {
        gsap.from(card, {
          x: index % 2 === 0 ? -220 : 220,
          y: 80,
          skewX: index % 2 === 0 ? -8 : 8,
          scale: 0.9,
          clipPath: 'polygon(0 0, 100% 0, 100% 12%, 0 12%)',
          transformOrigin: index % 2 === 0 ? 'left center' : 'right center',
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            scrub: true,
            start: 'top 80%',
            end: 'top 30%'
          }
        });

        gsap.to(card, {
          y: -20,
          letterSpacing: '0.01em',
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            scrub: true,
            start: 'top 80%',
            end: 'bottom 20%'
          }
        });
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
