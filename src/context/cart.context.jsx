import { createContext, useState, useEffect } from 'react';

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems ] = useState([]);
    const [cartCount, setCartCount ] = useState(0);
    const [cartTotal, setCartTotal ] = useState(0);

    useEffect(()=> {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems]);

    useEffect(()=> {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    },[cartItems]);

    const addItemsToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd));
    }

    const removeItemsFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItems(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItems(cartItems, cartItemToClear));
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