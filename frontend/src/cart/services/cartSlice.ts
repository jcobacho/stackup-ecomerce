import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import CartItem, { CartModel } from './types'


const initialCartState = {
  orderitems: [],
  totalQuantity: 0,
  totalAmount: 0
  
}

// const persistedCart = loadCart()

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: initialCartState,
//   reducers: {
//     addItemToCart: (state, action: PayloadAction<CartItem>) => {
//       const addedItem = action.payload
//       const existingItem = state.items.find(item => item.id === addedItem.id)
//       state.totalQuantity += addedItem.quantity
//       if (!existingItem) {
//         state.items.push(addedItem)
//       } else {
//         existingItem.quantity += addedItem.quantity
//       }
//     },
//     increaseQuantity: (state, action: PayloadAction<number>) => {
//       state.totalQuantity++
//       state.items = state.items.map(item => {
//         if (item.id === action.payload) {
//           return { ...item, quantity: item.quantity + 1 }
//         }
//         return item
//       })
//     },
//     decreaseQuantity: (state, action: PayloadAction<number>) => {
//       state.totalQuantity--
//       state.items = state.items
//         .map(item => {
//           if (item.id === action.payload) {
//             return { ...item, quantity: item.quantity - 1 }
//           }
//           return item
//         })
//         .filter(item => item.quantity > 0)
//     },
//     clearCart: () => {
//       return initialCartState
//     },
//   },
// })

import { coreApi } from "../../core/services/coreSlice";
import { RootState } from '../../store';
// Define our service using a base URL and expected endpoints
export const cartApi = coreApi.injectEndpoints({
	
	endpoints: (builder) => {
    	return {
        	getMyCart: builder.query<CartModel, void>({
            	query: () => ({
                	url: `/orders/cart/`,
            	}),            	
        	}),
			emptyCart: builder.mutation<CartModel, void>({
            	query: () => ({
                	url: `/orders/cart/empty_cart/`,
					method: 'POST'
            	}),            	
        	}),
    	};
	},
});

const cartSlice = createSlice({
	name: "cart",
	initialState: initialCartState as CartModel,
	reducers: {
		removeCart: (state: CartModel) => {
			state = initialCartState;
			
			return state;
		},
		updateCartState: (state: CartModel, {payload}) => {

			state.orderitems = payload.orderitems
			state.totalAmount = payload.totalAmount;
			state.totalQuantity = payload.totalQuantity;		
			
							
			return state;
		},
	},
	extraReducers(builder) {
    	builder.addMatcher(
        	isAnyOf(cartApi.endpoints.getMyCart.matchFulfilled, cartApi.endpoints.emptyCart.matchFulfilled),
        	(state, { payload }) => {

                state.orderitems = payload.orderitems
            	state.totalAmount = payload.totalAmount;
            	state.totalQuantity = payload.totalQuantity;		
				
                            	
            	return state;
        	},
    	);       	
	},
});

export default cartSlice.reducer
export const { removeCart, updateCartState } = cartSlice.actions;

export const cartItems = (state: RootState): CartItem[] => state.cart.orderitems
export const totalAmount = (state: RootState): number => state.cart.totalAmount

export const totalQuantity = (state: RootState): number =>
  state.cart.totalQuantity

export const { useGetMyCartQuery, useEmptyCartMutation } = cartApi;
