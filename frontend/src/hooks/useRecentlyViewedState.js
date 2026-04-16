import { useState, useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';

const useRecentlyViewedState = (maxItems = 10) => {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorageState('recentlyViewed', []);

  const addRecentlyViewed = (item) => {
    setRecentlyViewed(prevRecentlyViewed => {
      // Remove if already exists
      const filtered = prevRecentlyViewed.filter(viewedItem => viewedItem._id !== item._id);
      
      // Add to beginning
      const newList = [item, ...filtered];
      
      // Limit to maxItems
      return newList.slice(0, maxItems);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return {
    recentlyViewed,
    addRecentlyViewed,
    clearRecentlyViewed
  };
};

export default useRecentlyViewedState;