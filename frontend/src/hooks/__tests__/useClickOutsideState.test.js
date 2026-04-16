import { renderHook, act } from '@testing-library/react';
import useClickOutsideState from '../useClickOutsideState';

describe('useClickOutsideState', () => {
  it('should call callback when click is outside the element', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useClickOutsideState(mockCallback));
    
    // Create a mock element and attach ref
    const mockElement = document.createElement('div');
    result.current.current = mockElement;
    
    // Create another element to simulate click outside
    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    
    // Simulate mousedown event on outside element
    act(() => {
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);
    });
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
    
    // Clean up
    document.body.removeChild(outsideElement);
  });

  it('should not call callback when click is inside the element', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useClickOutsideState(mockCallback));
    
    // Create a mock element and attach ref
    const mockElement = document.createElement('div');
    result.current.current = mockElement;
    
    // Simulate mousedown event on the element itself
    act(() => {
      const event = new MouseEvent('mousedown', { bubbles: true });
      mockElement.dispatchEvent(event);
    });
    
    expect(mockCallback).not.toHaveBeenCalled();
  });
});