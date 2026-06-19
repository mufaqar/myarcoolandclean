import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Small helper to resolve ref/current or raw element
 */
const resolveElement = (target) => {
  if (!target) return null;
  return target.current || target;
};

/**
 * GSAP-safe array conversion
 */
const toArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : Array.from(value);
};

/**
 * Creates an isolated animation scope for one utility call.
 * Keeps track of tweens, timelines, ScrollTriggers, and cleanup callbacks.
 */
const createAnimationScope = () => {
  const animations = [];
  const cleanups = [];

  return {
    add(animation) {
      if (animation) animations.push(animation);
      return animation;
    },
    addCleanup(fn) {
      if (typeof fn === 'function') cleanups.push(fn);
    },
    cleanup() {
      animations.forEach((animation) => {
        if (!animation) return;

        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }

        if (typeof animation.kill === 'function') {
          animation.kill();
        }
      });

      cleanups.forEach((fn) => fn());
    },
  };
};

/**
 * Animate element on scroll - fade in and slide up
 */
export const animateOnScroll = (element, options = {}) => {
  const el = resolveElement(element);
  if (!el) {
    console.warn('animateOnScroll: Invalid element reference');
    return null;
  }

  const scope = createAnimationScope();
  const {
    initialY = 30,
    duration = 0.8,
    ease = 'power2.out',
    clearProps = 'transform,opacity',
    scrollTrigger: scrollTriggerOptions = {},
    ...rest
  } = options;

  gsap.set(el, {
    opacity: 0,
    y: initialY,
  });

  const tween = gsap.to(el, {
    opacity: 1,
    y: 0,
    duration,
    ease,
    clearProps,
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
      ...scrollTriggerOptions,
    },
    ...rest,
  });

  scope.add(tween);

  return {
    animation: tween,
    cleanup: () => scope.cleanup(),
  };
};

/**
 * Stagger animation for multiple elements
 */
export const staggerAnimateOnScroll = (containerRef, childSelector, options = {}) => {
  const container = resolveElement(containerRef);
  if (!container) {
    console.warn('staggerAnimateOnScroll: Invalid container reference');
    return null;
  }

  const children = toArray(container.querySelectorAll(childSelector));
  if (!children.length) {
    console.warn(`staggerAnimateOnScroll: No children found for selector "${childSelector}"`);
    return null;
  }

  const scope = createAnimationScope();
  const {
    initialY = 20,
    duration = 0.8,
    ease = 'power2.out',
    clearProps = 'transform,opacity',
    stagger = { each: 0.15, ease: 'power1.inOut' },
    scrollTrigger: scrollTriggerOptions = {},
    ...rest
  } = options;

  gsap.set(children, {
    opacity: 0,
    y: initialY,
  });

  const tween = gsap.to(children, {
    opacity: 1,
    y: 0,
    duration,
    ease,
    stagger,
    clearProps,
    scrollTrigger: {
      trigger: container,
      start: 'top 70%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
      ...scrollTriggerOptions,
    },
    ...rest,
  });

  scope.add(tween);

  return {
    animation: tween,
    cleanup: () => scope.cleanup(),
  };
};

/**
 * Hover tilt animation with safe cleanup
 */
export const tiltOnHover = (element, options = {}) => {
  const el = resolveElement(element);
  if (!el) {
    console.warn('tiltOnHover: Invalid element reference');
    return null;
  }

  const scope = createAnimationScope();
  const {
    maxTilt = 10,
    duration = 0.5,
    leaveDuration = 0.6,
    ease = 'power2.out',
    perspective = 1000,
  } = options;

  gsap.set(el, {
    transformStyle: 'preserve-3d',
    transformPerspective: perspective,
  });

  const handleMouseMove = (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = ((centerX - x) / centerX) * maxTilt;

    gsap.to(el, {
      rotateX: -rotateX,
      rotateY,
      duration,
      ease,
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: leaveDuration,
      ease,
      overwrite: 'auto',
    });
  };

  el.addEventListener('mousemove', handleMouseMove);
  el.addEventListener('mouseleave', handleMouseLeave);

  scope.addCleanup(() => {
    el.removeEventListener('mousemove', handleMouseMove);
    el.removeEventListener('mouseleave', handleMouseLeave);
    gsap.killTweensOf(el);
    gsap.set(el, { clearProps: 'transform' });
  });

  return {
    cleanup: () => scope.cleanup(),
  };
};

