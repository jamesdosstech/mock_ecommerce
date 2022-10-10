import './checkout-item.styles.scss';

import { useContext } from 'react';

import { CartContext } from '../../context/cart.context'

const CheckoutItem = ({cartItem}) => {

    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemsToCart, removeItemsFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemsToCart(cartItem);
    const removeItemHandler = () => removeItemsFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}
            </span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                    <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <span onClick={clearItemHandler} className='remove-button'>&#10005;</span>
        </div>
    )
}

export default CheckoutItem