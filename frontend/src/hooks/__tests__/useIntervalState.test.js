import { renderHook, act } from '@testing-library/react';
import useIntervalState from '../useIntervalState';

describe('useIntervalState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call callback at specified intervals', () => {
    const mockCallback = jest.fn();
    renderHook(() => useIntervalState(mockCallback, 1000));
    
    // Advance time by 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
    
    // Advance time by another 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('should not call callback when delay is null', () => {
    const mockCallback = jest.fn();
    renderHook(() => useIntervalState(mockCallback, null));
    
    // Advance time by 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should clean up interval on unmount', () => {
    const mockCallback = jest.fn();
    const { unmount } = renderHook(() => useIntervalState(mockCallback, 1000));
    
    // Advance time by 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
    
    // Unmount the hook
    unmount();
    
    // Advance time by another 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(mockCallback).toHaveBeenCalledTimes(1); // Should not have been called again
  });
});