import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const composeEnhancers = (process.env.NODE_ENV !== 'production' && 
  window && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);



