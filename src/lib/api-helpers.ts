export type FetchResult<T> = { status: "success"; data: T } | { status: "error"; message: string };

export const handleSuccess = <T>(data: T): FetchResult<T> => ({ status: "success", data });

export const handleError = (message: string): FetchResult<never> => ({ status: "error", message });
