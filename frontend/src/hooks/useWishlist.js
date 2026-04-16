import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useWishlist = () => {
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);

  const addToWishlist = (item) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(wishItem => wishItem._id === item._id);
      if (!exists) {
        return [...prevWishlist, item];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item._id !== itemId)
    );
  };

  const isInWishlist = (itemId) => {
    return wishlist.some(item => item._id === itemId);
  };

  const toggleWishlist = (item) => {
    if (isInWishlist(item._id)) {
      removeFromWishlist(item._id);
    } else {
      addToWishlist(item);
    }
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist
  };
};

export default useWishlist;