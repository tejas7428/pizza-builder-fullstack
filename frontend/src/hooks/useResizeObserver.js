import { useState, useEffect, useRef } from 'react';

const useResizeObserver = () => {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined
  });
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    
    if (!node || !window.ResizeObserver) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [elementRef, size];
};

export default useResizeObserver;