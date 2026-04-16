import { renderHook, act } from '@testing-library/react';
import useTimeoutState from '../useTimeoutState';

describe('useTimeoutState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call callback after specified delay', () => {
    const mockCallback = jest.fn();
    renderHook(() => useTimeoutState(mockCallback, 1000));
    
    // Advance time by 500ms (not enough)
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(mockCallback).not.toHaveBeenCalled();
    
    // Advance time by another 500ms (total 1000ms)
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when delay is null', () => {
    const mockCallback = jest.fn();
    renderHook(() => useTimeoutState(mockCallback, null));
    
    // Advance time by 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should clean up timeout on unmount', () => {
    const mockCallback = jest.fn();
    const { unmount } = renderHook(() => useTimeoutState(mockCallback, 1000));
    
    // Advance time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(mockCallback).not.toHaveBeenCalled();
    
    // Unmount the hook
    unmount();
    
    // Advance time by another 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(mockCallback).not.toHaveBeenCalled(); // Should not have been called
  });
});