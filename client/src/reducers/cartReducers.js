import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstatnts";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existitem = state.cartItems.find((x) => x.product === item.product);
      console.log(existitem);
      if (existitem) {
        return {
          ...state
          ,
          error : '',

          cartItems: state.cartItems.map((x) =>
            x.product === existitem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] ,error : '' };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        error : '',
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_EMPTY:
      return { ...state,error : '', cartItems: [] };

    case CART_ADD_ITEM_FAIL :
      return {...state , error:action.payload}

    default:
      return state;
  }
};
