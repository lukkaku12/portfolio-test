import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ reducedMotion }) {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from(navRef.current, {
        y: -120,
        skewX: -8,
        scale: 0.9,
        duration: 1,
        ease: 'power4.out'
      });

      ScrollTrigger.create({
        start: 'top -120',
        end: 99999,
        onUpdate: (self) => {
          gsap.to(navRef.current, {
            y: self.direction === 1 ? -90 : 0,
            skewX: self.direction === 1 ? -2 : 0,
            duration: 0.35,
            ease: 'power2.out'
          });
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <header className="nav-shell" ref={navRef}>
      <span className="nav-brand">YOUR NAME</span>
      <nav>
        <a href="#inicio">Inicio</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#skills">Skills</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}
