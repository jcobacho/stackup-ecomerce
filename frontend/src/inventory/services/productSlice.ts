import type {
    AddToCartRequest,
    AllProductResponse,
	ProductModel
} from "./types";

// import type { ErrorResponse } from "../error-types";
import { coreApi } from "../../core/services/coreSlice";
import { CartModal } from "../../cart/services/types";
// Define our service using a base URL and expected endpoints
export const productApi = coreApi.injectEndpoints({
	
	endpoints: (builder) => {
    	return {
        	getAllProducts: builder.query<AllProductResponse, number>({
            	query: (page) => ({
                	url: `/products/?page=${page}`,
            	}),
            	serializeQueryArgs: ({ endpointName }) => {
                    
                    return endpointName
                },
                // Always merge incoming data to the cache entry
                merge: (currentCache, newItems) => {
                    if (!newItems.previous) {
                        currentCache.count = newItems.count
                        currentCache.previous = newItems.previous
                        currentCache.next = newItems.next
                        currentCache.results = currentCache.results.concat(newItems.results || [])
                        return currentCache;
                      }
                      return newItems;
                },
                // Refetch when the page arg changes
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
            	// providesTags: ["ProductModel"],
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
        	addToCart: builder.mutation<CartModal, AddToCartRequest>({
            	query: ({id, ...body}) => ({
                	url: `/products/${id}/add_to_cart/`,
                	method: "POST",
                	credentials: "include",
                	body: body,                	
            	}),            	
        	}),
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
    useAddToCartMutation
	// useLazyGetBlogPostsByUsernameQuery,
	// useGetBlogPostsByUsernameQuery,
	// useGetAllBlogPostsQuery,
	// useCreatePostMutation,
	// useUpdatePostMutation,
	// useDeletePostMutation,
} = productApi;