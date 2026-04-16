import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const useNotificationContextState = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotificationContextState must be used within a NotificationProvider');
  }
  
  const { addNotification } = context;
  
  const showSuccess = (message, duration) => {
    addNotification(message, 'success', duration);
  };
  
  const showError = (message, duration) => {
    addNotification(message, 'error', duration);
  };
  
  const showWarning = (message, duration) => {
    addNotification(message, 'warning', duration);
  };
  
  const showInfo = (message, duration) => {
    addNotification(message, 'info', duration);
  };
  
  return {
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

export default useNotificationContextState;