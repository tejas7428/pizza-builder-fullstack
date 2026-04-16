import { renderHook } from '@testing-library/react';
import useNotificationContextState from '../useNotificationContextState';
import { NotificationContext } from '../../context/NotificationContext';

describe('useNotificationContextState', () => {
  it('should throw error when used outside NotificationProvider', () => {
    // Mock console.error to prevent error from being logged
    const consoleError = console.error;
    console.error = jest.fn();
    
    expect(() => {
      renderHook(() => useNotificationContextState());
    }).toThrow('useNotificationContextState must be used within a NotificationProvider');
    
    // Restore console.error
    console.error = consoleError;
  });

  it('should return notification functions when used within NotificationProvider', () => {
    const mockAddNotification = jest.fn();
    const mockContextValue = {
      addNotification: mockAddNotification
    };
    
    const wrapper = ({ children }) => (
      <NotificationContext.Provider value={mockContextValue}>
        {children}
      </NotificationContext.Provider>
    );
    
    const { result } = renderHook(() => useNotificationContextState(), { wrapper });
    
    expect(typeof result.current.showSuccess).toBe('function');
    expect(typeof result.current.showError).toBe('function');
    expect(typeof result.current.showWarning).toBe('function');
    expect(typeof result.current.showInfo).toBe('function');
  });

  it('should call addNotification with correct parameters for showSuccess', () => {
    const mockAddNotification = jest.fn();
    const mockContextValue = {
      addNotification: mockAddNotification
    };
    
    const wrapper = ({ children }) => (
      <NotificationContext.Provider value={mockContextValue}>
        {children}
      </NotificationContext.Provider>
    );
    
    const { result } = renderHook(() => useNotificationContextState(), { wrapper });
    
    result.current.showSuccess('Success message', 5000);
    
    expect(mockAddNotification).toHaveBeenCalledWith('Success message', 'success', 5000);
  });

  it('should call addNotification with correct parameters for showError', () => {
    const mockAddNotification = jest.fn();
    const mockContextValue = {
      addNotification: mockAddNotification
    };
    
    const wrapper = ({ children }) => (
      <NotificationContext.Provider value={mockContextValue}>
        {children}
      </NotificationContext.Provider>
    );
    
    const { result } = renderHook(() => useNotificationContextState(), { wrapper });
    
    result.current.showError('Error message', 5000);
    
    expect(mockAddNotification).toHaveBeenCalledWith('Error message', 'error', 5000);
  });

  it('should call addNotification with correct parameters for showWarning', () => {
    const mockAddNotification = jest.fn();
    const mockContextValue = {
      addNotification: mockAddNotification
    };
    
    const wrapper = ({ children }) => (
      <NotificationContext.Provider value={mockContextValue}>
        {children}
      </NotificationContext.Provider>
    );
    
    const { result } = renderHook(() => useNotificationContextState(), { wrapper });
    
    result.current.showWarning('Warning message', 5000);
    
    expect(mockAddNotification).toHaveBeenCalledWith('Warning message', 'warning', 5000);
  });

  it('should call addNotification with correct parameters for showInfo', () => {
    const mockAddNotification = jest.fn();
    const mockContextValue = {
      addNotification: mockAddNotification
    };
    
    const wrapper = ({ children }) => (
      <NotificationContext.Provider value={mockContextValue}>
        {children}
      </NotificationContext.Provider>
    );
    
    const { result } = renderHook(() => useNotificationContextState(), { wrapper });
    
    result.current.showInfo('Info message', 5000);
    
    expect(mockAddNotification).toHaveBeenCalledWith('Info message', 'info', 5000);
  });
});