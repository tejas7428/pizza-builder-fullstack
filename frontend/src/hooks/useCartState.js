import { useState, useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';

const useCartState = () => {
  const [cart, setCart] = useLocalStorageState('cart', []);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;
    
    cart.forEach(item => {
      items += item.quantity;
      price += item.price * item.quantity;
    });
    
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  const addItem = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some(item => item._id === itemId);
  };

  return {
    cart,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart
  };
};

export default useCartState;