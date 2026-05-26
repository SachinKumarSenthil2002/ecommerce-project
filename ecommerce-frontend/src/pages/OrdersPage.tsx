import { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState<
    any[]
  >([]);

  const role =
    localStorage.getItem('role');

  const fetchOrders = async () => {
    try {
      const token =
        localStorage.getItem('token');

      const response = await axios.get(
        'http://localhost:3000/orders',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="page-container">
      <h1>Orders Page</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="product-card"
        >
          <h3>
            {order.productName}
          </h3>

          <p>
            Price: ₹ {order.price}
          </p>

          {role === 'admin' && (
            <p>
              Customer:{' '}
              {order.customerEmail}
            </p>
          )}

        
          <hr />
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;