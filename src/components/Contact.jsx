import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-card',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      contactTl
        .from('.contact-card h2', {
          x: -260,
          skewX: -10,
          scale: 1.18,
          ease: 'none'
        })
        .from(
          '.contact-card p',
          {
            x: 220,
            skewX: 8,
            scale: 0.92,
            ease: 'none'
          },
          '<'
        )
        .from(
          '.contact-cta',
          {
            y: 80,
            scale: 0.7,
            skewY: -8,
            ease: 'none'
          },
          '<0.05'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="contacto" className="section contact" ref={sectionRef}>
      <div className="contact-card">
        <p className="section-tag">Contacto</p>
        <h2>¿Tienes una idea ambiciosa? Hagámosla realidad.</h2>
        <p>
          Disponible para colaborar en websites premium, productos digitales y experiencias
          interactivas que dejen huella.
        </p>
        <a href="mailto:hola@tuportfolio.com" className="contact-cta">
          Iniciar proyecto
        </a>
      </div>
    </section>
  );
}
