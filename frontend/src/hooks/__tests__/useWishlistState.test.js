import { renderHook, act } from '@testing-library/react';
import useWishlistState from '../useWishlistState';

describe('useWishlistState', () => {
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

  it('should initialize with empty wishlist', () => {
    const { result } = renderHook(() => useWishlistState());
    
    expect(result.current.wishlist).toEqual([]);
  });

  it('should add item to wishlist', () => {
    const { result } = renderHook(() => useWishlistState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addToWishlist(item);
    });
    
    expect(result.current.wishlist).toEqual([item]);
  });

  it('should not add duplicate items to wishlist', () => {
    const { result } = renderHook(() => useWishlistState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addToWishlist(item);
      result.current.addToWishlist(item);
    });
    
    expect(result.current.wishlist).toEqual([item]);
  });

  it('should remove item from wishlist', () => {
    const { result } = renderHook(() => useWishlistState());
    const item1 = { _id: '1', name: 'Pizza', price: 10 };
    const item2 = { _id: '2', name: 'Burger', price: 5 };
    
    act(() => {
      result.current.addToWishlist(item1);
      result.current.addToWishlist(item2);
      result.current.removeFromWishlist('1');
    });
    
    expect(result.current.wishlist).toEqual([item2]);
  });

  it('should check if item is in wishlist', () => {
    const { result } = renderHook(() => useWishlistState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    expect(result.current.isInWishlist('1')).toBe(false);
    
    act(() => {
      result.current.addToWishlist(item);
    });
    
    expect(result.current.isInWishlist('1')).toBe(true);
    expect(result.current.isInWishlist('2')).toBe(false);
  });

  it('should toggle item in wishlist', () => {
    const { result } = renderHook(() => useWishlistState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    // Add item
    act(() => {
      result.current.toggleWishlist(item);
    });
    
    expect(result.current.wishlist).toEqual([item]);
    expect(result.current.isInWishlist('1')).toBe(true);
    
    // Remove item
    act(() => {
      result.current.toggleWishlist(item);
    });
    
    expect(result.current.wishlist).toEqual([]);
    expect(result.current.isInWishlist('1')).toBe(false);
  });
});