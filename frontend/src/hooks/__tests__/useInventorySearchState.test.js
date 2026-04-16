import { renderHook, act } from '@testing-library/react';
import useInventorySearchState from '../useInventorySearchState';

describe('useInventorySearchState', () => {
  const mockInventory = [
    { _id: '1', name: 'Thin Crust', category: 'base', price: 10 },
    { _id: '2', name: 'Thick Crust', category: 'base', price: 12 },
    { _id: '3', name: 'Tomato Sauce', category: 'sauce', price: 2 },
    { _id: '4', name: 'BBQ Sauce', category: 'sauce', price: 3 },
    { _id: '5', name: 'Mozzarella', category: 'cheese', price: 5 },
    { _id: '6', name: 'Cheddar', category: 'cheese', price: 4 },
    { _id: '7', name: 'Peppers', category: 'veggie', price: 1 },
    { _id: '8', name: 'Onions', category: 'veggie', price: 1 },
  ];

  it('should initialize with empty search term', () => {
    const { result } = renderHook(() => useInventorySearchState(mockInventory));
    
    expect(result.current.searchTerm).toBe('');
    expect(result.current.filteredInventory).toEqual(mockInventory);
  });

  it('should filter inventory by name', () => {
    const { result } = renderHook(() => useInventorySearchState(mockInventory));
    
    act(() => {
      result.current.setSearchTerm('crust');
    });
    
    expect(result.current.filteredInventory).toEqual([
      { _id: '1', name: 'Thin Crust', category: 'base', price: 10 },
      { _id: '2', name: 'Thick Crust', category: 'base', price: 12 },
    ]);
  });

  it('should filter inventory by category', () => {
    const { result } = renderHook(() => useInventorySearchState(mockInventory));
    
    act(() => {
      result.current.setSearchTerm('sauce');
    });
    
    expect(result.current.filteredInventory).toEqual([
      { _id: '3', name: 'Tomato Sauce', category: 'sauce', price: 2 },
      { _id: '4', name: 'BBQ Sauce', category: 'sauce', price: 3 },
    ]);
  });

  it('should filter inventory case insensitively', () => {
    const { result } = renderHook(() => useInventorySearchState(mockInventory));
    
    act(() => {
      result.current.setSearchTerm('THIN');
    });
    
    expect(result.current.filteredInventory).toEqual([
      { _id: '1', name: 'Thin Crust', category: 'base', price: 10 },
    ]);
  });

  it('should return empty array when no matches found', () => {
    const { result } = renderHook(() => useInventorySearchState(mockInventory));
    
    act(() => {
      result.current.setSearchTerm('nonexistent');
    });
    
    expect(result.current.filteredInventory).toEqual([]);
  });

  it('should return all items when search term is cleared', () => {
    const { result } = renderHook(() => useInventorySearchState(mockInventory));
    
    act(() => {
      result.current.setSearchTerm('crust');
      result.current.setSearchTerm('');
    });
    
    expect(result.current.filteredInventory).toEqual(mockInventory);
  });
});