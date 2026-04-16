import { renderHook, act } from '@testing-library/react';
import useCompareState from '../useCompareState';

describe('useCompareState', () => {
  const localStorageMock = (() => {
    let store = {};
    
    return {
      getItem: jest.fn(key => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
      }),
      removeItem: jest.fn(key => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      })
    };
  })();
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });

  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should initialize with empty compare list', () => {
    const { result } = renderHook(() => useCompareState());
    
    expect(result.current.compareList).toEqual([]);
  });

  it('should add item to compare list', () => {
    const { result } = renderHook(() => useCompareState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addToCompare(item);
    });
    
    expect(result.current.compareList).toEqual([item]);
  });

  it('should not add duplicate items to compare list', () => {
    const { result } = renderHook(() => useCompareState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addToCompare(item);
      result.current.addToCompare(item);
    });
    
    expect(result.current.compareList).toEqual([item]);
  });

  it('should limit compare list to 4 items', () => {
    const { result } = renderHook(() => useCompareState());
    const item1 = { _id: '1', name: 'Pizza 1', price: 10 };
    const item2 = { _id: '2', name: 'Pizza 2', price: 15 };
    const item3 = { _id: '3', name: 'Pizza 3', price: 20 };
    const item4 = { _id: '4', name: 'Pizza 4', price: 25 };
    const item5 = { _id: '5', name: 'Pizza 5', price: 30 };
    
    act(() => {
      result.current.addToCompare(item1);
      result.current.addToCompare(item2);
      result.current.addToCompare(item3);
      result.current.addToCompare(item4);
      result.current.addToCompare(item5); // This should not be added
    });
    
    expect(result.current.compareList).toEqual([item1, item2, item3, item4]);
    expect(result.current.compareList).toHaveLength(4);
  });

  it('should remove item from compare list', () => {
    const { result } = renderHook(() => useCompareState());
    const item1 = { _id: '1', name: 'Pizza 1', price: 10 };
    const item2 = { _id: '2', name: 'Pizza 2', price: 15 };
    
    act(() => {
      result.current.addToCompare(item1);
      result.current.addToCompare(item2);
      result.current.removeFromCompare('1');
    });
    
    expect(result.current.compareList).toEqual([item2]);
  });

  it('should check if item is in compare list', () => {
    const { result } = renderHook(() => useCompareState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    expect(result.current.isInCompare('1')).toBe(false);
    
    act(() => {
      result.current.addToCompare(item);
    });
    
    expect(result.current.isInCompare('1')).toBe(true);
    expect(result.current.isInCompare('2')).toBe(false);
  });

  it('should clear compare list', () => {
    const { result } = renderHook(() => useCompareState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addToCompare(item);
      result.current.clearCompare();
    });
    
    expect(result.current.compareList).toEqual([]);
  });
});