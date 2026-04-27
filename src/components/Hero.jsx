import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero({ reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (reducedMotion) return;
      const q = self.selector;

      gsap.fromTo(
        q('.hero-title'),
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1,
          ease: 'power4.out',
          delay: 0.2
        }
      );

      gsap.from(q('.hero-subtitle'), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.to(q('.hero-gradient'), {
        y: 80,
        x: -40,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="inicio" className="hero section" ref={sectionRef}>
      <div className="hero-gradient" aria-hidden="true" />
      <p className="section-tag">Portfolio 2026</p>
      <h1 className="hero-title">Creative Developer / Portfolio</h1>
      <p className="hero-subtitle">Experiencias, proyectos y soluciones digitales</p>
    </section>
  );
}
