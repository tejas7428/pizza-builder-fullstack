import { renderHook, act } from '@testing-library/react';
import useSessionStorageState from '../useSessionStorageState';

describe('useSessionStorageState', () => {
  const sessionStorageMock = (() => {
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
  
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock
  });

  beforeEach(() => {
    sessionStorageMock.clear();
  });

  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useSessionStorageState('testKey', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
  });

  it('should initialize with stored value if it exists', () => {
    sessionStorageMock.getItem.mockReturnValueOnce(JSON.stringify('storedValue'));
    const { result } = renderHook(() => useSessionStorageState('testKey', 'defaultValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('should update sessionStorage when state changes', () => {
    const { result } = renderHook(() => useSessionStorageState('testKey', 'defaultValue'));
    
    act(() => {
      result.current[1]('newValue');
    });
    
    expect(sessionStorageMock.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
    expect(result.current[0]).toBe('newValue');
  });

  it('should handle sessionStorage errors gracefully', () => {
    sessionStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('sessionStorage error');
    });
    
    const { result } = renderHook(() => useSessionStorageState('testKey', 'defaultValue'));
    
    expect(() => {
      act(() => {
        result.current[1]('newValue');
      });
    }).not.toThrow();
    
    expect(result.current[0]).toBe('newValue');
  });
});