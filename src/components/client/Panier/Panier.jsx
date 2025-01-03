import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Panier.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../../store/reducer";
import { getCookie } from "../../../utils/Cookies";

function Panier() {
  const [cartlist, setCartlist] = useState([]);
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState(null);
  const userid = useSelector((state)=> state.id)
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

  // On component mount, fetch token and cart data
  useEffect(() => {
    const tokenFromAPI = getCookie("token");
    setToken(tokenFromAPI);
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [token]);

  const proceedToPayment = async () => {
    if (!token) {
      console.error("User is not authenticated");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/payment/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userid, // Replace with the actual user ID
          success_url: "http://localhost:3000/payment-success", // Replace with your success URL
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Error in payment process:", data.error);
      }
    } catch (error) {
      console.error("Payment process error:", error);
    }
  };
  
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

              <div className="d-flex justify-content-center gap-2">
                <i className="bi bi-shield-check text-success"></i>
                <small className="text-muted">Secure checkout</small>
              </div>
              <div>
                <button onClick={proceedToPayment}> acheter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panier;

