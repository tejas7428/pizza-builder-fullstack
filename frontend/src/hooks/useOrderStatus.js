import { useState, useEffect } from 'react';
import useSocket from './useSocket';

const useOrderStatus = (orderId) => {
  const [status, setStatus] = useState(null);
  const socketData = useSocket('orderStatusUpdate');

  useEffect(() => {
    if (socketData && socketData.orderId === orderId) {
      setStatus(socketData.status);
    }
  }, [socketData, orderId]);

  return status;
};

export default useOrderStatus;