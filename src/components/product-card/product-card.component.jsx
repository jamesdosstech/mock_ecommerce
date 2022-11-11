// import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './product-card.styles.scss';

import {addItemToCart} from '../../store/cart/cart.action'

// import { CartContext } from '../../context/cart.context';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
    // const { addItemsToCart } = useContext(CartContext);
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    
    // const addProductToCart = () => addItemsToCart(product);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    const { name, price, imageUrl } = product;
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={addProductToCart} type='button' buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to cart</Button>
        </div>
    )
}

export default ProductCard
