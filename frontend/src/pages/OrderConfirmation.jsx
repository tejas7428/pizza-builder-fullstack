import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../services/api';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrder(id);
        setOrder(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return <div className="order-confirmation">Loading order details...</div>;
  }

  if (error) {
    return <div className="order-confirmation error">{error}</div>;
  }

  return (
    <div className="order-confirmation">
      <h2>Order Confirmed!</h2>
      
      {order && (
        <div className="confirmation-details">
          <div className="confirmation-header">
            <h3>Order #{order._id.substring(0, 8)}</h3>
            <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
              {order.status}
            </span>
          </div>
          
          <div className="order-summary">
            <h4>Order Summary</h4>
            {order.items.map((item, index) => (
              <div key={index} className="summary-item">
                <span>{item.name} ({item.category})</span>
                <span>₹{item.price} x {item.qty}</span>
              </div>
            ))}
            <div className="summary-total">
              <strong>Total: ₹{order.total}</strong>
            </div>
          </div>
          
          <div className="order-info">
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Status:</strong> {order.paid ? 'Paid' : 'Pending'}</p>
          </div>
          
          <div className="next-steps">
            <h4>What happens next?</h4>
            <ul>
              <li>Your order has been received by our kitchen</li>
              <li>You'll receive updates as your order status changes</li>
              <li>Our delivery team will contact you when your pizza is on the way</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className="actions">
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
        <Link to="/orders" className="btn btn-secondary">View All Orders</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;