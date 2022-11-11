import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Fragment } from 'react';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

// import { UserContext } from '../../context/user.context';
// import { CartContext } from '../../context/cart.context';
import { selectIsCartOpen} from '../../store/cart/cart.selector'

import { selectCurrentUser } from '../../store/user/user.selector'

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles.jsx'

const Navigation = () => {
    // const { currentUser } = useContext(UserContext);
    const currentUser = useSelector(selectCurrentUser);
    // const { isCartOpen } = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen)

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo className='logo' />
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
              SHOP
            </NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutUser}>
                {' '}
                SIGN OUT{' '}
                </NavLink>
              ) : (
                <NavLink to='/auth'>
                  SIGN IN
                </NavLink>
              )
            }
            <CartIcon />
          </NavLinks>
          { 
            isCartOpen && <CartDropdown /> 
          }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation