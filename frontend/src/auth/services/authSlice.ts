import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
	UserResponse,
	LoginRequest,
	AuthState
} from "./types";
import type { RootState } from "../../store";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../core/services/error-types";

// import type { ErrorResponse } from "../error-types";

// Define our service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: "authApi",
	// Change `localhost` to a forwarded address if using a cloud
	// environment
	baseQuery: fetchBaseQuery({
    	// Replace your address here if needed i.e. your forwarded address from a cloud environment
    	baseUrl: "http://localhost:8000/api",
    	credentials: "include",
	}),
	endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/token/pair",
                method: "POST",
                body: credentials,
            }),
			transformErrorResponse(response, _meta, _arg) {
				return response.data as ErrorResponse;
			},
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
	} as AuthState,
	reducers: {},
	extraReducers(builder) {
    	builder.addMatcher(
        	authApi.endpoints.login.matchFulfilled,
        	(state, { payload }) => {
				state.token = payload.access;
            	state.user = payload.user;
            	return state;
        	},
    	);    	
	},
});

export default authSlice.reducer;

// Exporting the generated methods from createApi
export const {
	useLoginMutation
} = authApi;