import { renderHook, act } from '@testing-library/react';
import useWindowSizeState from '../useWindowSizeState';

describe('useWindowSizeState', () => {
  beforeEach(() => {
    // Set initial window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  it('should initialize with the correct window size', () => {
    const { result } = renderHook(() => useWindowSizeState());
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('should update when window is resized', () => {
    const { result } = renderHook(() => useWindowSizeState());
    
    // Change window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
    
    // Trigger resize event
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(result.current.width).toBe(1200);
    expect(result.current.height).toBe(800);
  });
});