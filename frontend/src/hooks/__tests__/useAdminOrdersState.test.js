import { renderHook, act } from '@testing-library/react';
import useAdminOrdersState from '../useAdminOrdersState';

// Mock the useAdminOrders hook
jest.mock('../useAdminOrders', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    orders: [],
    loading: false,
    error: null,
    fetchOrders: jest.fn(),
    updateOrderStatus: jest.fn()
  }))
}));

describe('useAdminOrdersState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useAdminOrdersState());
    
    expect(result.current.orders).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should call fetchOrders on mount', () => {
    const mockFetchOrders = jest.fn();
    require('../useAdminOrders').default.mockImplementation(() => ({
      orders: [],
      loading: false,
      error: null,
      fetchOrders: mockFetchOrders,
      updateOrderStatus: jest.fn()
    }));

    const { result } = renderHook(() => useAdminOrdersState());
    
    expect(mockFetchOrders).toHaveBeenCalled();
  });

  it('should update order status', async () => {
    const mockUpdateOrderStatus = jest.fn().mockResolvedValue({ success: true });
    require('../useAdminOrders').default.mockImplementation(() => ({
      orders: [{ id: '1', status: 'Received' }],
      loading: false,
      error: null,
      fetchOrders: jest.fn(),
      updateOrderStatus: mockUpdateOrderStatus
    }));

    const { result } = renderHook(() => useAdminOrdersState());
    
    await act(async () => {
      await result.current.handleUpdateOrderStatus('1', 'In Kitchen');
    });

    expect(mockUpdateOrderStatus).toHaveBeenCalledWith('1', 'In Kitchen');
  });
});