import { useState, useMemo } from 'react';

const useOrderFilter = (orders) => {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders;
    
    return orders.filter(order => order.status === statusFilter);
  }, [orders, statusFilter]);

  return {
    statusFilter,
    setStatusFilter,
    filteredOrders
  };
};

export default useOrderFilter;