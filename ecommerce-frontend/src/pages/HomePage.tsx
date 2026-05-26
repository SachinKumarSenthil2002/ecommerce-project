import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page-container">
      <h1>Welcome to Ecommerce Store</h1>

      <p>
        Buy products easily and manage
        products as admin.
      </p>

      <br />

      <Link to="/products">
        <button>
          View Products
        </button>
      </Link>

      <br />
      <br />

      <Link to="/signup">
        <button>
          Get Started
        </button>
      </Link>
    </div>
  );
}

export default HomePage;