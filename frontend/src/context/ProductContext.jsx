import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export default ProductContext;

export const ProductProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageAlert, setMessageAlert] = useState('');
  const [change, setChange] = useState(0);
  const token = localStorage.getItem('access_token');

  const getWishlist = async () => {
    try {
      if (!token) {
        console.error('Access token is missing.');
        return;
      }
      const response = await axios.get('http://localhost:8000/wishlist/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setWishlist(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleWishlistAction = async (url, id) => {
    try {
      const response = await axios.post(url, null, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setMessageAlert(response.data.message);
      setChange(change + 1);

      setTimeout(() => {
        setMessageAlert('');
      }, 6000);
    } catch (error) {
      console.error('Error performing wishlist action:', error);
    }
  };

  const addWishlist = (id) => handleWishlistAction(`http://localhost:8000/addwishlist/${id}`, id);

  const removeWishlist = (id) => handleWishlistAction(`http://localhost:8000/deletewishlist/${id}`, id);

  const getCart = async () => {
    try {
      if (!token) {
        console.error('Access token is missing.');
        return;
      }

      const response = await axios.get('http://localhost:8000/cart/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setCart(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error('Error fetching cart:', error);
    }
  };

  const handleCartAction = async (url, id) => {
    try {
      const response = await axios.post(url, null, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setMessageAlert(response.data.message);
      setChange(change + 1);

      setTimeout(() => {
        setMessageAlert('');
      }, 6000);
    } catch (error) {
      console.error('Error performing cart action:', error);
    }
  };

  const addCart = (id) => handleCartAction(`http://localhost:8000/addcart/${id}`, id);

  const removeCart = (id) => handleCartAction(`http://localhost:8000/deletecart/${id}`, id);

  const handleQuantityAction = async (url, id) => {
    try {
      const response = await axios.post(url, null, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setChange(change + 1);
    } catch (error) {
      console.error('Error performing quantity action:', error);
    }
  };

  const handleIncrement = (id) => handleQuantityAction(`http://localhost:8000/increaseQuantity/${id}`, id);

  const handleDecrement = (id) => handleQuantityAction(`http://localhost:8000/decreaseQuantity/${id}`, id);

  useEffect(() => {
    getWishlist();
    getCart();
  }, [change]);

  const data = {
    isLoading,
    wishlist,
    addWishlist,
    removeWishlist,
    cart,
    messageAlert,
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
