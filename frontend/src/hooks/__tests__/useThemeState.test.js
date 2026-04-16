import { renderHook, act } from '@testing-library/react';
import useThemeState from '../useThemeState';

describe('useThemeState', () => {
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
    // Remove data-theme attribute from document element
    document.documentElement.removeAttribute('data-theme');
  });

  it('should initialize with the correct initial value', () => {
    const { result } = renderHook(() => useThemeState());
    expect(result.current[0]).toBe('light');
  });

  it('should initialize with stored value if it exists', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify('dark'));
    const { result } = renderHook(() => useThemeState());
    expect(result.current[0]).toBe('dark');
  });

  it('should toggle theme and update localStorage', () => {
    const { result } = renderHook(() => useThemeState());
    
    // Initially light
    expect(result.current[0]).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    
    // Toggle to dark
    act(() => {
      result.current[1]();
    });
    
    expect(result.current[0]).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', JSON.stringify('dark'));
    
    // Toggle back to light
    act(() => {
      result.current[1]();
    });
    
    expect(result.current[0]).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', JSON.stringify('light'));
  });
});