/**
 * Counter animation from start to target number
 */
export const animateCounter = (element, endValue, duration = 2, options = {}) => {
  const el = resolveElement(element);
  if (!el) {
    console.warn('animateCounter: Invalid element reference');
    return null;
  }

  const scope = createAnimationScope();
  const {
    startValue = 0,
    ease = 'power2.out',
    format = (num) => Math.floor(num).toLocaleString(),
    ...rest
  } = options;

  const state = { value: startValue };

  const tween = gsap.to(state, {
    value: endValue,
    duration,
    ease,
    onUpdate: () => {
      if (el) el.textContent = format(state.value);
    },
    ...rest,
  });

  scope.add(tween);

  return {
    animation: tween,
    cleanup: () => scope.cleanup(),
  };
};

/**
 * Smooth page load animation
 * Note: this intentionally targets body, so it's global by design.
 */
export const pageLoadAnimation = (options = {}) => {
  const {
    duration = 0.6,
    ease = 'power2.out',
  } = options;

  const tl = gsap.timeline();

  tl.fromTo(
    document.body,
    { opacity: 0 },
    { opacity: 1, duration, ease, clearProps: 'opacity' }
  );

  return {
    animation: tl,
    cleanup: () => tl.kill(),
  };
};

/**
 * Hero section text animation
 * Safe version: no innerHTML rewriting, no global selectors, no leaking cleanup.
 */
export const heroTextAnimation = (containerRef, options = {}) => {
  const container = resolveElement(containerRef);
  if (!container) {
    console.warn('heroTextAnimation: Invalid container reference');
    return null;
  }

  const scope = createAnimationScope();
  const {
    delay = 0.2,
    eyebrowSelector = '.section-eyebrow',
    headingSelector = 'h1, h2',
    descriptionSelector = 'p',
    buttonsSelector = '[data-hero-buttons], .flex.flex-wrap.gap-4',
    featuresSelector = '[data-hero-features], .mt-10',
  } = options;

  const eyebrow = container.querySelector(eyebrowSelector);
  const heading = container.querySelector(headingSelector);
  const description = container.querySelector(descriptionSelector);
  const buttons = container.querySelector(buttonsSelector);
  const features = container.querySelector(featuresSelector);

  const tl = gsap.timeline({
    delay,
    defaults: { ease: 'power3.out' },
  });

  if (eyebrow) {
    gsap.set(eyebrow, { opacity: 0, y: 20, scale: 0.96 });
    tl.to(
      eyebrow,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        clearProps: 'transform,opacity',
      },
      0
    );
  }

  if (heading) {
    gsap.set(heading, { opacity: 0, y: 36 });
    tl.to(
      heading,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        clearProps: 'transform,opacity',
      },
      0.1
    );
  }

  if (description) {
    gsap.set(description, { opacity: 0, y: 24 });
    tl.to(
      description,
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
      0.2
    );
  }

  if (buttons?.children?.length) {
    const buttonArray = toArray(buttons.children);
    gsap.set(buttonArray, { opacity: 0, y: 20, scale: 0.96 });
    tl.to(
      buttonArray,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: 'back.out(1.3)',
        clearProps: 'transform,opacity',
      },
      0.3
    );
  }

  if (features?.children?.length) {
    const featureArray = toArray(features.children);
    gsap.set(featureArray, { opacity: 0, x: -20 });
    tl.to(
      featureArray,
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
      0.4
    );
  }

  scope.add(tl);

  return {
    animation: tl,
    cleanup: () => scope.cleanup(),
  };
};

/**
 * Cleanup hero animation
 * Safe: only clears within the provided container.
 */
export const cleanupHeroAnimation = (containerRef) => {
  const container = resolveElement(containerRef);
  if (!container) return;

  const descendants = container.querySelectorAll('*');
  gsap.killTweensOf(container);
  gsap.killTweensOf(descendants);
  gsap.set([container, ...descendants], { clearProps: 'transform,opacity,filter' });
};

/**
 * Product card hover animation
 */
