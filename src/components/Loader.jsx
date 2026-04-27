import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete, reducedMotion }) {
  const loaderRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        setProgress(100);
        gsap.delayedCall(0.2, onComplete);
        return;
      }

      const counter = { value: 0 };
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            onComplete
          });
        }
      });

      tl.fromTo(
        '.loader-word',
        { yPercent: 120, skewX: -10, scale: 1.12 },
        { yPercent: 0, skewX: 0, scale: 1, duration: 0.8 }
      )
        .to(counter, {
          value: 100,
          duration: 2,
          onUpdate: () => setProgress(Math.round(counter.value))
        })
        .to('.loader-line', {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 1.2
        }, '<0.2')
        .to('.loader-word', { yPercent: -40, skewX: 10, scale: 0.9, duration: 0.5 }, '-=0.3');
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete, reducedMotion]);

  return (
    <div className="loader" ref={loaderRef} aria-hidden="true">
      <div className="loader-inner">
        <p className="loader-word">LOADING EXPERIENCE</p>
        <div className="loader-line" />
        <p className="loader-progress">{progress}%</p>
      </div>
    </div>
  );
}
