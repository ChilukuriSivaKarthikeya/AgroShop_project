import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/Editprofile';
import Product from './pages/Addproduct';
import Register from './pages/Register';
import ResetPassword from "./pages/ResetPassword";
import ConfirmResetPassword from "./pages/ConfirmResetPassword";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import MyOrder from "./pages/MyOrders";
import OrderSuccess from "./pages/OrderSuccess";
import { UserProvider } from './context/userContext'
import { ProductProvider} from "./context/ProductContext";


function App() {
  const dynamicPattern = /^\/confirmresetpassword\/.*\/.*$/;
  const excludedPaths = ['/login', '/resetpassword', '/register'];
  const currentPath = window.location.pathname;
  const isNavbarVisible = !excludedPaths.some(
    (path) => path === currentPath || dynamicPattern.test(currentPath)
  );
  return (
    <BrowserRouter>
    <UserProvider>
      <ProductProvider>
      {isNavbarVisible && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
        <Route path="/confirmresetpassword/:uid/:token" element={<ConfirmResetPassword/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/addproduct" element={<Product />} />
        <Route path="/order" element={<Checkout />} />
        <Route path="/orderplaced" element={<OrderSuccess />} />
        <Route path="/MyOrders" element={<MyOrder />} />
      </Routes>
      <Footer/>
      </ProductProvider>
      </UserProvider>
    </BrowserRouter>   
  );
}

export default App;
