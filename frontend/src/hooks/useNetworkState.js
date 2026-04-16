import { useState, useEffect } from 'react';

const useNetworkState = () => {
  const [network, setNetwork] = useState({
    online: navigator.onLine,
    downlink: null,
    effectiveType: null,
    rtt: null
  });

  useEffect(() => {
    const handleOnline = () => {
      setNetwork(prev => ({
        ...prev,
        online: true
      }));
    };

    const handleOffline = () => {
      setNetwork(prev => ({
        ...prev,
        online: false
      }));
    };

    const handleConnectionChange = () => {
      if (navigator.connection) {
        setNetwork(prev => ({
          ...prev,
          downlink: navigator.connection.downlink,
          effectiveType: navigator.connection.effectiveType,
          rtt: navigator.connection.rtt
        }));
      }
    };

    // Initial connection info
    handleConnectionChange();

    // Event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (navigator.connection) {
      navigator.connection.addEventListener('change', handleConnectionChange);
    }

    // Clean up
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return network;
};

export default useNetworkState;