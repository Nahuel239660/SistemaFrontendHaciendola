import React, { useState, useEffect } from 'react';

import { Button, Container, Nav, Navbar, Table, Modal } from 'react-bootstrap';
import './productManager.css';
import CreateProductModal from './createProduct';
import EditProductModal from './editProduct';
import axios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';

const ProductManager = () => {
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [products, setProducts] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleShowCreateProduct = () => {
        setShowCreateProduct(true);
        setShowTable(false);
    };

    const handleShowTable = () => {
        setShowTable(true);
        setShowCreateProduct(false);
    };

    const handleCloseCreateProduct = () => {
        setShowCreateProduct(false);
        setShowTable(true);
        fetchProducts();
    };

    const handleShowConfirmModal = (product) => {
        setProductToDelete(product);
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setProductToDelete(null);
        setShowConfirmModal(false);
    };

    const handleDeleteProduct = async () => {
        if (!productToDelete) return;

        try {
            await axios.delete(`/products/${productToDelete.id}`);
            fetchProducts();
            handleCloseConfirmModal();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    const handleShowEditProduct = (product) => {
        setProductToEdit(product);
        setShowEditProduct(true);
        setShowTable(false);
    };

    const handleCloseEditProduct = () => {
        setProductToEdit(null);
        setShowEditProduct(false);
        setShowTable(true);
        fetchProducts();
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Limpiar el token JWT del almacenamiento local
        navigate('/login'); // Redirigir a la página de inicio de sesión
    };

    return (
        <Container fluid>
            <Navbar bg="light" expand="lg" className="flex-column fixed-top p-0">
                <Navbar.Brand>Bienvenido:</Navbar.Brand>
                <Nav className="flex-column">
                    <Button variant="secondary" className="mt-3" onClick={handleLogout}>Cerrar Sesión</Button>
                    <Button variant="primary" className="mt-3" onClick={handleShowCreateProduct}>Agregar Producto</Button>
                    <Button variant="secondary" className="mt-3" onClick={handleShowTable}>Ver Productos</Button>
                </Nav>
            </Navbar>

            <div className="content ml-5 mt-5">
                {showTable && (
                    <>
                        <h2>Lista de Productos</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>{product.title}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Button variant="danger" size="sm" onClick={() => handleShowConfirmModal(product)}>Eliminar</Button>
                                            <Button variant="primary" size="sm" className="ml-2" onClick={() => handleShowEditProduct(product)}>Editar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}

                {showCreateProduct && <CreateProductModal onClose={handleCloseCreateProduct} />}
                {showEditProduct && <EditProductModal product={productToEdit} onClose={handleCloseEditProduct} onSave={handleCloseEditProduct} />}

                <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Estás seguro de que quieres eliminar el producto "{productToDelete?.title}"?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseConfirmModal}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleDeleteProduct}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    );
}

export default ProductManager;
