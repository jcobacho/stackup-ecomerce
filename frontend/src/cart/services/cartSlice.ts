import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import CartItem, { CartModal } from './types'


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
        	getMyCart: builder.query<CartModal, void>({
            	query: () => ({
                	url: `/orders/cart/`,
            	}),            	
            	// providesTags: ["ProductModel"],
        	}),
        	
    	};
	},
});

const cartSlice = createSlice({
	name: "cart",
	initialState: initialCartState as CartModal,
	reducers: {},
	extraReducers(builder) {
    	builder.addMatcher(
        	cartApi.endpoints.getMyCart.matchFulfilled,
        	(state, { payload }) => {
            

              console.log("payload in getMyCart")
              console.log(payload)
              state.orderitems = payload.orderitems
            	state.totalAmount = payload.totalAmount;
            	state.totalQuantity = payload.totalQuantity;				
                            	
            	return state;
        	},
    	);       	
	},
});

export default cartSlice.reducer

export const cartItems = (state: RootState): CartItem[] => state.cart.orderitems
export const totalAmount = (state: RootState): number => state.cart.totalAmount

export const totalQuantity = (state: RootState): number =>
  state.cart.totalQuantity

export const { useGetMyCartQuery } = cartApi;
