'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CounterAnimation({ target, suffix = '', duration = 2 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Use gsap.context() for proper isolation
    const ctx = gsap.context(() => {
      const displayValue = { value: 0 };

      gsap.to(displayValue, {
        value: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.floor(displayValue.value).toLocaleString() + suffix;
          }
        },
      });
    }, ref);

    return () => {
      // Perfect cleanup
      ctx.revert();
    };
  }, [target, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}
