import './App.css';
import Home from './Component/Home';
import Footer from './Component/Layout/Footer';
import Header from './Component/Layout/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Component/Menu';
import Cart from './Component/cart/Cart'
import Delivery from './Component/cart/Delivery';
import Login from './Component/user/Login';
import Register from './Component/user/Register';
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userAction';
import store from './store';
import Profile from './Component/user/Profile';
import UpdateProfile from './Component/user/UpdateProfile';
import ForgotPassword from './Component/user/ForgotPassword';
import NewPassword from './Component/user/NewPassword';
import ConfirmOrder from './Component/cart/ConfirmOrder';
import Payment from './Component/cart/Payment';
import OrderSuccess from './Component/cart/OrderSuccess';
// payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import ListOrders from './Component/order/ListOrders';
import OrderDetails from './Component/order/OrderDetails';


function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const {data} = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className='container container-fluid'>
          <Routes>
            <Route path='/' element={<Home/>} exact />
            <Route path='/eats/stores/search/:keyword' element={<Home />} exact/>
            <Route path='/eats/stores/:id/menus' element={<Menu/>} exact/> 
            <Route path='/cart' element={<Cart />} exact/>
            <Route path='/delivery' element={<Delivery />} exact/>
            {/* User  */}
            <Route path='/users/login' element={<Login />} exact/>
            <Route path='/users/signup' element={<Register exact/>} />
            <Route path='/users/me' element={<Profile />} exact/>
            <Route path='/users/me/update' element={<UpdateProfile />} exact/>
            <Route path='/users/forgetPassword' element={<ForgotPassword />} exact/>
            <Route path='/users/resetPassword/:token' element={<NewPassword />} exact/>
            <Route path='/confirm' element={<ConfirmOrder />} exact/>
            {/* payment  */}
            { stripeApiKey && (
                <Route 
                path='/payment' 
                element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
                } 
              />
              )}
            {/* order Success  */}
            <Route path='/success' element={<OrderSuccess />} exact/>
            {/* order list  */}
            <Route path='/eats/orders/me/myOrders' element={<ListOrders />} exact/>
            {/* orderdetails  */}/
            <Route path='/eats/orders/:id' element={<OrderDetails />} exact/>
          </Routes>
        </div>
       <Footer/>
      </div>
    </Router>
  );
}

export default App;