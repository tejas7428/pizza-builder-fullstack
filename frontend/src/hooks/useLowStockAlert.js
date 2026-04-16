import { useState, useEffect } from 'react';

const useLowStockAlert = (inventory) => {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    if (!inventory || inventory.length === 0) return;

    const lowStock = inventory.filter(item => item.stock < item.threshold);
    setLowStockItems(lowStock);
  }, [inventory]);

  return {
    lowStockItems,
    hasLowStock: lowStockItems.length > 0
  };
};

export default useLowStockAlert;