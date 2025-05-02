/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TwoFactorAuth = ({ tempToken, email, onVerificationComplete }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5001/api/users/verify-2fa', {
        tempToken,
        code,
      });

      if (onVerificationComplete) {
        onVerificationComplete(data.token);
      } else {
        localStorage.setItem('token', data.token);
        navigate('/userDashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Verification failed. Please try again.';
      setError(msg);

      // Token-related and request error debugging
      console.error('2FA verification failed:', err);
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Response data:', err.response.data);
        console.error('Headers:', err.response.headers);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      <p>We've sent a verification code to {email}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="code">Verification Code</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          autoFocus
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default TwoFactorAuth;
*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuth = ({ tempToken, email, onVerificationComplete }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/verify-2fa', {
        tempToken,
        code,
      });

      // Call the parent function to handle the verification completion
      if (onVerificationComplete) {
        onVerificationComplete(data.token);
        navigate('/userDashboard'); // Navigate to the user dashboard after verification
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      <p>We've sent a verification code to {email}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="code">Verification Code</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          autoFocus
        />

        {error && <p>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default TwoFactorAuth;
