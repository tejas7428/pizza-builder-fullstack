import { useEffect } from 'react';

const usePageLeave = (callback) => {
  useEffect(() => {
    const handleMouseLeave = (event) => {
      // Check if mouse is leaving the document
      if (event.clientY <= 0 || event.clientX <= 0 || 
          event.clientX >= window.innerWidth || event.clientY >= window.innerHeight) {
        callback(event);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [callback]);
};

export default usePageLeave;