import React from 'react';

const OrderTracker = ({ order }) => {
  if (!order) return null;

  const statusSteps = ['Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'];
  const currentStatusIndex = statusSteps.indexOf(order.status);

  return (
    <div className="order-tracker">
      <h4>Order Progress</h4>
      <div className="tracker-steps">
        {statusSteps.map((step, index) => (
          <div key={step} className="tracker-step">
            <div className={`step-indicator ${index <= currentStatusIndex ? 'completed' : ''}`}>
              {index < currentStatusIndex ? '✓' : index + 1}
            </div>
            <div className="step-label">{step}</div>
            {index < statusSteps.length - 1 && (
              <div className={`step-line ${index < currentStatusIndex ? 'completed' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;