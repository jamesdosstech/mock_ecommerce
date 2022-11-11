import { createContext, useReducer } from 'react';
import {createAction} from '../utils/reducer/reducer.utils'

export const addCartItems = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItems = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    //if found increment quantity
    if (existingCartItems) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }
    //return new array with modified carItems/ new cart item
    return [ ...cartItems, {...productToAdd, quantity: 1}]
}

export const removeCartItems = (cartItems, cartItemToRemove) => {
    //find the car item to remove
    const existingCartItems = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItems.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    // return back cartitems with matching cart item with reduced quantity.
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
}

export const clearCartItems = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemsToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0,
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS: 
            return {
                ...state,
                ...payload            
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) => {
    const [{
        cartItems,
        isCartOpen,
        cartCount,
        cartTotal
    }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        // generate newCartCount
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 
            0
        );
        
        // generate newCartTotal
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 
            0
        );
 
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount
        }))
    }

    const addItemsToCart = (productToAdd) => {
        const newCartItems = addCartItems(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemsFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItems(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItems(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    } 

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemsToCart, 
        cartItems, 
        cartCount,
        cartTotal, 
        removeItemsFromCart,
        clearItemFromCart
    };
    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}