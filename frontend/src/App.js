import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './Pages/Signin';
import SignUp from './Pages/Signup';
import Ecommerce from './Pages/Ecommerce';
import ProductDetail from './Pages/ProductDetail';
import Admin from './Pages/Admin';
import CategoryProducts from './Pages/CategoryDetails';
import MyOrders from './Pages/Orders';
import Categories from './Pages/Catagories';
import Products from './Pages/Products';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
    setIsLoading(false);
  }, []);

  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (isLoading) {
      return <div className="loading-screen">Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }

    if (adminOnly && userRole !== 'ROLE_ADMIN') {
      return <Navigate to="/ecommerce" />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/signin" 
          element={
            isAuthenticated ? 
              (userRole === 'ROLE_ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/ecommerce" />) 
              : <SignIn setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
          } 
        />
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? 
              (userRole === 'ROLE_ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/ecommerce" />) 
              : <SignUp />
          } 
        />
        <Route 
          path="/ecommerce" 
          element={
            <ProtectedRoute>
              <Ecommerce />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          } 
        />
       <Route 
          path="/category/:id" 
          element={
            <ProtectedRoute>
              <CategoryProducts/>
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <MyOrders/>
            </ProtectedRoute>
          } 
        />
           <Route 
          path="/categories" 
          element={
            <ProtectedRoute>
              <Categories/>
            </ProtectedRoute>
          } 
        />
           <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <Products/>
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;