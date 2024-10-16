import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
	UserResponse,
	LoginRequest,
	AuthState,
	TokenResponse,
	RefreshRequest
} from "./types";
import { createSlice } from "@reduxjs/toolkit";
import { toCamelResponseHandler } from "../../core/utils";
import { coreApi } from "../../core/services/coreSlice";


// Define our service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: "authApi",
	// Change `localhost` to a forwarded address if using a cloud
	// environment
	baseQuery: fetchBaseQuery({
    	// Replace your address here if needed i.e. your forwarded address from a cloud environment
    	baseUrl: "http://localhost:8000/api/",
    	credentials: "include",
		responseHandler: toCamelResponseHandler
	}),
	
	endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: "token/",
                method: "POST",
                body: credentials,
			}),
			// async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
			// 	// get a random user
			// 	const loginResult = await fetchWithBQ({
			// 		url: "token/",
			// 		method: "POST",
			// 		body: _arg,
			// 	})

			// 	if (loginResult.error) throw loginResult.error

			// 	const data = loginResult.data as UserResponse
			// 	if (data.access && data.user.isShopper){

			// 		const result = await _queryApi.dispatch(coreApi.endpoints.getMyCart.initiate())
			// 		// const result = await coreApi.getMyCart
					
			// 	}
			// 	return loginResult
			// },	
			async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
				// `onStart` side-effect
				try {
				  const { data } = await queryFulfilled
				  // `onSuccess` side-effect
				  // load user cart

				  if (data.access && data.user.isShopper){
						await dispatch(coreApi.endpoints.getMyCart.initiate())												
				  }				

				} catch (err) {
				  // `onError` side-effect
				  console.log("err")
				  console.log(err)
				}
			  },		
        }),
        refresh: builder.mutation<TokenResponse, RefreshRequest>({
            query: (credentials) => ({
                url: "token/refresh/",
                method: "POST",
                body: credentials,
            }),
        }),       
        
    })
        	
});

// authApi definition above
const authSlice = createSlice({
	name: "auth",
	initialState: {
    	user: null,
    	access: null,
		refresh: null
	} as AuthState,
	reducers: {
		refreshAuthentication: (state) => {
			const isAuthenticated = sessionStorage.getItem("isAuthenticated");
			if (isAuthenticated === "true") {
				const userSession = sessionStorage.getItem("user");
				const response: UserResponse = JSON.parse(
						userSession as string,
				) as UserResponse;
				state.access = response.access;
				state.user = response.user;
				state.refresh = response.refresh;
			}
			return state;
		},
		refreshTokens: (state, action) => {
			state.access = action.payload.access;
			sessionStorage.setItem("isAuthenticated", "true");
            sessionStorage.setItem("user", `${JSON.stringify(state)}`);
			return state;
		},
		updateAuthenticatedUser: (state, action) => {

			state.user = action.payload;
			sessionStorage.setItem("user", `${JSON.stringify(state)}`);
			return state

		},
		
		logout: (state) => {
			state.access = null;
			state.user = null;
			state.refresh = null;
			sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("user");
			return state
		}
	},
	extraReducers(builder) {
    	builder.addMatcher(
        	authApi.endpoints.login.matchFulfilled,
        	(state, { payload }) => {
				state.access = payload.access;
            	state.user = payload.user;
            	state.refresh = payload.refresh;
				sessionStorage.setItem("isAuthenticated", "true");
                sessionStorage.setItem("user", `${JSON.stringify(payload)}`);
                           	
            	return state;
        	},
    	);       	
	},
});


export default authSlice.reducer;
export const { refreshAuthentication, refreshTokens, logout, updateAuthenticatedUser } = authSlice.actions;

// Exporting the generated methods from createApi
export const {
	useLoginMutation,
	useRefreshMutation
} = authApi;