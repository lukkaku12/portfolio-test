import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ reducedMotion }) {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.fromTo(
        navRef.current,
        { y: -28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.15, ease: 'power3.out' }
      );

      ScrollTrigger.create({
        start: 'top -120',
        end: 99999,
        onUpdate: (self) => {
          gsap.to(navRef.current, {
            y: self.direction === 1 ? -90 : 0,
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
