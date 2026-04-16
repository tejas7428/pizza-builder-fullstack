import { renderHook, act } from '@testing-library/react';
import useLowStockAlertState from '../useLowStockAlertState';

// Mock the useLowStockAlert hook
jest.mock('../useLowStockAlert', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    lowStockItems: [],
    loading: false,
    error: null,
    checkLowStock: jest.fn(),
    dismissAlert: jest.fn()
  }))
}));

describe('useLowStockAlertState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useLowStockAlertState());
    
    expect(result.current.lowStockItems).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should call checkLowStock on mount', () => {
    const mockCheckLowStock = jest.fn();
    require('../useLowStockAlert').default.mockImplementation(() => ({
      lowStockItems: [],
      loading: false,
      error: null,
      checkLowStock: mockCheckLowStock,
      dismissAlert: jest.fn()
    }));

    const { result } = renderHook(() => useLowStockAlertState());
    
    expect(mockCheckLowStock).toHaveBeenCalled();
  });

  it('should dismiss a low stock alert', async () => {
    const mockDismissAlert = jest.fn().mockResolvedValue({ success: true });
    require('../useLowStockAlert').default.mockImplementation(() => ({
      lowStockItems: [{ id: '1', name: 'Cheese', stock: 2, threshold: 5 }],
      loading: false,
      error: null,
      checkLowStock: jest.fn(),
      dismissAlert: mockDismissAlert
    }));

    const { result } = renderHook(() => useLowStockAlertState());
    
    await act(async () => {
      await result.current.handleDismissAlert('1');
    });

    expect(mockDismissAlert).toHaveBeenCalledWith('1');
  });
});