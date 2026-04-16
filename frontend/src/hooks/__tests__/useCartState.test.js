import { renderHook, act } from '@testing-library/react';
import useCartState from '../useCartState';

describe('useCartState', () => {
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

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCartState());
    
    expect(result.current.cart).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addItem(item);
    });
    
    expect(result.current.cart).toEqual([{ ...item, quantity: 1 }]);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(10);
  });

  it('should increment quantity when adding same item', () => {
    const { result } = renderHook(() => useCartState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addItem(item);
      result.current.addItem(item);
    });
    
    expect(result.current.cart).toEqual([{ ...item, quantity: 2 }]);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(20);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCartState());
    const item1 = { _id: '1', name: 'Pizza', price: 10 };
    const item2 = { _id: '2', name: 'Burger', price: 5 };
    
    act(() => {
      result.current.addItem(item1);
      result.current.addItem(item2);
      result.current.removeItem('1');
    });
    
    expect(result.current.cart).toEqual([{ ...item2, quantity: 1 }]);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(5);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCartState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity('1', 3);
    });
    
    expect(result.current.cart).toEqual([{ ...item, quantity: 3 }]);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(30);
  });

  it('should remove item when quantity is set to 0 or less', () => {
    const { result } = renderHook(() => useCartState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity('1', 0);
    });
    
    expect(result.current.cart).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCartState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    act(() => {
      result.current.addItem(item);
      result.current.clearCart();
    });
    
    expect(result.current.cart).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should check if item is in cart', () => {
    const { result } = renderHook(() => useCartState());
    const item = { _id: '1', name: 'Pizza', price: 10 };
    
    expect(result.current.isInCart('1')).toBe(false);
    
    act(() => {
      result.current.addItem(item);
    });
    
    expect(result.current.isInCart('1')).toBe(true);
    expect(result.current.isInCart('2')).toBe(false);
  });
});