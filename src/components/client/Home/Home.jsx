import React, { useEffect, useRef, useState } from 'react';
import "./stylepage.css";
import { useDispatch, useSelector } from 'react-redux';
import Element from '../../Element';

function Home() {
    const containerRef = useRef(null);
    const [productContainerWidth, setProductContainerWidth] = useState(0);
    const [productCardWidth, setProductCardWidth] = useState(0);
    const [productCardsPerRow, setProductCardsPerRow] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const [productByTypes, setProductByTypes] = useState([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState({});  // Tracks current index per category

    const state = useSelector((state) => state);

    const Afficher = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/products`);
        const data = await response.json();

        const products = data?.data?.data || [];

        setProducts(products);
        const productByTypes = products.reduce((acc, prod) => {
            const categoryId = prod.category.id;

            if (!acc[categoryId]) {
                acc[categoryId] = {
                    categoryId: categoryId,
                    categoryName: prod.category.name,
                    products: []
                };
            }

            acc[categoryId].products.push(prod);

            return acc;
        }, {});

        const groupedProducts = Object.values(productByTypes);

        setProductByTypes(groupedProducts);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        Afficher();
    }, [currentIndex]);

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
    const currentProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

    const SwitchProduct = (categoryId, type) => {
        setCurrentCategoryIndex(prev => {
            const newIndex = prev[categoryId] || 0;
            const productsInCategory = productByTypes.find(item => item.categoryId === categoryId).products;

            let updatedIndex;
            if (type === "next") {
                updatedIndex = (newIndex + 1) % productsInCategory.length;
            } else {
                updatedIndex = (newIndex - 1 + productsInCategory.length) % productsInCategory.length;
            }

            return { ...prev, [categoryId]: updatedIndex };
        });
    };

    useEffect(() => {
        const updateProductCardsPerRow = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                setProductContainerWidth(containerWidth);

                const screenWidth = window.innerWidth;

                let cardsPerRow;
                let cardWidth;

                if (screenWidth > 768) {
                    cardWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--product-card-width')) || 300;
                    cardsPerRow = Math.floor(containerWidth / (cardWidth + 5));
                } else {
                    cardsPerRow = screenWidth > 430 ? 3 : 2;
                    cardWidth = Math.floor((containerWidth / cardsPerRow) - 10);
                }

                setProductCardWidth(cardWidth);
                setProductCardsPerRow(cardsPerRow);
            }
        };

        updateProductCardsPerRow();
        window.addEventListener('resize', updateProductCardsPerRow);
        return () => window.removeEventListener('resize', updateProductCardsPerRow);
    }, []);

    const getCategories = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/category`);
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const addTocart = async (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const addTowish = async (product) => {
        const itemExists = state.wishe.some((item) => item.id === product.id);

        if (itemExists) {
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
        } else {
            dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
        }
    };

    return (
        <div>
            <div id="product-page-body">
                {/* Other sections unchanged */}
                <div id="product-category-container">
                    <div id="product-category-text">
                        <span className="blue-line"></span>
                        <span className="section-category-text">Categories</span>
                    </div>
                    <div id="product-category-wrapper">
                        {categories.map((category) => (
                            <a href={`#${category.name}`} className="product-category" key={category.id}>
                                <div className="product-category-desc-section">
                                    <span className="product-category-type">{category.name}</span>
                                    <span className="product-category-number">{category.description}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="product-section" id="product-section-all">
                    <div className="product-section-top-container">
                        <div className="section-category-container">
                            <div className="section-category-type">
                                <span className="blue-line"></span>
                                <span className="section-category-text">All Products</span>
                            </div>
                            <h1>Explore Best Quality</h1>
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
                    <ul className="product-cards-container-ul">
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
                {productByTypes.map((category) => {
                    const { categoryId, categoryName, products } = category;
                    const currentIndex = currentCategoryIndex[categoryId] || 0;

                    return (
                        <div className="product-section" id={categoryName} key={categoryId}>
                            <div className="product-section-top-container">
                                <div className="section-category-container">
                                    <div className="section-category-type">
                                        <span className="blue-line"></span>
                                        <span className="section-category-text">{categoryName}</span>
                                    </div>
                                </div>
                                <div className="slideshow-buttons-container top" data-slideshow={categoryName}>
                                    <button className="slideshow-button prev-button" onClick={() => SwitchProduct(categoryId, "prev")}>
                                        <svg viewBox="0 0 24 24" fill="none" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 6L9 12L15 18" stroke="rgb(64, 64, 64)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                                    </button>
                                    <button className="slideshow-button next-button" onClick={() => SwitchProduct(categoryId, "next")}>
                                        <svg viewBox="0 0 24 24" fill="none" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 6L15 12L9 18" stroke="rgb(64, 64, 64)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                                    </button>
                                </div>
                            </div>
                            <ul className="product-cards-container-ul gap-2">
                                {products.slice(currentIndex, currentIndex + 3).map((product, index) => (
                                    <Element product={product} key={index} />
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;














