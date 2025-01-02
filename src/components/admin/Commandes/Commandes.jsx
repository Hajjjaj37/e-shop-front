import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminCommandes.css";
import { getCookie } from '../../../utils/Cookies';

function AdminCommandes() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState();


    const fetchOrders = async () => {
        try {
           
            const response = await fetch("http://127.0.0.1:8000/api/orders", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
            });
            if(response.ok) {
                const data = await response.json();
                setOrders(data?.data?.data);
                setLoading(false);
                
            }
           
        } catch (err) {
            setError("Failed to load orders.");
            setLoading(false);
        }
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    //   const updateOrderStatus = async (orderId, newStatus) => {
    //     try {
    //       await fetch(`https://your-api-endpoint/orders/${orderId}`, {
    //         method: "PATCH",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ status: newStatus }),
    //       });
    //       setOrders((prevOrders) =>
    //         prevOrders.map((order) =>
    //           order.id === orderId ? { ...order, status: newStatus } : order
    //         )
    //       );
    //     } catch (err) {
    //       console.error("Failed to update order status:", err);
    //     }
    //   };

    const deleteOrder = async (orderId) => {
        try {
          await fetch(`http://127.0.0.1:8000/api/orders/${orderId}`, {
            method: "DELETE",
          });
          setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (err) {
          console.error("Failed to delete order:", err);
        }
      };


    useEffect(() => {
        fetchOrders();
    }, [token]);
    
      useEffect(() => {
        const token = getCookie("token");
        setToken(token);
      }, [token])

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseDetails = () => {
        setSelectedOrder(null);
    };

    if (loading) {
        return <div className="text-center">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <div className="content">
            <main>
                <div className="container mt-5">
                    <h4 className="mb-4">Admin Panel: Manage Orders</h4>
                    <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index)=>(
                                    <tr key={index}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => handleViewDetails(order)}
                                        >
                                            Details
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteOrder(order.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>

                    {selectedOrder && (
                        <div className="modal show d-block">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Order Details</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={handleCloseDetails}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                                        <p><strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                                        <p><strong>Total:</strong> ${parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
                                        <hr />
                                        <h6>Items:</h6>
                                        <ul>
                                            {selectedOrder.items.map((item) => (
                                                <li key={item.id}>
                                                    {item.name} - {item.quantity} x ${parseFloat(item.price).toFixed(2)} = ${(
                                                        parseFloat(item.quantity) * parseFloat(item.price)
                                                    ).toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleCloseDetails}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default AdminCommandes;
