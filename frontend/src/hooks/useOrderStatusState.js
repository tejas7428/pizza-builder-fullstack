import { useState, useEffect } from 'react';
import useSocketState from './useSocketState';

const useOrderStatusState = (orderId) => {
  const [status, setStatus] = useState(null);
  const socketData = useSocketState('orderStatusUpdate');

  useEffect(() => {
    if (socketData && socketData.orderId === orderId) {
      setStatus(socketData.status);
    }
  }, [socketData, orderId]);

  return status;
};

export default useOrderStatusState;