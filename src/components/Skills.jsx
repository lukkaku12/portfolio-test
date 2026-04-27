import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills({ groups, reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.from('.skill-group', {
        x: (index) => (index % 2 === 0 ? -180 : 180),
        y: 40,
        skewY: (index) => (index % 2 === 0 ? -6 : 6),
        scale: 0.9,
        clipPath: 'polygon(0 0, 100% 0, 100% 16%, 0 16%)',
        transformOrigin: (index) => (index % 2 === 0 ? 'left center' : 'right center'),
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.skills-grid',
          scrub: true,
          start: 'top 80%',
          end: 'top 30%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="section-head">
        <p className="section-tag">Skills</p>
        <h2>Stack técnico + sensibilidad de producto y diseño.</h2>
      </div>

      <div className="skills-grid">
        {Object.entries(groups).map(([groupName, values]) => (
          <article key={groupName} className="skill-group">
            <h3>{groupName}</h3>
            <ul>
              {values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
