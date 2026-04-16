import { useState, useEffect } from 'react';
import { getMenu } from '../services/api';

const useMenuState = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMenu();
        setMenu(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return {
    menu,
    loading,
    error
  };
};

export default useMenuState;