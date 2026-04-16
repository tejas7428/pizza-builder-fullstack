import { renderHook, act } from '@testing-library/react';
import useDebounceState from '../useDebounceState';

describe('useDebounceState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useDebounceState('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceState(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );
    
    expect(result.current).toBe('initial');
    
    // Update value
    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Should still be initial because of debounce
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(result.current).toBe('updated');
  });

  it('should cancel previous timeout when value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceState(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );
    
    expect(result.current).toBe('initial');
    
    // Update value rapidly
    rerender({ value: 'first', delay: 500 });
    rerender({ value: 'second', delay: 500 });
    rerender({ value: 'third', delay: 500 });
    
    expect(result.current).toBe('initial'); // Should still be initial
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(result.current).toBe('third'); // Should be the last value
  });
});