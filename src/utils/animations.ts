// Animation utilities - CSS-based animations for better performance

// Intersection Observer hook for scroll animations
export const createScrollObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  threshold = 0.1
) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    { threshold }
  );
};

// Simple CSS animation helpers
export const fadeInUp = (element: HTMLElement, delay = 0) => {
  if (!element) return;
  
  setTimeout(() => {
    element.style.transition = 'all 1s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, delay);
};

export const scaleIn = (element: HTMLElement, delay = 0) => {
  if (!element) return;
  
  setTimeout(() => {
    element.style.transition = 'all 0.8s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
  }, delay);
};

export const slideInStagger = (elements: HTMLElement[], staggerDelay = 100) => {
  elements.forEach((element, index) => {
    if (!element) return;
    
    setTimeout(() => {
      element.style.transition = 'all 0.8s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * staggerDelay);
  });
};

// Page transition using CSS
export const pageTransition = () => {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black z-50 transition-transform duration-400 ease-in-out';
  overlay.style.transformOrigin = 'top';
  overlay.style.transform = 'scaleY(0)';
  document.body.appendChild(overlay);
  
  requestAnimationFrame(() => {
    overlay.style.transform = 'scaleY(1)';
  });
  
  setTimeout(() => {
    overlay.style.transformOrigin = 'bottom';
    overlay.style.transform = 'scaleY(0)';
    
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 400);
  }, 400);
};

// Luxury hover animations (simplified CSS versions)
export const luxuryHover = (target: Element | null) => {
  if (!target) return;
  
  const element = target as HTMLElement;
  element.style.transition = 'transform 0.3s ease-out';
  element.style.transform = 'scale(1.05)';
};

export const luxuryHoverOut = (target: Element | null) => {
  if (!target) return;
  
  const element = target as HTMLElement;
  element.style.transition = 'transform 0.3s ease-out';
  element.style.transform = 'scale(1)';
};

// Section entrance animation (simplified CSS version)
export const sectionEntrance = (
  titleSelector: string,
  separatorSelector: string,
  contentSelector: string
) => {
  const title = document.querySelector(titleSelector) as HTMLElement;
  const separator = document.querySelector(separatorSelector) as HTMLElement;
  const content = document.querySelector(contentSelector) as HTMLElement;
  
  if (title) {
    title.style.transition = 'all 1s ease-out';
    title.style.opacity = '1';
    title.style.transform = 'translateY(0)';
  }
  
  if (separator) {
    setTimeout(() => {
      separator.style.transition = 'all 0.6s ease-out';
      separator.style.opacity = '1';
      separator.style.transform = 'scaleX(1)';
    }, 400);
  }
  
  if (content) {
    setTimeout(() => {
      content.style.transition = 'all 0.8s ease-out';
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    }, 700);
  }
};