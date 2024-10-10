
export interface UserCreateRequest {
	username: string;
	firstName: string;
	password: string
	isShopper: boolean;
	isSeller: boolean;
	isStaff: boolean;
}

export interface UserUpdateRequest {
	id: string | number;
	username: string;
	firstName: string;
	password: string
	isShopper: boolean;
	isSeller: boolean;
	isStaff: boolean;
}

export interface UserModel {
	id: number;
	username: string;
	firstName: string;
	isShopper: boolean;
	isSeller: boolean;
	isStaff: boolean;	
}

export type AllUsersResponse = {
	count: number
    previous: number | null
    next: number | null
    results: UserModel[]
};