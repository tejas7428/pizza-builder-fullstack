import { useState, useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';

const useCompareState = () => {
  const [compareList, setCompareList] = useLocalStorageState('compareList', []);

  const addToCompare = (item) => {
    setCompareList(prevCompareList => {
      const exists = prevCompareList.some(compareItem => compareItem._id === item._id);
      if (!exists && prevCompareList.length < 4) { // Limit to 4 items
        return [...prevCompareList, item];
      }
      return prevCompareList;
    });
  };

  const removeFromCompare = (itemId) => {
    setCompareList(prevCompareList => 
      prevCompareList.filter(item => item._id !== itemId)
    );
  };

  const isInCompare = (itemId) => {
    return compareList.some(item => item._id === itemId);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare
  };
};

export default useCompareState;