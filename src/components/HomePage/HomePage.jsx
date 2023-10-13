import React from 'react';
import AuthHeader from './Headers/AuthHeader';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './HomePage.css';
import Products from '../ProductsPage/Products';
import Login from '../AuthPages/SigninPage';
import LandingPage from '../LandingPage/LandingPage';
import Signup from '../AuthPages/SignupPage';
import { useAuth } from '../AuthPages/useAuth';
import CartPage from '../ProductsPage/CartPage';
import ProductCatalogue from '../AdminPages/ProductPage/ProductCatalogue';
import AdminLogin from '../AuthPages/AdminLogin';
import Inventory from '../AdminPages/InventoryPage/Inventory';
import NoAuth from '../AuthPages/NoAuth';
import EmployeePage from '../AdminPages/EmployeePage/EmployeePage';
import CustomerPage from '../AdminPages/CustomerPage/CustomerPage';

const HomePage = ({ setAlert }) => {
  const { isLoggedIn, isAdminLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<><AuthHeader /><Login setAlert={setAlert} /></>} />
        <Route path="/signup" element={<><AuthHeader /><Signup setAlert={setAlert} /></>} />
        <Route path="/admin" element={<><AuthHeader /><AdminLogin setAlert={setAlert} /></>} />
        <Route path="/noauth" element={<><AuthHeader /><NoAuth setAlert={setAlert} /></>} />
        {isLoggedIn ? (
          <>
            <Route path="/products" element={<Products />} />
            <Route path="/cart-page" element={<CartPage />} />
          </>
        ) : (
          <>
            <Route path="/products" element={<Navigate to="/" />} />
            <Route path="/cart-page" element={<Navigate to="/login" />} />
          </>
        )}
        {isAdminLoggedIn ? (
          <>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/product-catalogue" element={<ProductCatalogue/>}/>
          <Route path="/employee-page" element={<EmployeePage/>}/>
          <Route path="/customer-page" element={<CustomerPage/>}/>
          </>
        ):(<>
        <Route path="/inventory" element={<Navigate to="/noauth" />} />
        <Route path="/product-catalogue" element={<Navigate to="/noauth" />} />
        <Route path="/employee-page" element={<Navigate to="/noauth" />} />
        <Route path="/customer-page" element={<Navigate to="/noauth" />} />
        </>)
        }
      </Routes>
    </Router>
  );
};

export default HomePage;
