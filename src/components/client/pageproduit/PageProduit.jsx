import React, { useEffect, useState } from 'react';
import Element from '../../Element';

function Produit1() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterByCategory, setFilterByCategory] = useState("");

    // Fetch categories
    const getCategories = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/category`);
            const data = await response.json();
            setCategories(data.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch products for the current page
    const fetchProducts = async (page = 1, category = "") => {
        try {
            let url = `http://127.0.0.1:8000/api/products?page=${page}`;
            if (category) {
                url = `http://127.0.0.1:8000/api/products?category=${category}&page=${page}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data.data.data || []);
            setFilteredProducts(data.data.data || []);
            setCurrentPage(data.data.current_page);
            setTotalPages(data.data.last_page);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        fetchProducts(currentPage, filterByCategory);
    }, [filterByCategory, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            fetchProducts(page, filterByCategory);
        }
    };

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="d-flex align-items-center mb-4">
                <h4 className="mb-0 me-auto">Product Collection</h4>
            </div>

            <div className="row g-4">
                {/* Sidebar Filters */}
                <div className="col-lg-3">
                    <div className="filter-sidebar p-4 shadow-xl">
                        <div className="filter-group">
                            <h6 className="mb-3">Categories</h6>
                            {categories.map((category) => (
                                <div className="form-check mb-2" key={category.id}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="category"
                                        value={category.name}
                                        checked={filterByCategory === category.name}
                                        onChange={e => setFilterByCategory(e.target.value)}
                                        id={category.id}
                                    />
                                    <label className="form-check-label" htmlFor={category.id}>
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Cards */}
                <div className="col-lg-9">
                    <div className="row g-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <Element key={index} product={product} />
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Produit1;
