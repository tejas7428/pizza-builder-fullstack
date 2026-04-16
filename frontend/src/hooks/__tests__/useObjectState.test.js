import { renderHook, act } from '@testing-library/react';
import useObjectState from '../useObjectState';

describe('useObjectState', () => {
  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useObjectState({ a: 1, b: 2 }));
    expect(result.current[0]).toEqual({ a: 1, b: 2 });
  });

  it('should update a single property', () => {
    const { result } = renderHook(() => useObjectState({ a: 1, b: 2 }));
    
    act(() => {
      result.current[1].update('a', 3);
    });
    
    expect(result.current[0]).toEqual({ a: 3, b: 2 });
  });

  it('should update multiple properties', () => {
    const { result } = renderHook(() => useObjectState({ a: 1, b: 2, c: 3 }));
    
    act(() => {
      result.current[1].updateMultiple({ a: 4, b: 5 });
    });
    
    expect(result.current[0]).toEqual({ a: 4, b: 5, c: 3 });
  });

  it('should remove a property', () => {
    const { result } = renderHook(() => useObjectState({ a: 1, b: 2, c: 3 }));
    
    act(() => {
      result.current[1].remove('b');
    });
    
    expect(result.current[0]).toEqual({ a: 1, c: 3 });
  });

  it('should clear the object', () => {
    const { result } = renderHook(() => useObjectState({ a: 1, b: 2 }));
    
    act(() => {
      result.current[1].clear();
    });
    
    expect(result.current[0]).toEqual({});
  });
});