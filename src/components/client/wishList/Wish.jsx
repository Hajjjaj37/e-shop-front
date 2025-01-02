import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Element from '../../Element';

function Wishlist() {
    const wishlist = useSelector(state => state.wishe);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
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
        <div className='my-5'>
            <div id="product-page-body">
                

                <div className="product-section" id="product-section-all">

                    <ul className="product-cards-container-ul align-items-center justify-content-between flex-wrap">
                        {wishlist.map((product, index) => (
                            <Element product={product} key={index} />
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Wishlist