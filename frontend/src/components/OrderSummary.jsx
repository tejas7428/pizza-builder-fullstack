import React from 'react';
import OrderTracker from './OrderTracker';

const OrderSummary = ({ order }) => {
  if (!order) return null;

  return (
    <div className="order-summary-card">
      <div className="order-header">
        <h3>Order #{order._id.substring(0, 8)}</h3>
        <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
          {order.status}
        </span>
      </div>
      
      <OrderTracker order={order} />
      
      <div className="order-details">
        <h4>Order Details</h4>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ₹{order.total}</p>
        <p><strong>Payment Status:</strong> {order.paid ? 'Paid' : 'Pending'}</p>
      </div>
      
      <div className="order-items">
        <h4>Items</h4>
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <span>{item.name} ({item.category})</span>
            <span>₹{item.price} x {item.qty}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;