import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Panier.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../../store/reducer";
import { getCookie } from "../../../utils/Cookies";
import { Modal } from "bootstrap"; // Importing the Bootstrap Modal JavaScript

function Panier() {
  const [cartlist, setCartlist] = useState([]);
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const dispatch = useDispatch();

  // Fetch cart data
  const fetchCartData = async () => {
    if (!token) return;

    try {
      const cart = await fetch("http://127.0.0.1:8000/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (cart.ok) {
        const data = await cart.json();
        setCartlist(data?.data?.cart || []);
        setTotal(data.data?.total || 0);
      } else {
        console.error("Error fetching cart items:", cart.statusText);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Remove item from cart
  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handle quantity update
  const updateQuantity = (id, quantity) => {
    dispatch(updateCartQuantity(id, quantity));
  };

  // Initialize payment
  const initializePayment = async () => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to PayPal
        window.location.href = data.data.approval_url;
      } else {
        setPaymentError(data.message || "Failed to initialize payment");
      }
    } catch (error) {
      setPaymentError("An error occurred while processing your payment");
      console.error("Payment error:", error);
    } finally {
      setPaymentLoading(false);
    }
  };

  // On component mount, fetch token and cart data
  useEffect(() => {
    const tokenFromAPI = getCookie("token");
    setToken(tokenFromAPI);
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [token]);

  return (
    <div className="cart-wrapper">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Shopping Cart</h4>
            </div>

            <div className="d-flex flex-column gap-3">
              {cartlist?.items?.map((item) => {
                const product = item.product;

                return (
                  <div key={item.id} className="product-card p-3 shadow-sm">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img
                          src={`http://localhost:8000/produit/${item.image}`}
                          alt={product.name}
                          className="product-image"
                        />
                      </div>
                      <div className="col-md-4">
                        <h6 className="mb-1">{product.name || "Unnamed Product"}</h6>
                        <p className="text-muted mb-0 crop-text-2">Category: {product.category?.name}</p>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="number"
                            className="quantity-input"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <span className="fw-bold">
                          ${((product.price || 0) * (item.quantity || 0)).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-md-1 d-flex justify-content-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="summary-card p-4 shadow-sm">
              <h5 className="mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span>${total}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold">${total}</span>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Promo code" />
                  <button className="btn btn-outline-secondary" type="button">
                    Apply
                  </button>
                </div>
              </div>

              <button
                onClick={initializePayment}
                className="btn btn-primary checkout-btn w-100 mb-3"
                disabled={paymentLoading}
              >
                {paymentLoading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </span>
                ) : (
                  "Pay with PayPal"
                )}
              </button>

              {paymentError && (
                <div className="alert alert-danger" role="alert">
                  {paymentError}
                </div>
              )}

              <div className="d-flex justify-content-center gap-2">
                <i className="bi bi-shield-check text-success"></i>
                <small className="text-muted">Secure checkout</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panier;
