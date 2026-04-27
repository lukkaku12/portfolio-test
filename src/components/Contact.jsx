import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contact({ reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (reducedMotion) return;
      const q = self.selector;

      gsap.from(q('.contact-title'), {
        y: 50,
        opacity: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1
        }
      });

      gsap.from(q('.contact-cta'), {
        y: 30,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: q('.contact-cta')[0],
          start: 'top 90%',
          end: 'top 50%',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="contacto" className="section contact" ref={sectionRef}>
      <div className="contact-card">
        <p className="section-tag">Contacto</p>
        <h2 className="contact-title">¿Listo para construir una experiencia digital memorable?</h2>
        <p>
          Disponible para colaboraciones, proyectos freelance y equipos que quieran elevar su
          producto digital.
        </p>
        <a href="mailto:hola@tuportfolio.com" className="contact-cta">
          Iniciar proyecto
        </a>
      </div>
    </section>
  );
}
