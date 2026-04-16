import { useEffect } from 'react';

const useFavicon = (href) => {
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    
    link.rel = 'icon';
    link.href = href;
    
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [href]);
};

export default useFavicon;