export const productCardHoverAnimation = (element, options = {}) => {
  const card = resolveElement(element);
  if (!card) {
    console.warn('productCardHoverAnimation: Invalid element reference');
    return null;
  }

  const image = card.querySelector('img');
  const scope = createAnimationScope();

  const {
    liftY = -8,
    scale = 1.05,
    duration = 0.4,
    imageDuration = 0.6,
    shadowRest = '0 4px 6px rgba(0,0,0,0.07)',
    shadowHover = '0 20px 40px rgba(0,0,0,0.1)',
  } = options;

  const handleMouseEnter = () => {
    gsap.to(card, {
      y: liftY,
      boxShadow: shadowHover,
      duration,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (image) {
      gsap.to(image, {
        scale,
        duration: imageDuration,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(card, {
      y: 0,
      boxShadow: shadowRest,
      duration,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: imageDuration,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  card.addEventListener('mouseenter', handleMouseEnter);
  card.addEventListener('mouseleave', handleMouseLeave);

  scope.addCleanup(() => {
    card.removeEventListener('mouseenter', handleMouseEnter);
    card.removeEventListener('mouseleave', handleMouseLeave);
    gsap.killTweensOf(card);
    if (image) gsap.killTweensOf(image);
    gsap.set(card, { clearProps: 'transform,boxShadow' });
    if (image) gsap.set(image, { clearProps: 'transform' });
  });

  return {
    cleanup: () => scope.cleanup(),
  };
};

/**
 * Button pulse animation
 */
export const buttonPulseAnimation = (element, options = {}) => {
  const el = resolveElement(element);
  if (!el) {
    console.warn('buttonPulseAnimation: Invalid element reference');
    return null;
  }

  const {
    scale = 1.05,
    duration = 0.8,
    repeatDelay = 0,
  } = options;

  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay,
  });

  tl.to(el, {
    scale,
    duration,
    ease: 'sine.inOut',
  });

  return {
    animation: tl,
    cleanup: () => {
      tl.kill();
      gsap.set(el, { clearProps: 'transform' });
    },
  };
};

/**
 * Category card flip animation
 */
export const categoryCardFlipAnimation = (element, options = {}) => {
  const card = resolveElement(element);
  if (!card) {
    console.warn('categoryCardFlipAnimation: Invalid element reference');
    return null;
  }

  const scope = createAnimationScope();
  const {
    duration = 0.6,
    ease = 'back.out(1.2)',
    perspective = 1000,
  } = options;

  gsap.set(card, {
    transformStyle: 'preserve-3d',
    transformPerspective: perspective,
  });

  const handleMouseEnter = () => {
    gsap.to(card, {
      rotationY: 180,
      duration,
      ease,
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(card, {
      rotationY: 0,
      duration,
      ease,
      overwrite: 'auto',
    });
  };

  card.addEventListener('mouseenter', handleMouseEnter);
  card.addEventListener('mouseleave', handleMouseLeave);

  scope.addCleanup(() => {
    card.removeEventListener('mouseenter', handleMouseEnter);
    card.removeEventListener('mouseleave', handleMouseLeave);
    gsap.killTweensOf(card);
    gsap.set(card, { clearProps: 'transform' });
  });

  return {
    cleanup: () => scope.cleanup(),
  };
};

/**
 * Parallax scroll animation
 */
export const parallaxAnimation = (element, speed = 0.5, options = {}) => {
  const el = resolveElement(element);
  if (!el) {
    console.warn('parallaxAnimation: Invalid element reference');
    return null;
  }

  const tween = gsap.to(el, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      invalidateOnRefresh: true,
      ...options.scrollTrigger,
    },
    ...options,
  });

  return {
    animation: tween,
    cleanup: () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: 'transform' });
    },
  };
};

/**
 * Rotate on scroll animation
 */
export const rotateOnScrollAnimation = (element, rotationAmount = 360, options = {}) => {
  const el = resolveElement(element);
  if (!el) {
    console.warn('rotateOnScrollAnimation: Invalid element reference');
    return null;
  }

  const tween = gsap.to(el, {
    rotation: rotationAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      invalidateOnRefresh: true,
      ...options.scrollTrigger,
    },
    ...options,
  });

  return {
    animation: tween,
    cleanup: () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: 'transform' });
    },
  };
};

