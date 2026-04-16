import { useState, useMemo } from 'react';

const useFilterState = (data, filterFunction) => {
  const [filters, setFilters] = useState({});

  const filteredData = useMemo(() => {
    if (Object.keys(filters).length === 0) return data;
    
    return data.filter(item => {
      return Object.keys(filters).every(key => {
        if (filters[key] === null || filters[key] === undefined || filters[key] === '') {
          return true;
        }
        
        if (filterFunction && typeof filterFunction === 'function') {
          return filterFunction(item, key, filters[key]);
        }
        
        // Default filtering logic
        if (typeof item[key] === 'string') {
          return item[key].toLowerCase().includes(filters[key].toLowerCase());
        }
        
        return item[key] === filters[key];
      });
    });
  }, [data, filters, filterFunction]);

  const setFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    filteredData,
    filters,
    setFilter,
    clearFilters
  };
};

export default useFilterState;