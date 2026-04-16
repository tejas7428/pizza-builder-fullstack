import { useState, useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';

const useDarkModeState = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState('darkMode', false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleDarkMode];
};

export default useDarkModeState;