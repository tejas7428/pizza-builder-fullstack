import { useState, useEffect, useRef } from 'react';

const useIdleState = (timeout = 300000) => { // 5 minutes default
  const [isIdle, setIsIdle] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'touchmove'];
    
    const resetTimeout = () => {
      setIsIdle(false);
      
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      
      timeoutId.current = setTimeout(() => {
        setIsIdle(true);
      }, timeout);
    };

    const handleActivity = () => {
      resetTimeout();
    };

    // Set up event listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Start the timer
    resetTimeout();

    // Clean up
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [timeout]);

  return isIdle;
};

export default useIdleState;