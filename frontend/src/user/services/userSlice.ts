// import { createSlice } from "@reduxjs/toolkit";
import { recursiveToSnake, toCamelResponseHandler } from "../../core/utils";
import { RootState } from "../../store";
import { AllUsersResponse, SearchRequest, UserCreateRequest, UserModel, UserUpdateRequest } from "./types";
import { coreApi } from "../../core/services/coreSlice";

// Define our service using a base URL and expected endpoints
export const userApi = coreApi.injectEndpoints({
	// reducerPath: "userApi",
	// baseQuery: baseQueryWithReauth,
	// refetchOnFocus: true,
	// refetchOnReconnect: true,
	// tagTypes: ["User"],
	endpoints: (build) => ({
        getAllUsers: build.query<AllUsersResponse, SearchRequest>({
			query: (q) => ({
				url: 'users/',
				params: q
			}),
			// forceRefetch({ currentArg, previousArg }) {
			// 	console.log("force refetch")
			// 	console.log(currentArg)
			// 	console.log(previousArg)
			// 	return currentArg !== previousArg;
			// },
			// providesTags: ["User"]	
			providesTags: (data) =>
				data?.results
				? [
					...data.results.map(({ id }) => ({ type: 'User' as const, id })),
					{ type: 'User', id: 'LIST' },
					]
				: [{ type: 'User', id: 'LIST' }],
				
		}),
		getUserById: build.query<UserModel, number>({
			query: (id) => ({
				url: `users/${id}/`,
			}),
			providesTags: (result, error, id) => [{ type: 'User', id }],
			
		}),
		createUser: build.mutation<UserModel, UserCreateRequest>({
			query: (body) => ({
				url: "users/",
				method: "POST",
				credentials: "include",
				body: recursiveToSnake(body),
				
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),
		updateUser: build.mutation<UserModel, UserUpdateRequest>({
			query: ({id, ...body}) => ({
				url: `users/${id}/`,
				method: "PUT",
				credentials: "include",
				body: recursiveToSnake(body),
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
		}),
		updateUserPermission: build.mutation({
			query: ({id, ...patch}) => ({
			  url: `users/${id}/`,
			  // When performing a mutation, you typically use a method of
			  // PATCH/PUT/POST/DELETE for REST endpoints
			  method: 'PATCH',
			  // fetchBaseQuery automatically adds `content-type: application/json` to
			  // the Headers and calls `JSON.stringify(patch)`
			  body: recursiveToSnake(patch)			  
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],

		}),
		deleteUser: build.mutation<void, number>({
			query: (id) => ({
				url: `users/${id}/`,
				method: "DELETE",
				credentials: "include",
				body: {}
				
			}),
			invalidatesTags: (result, error, id) => [{ type: 'User', id: id }],

			
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
// 	extraReducers(build) {
// 		build.addMatcher(
//         	userApi.endpoints.updateUser.matchFulfilled,
//         	(state, { payload }) => {
				
// 				console.log("state")
// 				console.log(state)

		// 		return state;
        // 	},
    	// );  
    	// build.addMatcher(
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