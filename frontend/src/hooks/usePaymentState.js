import { useState } from 'react';
import { createRazorpayOrder, verifyPayment } from '../services/api';

const usePaymentState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async (amount, onSuccess, onError) => {
    setLoading(true);
    setError(null);
    
    try {
      // Create Razorpay order
      const orderResponse = await createRazorpayOrder(amount);
      const { id: orderId, amount: orderAmount, currency } = orderResponse.data;
      
      // Initialize Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderAmount,
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
            
            // Call success callback
            if (onSuccess) {
              onSuccess(response);
            }
          } catch (err) {
            setError('Payment verification failed');
            if (onError) {
              onError('Payment verification failed');
            }
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9876543210'
        },
        theme: {
          color: '#F37254'
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Payment initialization failed');
      if (onError) {
        onError(err.response?.data?.message || err.message || 'Payment initialization failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    initiatePayment,
    loading,
    error
  };
};

export default usePaymentState;