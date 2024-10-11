import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../core/services/coreSlice";

// import { createSlice } from "@reduxjs/toolkit";
import { recursiveToSnake, toCamelResponseHandler } from "../../core/utils";
import { RootState } from "../../store";
import { AllUsersResponse, UserCreateRequest, UserModel, UserUpdateRequest } from "./types";


// Define our service using a base URL and expected endpoints
export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseQueryWithReauth,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	tagTypes: ["User"],
	endpoints: (builder) => ({
        getAllUsers: builder.query<AllUsersResponse, void>({
			query: () => "users/",
			providesTags: (data) =>
				data
				? [
					...data.results.map(({ id }) => ({ type: 'User' as const, id })),
					{ type: 'User', id: 'LIST' },
					]
				: [{ type: 'User', id: 'LIST' }]
		}),

		createUser: builder.mutation<UserModel, UserCreateRequest>({
			query: (body) => ({
				url: "users/",
				method: "POST",
				credentials: "include",
				body: recursiveToSnake(body),
				validateStatus(response) {
					return response.ok === true;
				},
			}),
			invalidatesTags: (result, error) => {
				return [{ type: 'User', id: result?.id }]
			  },
		}),
		updateUser: builder.mutation<UserModel, UserUpdateRequest>({
			query: ({id, ...body}) => ({
				url: `users/${id}/`,
				method: "PUT",
				credentials: "include",
				body: recursiveToSnake(body),
			}),
			invalidatesTags: (result, error, { id }) => {
				return [{ type: 'User', id }]
			  },
			// transformErrorResponse(response, _meta, _arg) {
			// 	return response.data as ErrorResponse;
			// },
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
			invalidatesTags: (result, error, { id }) => {
				return [{ type: 'User', id }]
			},
		}),
		deleteUser: builder.mutation<void, number>({
			query: (id) => ({
				url: `users/${id}/`,
				method: "DELETE",
				credentials: "include",
				body: {}
				
			}),
			invalidatesTags: (result, error, id) => {
				return [{ type: 'User', id }]
			},
			
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
	useCreateUserMutation,
	useUpdateUserMutation,
	useUpdateUserPermissionMutation,
	useDeleteUserMutation,
} = userApi;

// export const {
// 	// selectById: selectUserById,
// 	// selectIds: selectUserIds,
// 	// selectEntities: selectUserEntities,
// 	selectAll: selectAllUsers,
// 	// selectTotal: selectTotalUsers
//   } = usersAdapter.getSelectors(state => state.user);