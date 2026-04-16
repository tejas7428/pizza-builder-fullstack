import { renderHook, act } from '@testing-library/react';
import useDarkModeState from '../useDarkModeState';

describe('useDarkModeState', () => {
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
    // Remove dark class from document element
    document.documentElement.classList.remove('dark');
  });

  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useDarkModeState());
    expect(result.current[0]).toBe(false);
  });

  it('should initialize with stored value if it exists', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(true));
    const { result } = renderHook(() => useDarkModeState());
    expect(result.current[0]).toBe(true);
  });

  it('should toggle dark mode and update localStorage', () => {
    const { result } = renderHook(() => useDarkModeState());
    
    // Initially false
    expect(result.current[0]).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Toggle to true
    act(() => {
      result.current[1]();
    });
    
    expect(result.current[0]).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', JSON.stringify(true));
    
    // Toggle back to false
    act(() => {
      result.current[1]();
    });
    
    expect(result.current[0]).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', JSON.stringify(false));
  });
});