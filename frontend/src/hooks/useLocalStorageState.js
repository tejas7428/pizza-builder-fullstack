import { useState, useEffect } from 'react';

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorageState;