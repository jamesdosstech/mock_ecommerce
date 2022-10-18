import {CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.js';
import { useNavigate } from 'react-router-dom'

import { useContext } from 'react';

import { CartContext } from '../../context/cart.context'

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {

    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)    
                    ) :
                    (
                        <EmptyMessage>Your Cart is Empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button type='button' buttonType={BUTTON_TYPE_CLASSES.base} onClick={goToCheckoutHandler}>Go to Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;