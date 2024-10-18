import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import CartItem, { AddToCartRequest, AllOrdersResponse, CartModel, OrderModel, PayOrderRequest } from './types'
import { coreApi } from "../../core/services/coreSlice";
import { RootState } from '../../store';
import { recursiveToSnake } from '../../core/utils';
import { SearchRequest } from '../../core/services/types';

const initialCartState = {
	orderitems: [],
	totalQuantity: 0,
	totalAmount: 0
	
}
// Define our service using a base URL and expected endpoints
export const cartApi = coreApi.injectEndpoints({
	
	endpoints: (builder) => {
    	return {
        	getMyCart: builder.query<CartModel, void>({
            	query: () => ({
                	url: `/orders/cart/`,
            	}),            	
        	}),
			getMyOrders: builder.query<AllOrdersResponse, SearchRequest>({
            	query: (q) => ({
                	url: `/orders/order/`,
					params: q
            	}),            	
        	}),
			addToCart: builder.mutation<CartModel, AddToCartRequest>({
            	query: ({id, ...body}) => ({
                	url: `/products/${id}/add_to_cart/`,
                	method: "POST",
                	credentials: "include",
                	body: body,                	
            	}),            	
        	}),
			emptyCart: builder.mutation<CartModel, void>({
            	query: () => ({
                	url: `/orders/cart/empty_cart/`,
					method: 'POST'
            	}),            	
        	}),
			payOrder: builder.mutation<CartModel, PayOrderRequest>({
            	query: (body) => ({
                	url: `/orders/cart/pay_order/`,
					method: 'POST',
					body: recursiveToSnake(body)
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
        	isAnyOf(cartApi.endpoints.getMyCart.matchFulfilled, cartApi.endpoints.addToCart.matchFulfilled, 
				cartApi.endpoints.emptyCart.matchFulfilled, cartApi.endpoints.payOrder.matchFulfilled),
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

export const { useGetMyCartQuery, useAddToCartMutation, useEmptyCartMutation, usePayOrderMutation, useGetMyOrdersQuery} = cartApi;
