import { renderHook, act } from '@testing-library/react';
import useSocketState from '../useSocketState';
import { SocketContext } from '../../context/SocketContext';

describe('useSocketState', () => {
  it('should return null when socket is not available', () => {
    const wrapper = ({ children }) => (
      <SocketContext.Provider value={null}>
        {children}
      </SocketContext.Provider>
    );
    
    const { result } = renderHook(() => useSocketState('testEvent'), { wrapper });
    
    expect(result.current).toBeNull();
  });

  it('should set up event listener and return data', () => {
    const mockSocket = {
      on: jest.fn(),
      off: jest.fn()
    };
    
    const wrapper = ({ children }) => (
      <SocketContext.Provider value={mockSocket}>
        {children}
      </SocketContext.Provider>
    );
    
    const { result } = renderHook(() => useSocketState('testEvent'), { wrapper });
    
    // Check that event listener was set up
    expect(mockSocket.on).toHaveBeenCalledWith('testEvent', expect.any(Function));
    
    // Simulate event emission
    const eventHandler = mockSocket.on.mock.calls[0][1];
    act(() => {
      eventHandler('test data');
    });
    
    expect(result.current).toBe('test data');
  });

  it('should clean up event listener on unmount', () => {
    const mockSocket = {
      on: jest.fn(),
      off: jest.fn()
    };
    
    const wrapper = ({ children }) => (
      <SocketContext.Provider value={mockSocket}>
        {children}
      </SocketContext.Provider>
    );
    
    const { unmount } = renderHook(() => useSocketState('testEvent'), { wrapper });
    
    // Check that event listener was set up
    expect(mockSocket.on).toHaveBeenCalledWith('testEvent', expect.any(Function));
    
    const eventHandler = mockSocket.on.mock.calls[0][1];
    
    // Unmount the hook
    unmount();
    
    // Check that event listener was cleaned up
    expect(mockSocket.off).toHaveBeenCalledWith('testEvent', eventHandler);
  });

  it('should call callback when data is received', () => {
    const mockSocket = {
      on: jest.fn(),
      off: jest.fn()
    };
    
    const mockCallback = jest.fn();
    
    const wrapper = ({ children }) => (
      <SocketContext.Provider value={mockSocket}>
        {children}
      </SocketContext.Provider>
    );
    
    renderHook(() => useSocketState('testEvent', mockCallback), { wrapper });
    
    // Simulate event emission
    const eventHandler = mockSocket.on.mock.calls[0][1];
    act(() => {
      eventHandler('test data');
    });
    
    expect(mockCallback).toHaveBeenCalledWith('test data');
  });
});