import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';

import { store, persistor } from './store/store';

import {stripePromise} from './utils/stripe/stripe.utils'

import App from './App';
// import { CategoriesProvider } from './context/categories.context'
// import { CartProvider } from './context/cart.context'
import './index.scss';

import { PersistGate } from 'redux-persist/integration/react'

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            {/* <CategoriesProvider> */}
              {/* <CartProvider> */}
              <Elements stripe={stripePromise}>
                <App />  
              </Elements>
              {/* </CartProvider> */}
            {/* </CategoriesProvider> */}
        </BrowserRouter>  
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
