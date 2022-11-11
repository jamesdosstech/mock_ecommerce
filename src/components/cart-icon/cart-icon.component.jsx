import {CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles.js';
// import { useContext } from 'react';
import {useDispatch, useSelector} from 'react-redux'
// import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

// import { CartContext } from '../../context/cart.context';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'


const CartIcon = () => {
    // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    // const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon