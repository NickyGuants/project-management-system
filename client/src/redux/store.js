import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { userRegisterReducer, userLoginReducers} from './reducers/userRegisterReducers'

const rootreducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducers
})

const middleware = [thunk];
const initialState = {};
const store = createStore(rootreducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;