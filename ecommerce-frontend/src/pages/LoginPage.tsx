import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        {
          email,
          password,
        },
      );

      console.log(response.data);

      localStorage.setItem(
        'token',
        response.data.access_token,
      );

      localStorage.setItem(
        'role',
        response.data.role,
      );

      localStorage.setItem(
        'email',
        response.data.user.email,
      );

      alert('Login successful');

      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    } catch (error) {
      console.log(error);

      alert('Login failed');
    }
  };

  return (
    <div className="page-container">
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;