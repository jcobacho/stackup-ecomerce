import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../core/services/coreSlice";

// import { createSlice } from "@reduxjs/toolkit";
import { recursiveToSnake, toCamelResponseHandler } from "../../core/utils";
import { RootState } from "../../store";
import { AllUsersResponse, SearchRequest, UserCreateRequest, UserModel, UserUpdateRequest } from "./types";


// Define our service using a base URL and expected endpoints
export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseQueryWithReauth,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	tagTypes: ["User"],
	endpoints: (builder) => ({
        getAllUsers: builder.query<AllUsersResponse, SearchRequest>({
			query: (q) => ({
				url: 'users/',
				params: q
			}),
			providesTags: ["User"]	
				
		}),
		getUserById: builder.query<UserModel, number>({
			query: (id) => ({
				url: `users/${id}/`,
			}),
			providesTags: ["User"]	
			
		}),
		createUser: builder.mutation<UserModel, UserCreateRequest>({
			query: (body) => ({
				url: "users/",
				method: "POST",
				credentials: "include",
				body: recursiveToSnake(body),
				
			}),
			invalidatesTags: ["User"],
		}),
		updateUser: builder.mutation<UserModel, UserUpdateRequest>({
			query: ({id, ...body}) => ({
				url: `users/${id}/`,
				method: "PUT",
				credentials: "include",
				body: recursiveToSnake(body),
			}),
			invalidatesTags: ["User"]
		}),
		updateUserPermission: builder.mutation({
			query: ({id, ...patch}) => ({
			  url: `users/${id}/`,
			  // When performing a mutation, you typically use a method of
			  // PATCH/PUT/POST/DELETE for REST endpoints
			  method: 'PATCH',
			  // fetchBaseQuery automatically adds `content-type: application/json` to
			  // the Headers and calls `JSON.stringify(patch)`
			  body: recursiveToSnake(patch)			  
			}),
			invalidatesTags: ["User"]

		}),
		deleteUser: builder.mutation<void, number>({
			query: (id) => ({
				url: `users/${id}/`,
				method: "DELETE",
				credentials: "include",
				body: {}
				
			}),
			invalidatesTags: ["User"]

			
		}),

    })
        	
});

// const usersAdapter = createEntityAdapter()

// userApi definition above
// const userSlice = createSlice({
// 	name: "user",
// 	initialState: {},
// 	reducers: {
		
// 	},
// 	extraReducers(builder) {
// 		builder.addMatcher(
//         	userApi.endpoints.updateUser.matchFulfilled,
//         	(state, { payload }) => {
				
// 				console.log("state")
// 				console.log(state)

		// 		return state;
        // 	},
    	// );  
    	// builder.addMatcher(
        // 	userApi.endpoints.updateUserPermission.matchFulfilled,
        // 	(state, { payload }) => {

		// 		usersAdapter.upsertOne(state, payload)
				
		// 		return state;
        // 	},
    	// );    	
// 	},
// });


// export default userSlice.reducer;
// export const { refreshAuthentication, logout } = authSlice.actions;

// Exporting the generated methods from createApi
export const {
	useGetAllUsersQuery,
	useLazyGetAllUsersQuery,
	useGetUserByIdQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useUpdateUserPermissionMutation,
	useDeleteUserMutation,
} = userApi;

export const selectAllUsers = (state) => userApi.endpoints.getAllUsers.select()(state).data
// export const {
// 	// selectById: selectUserById,
// 	// selectIds: selectUserIds,
// 	// selectEntities: selectUserEntities,
// 	selectAll: selectAllUsers,
// 	// selectTotal: selectTotalUsers
//   } = usersAdapter.getSelectors(state => state.user);