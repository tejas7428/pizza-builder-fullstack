import { renderHook, act } from '@testing-library/react';
import useAsyncState from '../useAsyncState';

describe('useAsyncState', () => {
  it('should initialize with correct status', () => {
    const asyncFunction = jest.fn().mockResolvedValue('data');
    const { result } = renderHook(() => useAsyncState(asyncFunction, false));
    
    expect(result.current.status).toBe('idle');
    expect(result.current.value).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should execute async function and update state on success', async () => {
    const asyncFunction = jest.fn().mockResolvedValue('success data');
    const { result } = renderHook(() => useAsyncState(asyncFunction, true));
    
    expect(result.current.status).toBe('pending');
    
    // Wait for async function to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe('success data');
    expect(result.current.error).toBeNull();
  });

  it('should execute async function and update state on error', async () => {
    const asyncFunction = jest.fn().mockRejectedValue(new Error('error message'));
    const { result } = renderHook(() => useAsyncState(asyncFunction, true));
    
    expect(result.current.status).toBe('pending');
    
    // Wait for async function to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.status).toBe('error');
    expect(result.current.value).toBeNull();
    expect(result.current.error.message).toBe('error message');
  });

  it('should not execute async function when immediate is false', () => {
    const asyncFunction = jest.fn().mockResolvedValue('data');
    const { result } = renderHook(() => useAsyncState(asyncFunction, false));
    
    expect(result.current.status).toBe('idle');
    expect(asyncFunction).not.toHaveBeenCalled();
  });

  it('should execute async function when execute is called', async () => {
    const asyncFunction = jest.fn().mockResolvedValue('data');
    const { result } = renderHook(() => useAsyncState(asyncFunction, false));
    
    expect(result.current.status).toBe('idle');
    
    // Call execute function
    await act(async () => {
      await result.current.execute();
    });
    
    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe('data');
    expect(asyncFunction).toHaveBeenCalledTimes(1);
  });
});