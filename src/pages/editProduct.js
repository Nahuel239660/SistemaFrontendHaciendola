import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './productManager.module.css';
import axios from '../services/axiosConfig';

const EditProductModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        sku: '',
        grams: '',
        stock: '',
        price: '',
        comparePrice: '',
        barcode: ''
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/products/${product.id}`, formData);
            onSave();
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ingrese el título" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Ingrese la descripción" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formSKU">
                        <Form.Label>SKU</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ingrese el SKU" 
                            name="sku" 
                            value={formData.sku} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formGrams">
                        <Form.Label>Gramos</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ingrese los gramos" 
                            name="grams" 
                            value={formData.grams} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ingrese el stock" 
                            name="stock" 
                            value={formData.stock} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control 
                            type="number" 
                            step="0.01" 
                            placeholder="Ingrese el precio" 
                            name="price" 
                            value={formData.price} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formComparePrice">
                        <Form.Label>Precio de Comparación</Form.Label>
                        <Form.Control 
                            type="number" 
                            step="0.01" 
                            placeholder="Ingrese el precio de comparación" 
                            name="comparePrice" 
                            value={formData.comparePrice} 
                            onChange={handleChange} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formBarcode">
                        <Form.Label>Código de Barras</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ingrese el código de barras" 
                            name="barcode" 
                            value={formData.barcode} 
                            onChange={handleChange} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProductModal;
