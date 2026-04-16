import { renderHook, act } from '@testing-library/react';
import useToggleState from '../useToggleState';

describe('useToggleState', () => {
  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useToggleState(true));
    expect(result.current[0]).toBe(true);
  });

  it('should toggle the value', () => {
    const { result } = renderHook(() => useToggleState(false));
    
    act(() => {
      result.current[1].toggle();
    });
    
    expect(result.current[0]).toBe(true);
  });

  it('should set value to true', () => {
    const { result } = renderHook(() => useToggleState(false));
    
    act(() => {
      result.current[1].setTrue();
    });
    
    expect(result.current[0]).toBe(true);
  });

  it('should set value to false', () => {
    const { result } = renderHook(() => useToggleState(true));
    
    act(() => {
      result.current[1].setFalse();
    });
    
    expect(result.current[0]).toBe(false);
  });
});