import { renderHook, act } from '@testing-library/react';
import useFormValidationState from '../useFormValidationState';

describe('useFormValidationState', () => {
  it('should initialize with the correct initial values', () => {
    const initialState = { name: '', email: '' };
    const { result } = renderHook(() => useFormValidationState(initialState, {}));
    
    expect(result.current.values).toEqual(initialState);
    expect(result.current.errors).toEqual({});
  });

  it('should handle input changes', () => {
    const initialState = { name: '', email: '' };
    const { result } = renderHook(() => useFormValidationState(initialState, {}));
    
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'John' } });
    });
    
    expect(result.current.values.name).toBe('John');
  });

  it('should validate required fields', () => {
    const initialState = { name: '', email: '' };
    const validationRules = {
      name: { required: true },
      email: { required: true }
    };
    
    const { result } = renderHook(() => useFormValidationState(initialState, validationRules));
    
    act(() => {
      result.current.handleSubmit(() => {});
    });
    
    expect(result.current.errors.name).toBe('name is required');
    expect(result.current.errors.email).toBe('email is required');
  });

  it('should validate minimum length', () => {
    const initialState = { password: '123' };
    const validationRules = {
      password: { minLength: 6 }
    };
    
    const { result } = renderHook(() => useFormValidationState(initialState, validationRules));
    
    act(() => {
      result.current.handleSubmit(() => {});
    });
    
    expect(result.current.errors.password).toBe('password must be at least 6 characters');
  });

  it('should validate maximum length', () => {
    const initialState = { username: 'thisisaverylongusername' };
    const validationRules = {
      username: { maxLength: 10 }
    };
    
    const { result } = renderHook(() => useFormValidationState(initialState, validationRules));
    
    act(() => {
      result.current.handleSubmit(() => {});
    });
    
    expect(result.current.errors.username).toBe('username must be no more than 10 characters');
  });

  it('should validate pattern', () => {
    const initialState = { email: 'invalid-email' };
    const validationRules = {
      email: { 
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format'
      }
    };
    
    const { result } = renderHook(() => useFormValidationState(initialState, validationRules));
    
    act(() => {
      result.current.handleSubmit(() => {});
    });
    
    expect(result.current.errors.email).toBe('Invalid email format');
  });

  it('should clear error when user starts typing', () => {
    const initialState = { name: '' };
    const validationRules = {
      name: { required: true }
    };
    
    const { result } = renderHook(() => useFormValidationState(initialState, validationRules));
    
    // First, trigger validation to set error
    act(() => {
      result.current.handleSubmit(() => {});
    });
    
    expect(result.current.errors.name).toBe('name is required');
    
    // Then, simulate user typing to clear error
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'John' } });
    });
    
    expect(result.current.errors.name).toBeNull();
  });
});