import { useState, useEffect } from 'react';
import { getInventory } from '../services/api';

const useInventoryState = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getInventory();
        setInventory(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Group inventory by category
  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return {
    inventory,
    groupedInventory,
    loading,
    error
  };
};

export default useInventoryState;