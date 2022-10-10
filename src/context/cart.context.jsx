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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemsToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems ] = useState([]);
    const [cartCount, setCartCount ] = useState(0);

    useEffect(()=> {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems])

    const addItemsToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd));
    }
    const value = {isCartOpen, setIsCartOpen, addItemsToCart, cartItems, cartCount};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}