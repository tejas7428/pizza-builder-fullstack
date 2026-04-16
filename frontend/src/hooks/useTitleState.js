import { useEffect } from 'react';

const useTitleState = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useTitleState;