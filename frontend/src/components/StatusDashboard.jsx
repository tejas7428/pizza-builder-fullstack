import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const StatusDashboard = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !user) return;

    // Join user room
    socket.emit('joinRoom', user.id);

    // Listen for order status updates
    socket.on('orderStatusUpdate', (data) => {
      setOrders(prevOrders => {
        const updatedOrders = [...prevOrders];
        const orderIndex = updatedOrders.findIndex(order => order.id === data.orderId);
        if (orderIndex !== -1) {
          updatedOrders[orderIndex].status = data.status;
          updatedOrders[orderIndex].updatedAt = data.timestamp;
        }
        return updatedOrders;
      });
    });

    return () => {
      socket.off('orderStatusUpdate');
    };
  }, [socket, user]);

  if (!user) {
    return null;
  }

  return (
    <div className="status-dashboard">
      <h3>Order Status Updates</h3>
      {orders.length === 0 ? (
        <p>No recent order updates</p>
      ) : (
        <div className="orders-status">
          {orders.map(order => (
            <div key={order.id} className="order-status">
              <p>Order #{order.id.substring(0, 8)}</p>
              <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                {order.status}
              </span>
              <p>Updated: {new Date(order.updatedAt).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDashboard;