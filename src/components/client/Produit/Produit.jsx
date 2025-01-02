import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Loading'
import { useDispatch, useSelector } from 'react-redux';
function Produit() {
    const { id } = useParams();

    const [produit, setProduit] = useState(null);
    const [products, setProducts] = useState([]);
     const [currentIndex, setCurrentIndex] = useState(0);
        const itemsPerPage = 3;
    const state = useSelector((state) => state);
    const AfficherAll = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/products`);
        const data = await response.json();

        const products = data?.data?.data || [];

        setProducts(products);
    }
    const Afficher = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
            const data = await response.json();
            console.log(data);
            setProduit(data?.data || null);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        Afficher();
        AfficherAll();
    }, []);
    const dispatch = useDispatch()
    const addTocart = async (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const SwitchProductAll = (type) => {
        if (type === "next") {
            setCurrentIndex((prevIndex) =>
                prevIndex + itemsPerPage < products.length ? prevIndex + itemsPerPage : 0
            );
        } else {
            setCurrentIndex((prevIndex) =>
                prevIndex - itemsPerPage >= 0 ? prevIndex - itemsPerPage : products.length - itemsPerPage
            );
        }
    };
    const addTowish = async (product) => {
        const itemExists = state.wishe.some((item) => item.id === product.id);

        if (itemExists) {
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
        } else {
            dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
        }
    };
    
    const currentProducts = products.slice(currentIndex, currentIndex + itemsPerPage);


    if (!produit) {
        return <Loading />;
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <img
                            src={produit.image}
                            className="card-img-top"
                            alt={produit.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{produit.name}</h5>
                            <p className="card-text">{produit.description}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <h1 className="h2 mb-3">{produit.name}</h1>
                    <div className="mb-3">
                        <span className="h4 me-2">${parseFloat(produit.price).toFixed(2)}</span>
                        {produit.average_rating && (
                            <div className="mb-3">
                                <span className="text-warning me-2">
                                    {'★'.repeat(Math.floor(produit.average_rating))}
                                    {'☆'.repeat(5 - Math.floor(produit.average_rating))}
                                </span>
                                <span className="text-muted">
                                    ({produit.average_rating} rating)
                                </span>
                            </div>
                        )}
                    </div>

                    <p className="mb-4">{produit.description}</p>

                    <div className="mb-4">
                        <h6 className="mb-2">Stock Available: {produit.stock}</h6>
                    </div>

                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" onClick={() => { addTocart(produit) }} type="button">
                            Add to Cart
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => { addTowish(produit) }} type="button">
                            <button
                                onClick={() => addTowish(produit)}
                                className={`btn btn-none ${state.wishe.some((item) => item.id === produit.id) ? 'in-wishlist' : ''}`}>

                                <svg viewBox="0 0 24 24" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                            </button>
                            {state.wishe.some((item) => item.id === produit.id) ? (
                                <span className="text-success">Added to wishlist</span>
                            ) : (
                                <span className="text-danger">Add to wishlist</span>
                            )}

                        </button>
                    </div>

                    <div className="mt-4">
                        <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-truck text-primary me-2"></i>
                            <span>Free shipping on orders over $50</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-undo text-primary me-2"></i>
                            <span>30-day return policy</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <i className="fas fa-shield-alt text-primary me-2"></i>
                            <span>2-year warranty</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="product-section" id="product-section-all">
                    <div className="product-section-top-container">
                        <div className="section-category-container">
                            <div className="section-category-type">
                                <span className="blue-line"></span>
                                <span className="section-category-text">Other Products</span>
                            </div>
                        </div>

                        <div className="slideshow-buttons-container top" data-slideshow="all">
                            <button className="slideshow-button prev-button" onClick={() => SwitchProductAll("prev")}>
                            <svg viewBox="0 0 24 24" fill="none" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 6L9 12L15 18" stroke="rgb(64, 64, 64)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                            </button>
                            <button className="slideshow-button next-button" onClick={() => SwitchProductAll("next")}>
                            <svg viewBox="0 0 24 24" fill="none" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 6L15 12L9 18" stroke="rgb(64, 64, 64)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                            </button>
                        </div>
                    </div>
                    <ul className="product-cards-container-ul my-5">
                        {currentProducts.map((product, index) => (
                            <div className="product-cards-container mx-auto" style={{ width: '30%' }} key={index}>
                                <li className="product-card w-100">
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
                                        <button onClick={() => { addTocart(product) }} className="blue-button">
                                            Add To Cart
                                        </button>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        

    );
}

export default Produit;
