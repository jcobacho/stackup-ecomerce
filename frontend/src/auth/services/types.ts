export interface LoginRequest {
	username: string;
	password: string;
}

export interface RegisterRequest {
	username: string;
	firstName: string;
	isShopper: boolean;
	isSeller: boolean;
	password: string;
	password2: string;

}

export interface RegisterError {
	username?: [number: string];
	firstName?: [number: string];
	password?: [number: string];
	password2?: [number: string];
	isShopper?: [number: string];
	isSeller?: [number: string];
}

export interface RefreshRequest {
	refresh: string;
	
}

export interface User {
	id: number;
	username: string;
	firstName: string;
	isShopper: boolean;
	isSeller: boolean;
	isStaff: boolean;
}

export type AuthState = {
	user: User | null;
	access: string | null;
	refresh: string | null;
};

export interface UserResponse {
	access: string;
	refresh: string;
	user: User;
}

export interface TokenResponse {
	access: string;
	refresh: string;	
}

