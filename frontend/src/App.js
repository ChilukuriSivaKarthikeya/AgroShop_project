import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from "./pages/ResetPassword";
import ConfirmResetPassword from "./pages/ConfirmResetPassword";
import Footer from "./components/Footer";
import { UserProvider } from './context/userContext'
import { ProductProvider} from "./context/ProductContext";
import SellerHome from "./sellerPages/SellerHome";
import User from "./pages/User";
import SignUp from "./sellerPages/Signup";
import SignIn from "./sellerPages/Signin";


function App() {
  const dynamicPattern = [/^\/confirmresetpassword\/.*\/.*$/, /^\/seller\/.*/];
  const excludedPaths = ['/login', '/resetpassword', '/register'];
  const currentPath = window.location.pathname;
  const isNavbarVisible = !excludedPaths.some(
    (path) => path === currentPath || dynamicPattern.some(pattern => pattern.test(currentPath))
  );
  return (
    <BrowserRouter>
    <UserProvider>
      <ProductProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
        <Route path="/confirmresetpassword/:uid/:token" element={<ConfirmResetPassword/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/seller/*" element={<SellerHome />} />
      </Routes>
      <Footer/>
      </ProductProvider>
      </UserProvider>
    </BrowserRouter>   
  );
}

export default App;
