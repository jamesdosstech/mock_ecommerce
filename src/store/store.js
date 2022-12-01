import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

import createSagaMiddleware  from 'redux-saga';

import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
    process.env.NODE_ENV === 'development' && logger, sagaMiddleware
  ].filter(
  Boolean
);

const composeEnhancers = (process.env.NODE_ENV !== 'production' && 
  window && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer, 
    undefined, 
    composedEnhancers
  );

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);



