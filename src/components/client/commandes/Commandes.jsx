import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Commandes.css";

function Commandes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock fetch function (replace this with API call later)
  const fetchOrders = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      const mockOrders = [
        {
          id: 1,
          status: "Completed",
          total: 120.5,
          date: "2024-12-31",
          items: [
            { id: 101, name: "Laptop", quantity: 1, price: 1000 },
            { id: 102, name: "Mouse", quantity: 2, price: 20.25 },
          ],
        },
        {
          id: 2,
          status: "Pending",
          total: 45.99,
          date: "2024-12-30",
          items: [
            { id: 103, name: "Keyboard", quantity: 1, price: 45.99 },
          ],
        },
      ];
      setOrders(mockOrders);
      setLoading(false);
    } catch (err) {
      setError("Failed to load orders.");
      setLoading(false);
    }
  };
//   const fetchOrders = async () => {
//     try {
//       const response = await fetch("https://your-api-endpoint/orders");
//       if (!response.ok) throw new Error("Network response was not ok");
//       const data = await response.json();
//       setOrders(data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load orders.");
//       setLoading(false);
//     }
//   };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Your Orders</h4>
      {orders.length > 0 ? (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order #{order.id}</h5>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span className={`badge ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </p>
                  <p className="card-text">
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                  </p>
                  <ul className="list-group list-group-flush">
                    {order.items.map((item) => (
                      <li key={item.id} className="list-group-item">
                        {item.name} (x{item.quantity}) - ${(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">You have no orders yet.</p>
      )}
    </div>
  );
}

// Helper function to get badge class based on order status
function getStatusBadge(status) {
  switch (status) {
    case "Pending":
      return "bg-warning text-dark";
    case "Processing":
      return "bg-info text-white";
    case "Completed":
      return "bg-success text-white";
    case "Cancelled":
      return "bg-danger text-white";
    default:
      return "bg-secondary text-white";
  }
}

export default Commandes;
