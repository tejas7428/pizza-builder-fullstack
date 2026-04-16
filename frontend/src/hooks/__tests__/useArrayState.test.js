import { renderHook, act } from '@testing-library/react';
import useArrayState from '../useArrayState';

describe('useArrayState', () => {
  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('should push an element to the array', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    
    act(() => {
      result.current[1].push(4);
    });
    
    expect(result.current[0]).toEqual([1, 2, 3, 4]);
  });

  it('should filter the array', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3, 4, 5]));
    
    act(() => {
      result.current[1].filter(x => x % 2 === 0);
    });
    
    expect(result.current[0]).toEqual([2, 4]);
  });

  it('should update an element at a specific index', () => {
    const { result } = renderHook(() => useArrayState(['a', 'b', 'c']));
    
    act(() => {
      result.current[1].update(1, 'x');
    });
    
    expect(result.current[0]).toEqual(['a', 'x', 'c']);
  });

  it('should remove an element at a specific index', () => {
    const { result } = renderHook(() => useArrayState(['a', 'b', 'c']));
    
    act(() => {
      result.current[1].remove(1);
    });
    
    expect(result.current[0]).toEqual(['a', 'c']);
  });

  it('should clear the array', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));
    
    act(() => {
      result.current[1].clear();
    });
    
    expect(result.current[0]).toEqual([]);
  });

  it('should check if the array is empty', () => {
    const { result } = renderHook(() => useArrayState([]));
    expect(result.current[1].isEmpty()).toBe(true);
    
    act(() => {
      result.current[1].push(1);
    });
    
    expect(result.current[1].isEmpty()).toBe(false);
  });
});