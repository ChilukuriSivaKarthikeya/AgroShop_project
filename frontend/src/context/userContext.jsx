import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(()=>(localStorage.getItem('access_token') ? true : false));
  const [buyer, setBuyer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [location,setLocation]=useState(localStorage.getItem('location') || '');

  const navigate=useNavigate()

  const getUser = async () => {
    if(localStorage.getItem('access_token')){
    const token = localStorage.getItem('access_token');
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/buyer/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if(response.status === 200){
        setBuyer(response.data);
        setIsLoading(false);
      } else if(response.status === 401){
        logoutUser()
      }     
    } catch (error) {
      logoutUser()
      setError(error);
      setIsLoading(false);
    }
  }
  };
  let loginUser=async(username,password)=>{
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        username,
        password,
      });
          const data = response.data;
          setIsAuth(true)
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          axios.defaults.headers['Authorization']=`Bearer ${data.access}`;
          navigate('/user')
    } catch (error) {
      if (error.response) {
         setError(error.response.data)
      } else {
        console.error('An error occurred:', error.message);
      }
    }
  }

  let logoutUser = () => {
    axios.defaults.headers['Authorization'] = null;
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
}
const updateToken = async () => {
  if(localStorage.getItem('refresh_token')){
  const refreshToken = localStorage.getItem('refresh_token');
  const response = await axios.post('http://localhost:8000/token/refresh/',
      {refresh:refreshToken});
  
  if (response.status === 200) {
    setIsAuth(true)
    axios.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  } else {
      logoutUser()
  }

  if(isLoading){
      setIsLoading(false)
  }
}
}
  useEffect(()=>{
    if(isLoading){
        updateToken()
    }
    const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
    let interval = setInterval(()=>{
        if(isAuth){
            updateToken()
        }
    }, REFRESH_INTERVAL)
    return () => clearInterval(interval)

},[isAuth, isLoading])


  const data = {
    getUser,
    buyer,
    isLoading,
    error,
    loginUser,
    logoutUser,
    query,
    setQuery,
    location,
    setLocation
  };

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};
