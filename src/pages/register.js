import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Container, Form, FormGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = [];
        if (!username) newErrors.push("El nombre de usuario es obligatorio.");
        if (!email) newErrors.push("El correo electrónico es obligatorio.");
        if (!password) newErrors.push("La contraseña es obligatoria.");
        if (password.length < 6) newErrors.push("La contraseña debe tener al menos 6 caracteres.");
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (formErrors.length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/users/register', {
                username,
                email,
                password
            });
            console.log('Usuario registrado:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response?.data || error.message);
            setErrors([error.response?.data.message || "Error al registrar el usuario"]);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit} className="mt-5">
                <h2 className="mb-4">Crear Cuenta</h2>
                {errors.length > 0 && <Alert variant="danger">{errors.map((error, idx) => <p key={idx}>{error}</p>)}</Alert>}
                <FormGroup className="mb-3">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <Button variant="primary" type="submit">Registrarse</Button>
            </Form>
            <div className="mt-3">
                <Button variant="link" onClick={() => navigate('/login')}>Ya tengo una cuenta</Button>
            </div>
        </Container>
    );
};

export default Register;
