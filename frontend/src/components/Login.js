import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/index';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await getUsers();
      const users = response.data;

      // Verificar si las credenciales coinciden con algún usuario
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        onLogin(true, user.name);
        navigate('/'); // Redirige al usuario a Home después del login
      } else {
        setError('Usuario o Contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error during login. Please try again.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <h1 className="text-center">Login</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
