import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Skills({ groups, reducedMotion }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (reducedMotion) return;
      const q = self.selector;

      gsap.fromTo(
        q('.skill-tag'),
        { x: -40 },
        {
          x: 40,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="section-head">
        <p className="section-tag">Skills</p>
        <h2>Stack técnico con enfoque de producto.</h2>
      </div>

      <div className="skills-grid">
        {Object.entries(groups).map(([groupName, values]) => (
          <article key={groupName} className="skill-group">
            <h3>{groupName}</h3>
            <div className="skill-tags">
              {values.map((value) => (
                <span className="skill-tag" key={value}>
                  {value}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
