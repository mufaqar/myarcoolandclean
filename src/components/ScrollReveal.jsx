'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal Component - Wraps content and reveals it on scroll
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to reveal
 * @param {string} props.direction - Animation direction: 'up', 'down', 'left', 'right'
 * @param {number} props.delay - Stagger delay in seconds
 * @param {number} props.duration - Animation duration
 * @param {string} props.className - Additional CSS classes
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const getInitialValues = () => {
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

    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...getInitialValues(),
      ease: 'power2.out',
      delay,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [direction, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
