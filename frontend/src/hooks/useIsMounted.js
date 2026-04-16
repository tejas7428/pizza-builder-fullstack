import { useState, useEffect, useRef, useCallback } from 'react';

const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
};

export default useIsMounted;