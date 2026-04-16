import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInventory, getAdminOrders } from '../services/api';

const AdminDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inventoryRes, ordersRes] = await Promise.all([
          getInventory(),
          getAdminOrders()
        ]);
        setInventory(inventoryRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div className="admin-dashboard">Loading...</div>;
  }

  if (error) {
    return <div className="admin-dashboard error">{error}</div>;
  }

  // Group inventory by category
  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="admin-section">
        <h3>Inventory Management</h3>
        <Link to="/admin/inventory" className="btn btn-primary">Manage Inventory</Link>
        
        <div className="inventory-summary">
          {Object.entries(groupedInventory).map(([category, items]) => (
            <div key={category} className="inventory-category">
              <h4>{category.charAt(0).toUpperCase() + category.slice(1)}s</h4>
              <p>Total Items: {items.length}</p>
              <p>Low Stock Items: {items.filter(item => item.stock < item.threshold).length}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="admin-section">
        <h3>Recent Orders</h3>
        <Link to="/admin/orders" className="btn btn-primary">Manage Orders</Link>
        
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.slice(0, 5).map(order => (
              <div key={order._id} className="order-item">
                <p>Order #{order._id.substring(0, 8)} - {order.status}</p>
                <p>Customer: {order.userId.name}</p>
                <p>Total: ₹{order.total}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;