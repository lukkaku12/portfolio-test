import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from('.contact-card > *', {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.contact-card',
          start: 'top 82%'
        }
      });
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
