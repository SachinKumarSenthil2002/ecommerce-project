import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductsPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
      );

      console.log(response.data);

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleBuyProduct = async (
    product: any,
  ) => {
    try {
      const token =
        localStorage.getItem('token');

      const customerEmail =
        localStorage.getItem('email');

      if (!token) {
        alert(
          'Please login to place order',
        );

        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          customerEmail,
          productName: product.name,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert('Order placed');
    } catch (error) {
      console.log(error);

      alert('Failed to place order');
    }
  };

  return (
    <div className="page-container">
      <h1>Products Page</h1>

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
              handleBuyProduct(product)
            }
          >
            Buy Product
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;