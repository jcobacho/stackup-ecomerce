type ErrorResponse = {
	code?: string | null;
	detail?: string
	
};

// biome-ignore lint/suspicious/noExplicitAny: This can be anything
const isErrorResponse = (error: any): error is ErrorResponse =>
	"detail" in error;

export default isErrorResponse;
export type { ErrorResponse };