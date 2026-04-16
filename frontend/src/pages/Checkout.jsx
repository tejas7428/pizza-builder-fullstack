import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRazorpayOrder, verifyPayment, createOrder } from '../services/api';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would get this data from context or state management
    // For now, we'll use mock data
    setOrderData({
      items: [
        { _id: '1', name: 'Thin Crust', category: 'base', qty: 1, price: 150 },
        { _id: '2', name: 'Tomato Basil', category: 'sauce', qty: 1, price: 30 },
        { _id: '3', name: 'Mozzarella', category: 'cheese', qty: 1, price: 60 }
      ],
      total: 240
    });
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Create Razorpay order
      const razorpayResponse = await createRazorpayOrder(orderData.total);
      const { id: orderId, amount, currency } = razorpayResponse.data;
      
      // Initialize Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Pizza Builder',
        description: 'Pizza Order Payment',
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });
            
            // Create order in our system
            const orderResponse = await createOrder({
              items: orderData.items,
              total: orderData.total,
              paymentId: response.razorpay_payment_id
            });
            
            // Redirect to order confirmation
            navigate(`/order-confirmation/${orderResponse.data._id}`);
          } catch (err) {
            setError('Payment verification failed');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9876543210'
        },
        theme: {
          color: '#F37254'
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || 'Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  if (!orderData) {
    return <div className="checkout">Loading...</div>;
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      
      <div className="order-summary">
        <h3>Order Summary</h3>
        {orderData.items.map((item, index) => (
          <div key={index} className="summary-item">
            <span>{item.name} ({item.category})</span>
            <span>₹{item.price} x {item.qty}</span>
          </div>
        ))}
        <div className="summary-total">
          <strong>Total: ₹{orderData.total}</strong>
        </div>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <div className="payment-section">
        <h3>Payment Method</h3>
        <p>We use Razorpay for secure payments.</p>
        <button 
          onClick={handlePayment} 
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Processing...' : 'Pay with Razorpay'}
        </button>
      </div>
      
      <div className="security-info">
        <p>Your payment details are securely processed by Razorpay.</p>
      </div>
    </div>
  );
};

export default Checkout;