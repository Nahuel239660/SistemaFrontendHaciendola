import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.module.css';
import { Container, Form, FormGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/forgot-password', { email });
            setMessage('Si el correo electrónico está registrado, se ha enviado un enlace para restablecer la contraseña.');
        } catch (error) {
            console.error('Error al enviar el enlace de restablecimiento:', error.response?.data || error.message);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit} className="mt-5">
                <h2 className="mb-4">Olvidé Mi Contraseña</h2>
                {message && <Alert variant="success">{message}</Alert>}
                <FormGroup className="mb-3">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </FormGroup>
                <Button variant="primary" type="submit">Enviar Enlace</Button>
            </Form>
            <div className="mt-3">
                <Button variant="link" onClick={() => navigate('/login')}>Regresar al inicio de sesión</Button>
            </div>
        </Container>
    );
};

export default ForgotPassword;
