import { useState, useEffect } from 'react';
import { getUserOrders } from '../services/api';

const useOrdersState = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserOrders();
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error
  };
};

export default useOrdersState;