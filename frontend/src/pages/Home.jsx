import React, {useEffect,useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Carousels from '../components/carousels';
import ProductList from '../components/ProductList';
import ProductContext from "../context/ProductContext";
import Aleart from '../components/Aleart';


function Home() {
  const navigate = useNavigate();
  const { messageAlert,color } = useContext(ProductContext);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    } else {
      navigate('/login'); 
    }
  }, [navigate]); 

  return (
    <div>
      {messageAlert && <Aleart message={messageAlert} color={color} />}
      {isAuth && (
        <div>
          <Carousels />
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default Home;