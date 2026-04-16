import { useState, useEffect } from 'react';

const usePrefersDarkMode = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    setPrefersDarkMode(mediaQuery.matches);
    
    const handler = (event) => {
      setPrefersDarkMode(event.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  return prefersDarkMode;
};

export default usePrefersDarkMode;