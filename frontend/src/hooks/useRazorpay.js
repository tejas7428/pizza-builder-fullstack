import { useState, useEffect } from 'react';
import useScript from './useScript';

const useRazorpay = () => {
  const [razorpay, setRazorpay] = useState(null);
  const status = useScript('https://checkout.razorpay.com/v1/checkout.js');

  useEffect(() => {
    if (status === 'ready' && window.Razorpay) {
      setRazorpay(window.Razorpay);
    }
  }, [status]);

  return [razorpay, status];
};

export default useRazorpay;