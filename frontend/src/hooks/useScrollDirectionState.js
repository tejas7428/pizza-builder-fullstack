import { useState, useEffect } from 'react';

const useScrollDirectionState = (threshold = 10) => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      
      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        return;
      }
      
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, threshold]);

  return scrollDirection;
};

export default useScrollDirectionState;