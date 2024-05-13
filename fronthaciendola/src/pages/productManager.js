// src/pages/ProductManager.js

import React from 'react';

const ProductManager = () => {
    return (
        <div>
            <h2>Gestor de Productos</h2>
            <div>
                <button>Nuevo Producto</button>
            </div>
            <div>
                <h3>Lista de Productos:</h3>
                <ul>
                    <li>Producto 1</li>
                    <li>Producto 2</li>
                    <li>Producto 3</li>
                </ul>
            </div>
        </div>
    );
}

export default ProductManager;
