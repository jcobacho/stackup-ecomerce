export interface LoginRequest {
	username: string;
	password: string;
}

export interface User {
	id: number;
	username: string;
	email: string;
	role: string;
}

export type AuthState = {
	user: User | null;
	token: string | null;
	refreshtoken: string | null;
};

export interface UserResponse {
	access: string;
	refresh: string;
	user: User;
}
