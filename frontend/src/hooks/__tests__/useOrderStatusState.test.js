import { renderHook, act } from '@testing-library/react';
import useOrderStatusState from '../useOrderStatusState';

// Mock the useOrderStatus hook
jest.mock('../useOrderStatus', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    status: 'Received',
    loading: false,
    error: null,
    updateStatus: jest.fn()
  }))
}));

describe('useOrderStatusState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useOrderStatusState('Received'));
    
    expect(result.current.status).toBe('Received');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should update order status', async () => {
    const mockUpdateStatus = jest.fn().mockResolvedValue({ success: true });
    require('../useOrderStatus').default.mockImplementation(() => ({
      status: 'Received',
      loading: false,
      error: null,
      updateStatus: mockUpdateStatus
    }));

    const { result } = renderHook(() => useOrderStatusState('Received'));
    
    await act(async () => {
      await result.current.handleChangeStatus('In Kitchen');
    });

    expect(mockUpdateStatus).toHaveBeenCalledWith('In Kitchen');
  });
});