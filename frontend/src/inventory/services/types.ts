export interface ProductModel {
	id: number;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	
}

export type AllProductResponse = {
	count: number
    previous: number | null
    next: number | null
    results: ProductModel[]
};

export interface ProductAdminCreateRequest {
	id: number;
	name: string;
	description: string | null;
	price: number;
	imageUrl: string | null;
}

export interface ProductAdminCreateError {
	name?: [number: string];
	description?: [number: string];
	price?: [number: string];
	imageUrl?: [number: string];
}

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