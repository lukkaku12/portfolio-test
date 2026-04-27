import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar({ reducedMotion }) {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from(navRef.current, {
        y: -36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
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
