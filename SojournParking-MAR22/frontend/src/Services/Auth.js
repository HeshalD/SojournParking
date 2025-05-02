import axios from 'axios';

const API_URL = '/api/auth';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  
  if (response.data.requires2FA) {
    return {
      requires2FA: true,
      tempToken: response.data.tempToken,
      email
    };
  }
  
  return response.data;
};

const verify2FA = async (tempToken, code) => {
  const response = await axios.post(`${API_URL}/verify-2fa`, { tempToken, code });
  return response.data;
};

const enableEmail2FA = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const response = await axios.post(`${API_URL}/enable-email-2fa`, {}, config);
  return response.data;
};

const disable2FA = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const response = await axios.post(`${API_URL}/disable-2fa`, {}, config);
  return response.data;
};

export default {
  login,
  verify2FA,
  enableEmail2FA,
  disable2FA
};