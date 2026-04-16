import { renderHook, act } from '@testing-library/react';
import useRecentlyViewedState from '../useRecentlyViewedState';

describe('useRecentlyViewedState', () => {
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

  it('should initialize with empty recently viewed list', () => {
    const { result } = renderHook(() => useRecentlyViewedState());
    
    expect(result.current.recentlyViewed).toEqual([]);
  });

  it('should add item to recently viewed list', () => {
    const { result } = renderHook(() => useRecentlyViewedState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addRecentlyViewed(item);
    });
    
    expect(result.current.recentlyViewed).toEqual([item]);
  });

  it('should move item to beginning when added again', () => {
    const { result } = renderHook(() => useRecentlyViewedState());
    const item1 = { _id: '1', name: 'Pizza 1', price: 10 };
    const item2 = { _id: '2', name: 'Pizza 2', price: 15 };
    
    act(() => {
      result.current.addRecentlyViewed(item1);
      result.current.addRecentlyViewed(item2);
      result.current.addRecentlyViewed(item1); // Add item1 again
    });
    
    expect(result.current.recentlyViewed).toEqual([item1, item2]);
  });

  it('should limit recently viewed list to specified max items', () => {
    const { result } = renderHook(() => useRecentlyViewedState(3));
    const item1 = { _id: '1', name: 'Pizza 1', price: 10 };
    const item2 = { _id: '2', name: 'Pizza 2', price: 15 };
    const item3 = { _id: '3', name: 'Pizza 3', price: 20 };
    const item4 = { _id: '4', name: 'Pizza 4', price: 25 };
    
    act(() => {
      result.current.addRecentlyViewed(item1);
      result.current.addRecentlyViewed(item2);
      result.current.addRecentlyViewed(item3);
      result.current.addRecentlyViewed(item4); // This should remove item1
    });
    
    expect(result.current.recentlyViewed).toEqual([item4, item3, item2]);
    expect(result.current.recentlyViewed).toHaveLength(3);
  });

  it('should clear recently viewed list', () => {
    const { result } = renderHook(() => useRecentlyViewedState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addRecentlyViewed(item);
      result.current.clearRecentlyViewed();
    });
    
    expect(result.current.recentlyViewed).toEqual([]);
  });
});