import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    
    if (!node || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [elementRef, isIntersecting, entry];
};

export default useIntersectionObserver;