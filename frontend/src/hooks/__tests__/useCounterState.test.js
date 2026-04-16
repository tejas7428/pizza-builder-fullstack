import { renderHook, act } from '@testing-library/react';
import useCounterState from '../useCounterState';

describe('useCounterState', () => {
  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useCounterState(5));
    expect(result.current[0]).toBe(5);
  });

  it('should increment the value', () => {
    const { result } = renderHook(() => useCounterState(0));
    
    act(() => {
      result.current[1].increment();
    });
    
    expect(result.current[0]).toBe(1);
  });

  it('should decrement the value', () => {
    const { result } = renderHook(() => useCounterState(5));
    
    act(() => {
      result.current[1].decrement();
    });
    
    expect(result.current[0]).toBe(4);
  });

  it('should reset the value', () => {
    const { result } = renderHook(() => useCounterState(5));
    
    act(() => {
      result.current[1].increment();
      result.current[1].increment();
      result.current[1].reset();
    });
    
    expect(result.current[0]).toBe(5);
  });

  it('should set the value', () => {
    const { result } = renderHook(() => useCounterState(0));
    
    act(() => {
      result.current[1].set(10);
    });
    
    expect(result.current[0]).toBe(10);
  });
});