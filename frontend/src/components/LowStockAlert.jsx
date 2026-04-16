import React, { useState, useEffect } from 'react';

const LowStockAlert = ({ inventory }) => {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    if (!inventory || inventory.length === 0) return;

    const lowStock = inventory.filter(item => item.stock < item.threshold);
    setLowStockItems(lowStock);
  }, [inventory]);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="low-stock-alert">
      <h3>Low Stock Alert</h3>
      <p>Attention! The following items are below their threshold levels:</p>
      <ul>
        {lowStockItems.map(item => (
          <li key={item._id} className="low-stock-item">
            <span>{item.name} ({item.category})</span>
            <span>Stock: {item.stock} | Threshold: {item.threshold}</span>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary">Restock Items</button>
    </div>
  );
};

export default LowStockAlert;