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
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%'
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
