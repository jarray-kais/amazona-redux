import { CART_ADD_ITEM } from "../constants/cartConstatnts"


export const cartReducer = (state={cartItems : []}, action) =>{
    switch (action.type) {
        case CART_ADD_ITEM :
            const item = action.payload;
            const existitem = state.cartItems.find((x)=>x.product === item.product)  
            console.log(existitem)
            if(existitem){
                return{
                    ...state ,
                     cartItems : state.cartItems.map((x)=>x.product === existitem.product ? item : x)
                }
            }
            else {
                return {...state , cartItems : [...state.cartItems , item]}
               
            }


        default :
            return state
    }
}