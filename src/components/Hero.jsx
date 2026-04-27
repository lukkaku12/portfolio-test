import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const heroWords = ['Creative', 'Developer', '/', 'Portfolio'];

export default function Hero({ reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from('.hero-word', {
        yPercent: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power4.out',
        delay: 0.35
      });

      gsap.from('.hero-subtitle', {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7
      });

      gsap.to('.orb-a', {
        y: 70,
        scrollTrigger: {
          trigger: '#inicio',
          scrub: true,
          start: 'top top',
          end: 'bottom top'
        }
      });

      gsap.to('.orb-b', {
        y: -60,
        x: 35,
        scrollTrigger: {
          trigger: 'main',
          scrub: true,
          start: 'top top',
          end: 'bottom bottom'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="inicio" className="hero section" ref={sectionRef}>
      <p className="section-tag">Portfolio 2026</p>
      <h1 className="hero-title">
        {heroWords.map((word, index) => (
          <span className="hero-word-wrap" key={`${word}-${index}`}>
            <span className="hero-word">{word}</span>
          </span>
        ))}
      </h1>
      <p className="hero-subtitle">Experiencias, proyectos y soluciones digitales</p>
    </section>
  );
}
