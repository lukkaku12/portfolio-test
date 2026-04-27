import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

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

      CustomEase.create('loaderCurve', '0.65, 0, 0.35, 1');
      const counter = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: 'loaderCurve' },
        onComplete: () => {
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.95,
            transformOrigin: 'center top',
            ease: 'loaderCurve',
            onComplete
          });
        }
      });

      tl.fromTo(
        '.loader-word',
        {
          yPercent: 120,
          skewX: -12,
          scale: 1.15,
          letterSpacing: '0.4em',
          clipPath: 'polygon(0 0, 100% 0, 100% 12%, 0 12%)',
          transformOrigin: 'left center'
        },
        {
          yPercent: 0,
          skewX: 0,
          scale: 1,
          letterSpacing: '0.24em',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.9
        }
      )
        .to(counter, {
          value: 100,
          duration: 2.1,
          onUpdate: () => setProgress(Math.round(counter.value))
        })
        .to(
          '.loader-line',
          {
            scaleX: 1,
            transformOrigin: 'left center',
            duration: 1.2
          },
          '<0.15'
        )
        .to('.loader-word', {
          yPercent: -44,
          skewX: 10,
          scale: 0.9,
          letterSpacing: '0.08em',
          duration: 0.52
        }, '-=0.3');
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
