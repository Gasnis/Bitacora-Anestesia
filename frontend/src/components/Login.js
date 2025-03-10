import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/index';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
