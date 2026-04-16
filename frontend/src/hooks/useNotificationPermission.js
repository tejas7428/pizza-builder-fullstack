import { useState, useEffect } from 'react';

const useNotificationPermission = () => {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    const handlePermissionChange = () => {
      setPermission(Notification.permission);
    };

    // Check if the browser supports notifications
    if ('Notification' in window) {
      handlePermissionChange();
    }

    // Listen for permission changes (not supported in all browsers)
    // This is a workaround since there's no standard event for permission changes
    const interval = setInterval(handlePermissionChange, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      return 'denied';
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };

  return {
    permission,
    requestPermission,
    isSupported: 'Notification' in window
  };
};

export default useNotificationPermission;