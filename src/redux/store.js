import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer,composeEnhacers(applyMiddleware(thunk)));

window.store = store;

export default store;