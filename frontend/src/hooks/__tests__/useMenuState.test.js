import { renderHook, act } from '@testing-library/react';
import useMenuState from '../useMenuState';

// Mock the useMenu hook
jest.mock('../useMenu', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    menu: {},
    loading: false,
    error: null,
    fetchMenu: jest.fn()
  }))
}));

describe('useMenuState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useMenuState());
    
    expect(result.current.menu).toEqual({});
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should call fetchMenu on mount', () => {
    const mockFetchMenu = jest.fn();
    require('../useMenu').default.mockImplementation(() => ({
      menu: {},
      loading: false,
      error: null,
      fetchMenu: mockFetchMenu
    }));

    const { result } = renderHook(() => useMenuState());
    
    expect(mockFetchMenu).toHaveBeenCalled();
  });

  it('should refresh menu', async () => {
    const mockFetchMenu = jest.fn().mockResolvedValue({ success: true });
    require('../useMenu').default.mockImplementation(() => ({
      menu: { bases: [], sauces: [] },
      loading: false,
      error: null,
      fetchMenu: mockFetchMenu
    }));

    const { result } = renderHook(() => useMenuState());
    
    await act(async () => {
      await result.current.handleRefreshMenu();
    });

    expect(mockFetchMenu).toHaveBeenCalled();
  });
});