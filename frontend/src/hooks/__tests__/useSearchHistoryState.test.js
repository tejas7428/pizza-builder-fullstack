import { renderHook, act } from '@testing-library/react';
import useSearchHistoryState from '../useSearchHistoryState';

describe('useSearchHistoryState', () => {
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

  it('should initialize with empty search history', () => {
    const { result } = renderHook(() => useSearchHistoryState());
    
    expect(result.current.searchHistory).toEqual([]);
  });

  it('should add search term to history', () => {
    const { result } = renderHook(() => useSearchHistoryState());
    
    act(() => {
      result.current.addSearchTerm('pizza');
    });
    
    expect(result.current.searchHistory).toEqual(['pizza']);
  });

  it('should not add empty or whitespace-only terms', () => {
    const { result } = renderHook(() => useSearchHistoryState());
    
    act(() => {
      result.current.addSearchTerm('');
      result.current.addSearchTerm('   ');
      result.current.addSearchTerm(null);
      result.current.addSearchTerm(undefined);
    });
    
    expect(result.current.searchHistory).toEqual([]);
  });

  it('should move term to beginning when added again', () => {
    const { result } = renderHook(() => useSearchHistoryState());
    
    act(() => {
      result.current.addSearchTerm('pizza');
      result.current.addSearchTerm('burger');
      result.current.addSearchTerm('pizza'); // Add again
    });
    
    expect(result.current.searchHistory).toEqual(['pizza', 'burger']);
  });

  it('should limit search history to specified max items', () => {
    const { result } = renderHook(() => useSearchHistoryState(3));
    
    act(() => {
      result.current.addSearchTerm('pizza');
      result.current.addSearchTerm('burger');
      result.current.addSearchTerm('pasta');
      result.current.addSearchTerm('salad'); // This should remove 'pizza'
    });
    
    expect(result.current.searchHistory).toEqual(['salad', 'pasta', 'burger']);
    expect(result.current.searchHistory).toHaveLength(3);
  });

  it('should remove specific search term', () => {
    const { result } = renderHook(() => useSearchHistoryState());
    
    act(() => {
      result.current.addSearchTerm('pizza');
      result.current.addSearchTerm('burger');
      result.current.removeSearchTerm('pizza');
    });
    
    expect(result.current.searchHistory).toEqual(['burger']);
  });

  it('should clear search history', () => {
    const { result } = renderHook(() => useSearchHistoryState());
    
    act(() => {
      result.current.addSearchTerm('pizza');
      result.current.addSearchTerm('burger');
      result.current.clearSearchHistory();
    });
    
    expect(result.current.searchHistory).toEqual([]);
  });
});