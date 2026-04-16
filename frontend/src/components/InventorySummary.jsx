import React from 'react';

const InventorySummary = ({ inventory }) => {
  if (!inventory || inventory.length === 0) {
    return <div className="inventory-summary">No inventory data available</div>;
  }

  // Group inventory by category
  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Calculate summary statistics
  const summary = Object.keys(groupedInventory).map(category => {
    const items = groupedInventory[category];
    const totalItems = items.length;
    const lowStockItems = items.filter(item => item.stock < item.threshold).length;
    const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
    
    return {
      category,
      totalItems,
      lowStockItems,
      totalStock,
      percentageLowStock: totalItems > 0 ? (lowStockItems / totalItems) * 100 : 0
    };
  });

  return (
    <div className="inventory-summary">
      <h3>Inventory Summary</h3>
      <div className="summary-grid">
        {summary.map(item => (
          <div key={item.category} className="summary-card">
            <h4>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}s</h4>
            <p>Total Items: {item.totalItems}</p>
            <p>Low Stock: {item.lowStockItems}</p>
            <p>Total Stock: {item.totalStock}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${100 - item.percentageLowStock}%` }}
              ></div>
            </div>
            <p>{Math.round(100 - item.percentageLowStock)}% in stock</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventorySummary;