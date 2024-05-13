// En el archivo src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import ProductManager from './pages/productManager';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {}
          <Route path="/" element={<Login />} />
          {}
          <Route path="/product-manager" element={<ProductManager />} />
          {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
