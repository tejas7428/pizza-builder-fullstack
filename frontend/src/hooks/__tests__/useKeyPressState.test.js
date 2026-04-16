import { renderHook, act } from '@testing-library/react';
import useKeyPressState from '../useKeyPressState';

describe('useKeyPressState', () => {
  it('should initialize with false', () => {
    const { result } = renderHook(() => useKeyPressState('a'));
    expect(result.current).toBe(false);
  });

  it('should return true when target key is pressed', () => {
    const { result } = renderHook(() => useKeyPressState('a'));
    
    // Simulate keydown event
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      window.dispatchEvent(event);
    });
    
    expect(result.current).toBe(true);
  });

  it('should return false when target key is released', () => {
    const { result } = renderHook(() => useKeyPressState('a'));
    
    // Simulate keydown event
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      window.dispatchEvent(event);
    });
    
    expect(result.current).toBe(true);
    
    // Simulate keyup event
    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'a' });
      window.dispatchEvent(event);
    });
    
    expect(result.current).toBe(false);
  });

  it('should not respond to other keys', () => {
    const { result } = renderHook(() => useKeyPressState('a'));
    
    // Simulate keydown event for different key
    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'b' });
      window.dispatchEvent(event);
    });
    
    expect(result.current).toBe(false);
  });
});