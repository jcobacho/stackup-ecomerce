export interface ProductModel {
	id: number;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	
}

export type AllProductResponse = {
	count: number
    current_page: number
    total_pages: number
    previous: number | null
    next: number | null
    hasMore: boolean
    items: ProductModel[]
};

// export interface BlogCreateRequest {
// 	title: string | null;
// 	content: string | null;
// }

// export interface BlogDeleteRequest {
// 	id: number;
// 	title: string;
// }

// export interface BlogUpdateRequest extends BlogDeleteRequest {
// 	content: string;
// }

// export interface BlogResponse {
// 	message?: string;
// 	status?: number;
// 	ok?: boolean;
// 	error?: string;
// 	reason?: string;
// }