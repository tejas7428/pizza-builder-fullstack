import { renderHook, act } from '@testing-library/react';
import useApiState from '../useApiState';

describe('useApiState', () => {
  it('should initialize with correct state', () => {
    const apiFunction = jest.fn().mockResolvedValue({ data: 'test' });
    const { result } = renderHook(() => useApiState(apiFunction));
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch data successfully', async () => {
    const apiFunction = jest.fn().mockResolvedValue({ data: 'success data' });
    const { result } = renderHook(() => useApiState(apiFunction));
    
    // Wait for api function to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.data).toBe('success data');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle api errors', async () => {
    const apiFunction = jest.fn().mockRejectedValue(new Error('API error'));
    const { result } = renderHook(() => useApiState(apiFunction));
    
    // Wait for api function to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error.message).toBe('API error');
  });

  it('should handle api errors with response data', async () => {
    const apiFunction = jest.fn().mockRejectedValue({
      response: { data: { message: 'Server error' } }
    });
    const { result } = renderHook(() => useApiState(apiFunction));
    
    // Wait for api function to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Server error');
  });

  it('should refetch data', async () => {
    const apiFunction = jest.fn()
      .mockResolvedValueOnce({ data: 'first call' })
      .mockResolvedValueOnce({ data: 'second call' });
    
    const { result } = renderHook(() => useApiState(apiFunction));
    
    // Wait for first call
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.data).toBe('first call');
    
    // Refetch
    await act(async () => {
      await result.current.refetch();
    });
    
    expect(result.current.data).toBe('second call');
    expect(apiFunction).toHaveBeenCalledTimes(2);
  });
});