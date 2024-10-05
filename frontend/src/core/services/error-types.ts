type ErrorResponse = {
	code?: string | null;
	detail?: string | null
};

// biome-ignore lint/suspicious/noExplicitAny: This can be anything
const isErrorResponse = (error: any): error is ErrorResponse =>
	"code" in error;

export default isErrorResponse;
export type { ErrorResponse };