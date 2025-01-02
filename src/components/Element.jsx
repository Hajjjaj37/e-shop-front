import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCookie } from "../utils/Cookies";

function Element({ product, index }) {

    const dispatch = useDispatch();
      const [token, setToken] = useState();
      const [panier, setPanier] = useState({
        product_id: product.id,
        quantity: 1,
      });
    
    const state = useSelector((state) => state);
    const addTocart = async (product) => {
        const response = await fetch("http://127.0.0.1:8000/api/cart/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ product_id: panier.product_id, quantity: panier.quantity }),
        });

        console.log(response)

    };

    const addTowish = async (product) => {
        const itemExists = state.wishe.some((item) => item.id === product.id);

        if (itemExists) {
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
        } else {
            dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
        }

    };

      useEffect(() => {
        const tokenFromAPI = getCookie("token");
        setToken(tokenFromAPI);
      }, [token]);
    return (

        <div className="product-cards-container mx-auto" style={{ width: '30%' }} key={index}>
            <li className="product-card w-100 ">
                <div className="product-image-container">
                    <img src={product.image} className="product-image" alt="" />
                    <button
                        onClick={() => addTowish(product)}
                        className={`heart-button ${state.wishe.some((item) => item.id === product.id) ? 'in-wishlist' : ''}`}>

                        <svg viewBox="0 0 24 24" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                    </button>
                </div>
                <div className="product-text-container">
                    <h1>{product.name}</h1>
                    <p>${product.price}</p>
                    <div className="d-flex align-items-center justify-content-between">
                        <button onClick={() => { addTocart(product) }} className="blue-button">
                            Add To Cart
                        </button>
                        < Link className='btn btn-outline-primary ' to={`/product/${product.id}`}     >Detail</Link>
                    </div>
                </div>
            </li>

        </div>
    )
}

export default Element