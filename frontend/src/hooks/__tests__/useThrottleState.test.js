import { renderHook, act } from '@testing-library/react';
import useThrottleState from '../useThrottleState';

describe('useThrottleState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Mock Date.now
    Date.now = jest.fn(() => 1000);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useThrottleState('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should throttle value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottleState(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );
    
    expect(result.current).toBe('initial');
    
    // Update value
    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('updated'); // Should update immediately
    
    // Try to update again within throttle period
    Date.now.mockReturnValue(1200); // 200ms passed
    rerender({ value: 'throttled', delay: 500 });
    expect(result.current).toBe('updated'); // Should still be previous value
    
    // Fast-forward time beyond throttle period
    Date.now.mockReturnValue(1600); // 600ms passed
    rerender({ value: 'throttled', delay: 500 });
    expect(result.current).toBe('throttled'); // Should update now
  });
});