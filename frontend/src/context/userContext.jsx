import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem('access_token'));
  const [isSellerAuth, setIsSellerAuth] = useState(() => !!localStorage.getItem('seller_access_token'));
  const [buyer, setBuyer] = useState(null);
  const [seller, setSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState(localStorage.getItem('location') || '');

  const navigate = useNavigate();

  const getUser = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/buyer/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBuyer(response.data);
      } catch (err) {
        console.error("Error fetching buyer data:", err?.response || err.message);
        logoutUser();
        setError(err?.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getSellerData = async () => {
    const token = localStorage.getItem('seller_access_token');
    if (token) {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/seller/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setSeller(response.data);
      } catch (err) {
        console.error("Error fetching seller data:", err?.response || err.message);
        logoutSeller();
        setError(err?.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        username,
        password,
      });
      const data = response.data;
      setIsAuth(true);
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      await getUser();
      navigate('/user');
    } catch (err) {
      console.error("Error during user login:", err?.response || err.message);
      setError(err?.response?.data || err.message);
    }
  };

  const loginSeller = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        username,
        password,
      });
      const data = response.data;
      setIsSellerAuth(true);
      localStorage.setItem('seller_access_token', data.access);
      localStorage.setItem('refresh_seller_token', data.refresh);
      await getSellerData();
      navigate('/seller/orders');
    } catch (err) {
      console.error("Error during seller login:", err?.response || err.message);
      setError(err?.response?.data || err.message);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setBuyer(null);
    setIsAuth(false);
    navigate('/login');
  };

  const logoutSeller = () => {
    localStorage.removeItem('seller_access_token');
    localStorage.removeItem('refresh_seller_token');
    setSeller(null);
    setIsSellerAuth(false);
    navigate('/signin');
  };

  const updateToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const response = await axios.post('http://localhost:8000/token/refresh/', {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        setIsAuth(true);
      } catch (err) {
        console.error("Error refreshing user token:", err?.response || err.message);
        logoutUser();
      }
    }
  };

  const updateSellerToken = async () => {
    const refreshToken = localStorage.getItem('refresh_seller_token');
    if (refreshToken) {
      try {
        const response = await axios.post('http://localhost:8000/token/refresh/', {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('seller_access_token', access);
        setIsSellerAuth(true);
      } catch (err) {
        console.error("Error refreshing seller token:", err?.response || err.message);
        logoutSeller();
      }
    }
  };
  useEffect(() => {
    if (isSellerAuth) {
      getSellerData();
    }
  }, [isSellerAuth]);

  useEffect(() => {
    const userRefreshInterval = isAuth && setInterval(updateToken, 1000 * 60 * 4);
    return () => clearInterval(userRefreshInterval);
  }, [isAuth]);

  useEffect(() => {
    const sellerRefreshInterval = isSellerAuth && setInterval(updateSellerToken, 1000 * 60);
    return () => clearInterval(sellerRefreshInterval);
  }, [isSellerAuth]);

  return (
    <UserContext.Provider value={{
      isAuth,
      isSellerAuth,
      buyer,
      seller,
      isLoading,
      error,
      setBuyer,
      setSeller,
      getUser,
      loginUser,
      logoutUser,
      loginSeller,
      logoutSeller,
      query,
      setQuery,
      location,
      setLocation,
    }}>
      {children}
    </UserContext.Provider>
  );
};
