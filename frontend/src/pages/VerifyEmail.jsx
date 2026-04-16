import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { verifyEmail } from '../services/api';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('No verification token provided');
        setLoading(false);
        return;
      }
      
      try {
        await verifyEmail(token);
        setSuccess(true);
      } catch (err) {
        setError(err.response?.data?.message || 'Email verification failed');
      } finally {
        setLoading(false);
      }
    };
    
    verifyToken();
  }, [token]);

  if (loading) {
    return <div className="verify-email">Verifying email...</div>;
  }

  if (success) {
    return (
      <div className="verify-email-success">
        <h2>Email Verified Successfully!</h2>
        <p>Your email has been verified. You can now login to your account.</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  return (
    <div className="verify-email-error">
      <h2>Email Verification Failed</h2>
      <p>{error}</p>
      <Link to="/login" className="btn btn-primary">Back to Login</Link>
    </div>
  );
};

export default VerifyEmail;