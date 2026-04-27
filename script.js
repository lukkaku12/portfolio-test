gsap.registerPlugin(ScrollTrigger);

const revealed = gsap.utils.toArray('.reveal');

revealed.forEach((el, i) => {
  gsap.from(el, {
    y: 36,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: i < 4 ? i * 0.08 : 0,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

gsap.to('.noise', {
  opacity: 0.12,
  duration: 2.4,
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut'
});

gsap.to('.hero', {
  backgroundPositionY: '25%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    scrub: true,
    start: 'top top',
    end: 'bottom top'
  }
});

const cards = gsap.utils.toArray('.project-card');
cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      boxShadow: '0 18px 45px rgba(44, 255, 143, 0.13)',
      duration: 0.35,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      boxShadow: '0 0 0 rgba(44, 255, 143, 0)',
      duration: 0.35,
      ease: 'power2.out'
    });
  });
});
