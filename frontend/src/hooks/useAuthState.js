import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuthState = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuthState;