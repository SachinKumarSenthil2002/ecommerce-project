import {
  Link,
  useNavigate,
} from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const token =
    localStorage.getItem('token');

  const role =
    localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');

    localStorage.removeItem('role');

    alert('Logged out');

    navigate('/login');
  };

  return (
    <nav>
      <div className="nav-links">
        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Signup
            </Link>

            <Link to="/products">
              Products
            </Link>
          </>
        )}

        {token && role === 'customer' && (
          <>
            <Link to="/products">
              Products
            </Link>

            <Link to="/orders">
              Orders
            </Link>
          </>
        )}

        {token && role === 'admin' && (
          <>
            <Link to="/admin">
              Admin
            </Link>

            <Link to="/orders">
              Orders
            </Link>
          </>
        )}
      </div>

      {token && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;