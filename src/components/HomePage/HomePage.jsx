import React from 'react';
import AuthHeader from './Headers/AuthHeader';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import the Navigate component
import './HomePage.css';
import Products from '../ProductsPage/Products';
import Login from '../AuthPages/SigninPage';
import LandingPage from '../LandingPage/LandingPage';
import Signup from '../AuthPages/SignupPage';
import { useAuth } from '../AuthPages/useAuth';
import CartPage from '../ProductsPage/CartPage';
const HomePage = ({setAlert}) => {
  const { isLoggedIn } = useAuth();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<><AuthHeader/><Login setAlert={setAlert}/></>} />
        <Route path="/signup" element={<><AuthHeader/><Signup setAlert={setAlert}/></>} />
        {isLoggedIn ? (
          <>
          <Route path="/products" element={<Products/>} />
          <Route path="/cart-page" element={<CartPage/>} />
          </>
        ) : (
          <>
          <Route path="/products" element={<Navigate to="/login" />} />
          <Route path="/cart-page" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default HomePage;
