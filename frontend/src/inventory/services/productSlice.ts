import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    AllProductResponse,
	ProductModel
} from "./types";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
// import type { ErrorResponse } from "../error-types";

// Define our service using a base URL and expected endpoints
export const productApi = createApi({
	reducerPath: "productApi",
	// Change `localhost` to a forwarded address if using a cloud
	// environment
	baseQuery: fetchBaseQuery({
    	// Replace your address here if needed i.e. your forwarded address from a cloud environment
    	baseUrl: "http://localhost:8000/api/",
    	credentials: "include",
	}),
	tagTypes: ["ProductModel"],
	endpoints: (builder) => {
    	return {
        	getAllProducts: builder.query<AllProductResponse, number>({
            	query: (page) => ({
                	url: `inventory/products?page=${page}`,
            	}),
            	transformResponse: (response: { items: ProductModel[] }, _meta, _arg) =>
                	response,
            	transformErrorResponse: (response, _meta, _arg) => {
                	return response.data;
            	},
                serializeQueryArgs: ({ endpointName }) => {
                    
                    return endpointName
                },
                // Always merge incoming data to the cache entry
                merge: (currentCache, newItems) => {

                    currentCache.count = newItems.count
                    currentCache.current_page = newItems.current_page
                    currentCache.total_pages = newItems.total_pages
                    currentCache.previous = newItems.previous
                    currentCache.next = newItems.next
                    currentCache.hasMore = newItems.hasMore
                    currentCache.items = currentCache.items.concat(newItems.items || [])

                },
                // Refetch when the page arg changes
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
            	providesTags: ["BlogModel"],
        	}),
        	// getBlogPostsByUsername: builder.query<BlogModel[], string>({
            // 	query: (user) => `posts/user/${user}`,
            // 	transformResponse: (response: { posts: BlogModel[] }, _meta, _arg) =>
            //     	response.posts,
            // 	transformErrorResponse(response, _meta, _arg) {
            //     	return response.data as ErrorResponse;
            // 	},
            // 	providesTags: ["BlogModel"],
        	// }),
        	// createPost: builder.mutation<BlogResponse, BlogCreateRequest>({
            // 	query: (body) => ({
            //     	url: "posts/post/create",
            //     	method: "POST",
            //     	credentials: "include",
            //     	body: body,
            //     	validateStatus(response) {
            //         	console.log(response);
            //         	return response.ok === true;
            //     	},
            // 	}),
            // 	invalidatesTags: ["BlogModel"],
            // 	transformErrorResponse(response, _meta, _arg) {
            //     	return response.data as ErrorResponse;
            // 	},
        	// }),
        	// deletePost: builder.mutation<BlogResponse, BlogDeleteRequest>({
            // 	query: (body) => ({
            //     	url: "posts/post/delete",
            //     	method: "DELETE",
            //     	credentials: "include",
            //     	body: { id: body.id, title: body.title },
            // 	}),
            // 	invalidatesTags: ["BlogModel"],
            // 	transformErrorResponse(response, _meta, _arg) {
            //     	return response.data as ErrorResponse;
            // 	},
        	// }),
        	// updatePost: builder.mutation<BlogResponse, BlogUpdateRequest>({
            // 	query: (body) => ({
            //     	url: "posts/post/update",
            //     	method: "PUT",
            //     	credentials: "include",
            //     	body: body,
            // 	}),
            // 	invalidatesTags: ["BlogModel"],
            // 	transformErrorResponse(response, _meta, _arg) {
            //     	return response.data as ErrorResponse;
            // 	},
        	// }),
    	};
	},
});

// Exporting the generated methods from createApi
export const {
	useGetAllProductsQuery,
	// useLazyGetBlogPostsByUsernameQuery,
	// useGetBlogPostsByUsernameQuery,
	// useGetAllBlogPostsQuery,
	// useCreatePostMutation,
	// useUpdatePostMutation,
	// useDeletePostMutation,
} = productApi;