import { renderHook, act } from '@testing-library/react';
import useOnlineState from '../useOnlineState';

describe('useOnlineState', () => {
  it('should initialize with the correct online status', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true
    });
    
    const { result } = renderHook(() => useOnlineState());
    expect(result.current).toBe(true);
  });

  it('should update when online event is fired', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true
    });
    
    const { result } = renderHook(() => useOnlineState());
    expect(result.current).toBe(false);
    
    // Change navigator.onLine and dispatch event
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true
    });
    
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    
    expect(result.current).toBe(true);
  });

  it('should update when offline event is fired', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true
    });
    
    const { result } = renderHook(() => useOnlineState());
    expect(result.current).toBe(true);
    
    // Change navigator.onLine and dispatch event
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true
    });
    
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    
    expect(result.current).toBe(false);
  });
});