import { useState, useEffect } from 'react';
import useScriptState from './useScriptState';

const useRazorpayState = () => {
  const [razorpay, setRazorpay] = useState(null);
  const status = useScriptState('https://checkout.razorpay.com/v1/checkout.js');

  useEffect(() => {
    if (status === 'ready' && window.Razorpay) {
      setRazorpay(window.Razorpay);
    }
  }, [status]);

  return [razorpay, status];
};

export default useRazorpayState;