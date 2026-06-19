'use client';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function PageTransition() {
  useEffect(() => {
    // Page entrance animation
    const tl = gsap.timeline({ delay: 0.1 });

    tl.to('body', {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Animate main content
    tl.from('main', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return null;
}
