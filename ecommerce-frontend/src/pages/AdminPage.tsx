import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [products, setProducts] = useState<
    any[]
  >([]);

  const [name, setName] = useState('');
  const [description, setDescription] =
    useState('');

  const [price, setPrice] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/products',
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (
    e: any,
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem('token');

      await axios.post(
        'http://localhost:3000/products',
        {
          name,
          description,
          price: Number(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert('Product created');

      fetchProducts();

      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.log(error);

      alert('Failed to create product');
    }
  };

  const handleDeleteProduct = async (
    id: number,
  ) => {
    try {
      const token =
        localStorage.getItem('token');

      await axios.delete(
        `http://localhost:3000/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert('Product deleted');

      fetchProducts();
    } catch (error) {
      console.log(error);

      alert('Delete failed');
    }
  };

  return (
    <div className="page-container">
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Create Product
        </button>
      </form>

      <hr />

      <h2>All Products</h2>

      {products.map((product) => (
        <div
        key={product.id}
        className="product-card"
        >
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>₹ {product.price}</p>

          <button
            onClick={() =>
              handleDeleteProduct(product.id)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminPage;