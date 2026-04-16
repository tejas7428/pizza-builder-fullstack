import { useEffect, useRef } from 'react';

const useMutationObserver = (callback, options = { childList: true, subtree: true }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    
    if (!node || !window.MutationObserver) {
      return;
    }

    const observer = new MutationObserver(callback);
    observer.observe(node, options);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return elementRef;
};

export default useMutationObserver;