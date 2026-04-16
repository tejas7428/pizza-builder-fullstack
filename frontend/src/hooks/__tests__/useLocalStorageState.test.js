import { renderHook, act } from '@testing-library/react';
import useLocalStorageState from '../useLocalStorageState';

describe('useLocalStorageState', () => {
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

  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useLocalStorageState('testKey', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
  });

  it('should initialize with stored value if it exists', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorageState('testKey', 'defaultValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('should update localStorage when state changes', () => {
    const { result } = renderHook(() => useLocalStorageState('testKey', 'defaultValue'));
    
    act(() => {
      result.current[1]('newValue');
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
    expect(result.current[0]).toBe('newValue');
  });

  it('should handle localStorage errors gracefully', () => {
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('localStorage error');
    });
    
    const { result } = renderHook(() => useLocalStorageState('testKey', 'defaultValue'));
    
    expect(() => {
      act(() => {
        result.current[1]('newValue');
      });
    }).not.toThrow();
    
    expect(result.current[0]).toBe('newValue');
  });
});