import React, { useState, useEffect, createContext, useCallback } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

const ProductContext = createContext();

export default ProductContext;

export const ProductProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [change, setChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messageAlert, setMessageAlert] = useState('');
  const [color, setColor] = useState("success");
  const token = localStorage.getItem('access_token');

  const fetchData = async (url, setData) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error(`Error fetching data: ${error}`);
    }
  };

  const handleAction = useCallback(async (url, method, data = null) => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
  
      const response = method === 'post'? await axios[method](url, data, config): await axios[method](url, config); 
      setChange(!change);
      setMessageAlert(response.data.message);
      setColor("success")
      setIsLoading(false);
  
      setTimeout(() => {
        setMessageAlert('');
      }, 6000);
    } catch (error) {
      setIsLoading(false);
      if (error.response?.status === 400) {
        setMessageAlert(error.response.data.message || 'Bad Request');
        setColor("info")
      } else {
        setError(error);
        console.error(`Error performing action: ${error}`);
      }
    }
  }, [change, token]);
  

const addWishlist = useCallback((id) => {
  handleAction(`http://localhost:8000/addwishlist/${id}`, 'post');
}, [handleAction]);

const removeWishlist = useCallback((id) => {
  handleAction(`http://localhost:8000/deletewishlist/${id}`, 'delete');
}, [handleAction]);

const addCart = useCallback((id) => {
  handleAction(`http://localhost:8000/addcart/${id}`, 'post');
}, [handleAction]);

const removeCart = useCallback((id) => {
  handleAction(`http://localhost:8000/deletecart/${id}`, 'delete');
}, [handleAction]);


  const handleQuantityAction = useCallback(async (url) => {
    try {
      setIsLoading(true);
      await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchData('http://localhost:8000/cart/', setCart);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error(`Error updating quantity: ${error}`);
    }
  }, [token]);

  const handleIncrement = useCallback((id) => handleQuantityAction(`http://localhost:8000/increaseQuantity/${id}`), [handleQuantityAction]);
  const handleDecrement = useCallback((id) => handleQuantityAction(`http://localhost:8000/decreaseQuantity/${id}`), [handleQuantityAction]);

  useEffect(() => {
    if (!token) {
      console.error('Access token is missing.');
      return;
    }
    fetchData('http://localhost:8000/wishlist/', setWishlist);
    fetchData('http://localhost:8000/cart/', setCart);
  }, [change]);

  const data = {
    isLoading,
    error,
    wishlist,
    addWishlist,
    removeWishlist,
    cart,
    messageAlert,
    color,
    addCart,
    removeCart,
    handleIncrement,
    handleDecrement,
  };

  return (
    <ProductContext.Provider value={data}>
      {children}
    </ProductContext.Provider>
  );
};
