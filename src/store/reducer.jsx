const initialState = {
    role: "",
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    wishe: JSON.parse(localStorage.getItem("wishe")) || [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ROLE":
            return {
                ...state,
                role: action.payload,
            };
        case "ADD_TO_CART": {
            const existingItemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );

            let updatedCart;
            if (existingItemIndex !== -1) {
                updatedCart = [...state.cart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1,
                };
            } else {
                updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
            }

            // Update localStorage
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return {
                ...state,
                cart: updatedCart,
            };
        }
        case "ADD_TO_WISHLIST": {
            const itemExists = state.wishe.some((item) => item.id === action.payload.id);

            if (itemExists) {
                return state; // If the item already exists, do nothing
            }

            const updatedWishe = [...state.wishe, action.payload];
            // Update localStorage
            localStorage.setItem("wishe", JSON.stringify(updatedWishe));
            return {
                ...state,
                wishe: updatedWishe,
            };
        }
        case "REMOVE_FROM_WISHLIST": {
            const updatedWishe = state.wishe.filter(
                (item) => item.id !== action.payload.id
            );

            // Update localStorage
            localStorage.setItem("wishe", JSON.stringify(updatedWishe));
            return {
                ...state,
                wishe: updatedWishe,
            };
        }
        case "UPDATE_CART_QUANTITY": {
            const updatedCart = state.cart.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: Math.max(1, item.quantity + action.payload.amount) }
                    : item
            );

            // Update localStorage
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            return {
                ...state,
                cart: updatedCart,
            };
        }

        case "REMOVE_FROM_CART": {
            const updatedCart = state.cart.filter((item) => item.id !== action.payload);

            // Update localStorage
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            return {
                ...state,
                cart: updatedCart,
            };
        }

        default:
            return state;
    }
};

export default reducer;
// Action to update the quantity of an item in the cart
export const updateCartQuantity = (id, amount) => {
    return {
        type: "UPDATE_CART_QUANTITY",
        payload: { id, amount },
    };
};

// Action to remove an item from the cart
export const removeFromCart = (id) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: id,
    };
};
