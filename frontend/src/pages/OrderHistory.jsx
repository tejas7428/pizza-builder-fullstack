import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders();
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="order-history">Loading orders...</div>;
  }

  if (error) {
    return <div className="order-history error">{error}</div>;
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>
      
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order #{order._id.substring(0, 8)}</h3>
                <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-details">
                <p>Total: ₹{order.total}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Items: {order.items.length}</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;