import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroWords = ['Creative', 'Developer', '/', 'Portfolio'];

export default function Hero({ reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from('.hero-word', {
        x: (index) => (index % 2 === 0 ? -320 : 320),
        y: (index) => (index % 2 === 0 ? 50 : -50),
        skewX: (index) => (index % 2 === 0 ? -14 : 14),
        scale: 1.25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#inicio',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      gsap.from('.hero-subtitle', {
        x: -260,
        skewX: -10,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-subtitle',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#inicio',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      titleTl
        .to('.hero-title', {
          x: 35,
          skewY: 3,
          scale: 0.95,
          ease: 'none'
        })
        .to(
          '.hero-title',
          {
            x: 0,
            skewY: 0,
            scale: 1,
            ease: 'none'
          },
          '>-0.1'
        );

      gsap.to('.orb-a', {
        y: 110,
        x: 35,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: 'main',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      gsap.to('.orb-b', {
        y: -90,
        x: -25,
        scale: 1.22,
        ease: 'none',
        scrollTrigger: {
          trigger: 'main',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
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
