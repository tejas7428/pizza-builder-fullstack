import { useState, useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';

const useThemeState = () => {
  const [theme, setTheme] = useLocalStorageState('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return [theme, toggleTheme];
};

export default useThemeState;