import { renderHook, act } from '@testing-library/react';
import useScrollPositionState from '../useScrollPositionState';

describe('useScrollPositionState', () => {
  beforeEach(() => {
    // Set initial scroll position
    Object.defineProperty(window, 'pageXOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });
    
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it('should initialize with the correct scroll position', () => {
    const { result } = renderHook(() => useScrollPositionState());
    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
  });

  it('should update when window is scrolled', () => {
    const { result } = renderHook(() => useScrollPositionState());
    
    // Change scroll position
    Object.defineProperty(window, 'pageXOffset', {
      writable: true,
      configurable: true,
      value: 100,
    });
    
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 200,
    });
    
    // Trigger scroll event
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    
    expect(result.current.x).toBe(100);
    expect(result.current.y).toBe(200);
  });
});