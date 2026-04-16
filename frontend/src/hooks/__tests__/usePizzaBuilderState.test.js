import { renderHook, act } from '@testing-library/react';
import usePizzaBuilderState from '../usePizzaBuilderState';

describe('usePizzaBuilderState', () => {
  it('should initialize with correct initial state', () => {
    const { result } = renderHook(() => usePizzaBuilderState());
    
    expect(result.current.selectedBase).toBeNull();
    expect(result.current.selectedSauce).toBeNull();
    expect(result.current.selectedCheese).toBeNull();
    expect(result.current.selectedVeggies).toEqual([]);
    expect(result.current.selectedMeats).toEqual([]);
  });

  it('should select base', () => {
    const { result } = renderHook(() => usePizzaBuilderState());
    const base = { _id: '1', name: 'Thin Crust', price: 10 };
    
    act(() => {
      result.current.selectBase(base);
    });
    
    expect(result.current.selectedBase).toEqual(base);
  });

  it('should select sauce', () => {
    const { result } = renderHook(() => usePizzaBuilderState());
    const sauce = { _id: '1', name: 'Tomato', price: 2 };
    
    act(() => {
      result.current.selectSauce(sauce);
    });
    
    expect(result.current.selectedSauce).toEqual(sauce);
  });

  it('should select cheese', () => {
    const { result } = renderHook(() => usePizzaBuilderState());
    const cheese = { _id: '1', name: 'Mozzarella', price: 3 };
    
    act(() => {
      result.current.selectCheese(cheese);
    });
    
    expect(result.current.selectedCheese).toEqual(cheese);
  });

  it('should toggle veggie selection', () => {
    const { result } = renderHook(() => usePizzaBuilderState());
    const veggie = { _id: '1', name: 'Peppers', price: 1 };
    
    // Add veggie
    act(() => {
      result.current.toggleVeggie(veggie);
    });
    
    expect(result.current.selectedVeggies).toEqual([veggie]);
    
    // Remove veggie
    act(() => {
      result.current.toggleVeggie(veggie);
    });
    
    expect(result.current.selectedVeggies).toEqual([]);
  });

  it('should toggle meat selection', () => {
    const { result } = renderHook(() => usePizzaBuilderState());
    const meat = { _id: '1', name: 'Pepperoni', price: 2 };
    
    // Add meat
    act(() => {
      result.current.toggleMeat(meat);
    });
    
    expect(result.current.selectedMeats).toEqual([meat]);
    
    // Remove meat
    act(() => {
      result.current.toggleMeat(meat);
    });
    
    expect(result.current.selectedMeats).toEqual([]);
  });

  it('should calculate total correctly', () => {
    const { result } = renderHook(() => usePizzaBuilderState());
    
    const base = { _id: '1', name: 'Thin Crust', price: 10 };
    const sauce = { _id: '2', name: 'Tomato', price: 2 };
    const cheese = { _id: '3', name: 'Mozzarella', price: 3 };
    const veggie = { _id: '4', name: 'Peppers', price: 1 };
    const meat = { _id: '5', name: 'Pepperoni', price: 2 };
    
    act(() => {
      result.current.selectBase(base);
      result.current.selectSauce(sauce);
      result.current.selectCheese(cheese);
      result.current.toggleVeggie(veggie);
      result.current.toggleMeat(meat);
    });
    
    const total = result.current.calculateTotal();
    expect(total).toBe(18); // 10 + 2 + 3 + 1 + 2
  });

  it('should reset builder', () => {
    const { result } = renderHook(() => usePizzaBuilderState());
    
    const base = { _id: '1', name: 'Thin Crust', price: 10 };
    
    act(() => {
      result.current.selectBase(base);
      result.current.resetBuilder();
    });
    
    expect(result.current.selectedBase).toBeNull();
    expect(result.current.selectedSauce).toBeNull();
    expect(result.current.selectedCheese).toBeNull();
    expect(result.current.selectedVeggies).toEqual([]);
    expect(result.current.selectedMeats).toEqual([]);
  });

  it('should get pizza data', () => {
    const { result } = renderHook(() => usePizzaBuilderState());
    
    const base = { _id: '1', name: 'Thin Crust', price: 10 };
    const sauce = { _id: '2', name: 'Tomato', price: 2 };
    
    act(() => {
      result.current.selectBase(base);
      result.current.selectSauce(sauce);
    });
    
    const pizzaData = result.current.getPizzaData();
    expect(pizzaData.base).toEqual(base);
    expect(pizzaData.sauce).toEqual(sauce);
    expect(pizzaData.total).toBe(12);
  });
});