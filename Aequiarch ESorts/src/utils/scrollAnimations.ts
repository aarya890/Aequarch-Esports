export const initScrollAnimations = () => {
  // Check if the browser supports Intersection Observer
  if (!('IntersectionObserver' in window)) {
    // Fallback: Show all elements without animation
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observerOptions = {
    root: null, // Use viewport as root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Observe all elements with animation classes
  document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
  });

  return () => {
    // Cleanup function
    observer.disconnect();
  };
};