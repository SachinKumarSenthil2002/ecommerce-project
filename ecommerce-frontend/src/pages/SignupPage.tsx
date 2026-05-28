import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const [role, setRole] =
    useState('customer');

  const [adminCode, setAdminCode] =
    useState('');

  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth`,
        {
          name,
          email,
          password,
          role,
          adminCode,
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

      alert('Signup successful');

      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    } catch (error) {
      console.log(error);

      alert('Signup failed');
    }
  };

  return (
    <div className="page-container">
      <h1>Signup Page</h1>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />
        <br />

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

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="customer">
            Customer
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <br />
        <br />

        {role === 'admin' && (
          <>
            <input
              type="text"
              placeholder="Enter admin code"
              value={adminCode}
              onChange={(e) =>
                setAdminCode(
                  e.target.value,
                )
              }
            />

            <br />
            <br />
          </>
        )}

        <button type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;