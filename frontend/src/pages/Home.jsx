import React, {useEffect,useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Carousels from '../components/carousels';
import ProductList from '../components/ProductList';
import ProductContext from "../context/ProductContext";
import Aleart from '../components/Aleart';

function Home() {
    const navigate=useNavigate()
    const {messageAlert}=useContext(ProductContext)
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
      if (localStorage.getItem('access_token') !== null) {
         setIsAuth(true); 
       }
     }, [isAuth]);

    return ( 
     <div>
      {messageAlert &&  <Aleart message={messageAlert}/>}
        {isAuth? 
        <div>
        <Carousels />
        <ProductList/>
        </div> 
        :
         (navigate("/login"))
        }
     </div>
     );
}
export default Home;