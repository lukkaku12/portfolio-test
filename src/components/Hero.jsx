import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const heroWords = ['Creative', 'Developer', '/', 'Portfolio'];

export default function Hero({ reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      CustomEase.create('studioFlow', '0.22, 1, 0.36, 1');

      gsap.from('.hero-word', {
        x: (index) => (index % 2 === 0 ? -340 : 340),
        y: (index) => (index % 2 === 0 ? 70 : -70),
        skewX: (index) => (index % 2 === 0 ? -15 : 15),
        scale: 1.3,
        transformOrigin: (index) => (index % 2 === 0 ? 'left center' : 'right center'),
        stagger: 0.08,
        ease: 'studioFlow',
        scrollTrigger: {
          trigger: '#inicio',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      gsap.from('.hero-title', {
        letterSpacing: '0.28em',
        clipPath: 'polygon(0 0, 100% 0, 100% 22%, 0 22%)',
        transformOrigin: 'center top',
        ease: 'studioFlow',
        scrollTrigger: {
          trigger: '#inicio',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      gsap.from('.hero-subtitle', {
        x: -280,
        skewX: -10,
        scale: 1.08,
        letterSpacing: '0.08em',
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        transformOrigin: 'left center',
        ease: 'studioFlow',
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
          x: 45,
          skewY: 3,
          scale: 0.94,
          transformOrigin: 'center center',
          ease: 'studioFlow'
        })
        .to(
          '.hero-title',
          {
            x: 0,
            skewY: 0,
            scale: 1,
            ease: 'studioFlow'
          },
          '>-0.1'
        );

      gsap.to('.orb-a', {
        y: 120,
        x: 45,
        scale: 1.2,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: 'main',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });

      gsap.to('.orb-b', {
        y: -95,
        x: -30,
        scale: 1.24,
        transformOrigin: 'right center',
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
