import type {
    AllProductResponse,
	ProductAdminCreateRequest,
	ProductAdminUpdateRequest,
	ProductModel
} from "./types";

// import type { ErrorResponse } from "../error-types";
import { coreApi } from "../../core/services/coreSlice";
import { SearchRequest } from "../../core/services/types";
import { recursiveToSnake } from "../../core/utils";

// Define our service using a base URL and expected endpoints
export const productApi = coreApi.injectEndpoints({
	
	endpoints: (builder) => {
    	return {
        	getAllProducts: builder.query<AllProductResponse, SearchRequest>({
            	query: ({page, search}) => ({
                	url: `/products/?page=${page}&search=${search}`,
            	}),
            	serializeQueryArgs: ({ endpointName }) => {                    
                    return endpointName
                },
                // Always merge incoming data to the cache entry
                merge: (currentCache, newItems) => {
                    if (newItems.previous) {
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
        	}),
            getProductById: builder.query<ProductModel, number>({
                query: (id) => ({
                	url: `/products/${id}/`,
            	}),
            }),
            getAllAdminProducts: builder.query<AllProductResponse, SearchRequest>({
            	query: (q) => ({
                	url: `/products/admin/`,
                    params: q
            	}),
                providesTags: (data) =>
                    data?.results
                    ? [
                        ...data.results.map(({ id }) => ({ type: 'ProductAdmin' as const, id })),
                        { type: 'ProductAdmin', id: 'LIST' },
                        ]
                    : [{ type: 'ProductAdmin', id: 'LIST' }],
            	
        	}),
            getAdminProductById: builder.query<ProductModel, number>({
                query: (id) => ({
                	url: `/products/admin/${id}/`,
            	}),
            }),
            createProduct: builder.mutation<ProductModel, ProductAdminCreateRequest>({
                query: ({...body}) => ({
                    url: "/products/admin/",
                    method: "POST",
                    credentials: "include",
                    body: recursiveToSnake(body),
                    
                }),
                invalidatesTags: [{ type: 'User', id: 'LIST' }],
            }),
            updateProduct: builder.mutation<ProductModel, ProductAdminUpdateRequest>({
                query: ({id, ...body}) => ({
                    url: `/products/admin/${id}/`,
                    method: "PUT",
                    credentials: "include",
                    body: recursiveToSnake(body),
                }),
                invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
            }),
            deleteProduct: builder.mutation<void, number>({
                query: (id) => ({
                    url: `/products/admin/${id}/`,
                    method: "DELETE",
                    credentials: "include",
                    body: {}
                    
                }),
                invalidatesTags: (result, error, id) => [{ type: 'ProductAdmin', id: id }],
    
                
            }),
        	
    	};
	},
});

// Exporting the generated methods from createApi
export const {
	useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetAllAdminProductsQuery,
    useGetAdminProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation

} = productApi;