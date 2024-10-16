export interface ProductModel {
	id: number;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	
}

export interface AddToCartRequest {
	id: number;
	quantity: number;	
}

export type AllProductResponse = {
	count: number
    previous: number | null
    next: number | null
    results: ProductModel[]
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