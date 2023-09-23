import React from 'react';
import Header from './Headers/Header';
import Carousel from './Carousel/Carousel';
import Products from '../ProductsPage/Products';
import HeaderVariant from './Headers/HeaderVariant';
import HeaderVariant2 from './Headers/HeaderVariant2';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import the Navigate component
import './HomePage.css';
import Login from '../AuthPages/SigninPage';
import Signup from '../AuthPages/SignupPage';
import { useAuth } from '../AuthPages/useAuth';

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header/><Carousel/><Products/></>} />
        <Route path="/login" element={<><HeaderVariant/><Login/></>} />
        <Route path="/signup" element={<><HeaderVariant/><Signup/></>} />
        {isLoggedIn ? (
          <Route path="/products" element={<><HeaderVariant2 /><Products/></>} />
        ) : (
          <Route path="/products" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default HomePage;
