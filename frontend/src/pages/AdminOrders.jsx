import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminOrders, updateOrderStatus } from '../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAdminOrders();
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      const response = await getAdminOrders();
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status');
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const statusOptions = ['Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'];

  if (loading) {
    return <div className="admin-orders">Loading orders...</div>;
  }

  if (error) {
    return <div className="admin-orders error">{error}</div>;
  }

  return (
    <div className="admin-orders">
      <div className="admin-header">
        <h2>Order Management</h2>
        <Link to="/admin" className="btn btn-secondary">Back to Admin Dashboard</Link>
      </div>
      
      <div className="filters">
        <label>Filter by status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Orders</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      
      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order #{order._id.substring(0, 8)}</h3>
                <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="order-details">
                <p><strong>Customer:</strong> {order.userId.name}</p>
                <p><strong>Email:</strong> {order.userId.email}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name} ({item.category})</span>
                    <span>₹{item.price} x {item.qty}</span>
                  </div>
                ))}
              </div>
              
              <div className="order-actions">
                <label>Update Status:</label>
                <select 
                  value={order.status} 
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;