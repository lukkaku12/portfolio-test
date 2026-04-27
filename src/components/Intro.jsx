import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const lines = [
  'Diseño productos digitales',
  'que se sienten premium',
  'sin sacrificar claridad ni performance.'
];

export default function Intro({ reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (reducedMotion) return;
      const q = self.selector;

      gsap.from(q('.intro-line'), {
        x: (index) => (index % 2 === 0 ? -60 : 60),
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="section intro" id="intro" ref={sectionRef}>
      <div className="intro-wrap">
        {lines.map((line) => (
          <p key={line} className="intro-line">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
