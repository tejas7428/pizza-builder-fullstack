import { renderHook, act } from '@testing-library/react';
import useOrderSearchState from '../useOrderSearchState';

describe('useOrderSearchState', () => {
  const mockOrders = [
    {
      _id: 'order1',
      status: 'Received',
      userId: { name: 'John Doe', email: 'john@example.com' },
      total: 25,
    },
    {
      _id: 'order2',
      status: 'In Kitchen',
      userId: { name: 'Jane Smith', email: 'jane@example.com' },
      total: 30,
    },
    {
      _id: 'order3',
      status: 'Sent to Delivery',
      userId: { name: 'Bob Johnson', email: 'bob@example.com' },
      total: 20,
    },
  ];

  it('should initialize with empty search term', () => {
    const { result } = renderHook(() => useOrderSearchState(mockOrders));
    
    expect(result.current.searchTerm).toBe('');
    expect(result.current.filteredOrders).toEqual(mockOrders);
  });

  it('should filter orders by order ID', () => {
    const { result } = renderHook(() => useOrderSearchState(mockOrders));
    
    act(() => {
      result.current.setSearchTerm('order1');
    });
    
    expect(result.current.filteredOrders).toEqual([
      {
        _id: 'order1',
        status: 'Received',
        userId: { name: 'John Doe', email: 'john@example.com' },
        total: 25,
      },
    ]);
  });

  it('should filter orders by status', () => {
    const { result } = renderHook(() => useOrderSearchState(mockOrders));
    
    act(() => {
      result.current.setSearchTerm('kitchen');
    });
    
    expect(result.current.filteredOrders).toEqual([
      {
        _id: 'order2',
        status: 'In Kitchen',
        userId: { name: 'Jane Smith', email: 'jane@example.com' },
        total: 30,
      },
    ]);
  });

  it('should filter orders by user name', () => {
    const { result } = renderHook(() => useOrderSearchState(mockOrders));
    
    act(() => {
      result.current.setSearchTerm('jane');
    });
    
    expect(result.current.filteredOrders).toEqual([
      {
        _id: 'order2',
        status: 'In Kitchen',
        userId: { name: 'Jane Smith', email: 'jane@example.com' },
        total: 30,
      },
    ]);
  });

  it('should filter orders by user email', () => {
    const { result } = renderHook(() => useOrderSearchState(mockOrders));
    
    act(() => {
      result.current.setSearchTerm('bob@example.com');
    });
    
    expect(result.current.filteredOrders).toEqual([
      {
        _id: 'order3',
        status: 'Sent to Delivery',
        userId: { name: 'Bob Johnson', email: 'bob@example.com' },
        total: 20,
      },
    ]);
  });

  it('should filter orders case insensitively', () => {
    const { result } = renderHook(() => useOrderSearchState(mockOrders));
    
    act(() => {
      result.current.setSearchTerm('JOHN');
    });
    
    expect(result.current.filteredOrders).toEqual([
      {
        _id: 'order1',
        status: 'Received',
        userId: { name: 'John Doe', email: 'john@example.com' },
        total: 25,
      },
    ]);
  });

  it('should return empty array when no matches found', () => {
    const { result } = renderHook(() => useOrderSearchState(mockOrders));
    
    act(() => {
      result.current.setSearchTerm('nonexistent');
    });
    
    expect(result.current.filteredOrders).toEqual([]);
  });

  it('should return all orders when search term is cleared', () => {
    const { result } = renderHook(() => useOrderSearchState(mockOrders));
    
    act(() => {
      result.current.setSearchTerm('order1');
      result.current.setSearchTerm('');
    });
    
    expect(result.current.filteredOrders).toEqual(mockOrders);
  });
});