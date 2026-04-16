import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMenu, getUserOrders } from '../services/api';

const Dashboard = () => {
  const [menu, setMenu] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, ordersRes] = await Promise.all([
          getMenu(),
          getUserOrders()
        ]);
        setMenu(menuRes.data);
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
    return <div className="dashboard">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="dashboard-section">
        <h3>Available Pizzas</h3>
        <p>Browse our selection of delicious pizzas</p>
        <Link to="/build-pizza" className="btn btn-primary">Build Your Own Pizza</Link>
      </div>
      
      <div className="dashboard-section">
        <h3>Your Recent Orders</h3>
        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.slice(0, 3).map(order => (
              <div key={order._id} className="order-item">
                <p>Order #{order._id.substring(0, 8)} - {order.status}</p>
                <p>Total: ₹{order.total}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
            {orders.length > 3 && (
              <Link to="/orders">View All Orders</Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;