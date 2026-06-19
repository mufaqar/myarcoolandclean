import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for scroll-triggered fade-in and slide animations
 * @param {Object} options - Animation options
 * @returns {Object} - ref to attach to element
 */
export function useScrollReveal(options = {}) {
  const {
    direction = 'up',
    duration = 0.8,
    delay = 0,
    triggerStart = 'top 80%',
    stagger = 0,
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const getInitialState = () => {
      const base = { opacity: 0, duration };
      switch (direction) {
        case 'up':
          return { ...base, y: 30 };
        case 'down':
          return { ...base, y: -30 };
        case 'left':
          return { ...base, x: -30 };
        case 'right':
          return { ...base, x: 30 };
        default:
          return base;
      }
    };

    const children = ref.current.children.length > 1;

    if (children && stagger > 0) {
      gsap.set(ref.current.children, getInitialState());
      gsap.to(ref.current.children, {
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        x: 0,
        stagger,
        ...getInitialState(),
        ease: 'power2.out',
        delay,
      });
    } else {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          toggleActions: 'play none none reverse',
        },
        ...getInitialState(),
        ease: 'power2.out',
        delay,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [direction, duration, delay, triggerStart, stagger]);

  return ref;
}

/**
 * Hook for hover animations
 * @param {Object} options - Animation options
 * @returns {Object} - ref to attach to element
 */
export function useHoverAnimation(options = {}) {
  const {
    scale = 1.05,
    y = -8,
    duration = 0.3,
    ease = 'power2.out',
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleEnter = () => {
      gsap.to(el, {
        scale,
        y,
        duration,
        ease,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        scale: 1,
        y: 0,
        duration,
        ease,
        boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      });
    };

    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [scale, y, duration, ease]);

  return ref;
}

/**
 * Hook for parallax scroll effect
 * @param {number} speed - Parallax speed (0-1)
 * @returns {Object} - ref to attach to element
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top center',
        scrub: 1,
      },
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return ref;
}

/**
 * Hook for text word-by-word reveal
 * @returns {Object} - ref to attach to element
 */
export function useTextReveal() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const words = ref.current.querySelectorAll('[data-word]');
    if (words.length === 0) return;

    gsap.from(words, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      rotationY: 90,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return ref;
}
