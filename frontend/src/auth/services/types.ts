export interface LoginRequest {
	username: string;
	password: string;
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

