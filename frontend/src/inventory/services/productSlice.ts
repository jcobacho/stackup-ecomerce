import type {
    AllProductResponse,
	ProductModel
} from "./types";

// import type { ErrorResponse } from "../error-types";
import { coreApi } from "../../core/services/coreSlice";
import { SearchRequest } from "../../core/services/types";

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
        	
    	};
	},
});

// Exporting the generated methods from createApi
export const {
	useGetAllProductsQuery,

} = productApi;