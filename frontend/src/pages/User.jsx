import React,{lazy,suspense} from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
const Cart=lazy(()=>import('./Cart'));
const Wishlist=lazy(()=>import('./Wishlist'));
const MyOrders=lazy(()=>import('./MyOrders'));
const Profile=lazy(()=>import('./Profile'));
const EditProfile=lazy(()=>import('./Editprofile'));
const Navbar=lazy(()=>import('../components/Navbar'));
const Spinner=lazy(()=>import('../components/Spinner'));
const OrderSuccess=lazy(()=>import('./OrderSuccess'));
const Checkout=lazy(()=>import('./Checkout'));

function User() {

    return (
        <div>
        <Navbar/>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/wishlist" element={<suspense fallback={<div><Spinner/></div>}><Wishlist /></suspense>} />
        <Route path="/cart" element={<suspense fallback={<div><Spinner/></div>}><Cart/></suspense>} />
        <Route path="/profile" element={<suspense fallback={<div><Spinner/></div>}><Profile /></suspense>} />
        <Route path="/editprofile" element={<suspense fallback={<div><Spinner/></div>}><EditProfile /></suspense>} />
        <Route path="/order" element={<suspense fallback={<div><Spinner/></div>}><Checkout /></suspense>}/>
        <Route path="/orderplaced" element={<suspense fallback={<div><Spinner/></div>}><OrderSuccess /></suspense>} />
        <Route path="/MyOrders" element={<suspense fallback={<div><Spinner/></div>}><MyOrders /></suspense>} />       
      </Routes>
      </div> 
     );
}

export default User;