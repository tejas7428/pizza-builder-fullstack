import { useState, useEffect, useRef, useCallback } from 'react';

const useLongPress = (callback, delay = 500) => {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const start = useCallback(() => {
    if (timeoutRef.current) return;
    
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
      timeoutRef.current = null;
      setIsPressed(false);
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPressed(false);
  }, []);

  return {
    isPressed,
    start,
    clear
  };
};

export default useLongPress;