import { useEffect, useRef } from 'react';
import { createScrollObserver } from '@/utils/animations';

export const useScrollAnimation = (
  animationCallback: () => void,
  threshold = 0.1
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = createScrollObserver(
      (entry) => {
        if (entry.isIntersecting) {
          animationCallback();
          observer.unobserve(entry.target);
        }
      },
      threshold
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [animationCallback, threshold]);

  return elementRef;
};