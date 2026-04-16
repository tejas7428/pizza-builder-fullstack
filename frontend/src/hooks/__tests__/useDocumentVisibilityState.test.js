import { renderHook, act } from '@testing-library/react';
import useDocumentVisibilityState from '../useDocumentVisibilityState';

describe('useDocumentVisibilityState', () => {
  beforeEach(() => {
    // Set initial visibility state
    Object.defineProperty(document, 'visibilityState', {
      writable: true,
      configurable: true,
      value: 'visible',
    });
  });

  it('should initialize with the correct visibility state', () => {
    const { result } = renderHook(() => useDocumentVisibilityState());
    expect(result.current).toBe(true);
  });

  it('should update when document visibility changes to hidden', () => {
    const { result } = renderHook(() => useDocumentVisibilityState());
    
    // Change visibility state
    Object.defineProperty(document, 'visibilityState', {
      writable: true,
      configurable: true,
      value: 'hidden',
    });
    
    // Trigger visibilitychange event
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    
    expect(result.current).toBe(false);
  });

  it('should update when document visibility changes to visible', () => {
    // Set initial state to hidden
    Object.defineProperty(document, 'visibilityState', {
      writable: true,
      configurable: true,
      value: 'hidden',
    });
    
    const { result } = renderHook(() => useDocumentVisibilityState());
    expect(result.current).toBe(false);
    
    // Change visibility state to visible
    Object.defineProperty(document, 'visibilityState', {
      writable: true,
      configurable: true,
      value: 'visible',
    });
    
    // Trigger visibilitychange event
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    
    expect(result.current).toBe(true);
  });
});