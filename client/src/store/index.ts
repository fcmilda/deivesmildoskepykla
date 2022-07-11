/* eslint-disable @typescript-eslint/default-param-last */
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import mainReducer from './main-reducer';

export { useRootSelector } from './hooks';

const joinedEnhancer = compose(applyMiddleware(thunk), composeWithDevTools());

const store = createStore(mainReducer, joinedEnhancer);

export default store;
