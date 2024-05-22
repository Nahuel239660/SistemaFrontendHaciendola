import React, { useState } from 'react';
import './productManager';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from '../services/axiosConfig';

const CreateProductModal = ({ onClose, onProductAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');
    const [grams, setGrams] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [comparePrice, setComparePrice] = useState('');
    const [barcode, setBarcode] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const newProduct = {
                title,
                description,
                sku,
                grams,
                stock,
                price,
                comparePrice,
                barcode
            };
            await axios.post('/products', newProduct);
            onProductAdded(); // Llamar la función de callback para actualizar la lista de productos
            onClose();
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    const validateForm = () => {
        const errors = [];
        if (!title) errors.push("El título no puede estar vacío");
        if (!sku) errors.push("El SKU no puede estar vacío");
        if (!grams || grams < 1) errors.push("Los gramos deben ser al menos 1");
        if (!stock || stock < 0) errors.push("El stock no puede ser negativo");
        if (!price || price < 0.01) errors.push("El precio debe ser al menos 0.01");
        if (comparePrice && comparePrice < 0.01) errors.push("El precio de comparación debe ser un número decimal válido");
        if (barcode && !barcode.trim()) errors.push("El código de barras no puede estar vacío");
        return errors;
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errors.length > 0 && (
                    <Alert variant="danger">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ingrese el título" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Ingrese la descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSKU">
                        <Form.Label>SKU</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ingrese el SKU" 
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGrams">
                        <Form.Label>Gramos</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ingrese los gramos" 
                            value={grams}
                            onChange={(e) => setGrams(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ingrese el stock" 
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control 
                            type="number" 
                            step="0.01" 
                            placeholder="Ingrese el precio"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formComparePrice">
                        <Form.Label>Precio de Comparación</Form.Label>
                        <Form.Control 
                            type="number" 
                            step="0.01" 
                            placeholder="Ingrese el precio de comparación"
                            value={comparePrice}
                            onChange={(e) => setComparePrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBarcode">
                        <Form.Label>Código de Barras</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ingrese el código de barras" 
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CreateProductModal;
