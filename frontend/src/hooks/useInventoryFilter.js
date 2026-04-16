import { useState, useMemo } from 'react';

const useInventoryFilter = (inventory) => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  const filteredInventory = useMemo(() => {
    let result = inventory;
    
    if (categoryFilter !== 'all') {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    if (stockFilter === 'low') {
      result = result.filter(item => item.stock < item.threshold);
    } else if (stockFilter === 'in-stock') {
      result = result.filter(item => item.stock >= item.threshold);
    }
    
    return result;
  }, [inventory, categoryFilter, stockFilter]);

  return {
    categoryFilter,
    setCategoryFilter,
    stockFilter,
    setStockFilter,
    filteredInventory
  };
};

export default useInventoryFilter;