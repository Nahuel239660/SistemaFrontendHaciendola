import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.module.css';
import { Container, Form, FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/login', {
                username,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username); // Guardar el nombre de usuario

                navigate('/products');
            } else {
                console.error('Error en el login');
            }
        } catch (error) {
            console.error('Error en el login:', error);
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit} className="mt-5">
                <h2 className="mb-4">Iniciar Sesión</h2>
                <FormGroup className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de Usuario"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </FormGroup>
                <Button type="submit" variant="primary">Iniciar Sesión</Button>
            </Form>
            <div className="mt-3">
                <button className="me-3" onClick={() => navigate('/forgot-password')}>¿Olvidaste tu contraseña?</button>
                <button onClick={() => navigate('/register')}>Crear cuenta nueva</button>
            </div>
        </Container>
    );
}

export default Login;
