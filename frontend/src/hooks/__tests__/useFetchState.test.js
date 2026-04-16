import { renderHook, act } from '@testing-library/react';
import useFetchState from '../useFetchState';

describe('useFetchState', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useFetchState('/api/data'));
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch data successfully', async () => {
    // Mock fetch response
    fetch.mockResponseOnce(JSON.stringify({ message: 'success' }));
    
    const { result } = renderHook(() => useFetchState('/api/data'));
    
    // Wait for fetch to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.data).toEqual({ message: 'success' });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch errors', async () => {
    // Mock fetch error
    fetch.mockRejectOnce(new Error('Network error'));
    
    const { result } = renderHook(() => useFetchState('/api/data'));
    
    // Wait for fetch to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error.message).toBe('Network error');
  });

  it('should handle HTTP errors', async () => {
    // Mock HTTP error response
    fetch.mockResponseOnce('Not Found', { status: 404 });
    
    const { result } = renderHook(() => useFetchState('/api/data'));
    
    // Wait for fetch to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error.message).toBe('HTTP error! status: 404');
  });

  it('should not fetch when url is null', async () => {
    const { result } = renderHook(() => useFetchState(null));
    
    // Wait for any potential fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });
});