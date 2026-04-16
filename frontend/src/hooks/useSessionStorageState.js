import { useState, useEffect } from 'react';

const useSessionStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving to sessionStorage: ${error}`);
    }
  }, [key, state]);

  return [state, setState];
};

export default useSessionStorageState;