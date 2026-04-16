import { useState, useMemo } from 'react';

const useInventorySearch = (inventory) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = useMemo(() => {
    if (!searchTerm) return inventory;
    
    return inventory.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventory, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredInventory
  };
};

export default useInventorySearch;