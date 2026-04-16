import { renderHook, act } from '@testing-library/react';
import useOrdersState from '../useOrdersState';

// Mock the useOrders hook
jest.mock('../useOrders', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    orders: [],
    loading: false,
    error: null,
    fetchOrders: jest.fn()
  }))
}));

describe('useOrdersState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useOrdersState());
    
    expect(result.current.orders).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should call fetchOrders on mount', () => {
    const mockFetchOrders = jest.fn();
    require('../useOrders').default.mockImplementation(() => ({
      orders: [],
      loading: false,
      error: null,
      fetchOrders: mockFetchOrders
    }));

    const { result } = renderHook(() => useOrdersState());
    
    expect(mockFetchOrders).toHaveBeenCalled();
  });

  it('should refresh orders', async () => {
    const mockFetchOrders = jest.fn().mockResolvedValue({ success: true });
    require('../useOrders').default.mockImplementation(() => ({
      orders: [{ id: '1', status: 'Received' }],
      loading: false,
      error: null,
      fetchOrders: mockFetchOrders
    }));

    const { result } = renderHook(() => useOrdersState());
    
    await act(async () => {
      await result.current.handleRefreshOrders();
    });

    expect(mockFetchOrders).toHaveBeenCalled();
  });
});