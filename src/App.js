import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import ProductManager from './pages/productManager';
import ProtectedRoute from './components/protectedRoute';
import CreateProduct from './pages/createProduct';
import EditProduct from './pages/editProduct';
import Register from './pages/register';
import ForgotPassword from './pages/forgotPassword';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/products" element={<ProtectedRoute><ProductManager /></ProtectedRoute>} />
                <Route path="/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
                <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