/**
 * Modal open animation
 */
export const modalOpenAnimation = (modalRef, options = {}) => {
  const modal = resolveElement(modalRef);
  if (!modal) {
    console.warn('modalOpenAnimation: Invalid modal reference');
    return null;
  }

  const dialog = modal.querySelector('[role="dialog"]');
  if (!dialog) {
    console.warn('modalOpenAnimation: No dialog found inside modal');
    return null;
  }

  const {
    overlayDuration = 0.2,
    dialogDuration = 0.4,
  } = options;

  gsap.set(modal, { opacity: 0, display: 'flex' });
  gsap.set(dialog, { y: 50, opacity: 0, scale: 0.96 });

  const tl = gsap.timeline();

  tl.to(modal, {
    opacity: 1,
    duration: overlayDuration,
    ease: 'power2.out',
  }).to(
    dialog,
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: dialogDuration,
      ease: 'back.out(1.4)',
    },
    0.05
  );

  return {
    animation: tl,
    cleanup: () => {
      tl.kill();
    },
  };
};

/**
 * Modal close animation
 */
export const modalCloseAnimation = (modalRef, callback, options = {}) => {
  const modal = resolveElement(modalRef);
  if (!modal) {
    console.warn('modalCloseAnimation: Invalid modal reference');
    if (callback) callback();
    return null;
  }

  const dialog = modal.querySelector('[role="dialog"]');
  if (!dialog) {
    console.warn('modalCloseAnimation: No dialog found inside modal');
    if (callback) callback();
    return null;
  }

  const {
    dialogDuration = 0.3,
    overlayDuration = 0.2,
  } = options;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(modal, { display: 'none' });
      if (callback) callback();
    },
  });

  tl.to(dialog, {
    y: 30,
    opacity: 0,
    scale: 0.95,
    duration: dialogDuration,
    ease: 'power2.in',
  }).to(
    modal,
    {
      opacity: 0,
      duration: overlayDuration,
      ease: 'power2.in',
    },
    0.1
  );

  return {
    animation: tl,
    cleanup: () => tl.kill(),
  };
};

/**
 * Scroll to top smooth animation
 * Global by design.
 */
export const scrollToTop = (duration = 1) => {
  const tween = gsap.to(window, {
    scrollTo: { y: 0, autoKill: false },
    duration,
    ease: 'power2.inOut',
  });

  return {
    animation: tween,
    cleanup: () => tween.kill(),
  };
};

/**
 * Word rotate animation
 */
export const wordRotateAnimation = (element, options = {}) => {
  const el = resolveElement(element);
  if (!el) {
    console.warn('wordRotateAnimation: Invalid element reference');
    return null;
  }

  const words = toArray(el.querySelectorAll('[data-word]'));
  if (!words.length) {
    console.warn('wordRotateAnimation: No words with [data-word] attribute found');
    return null;
  }

  const scope = createAnimationScope();
  const {
    duration = 0.8,
    ease = 'back.out(1.4)',
    clearProps = 'transform,opacity',
    scrollTrigger: scrollTriggerOptions = {},
  } = options;

  gsap.set(words, { opacity: 0, rotationY: 90 });

  words.forEach((word) => {
    const tween = gsap.to(word, {
      opacity: 1,
      rotationY: 0,
      duration,
      ease,
      clearProps,
      scrollTrigger: {
        trigger: word,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        ...scrollTriggerOptions,
      },
    });

    scope.add(tween);
  });

  return {
    animations: words,
    cleanup: () => scope.cleanup(),
  };
};

/**
 * Refresh all ScrollTriggers
 * Global helper by design.
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

export default {
  animateOnScroll,
  staggerAnimateOnScroll,
  tiltOnHover,
  animateCounter,
  pageLoadAnimation,
  heroTextAnimation,
  cleanupHeroAnimation,
  productCardHoverAnimation,
  buttonPulseAnimation,
  categoryCardFlipAnimation,
  parallaxAnimation,
  rotateOnScrollAnimation,
  modalOpenAnimation,
  modalCloseAnimation,
  scrollToTop,
  wordRotateAnimation,
  refreshScrollTriggers,
};