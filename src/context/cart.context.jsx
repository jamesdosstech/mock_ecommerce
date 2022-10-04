import { createContext, useState } from 'react';

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
    addItemsToCart: () => {}
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems ] = useState([]);
    const addItemsToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd));
    }
    const value = {isCartOpen, setIsCartOpen, addItemsToCart, cartItems};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}