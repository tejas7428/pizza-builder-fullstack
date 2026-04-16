import { useEffect } from 'react';

const useLockBodyScroll = (locked = true) => {
  useEffect(() => {
    if (locked) {
      // Save the original overflow value
      const originalOverflow = document.body.style.overflow;
      
      // Lock the body scroll
      document.body.style.overflow = 'hidden';
      
      // Restore the original overflow value when the component unmounts
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [locked]);
};

export default useLockBodyScroll;