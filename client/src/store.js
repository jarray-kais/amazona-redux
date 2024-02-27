import { applyMiddleware, legacy_createStore as createStore , compose, combineReducers} from 'redux';
import {thunk} from 'redux-thunk'
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userRegisterReducer, userSigninRducerr } from './reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReucers';


const initialState = {
    userSignin : {
        userInfo : localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null 
    },

    cart : {
        cartItems : localStorage.getItem('carItems') ?
        JSON.parse(localStorage.getItem('carItems')):[],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'PayPal',
    }
};
const reducer = combineReducers({
    productList : productListReducer ,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userSignin : userSigninRducerr ,
    userRegister : userRegisterReducer ,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,


})

const composeEnhancher= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer , initialState , composeEnhancher(applyMiddleware(thunk)));


export default store;