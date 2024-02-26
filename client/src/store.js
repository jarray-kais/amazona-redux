import { applyMiddleware, legacy_createStore as createStore , compose, combineReducers} from 'redux';
import {thunk} from 'redux-thunk'
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';


const initialState = {
    cart : {
        cartItems : localStorage.getItem('carItems') ?
        JSON.parse(localStorage.getItem('carItems')):[]
    }
};
const reducer = combineReducers({
    productList : productListReducer ,
    productDetails : productDetailsReducer,
    cart : cartReducer,


})

const composeEnhancher= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer , initialState , composeEnhancher(applyMiddleware(thunk)));


export default store;