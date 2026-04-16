import { renderHook, act } from '@testing-library/react';
import useInventoryState from '../useInventoryState';

// Mock the useInventory hook
jest.mock('../useInventory', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    inventory: [],
    loading: false,
    error: null,
    fetchInventory: jest.fn(),
    updateStock: jest.fn(),
    addNewItem: jest.fn()
  }))
}));

describe('useInventoryState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useInventoryState());
    
    expect(result.current.inventory).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should call fetchInventory on mount', () => {
    const mockFetchInventory = jest.fn();
    require('../useInventory').default.mockImplementation(() => ({
      inventory: [],
      loading: false,
      error: null,
      fetchInventory: mockFetchInventory,
      updateStock: jest.fn(),
      addNewItem: jest.fn()
    }));

    const { result } = renderHook(() => useInventoryState());
    
    expect(mockFetchInventory).toHaveBeenCalled();
  });

  it('should update stock for an item', async () => {
    const mockUpdateStock = jest.fn().mockResolvedValue({ success: true });
    require('../useInventory').default.mockImplementation(() => ({
      inventory: [{ id: '1', name: 'Cheese', stock: 10 }],
      loading: false,
      error: null,
      fetchInventory: jest.fn(),
      updateStock: mockUpdateStock,
      addNewItem: jest.fn()
    }));

    const { result } = renderHook(() => useInventoryState());
    
    await act(async () => {
      await result.current.handleUpdateStock('1', 15);
    });

    expect(mockUpdateStock).toHaveBeenCalledWith('1', 15);
  });

  it('should add a new inventory item', async () => {
    const mockAddNewItem = jest.fn().mockResolvedValue({ success: true });
    require('../useInventory').default.mockImplementation(() => ({
      inventory: [],
      loading: false,
      error: null,
      fetchInventory: jest.fn(),
      updateStock: jest.fn(),
      addNewItem: mockAddNewItem
    }));

    const { result } = renderHook(() => useInventoryState());
    
    const newItem = { name: 'New Item', category: 'base', price: 5, stock: 20, threshold: 5 };
    
    await act(async () => {
      await result.current.handleAddNewItem(newItem);
    });

    expect(mockAddNewItem).toHaveBeenCalledWith(newItem);
  });
});