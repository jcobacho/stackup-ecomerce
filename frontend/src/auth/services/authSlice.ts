import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
	UserResponse,
	LoginRequest,
	AuthState
} from "./types";
import type { RootState } from "../../store";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { toCamelResponseHandler } from "../../core/utils";


// Define our service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: "authApi",
	// Change `localhost` to a forwarded address if using a cloud
	// environment
	baseQuery: fetchBaseQuery({
    	// Replace your address here if needed i.e. your forwarded address from a cloud environment
    	baseUrl: "http://localhost:8000/api",
    	credentials: "include",
		responseHandler: toCamelResponseHandler
	}),
	

	endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/token/pair",
                method: "POST",
                body: credentials,
			}),			
        }),
        refresh: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/token/refresh",
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
    	token: null,
		refreshtoken: null
	} as AuthState,
	reducers: {
		refreshAuthentication: (state) => {
			const isAuthenticated = sessionStorage.getItem("isAuthenticated");
			if (isAuthenticated === "true") {
				const userSession = sessionStorage.getItem("user");
				const response: UserResponse = JSON.parse(
						userSession as string,
				) as UserResponse;
				state.token = response.access;
				state.user = response.user;
				state.refreshtoken = response.refresh;
			}
			return state;
		},
		logout: (state) => {
			state.token = null;
			state.user = null;
			state.refreshtoken = null;
			sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("user");
			return state
		}
	},
	extraReducers(builder) {
    	builder.addMatcher(
        	authApi.endpoints.login.matchFulfilled,
        	(state, { payload }) => {
				state.token = payload.access;
            	state.user = payload.user;
            	state.refreshtoken = payload.refresh;
				sessionStorage.setItem("isAuthenticated", "true");
                sessionStorage.setItem("user", `${JSON.stringify(payload)}`);
                            	
            	return state;
        	},
    	);    	
	},
});


export default authSlice.reducer;
export const { refreshAuthentication, logout } = authSlice.actions;

// Exporting the generated methods from createApi
export const {
	useLoginMutation
} = authApi;