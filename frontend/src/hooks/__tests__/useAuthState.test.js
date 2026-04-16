import { renderHook } from '@testing-library/react';
import useAuthState from '../useAuthState';
import AuthContext from '../../context/AuthContext';

describe('useAuthState', () => {
  it('should throw error when used outside AuthProvider', () => {
    // Mock console.error to prevent error from being logged
    const consoleError = console.error;
    console.error = jest.fn();
    
    expect(() => {
      renderHook(() => useAuthState());
    }).toThrow('useAuthState must be used within an AuthProvider');
    
    // Restore console.error
    console.error = consoleError;
  });

  it('should return context value when used within AuthProvider', () => {
    const mockContextValue = {
      user: { id: 1, name: 'John' },
      login: jest.fn(),
      logout: jest.fn(),
      loading: false
    };
    
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockContextValue}>
        {children}
      </AuthContext.Provider>
    );
    
    const { result } = renderHook(() => useAuthState(), { wrapper });
    
    expect(result.current).toEqual(mockContextValue);
  });
});