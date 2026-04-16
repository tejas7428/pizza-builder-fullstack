import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useSearchHistory = (maxItems = 10) => {
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);

  const addSearchTerm = (term) => {
    if (!term || term.trim() === '') return;
    
    setSearchHistory(prevSearchHistory => {
      // Remove if already exists
      const filtered = prevSearchHistory.filter(searchTerm => searchTerm !== term);
      
      // Add to beginning
      const newList = [term, ...filtered];
      
      // Limit to maxItems
      return newList.slice(0, maxItems);
    });
  };

  const removeSearchTerm = (term) => {
    setSearchHistory(prevSearchHistory => 
      prevSearchHistory.filter(searchTerm => searchTerm !== term)
    );
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return {
    searchHistory,
    addSearchTerm,
    removeSearchTerm,
    clearSearchHistory
  };
};

export default useSearchHistory;