import { useState, useMemo } from 'react';

const useOrderSearch = (orders) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    
    return orders.filter(order => 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.userId && order.userId.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.userId && order.userId.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [orders, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredOrders
  };
};

export default useOrderSearch;