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
          x: -280,
          skewX: -10,
          scale: 1.2,
          letterSpacing: '0.08em',
          clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0 20%)',
          transformOrigin: 'left center',
          ease: 'expo.out'
        })
        .from(
          '.contact-card p',
          {
            x: 220,
            skewX: 8,
            scale: 0.92,
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            transformOrigin: 'right center',
            ease: 'expo.out'
          },
          '<'
        )
        .from(
          '.contact-cta',
          {
            y: 80,
            scale: 0.7,
            skewY: -8,
            transformOrigin: 'center bottom',
            ease: 'expo.out'
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
