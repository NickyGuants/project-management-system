import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootreducer from './reducers/index'


const middlewares = [thunk];
const initialState={}

const store = createStore(rootreducer, initialState,
    composeWithDevTools(applyMiddleware(...middlewares)));

export default store;