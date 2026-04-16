import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const useSocketState = (event, callback) => {
  const socket = useSocket();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleEvent = (data) => {
      setData(data);
      if (callback) {
        callback(data);
      }
    };

    socket.on(event, handleEvent);

    return () => {
      socket.off(event, handleEvent);
    };
  }, [socket, event, callback]);

  return data;
};

export default useSocketState;